/**
 * Api v1 router.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'

import { router as litsRouter } from './lits-router.js'
import { router as authRouter } from './auth-router.js'
import { router as userRouter } from './user-router.js'

export const router = express.Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/lits', litsRouter)

router.get('/', (req, res) => res.json({
  message: 'Welcome to version 1 of litter-service!'
}))

router.use('*', (req, res, next) => next(createError(404)))
