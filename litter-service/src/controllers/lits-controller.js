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
      fetch(`http://lits-service/lists/api/v1/lits/${req.params.id}`)
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
      fetch('http://lits-service/lists/api/v1/lits/', {
        method: 'POST',
        body: req.body
      })
        .then(response => {
          return { response: response.json(), status: response.status }
        })
        .then(data => {
          res.status(data.status).json(data.response)
        })
    } catch (err) {
      next(createError(500))
    }
  }
}
