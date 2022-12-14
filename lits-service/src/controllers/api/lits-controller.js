import { Lit } from '../../models/lit.js'

/**
 * Encapsulates a controller.
 */
export class LitsController {
  /**
   * Provides req.profile to the routes if id is present.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next middleware function.
   * @param {string} id The value of the id.
   */
  async loadLits (req, res, next, id) {
    try {
      const lits = await Lit.find({ authorId: id })

      req.lits = lits

      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing the hundred latest lits.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next middleware function.
   */
  async findLatestLits (req, res, next) {
    try {
      const lits = await Lit.find().limit(100)

      res
        .status(200)
        .json(lits)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing all lits by id.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next middleware function.
   */
  async findLitsById (req, res, next) {
    res
      .status(200)
      .json(req.lits)
  }

  /**
   * Creates a lit.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next middleware function.
   */
  async createLit (req, res, next) {
    try {
      const lit = new Lit(req.body)

      await lit.save()

      const location = new URL(
        `${req.protocol}://${req.get('host')}${req.baseUrl}/${lit._id}`
      )

      res
        .location(location.href)
        .status(201)
        .json({
          id: lit.id
        })
    } catch (error) {
      next(error)
    }
  }
}
