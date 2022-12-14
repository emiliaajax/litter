import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import UserModel from '../models/user.js'

const privateKey = process.env.JWT_PRIVATE_KEY

/**
 * Account controller.
 */
export class AccountController {
  /**
   * Handle login request.
   *
   * @param {object} req Request.
   * @param {object} res Response.
   * @param {Function} next Next.
   */
  async login (req, res, next) {
    try {
      // Authenticate user.
      const user = await UserModel.authenticate(req.body.email, req.body.password)

      // Create a JWT.
      const data = { id: user.id }
      const accessToken = jwt.sign(data, privateKey, {
        algorithm: 'RS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })

      res.status(200)
      res.json({ access_token: accessToken })
    } catch (error) {
      let err = error
      if (error.code === 401) {
        err = createError(401)
      }
      next(err)
    }
  }

  /**
   * Registers a user.
   *
   * @param {object} req Request.
   * @param {object} res Response.
   * @param {Function} next Next.
   */
  async register (req, res, next) {
    try {
      const user = await new UserModel({
        email: req.body.email,
        password: req.body.password
      }).save()
      res.status(201)
      res.json({ id: user.id })
    } catch (error) {
      let err = error
      // Error handler.
      if (err.code === 11000) {
        // Duplicated keys.
        err = createError(409)
      } else if (error.name === 'ValidationError') {
        err = createError(400)
      }
      next(err)
    }
  }
}
