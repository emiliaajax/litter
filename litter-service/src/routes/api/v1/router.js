import express from 'express'
import createError from 'http-errors'

import { router as litsRouter } from './lits-router.js'
import { router as authRouter } from './auth-router.js'

export const router = express.Router()

router.use('/auth', authRouter)
router.use('/lits', litsRouter)

router.get('/', (req, res) => res.json({
  message: 'Welcome to version 1 of litter-service!'
}))

router.use('*', (req, res, next) => next(createError(404)))