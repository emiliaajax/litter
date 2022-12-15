import createError from 'http-errors'

export class AuthController {
  login (req, res, next) {
    try {
      res.json({ message: 'Auth login' })
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
