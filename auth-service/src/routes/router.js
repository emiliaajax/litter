import express from 'express'
import createError from 'http-errors'
import { router as v1Router } from './api/v1/router.js'

export const router = express.Router()

router.use('/api/v1', v1Router)

// Default api route.
router.use('/api', v1Router)

// 404 routes.
router.use('*', (req, res, next) => next(createError(404)))
