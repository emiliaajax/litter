/**
 * User router.
 *
 * @author Oliwer Ellréus <oe222ez@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'

import { UserController } from '../../../controllers/user-controller.js'

export const router = express.Router()

const controller = new UserController()

// router.post('/login', (req, res, next) => controller.login(req, res, next))
// router.post('/register', (req, res, next) => controller.register(req, res, next))

router.use('*', (req, res, next) => next(createError(404)))
