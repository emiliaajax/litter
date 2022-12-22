import express from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { LitsController } from '../../../controllers/api/lits-controller.js'

export const router = express.Router()

const controller = new LitsController()

/**
 * Authenticates the request.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {Function} next Express next middleware function.
 */
const authenticateJWT = (req, res, next) => {
  try {
    const [authenticationScheme, token] = req.headers.authorization?.split(' ')

    if (authenticationScheme !== 'Bearer') {
      throw new Error('Invalid authentication scheme')
    }
    
    const payload = jwt.verify(token, Buffer.from(process.env.JWT_PUBLIC_KEY || '', 'base64').toString('utf-8'), { algorithm: 'RS256' })

    req.user = {
      id: payload.id
    }

    next()
  } catch (error) {
    const err = createError(401)
    err.message = 'Access token invalid or not provided.'
    err.cause = error
    next(err)
  }
}

// Routes
router.param('id', (req, res, next, id) => controller.loadLits(req, res, next, id))

router.get('/',
  // authenticateJWT,
  (req, res, next) => controller.findLatestLits(req, res, next)
)

router.post('/',
  authenticateJWT,
  (req, res, next) => controller.createLit(req, res, next)
)

router.get('/:id',
  // authenticateJWT,
  (req, res, next) => controller.findLitsById(req, res, next)
)
