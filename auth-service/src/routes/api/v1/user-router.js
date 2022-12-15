import express from 'express'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { FollowingController } from '../../../controllers/following-controller.js'

export const router = express.Router()

const controller = new FollowingController()
const publicKey = Buffer.from(process.env.JWT_PUBLIC_KEY || '', 'base64').toString('utf-8')

/**
 * Verifies the bearer token JWT.
 *
 * @param {object} req The request object.
 * @param {object} res The response object.
 * @param {Function} next The next middleware.
 */
function authenticateJWT (req, res, next) {
  if (!req.headers.authorization) return next(createError(401))
  const [type, token] = req.headers.authorization?.split(' ')
  if (!type || type !== 'Bearer') return next(createError(401))

  try {
    const payload = jwt.verify(token, publicKey, { algorithm: 'RS256' })
    req.user = { id: payload.id }
  } catch (err) {
    console.log(err)
    return next(createError(403))
  }

  next()
}

router.post('/:id/followings',
  authenticateJWT,
  (req, res, next) => controller.create(req, res, next)
)

router.delete('/:id/followings',
  authenticateJWT,
  (req, res, next) => controller.remove(req, res, next)
)

router.get('/:id/followings', (req, res, next) => controller.findAll(req, res, next))
