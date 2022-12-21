/**
 * Lits controller.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import createError from 'http-errors'

export class LitsController {
  async getLatestLits (req, res, next) {
    try {
      let status
      fetch('http://lits:8888/lits/api/v1/lits') // 100 latest lits
        .then(response => {
          status = response.status
          return response.json()
        })
        .then(json => {
          if (status === 200) {
            res.status(status).json(json)
          } else {
            next(createError(status))
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
      let status
      fetch(`http://lits:8888/lits/api/v1/lits/${req.params.id}`)
        .then(response => {
          status = response.status
          return response.json()
        })
        .then(json => {
          if (status === 200) {
            res.status(status).json(json)
          } else {
            next(createError(status))
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
      let status
      fetch('http://lits:8888/lits/api/v1/lits', {
        method: 'POST',
        headers: {
          authorization: req.headers.authorization
        },
        body: JSON.stringify(req.body)
      })
        .then(response => {
          status = response.status
          return response.json()
        })
        .then(json => {
          if (status === 201) {
            res.status(status).json(json)
          } else {
            next(createError(status))
          }
        }).catch(err => {
          next(createError(err))
        })
    } catch (err) {
      next(createError(500))
    }
  }
}
