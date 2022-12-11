import chai from 'chai'
const expect = chai.expect

describe('Example', () => {
  describe('Test', () => {
    let a = 1
    let b = 2
    it('should identify that a is less than b', async () => {
      expect(a).to.be.lessThan(b)
    })
  })
})