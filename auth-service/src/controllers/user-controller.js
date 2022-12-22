import createError from 'http-errors'
import UserModel from '../models/user.js'

/**
 * User controller.
 */
export class UserController {
  #transformUserDetailed (user) {
    return {
      username: user.username,
      email: user.email,
      id: user.id
    }
  }

  #transformUserCompact (user) {
    return {
      username: user.username,
      id: user.id
    }
  }

  /**
   * Finds a specific user.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware.
   */
  async find (req, res, next) {
    try {
      const user = this.#transformUserDetailed(await UserModel.findById(req.params.id))
      if (!user) return next(createError(404))
      res.status(200).json({ user })
    } catch (error) {
      let err = error
      if (err?.kind === 'ObjectId') {
        err = createError(404)
      }
      next(err)
    }
  }

  /**
   * Finds many users.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware.
   */
  async findAll (req, res, next) {
    try {
      const limit = 10
      const page = parseInt(req.query.page) || 1
      const skip = (page - 1) * limit
      const users = (await UserModel.find({}).skip(skip).limit(limit)).map(this.#transformUserCompact)
      res.status(200).json({ users })
    } catch (error) {
      next(error)
    }
  }
}
