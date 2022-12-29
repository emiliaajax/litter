/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

import { LitsController } from '../src/controllers/api/lits-controller.js'
import { Lit } from '../src/models/lit.js'

chai.use(sinonChai)
const expect = chai.expect

describe('LitsController', () => {
  describe('findLatestLits', () => {
    let mongo
    let req, res, next

    before(async function () {
      // More than default timeout (2s) is required to start server
      this.timeout(20000) // 20s

      // Create MongoDB mock server
      mongo = await MongoMemoryServer.create()
      const uri = mongo.getUri()

      // Disable deprecation warning
      mongoose.set('strictQuery', false)

      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    })

    after(async () => {
      await mongoose.disconnect()
      await mongo.stop()
    })

    it('Should send a JSON response with all of the latest lits (3 lits).', async () => {
      // Create mock lits
      const lits = [
        new Lit({
          authorId: 'fakeId1',
          text: 'FakeText1'
        }),
        new Lit({
          authorId: 'fakeId2',
          text: 'FakeText2'
        }),
        new Lit({
          authorId: 'fakeId3',
          text: 'FakeText3'
        })
      ]

      // Save lits
      await Promise.all(lits.map((lit) => lit.save()))

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

      // Assert that the response data includes all lits (or 100 latest)
      expect(res.json).to.have.been.calledWith(sinon.match(array => array.length === lits.length)) // lits.length = 3
    })
  })
})
