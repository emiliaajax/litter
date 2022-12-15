import createError from 'http-errors'

export class LitsController {
  hello (req, res, next) {
    try {
      res.json({ message: 'Hello from LitsController' })
    } catch (err) {
      next(createError(500))
    }
  }
}