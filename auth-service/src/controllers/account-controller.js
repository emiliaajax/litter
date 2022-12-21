import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import UserModel from '../models/user.js'

const privateKey = Buffer.from(process.env.JWT_PRIVATE_KEY || '', 'base64').toString('utf-8')

/**
 * Account controller.
 */
export class AccountController {
  /**
   * Handles a login request by authenticating the user and generating an access token.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware.
   */
  async login (req, res, next) {
    try {
      const user = await UserModel.authenticate(req.body.email, req.body.password)
      const accessToken = jwt.sign({ id: user.id }, privateKey, {
        algorithm: 'RS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })
      res.status(200).json({ access_token: accessToken })
    } catch (error) {
      next(error.code === 401 ? createError(401) : error)
    }
  }

  /**
   * Registers a user with the given email and password.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware.
   */
  async register (req, res, next) {
    try {
      const user = await new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }).save()
      res.status(201).json({ id: user.id })
    } catch (error) {
      let err = error
      if (err.code === 11000) {
        err = createError(409)
      } else if (error.name === 'ValidationError') {
        err = createError(400)
      }
      next(err)
    }
  }
}
