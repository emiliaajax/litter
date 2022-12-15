import createError from 'http-errors'

export class LitsController {
  getLatestLits (req, res, next) {
    try {
      res.json({ message: 'latest lits' })
    } catch (err) {
      next(createError(500))
    }
  }

  getLitById (req, res, next) {
    try {
      res.json({ message: 'lit by id' })
    } catch (err) {
      next(createError(500))
    }
  }

  createLit (req, res, next) {
    try {
      res.json({ message: 'Create Lit' })
    } catch (err) {
      next(createError(500))
    }
  }
}


// http://lits-service/lists/api/v1/lits