import createError from 'http-errors'
import UserModel from '../models/user.js'

/**
 * Following controller.
 */
export class FollowingController {
  /**
   * Update specified users followings.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware.
   */
  async create (req, res, next) {
    try {
      // Cannot change another users followings or follow yourself.
      if (req.user.id !== req.params.id) return next(createError(403))
      if (req.user.id === req.body.id) return next(createError(400))

      const user = await UserModel.findOne({ _id: req.user.id }).where('followings').nin(req.body.id)
      if (!user) return next(createError(409))
      const followUser = await UserModel.findOne({ _id: req.body.id })
      if (!followUser) return next(createError(404))
      user.followings.push(followUser.id)
      await user.save()
      res.status(200).json({ id: followUser.id })
    } catch (error) {
      let err = error
      if (err?.kind === 'ObjectId') {
        err = createError(404)
      }
      next(err)
    }
  }

  /**
   * Find and return all followings for a specific user.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware.
   */
  async findAll (req, res, next) {
    try {
      const user = await UserModel.findOne({ _id: req.params.id })
      if (!user) return next(createError(404))
      const followings = user.followings
      res.status(200).json({ followings })
    } catch (error) {
      let err = error
      if (err?.kind === 'ObjectId') {
        err = createError(404)
      }
      next(err)
    }
  }

  /**
   * Removes a following from a user.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware.
   */
  async remove (req, res, next) {
    try {
      // Cannot change another users followings.
      if (req.user.id !== req.params.id) return next(createError(403))

      const user = await UserModel.findOne({ _id: req.user.id }).where('followings').in(req.body.id)
      if (!user) return next(createError(404))
      await user.followings.remove(req.body.id)
      await user.save()
      res.status(200).json({ id: user.id })
    } catch (error) {
      let err = error
      if (err?.kind === 'ObjectId') {
        err = createError(404)
      }
      next(err)
    }
  }
}
