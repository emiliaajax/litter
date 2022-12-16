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

router.get('/:id/followings', (req, res, next) => controller.getAllUserFollowings(req, res, next))
router.post('/:id/followings', (req, res, next) => controller.createFollowing(req, res, next))
router.delete('/:id/followings', (req, res, next) => controller.removeFollowing(req, res, next))


router.use('*', (req, res, next) => next(createError(404)))
