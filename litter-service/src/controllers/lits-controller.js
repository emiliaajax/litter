import createError from 'http-errors'

export class LitsController {
  async getLatestLits (req, res, next) {
    try {
      fetch('http://lits-service/lists/api/v1/lits') // Get 100 latest lits
        .then(response => {
          return response.json()
        })
        .then(json => {
          res.json(json)
        })
    } catch (err) {
      next(createError(500))
    }
  }

  getLitById (req, res, next) {
    try {
      fetch(`http://lits-service/lists/api/v1/lits/${req.params.id}`) // Get 100 latest lits
        .then(response => {
          return response.json()
        })
        .then(json => {
          res.json(json)
        })
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