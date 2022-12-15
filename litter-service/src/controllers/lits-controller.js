import createError from 'http-errors'

export class LitsController {
  async getLatestLits (req, res, next) {
    try {
      fetch('http://lits-service/lists/api/v1/lits') // 100 latest lits
        .then(response => {
          return { json: response.json(), status: response.status }
        })
        .then(data => {
          if (data.status === 200) {
            res.json(data.json)
          } else {
            next(createError(data.status))
          }
        }).catch(err => {
          next(createError(err))
        })
    } catch (err) {
      next(createError(500))
    }
  }

  getLitById (req, res, next) {
    try {
      fetch(`http://lits-service/lists/api/v1/lits/${req.params.id}`)
        .then(response => {
          return { json: response.json(), status: response.status }
        })
        .then(data => {
          if (data.status === 200) {
            res.json(data.json)
          } else {
            next(createError(data.status))
          }
        }).catch(err => {
          next(createError(err))
        })
    } catch (err) {
      next(createError(500))
    }
  }

  createLit (req, res, next) {
    try {
      fetch('http://lits-service/lists/api/v1/lits', {
        method: 'POST',
        headers: {
          authorization: req.headers.authorization
        },
        body: req.body
      })
        .then(response => {
          return { json: response.json(), status: response.status }
        })
        .then(data => {
          if (data.status === 201) {
            res.status(data.status).json(data.json)
          } else {
            next(createError(data.status))
          }
        }).catch(err => {
          next(createError(err))
        })
    } catch (err) {
      next(createError(500))
    }
  }
}
