import express from 'express'
import createError from 'http-errors'

import { AuthController } from '../../../controllers/auth-controller.js'

export const router = express.Router()

const controller = new AuthController()

router.get('/', (req, res, next) => controller.hello(req, res, next))

router.use('*', (req, res, next) => next(createError(404)))
