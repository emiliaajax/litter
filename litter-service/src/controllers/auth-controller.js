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
      let status
      fetch('http://auth-service:8888/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
      })
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

  register (req, res, next) {
    try {
      console.log(req.body)
      let status
      fetch('http://auth-service:8888/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
