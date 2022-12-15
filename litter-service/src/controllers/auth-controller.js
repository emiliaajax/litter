import createError from 'http-errors'

export class AuthController {
  hello (req, res, next) {
    try {
      res.json({ message: 'Hello from AuthController' })
    } catch (err) {
      next(createError(500))
    }
  }
}
