/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { LitsController } from '../src/controllers/api/lits-controller.js'
import { Lit } from '../src/models/lit.js'

chai.use(sinonChai)
const expect = chai.expect

describe('LitsController', () => {
  describe('findLatestLits', () => {
    let req, res, next

    it('Should send a JSON response with all of the latest lits (3 lits).', async function () {
      // Create mock lits
      const fakeData = [
        {
          _id: '5fbbc2e1c7a9a907dbb7e6b5',
          authorId: '57f72c44f92ece0b9c95545e',
          text: 'Fake lit text',
          created_at: '2022-12-29T00:00:00.000Z',
          updated_at: '2022-12-29T02:59:00.000Z',
          __v: 0
        },
        {
          _id: '6a7b8c9d0e1f2g3h4i5j6k7',
          authorId: '5a4d3e2f1c0b9a8d7e6f5g4',
          text: 'Another fake lit text',
          created_at: '2022-12-29T02:00:00.000Z',
          updated_at: '2022-12-29T03:00:00.000Z',
          __v: 0
        }
      ]

      const sortStub = sinon.stub().returns({ limit: sinon.stub().resolves(fakeData) })
      sinon.stub(Lit, 'find').returns({ sort: sortStub })

      // Configure req, res, next
      req = {}
      res = { json: sinon.stub(), status: sinon.stub() }
      res.status.returns(res)
      next = sinon.spy()

      // Call findLatestLits in the controller
      const litsController = new LitsController()
      await litsController.findLatestLits(req, res, next)

      // Assert that next has not been called
      expect(next).to.not.have.been.called

      // Assert that res.json has been called once
      expect(res.json).to.have.been.calledOnce

      // Assert that the response status code is 200
      expect(res.status).to.have.been.calledWith(200)

      // Assert that the response is of type array
      expect(res.json).to.have.been.calledWith(sinon.match.array)

      // Assert that the response data includes the fake data
      expect(res.json).to.have.been.calledWith(sinon.match(array => array.length === fakeData.length)) // fakeData.length = 2
    })
  })
})
