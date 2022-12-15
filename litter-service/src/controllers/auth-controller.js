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
      res.json({ message: 'Auth register' })
    } catch (err) {
      next(createError(500))
    }
  }
}

// auth-service/api/auth/login
// auth-service/api/auth/register
