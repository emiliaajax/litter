import express from 'express'
import createError from 'http-errors'

import { LitsController } from '../../../controllers/lits-controller.js'

export const router = express.Router()

const controller = new LitsController()

router.get('/', (req, res, next) => controller.getLatestLits(req, res, next))
router.get('/:id', (req, res, next) => controller.getLitById(req, res, next))

router.post('/',/* auth, */ (req, res, next) => controller.createLit(req, res, next)) // auth!

router.use('*', (req, res, next) => next(createError(404)))
