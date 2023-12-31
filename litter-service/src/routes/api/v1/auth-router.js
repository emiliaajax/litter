/**
 * Auth router.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'

import { AuthController } from '../../../controllers/auth-controller.js'

export const router = express.Router()

const controller = new AuthController()

router.post('/login', (req, res, next) => controller.login(req, res, next))
router.post('/register', (req, res, next) => controller.register(req, res, next))

router.use('*', (req, res, next) => next(createError(404)))
