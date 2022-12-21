import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import UserModel from '../src/models/user.js'
import { AccountController } from '../src/controllers/account-controller.js'

const controller = new AccountController()
const expect = chai.expect
chai.use(sinonChai)

describe('AccountController', () => {
  describe('login', () => {
    let req, res, next
    let user

    beforeEach(() => {
      user = { authenticate: sinon.stub(UserModel, 'authenticate') }
      req = { body: { email: 'test@example.com', password: 'password' } }
      res = { json: sinon.stub(), status: sinon.stub() }
      res.status.returns(res) // For chaining methods.
      next = sinon.spy()
    })

    afterEach(() => {
      user.authenticate.restore()
    })

    it('should return a 200 status and the access token if the user is authenticated', async () => {
      // Fake user authenticate return value
      user.authenticate.resolves({ email: 'test@example.com' })

      // Create a spy on the sign method of jwt
      const jwtSignStub = sinon.stub(jwt, 'sign')

      // Make sign method to return a fake access token
      jwtSignStub.returns('fake-access-token')

      // Call the login method
      await controller.login(req, res, next)

      // Assert that the response status was set to 200
      expect(res.status).to.have.been.calledWith(200)

      // Assert that the json method was called with the access token
      expect(res.json).to.have.been.calledWith({ access_token: 'fake-access-token' })

      // Restore the jsonwebtoken sign method
      jwtSignStub.restore()
    })

    it('should return a 401 status and call next if the user is not authenticated', async () => {
      // Set up the stub to throw an error when the user is not authenticated
      const newError = new Error('Invalid credentials.')
      newError.code = 401
      user.authenticate.throws(newError)

      // Create stub for http-errors
      sinon.stub(createError)

      // Call the login method
      await controller.login(req, res, next)

      // Assert that response was not called
      expect(res.status).to.have.not.been.called
      expect(res.json).to.have.not.been.called

      // Assert that next was called with http error 401
      expect(next).to.have.been.calledWith(createError(401))
    })
  })
})
