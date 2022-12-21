/**
 * User controller.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import createError from 'http-errors'

export class UserController {
  getAllUserFollowings (req, res, next) {
    try {
      let status
      fetch(`http://auth-service:8888/api/v1/users/${req.params.id}/followings`)
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
      next(createError(err))
    }
  }

  createFollowing (req, res, next) {
    try {
      let status
      fetch(`http://auth-service:8888/api/v1/users/${req.params.id}/followings`, {
        method: 'POST',
        headers: {
          authorization: req.headers.authorization,
          "Content-Type": "application/json"
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
      next(createError(err))
    }
  }

  removeFollowing (req, res, next) {
    try {
      let status
      fetch(`http://auth-service:8888/api/v1/users/${req.params.id}/followings`, {
        method: 'DELETE',
        headers: {
          authorization: req.headers.authorization,
          "Content-Type": "application/json"
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
      next(createError(err))
    }
  }
}
