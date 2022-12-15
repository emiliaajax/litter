/**
 * Auth controller.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import createError from 'http-errors'

export class AuthController {
  login (req, res, next) {
    try {
      fetch('http://auth-service/api/auth/login', {
        method: 'POST',
        body: req.body
      })
        .then(response => {
          return { json: response.json(), status: response.status }
        })
        .then(data => {
          if (data.status === 200) {
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

  register (req, res, next) {
    try {
      fetch('http://auth-service/api/auth/register', {
        method: 'POST',
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
