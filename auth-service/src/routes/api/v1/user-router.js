import express from 'express'
import { UserController } from '../../../controllers/user-controller.js'

export const router = express.Router()

const controller = new UserController()

router.get('/:id', (req, res, next) => controller.find(req, res, next))

router.get('/', (req, res, next) => controller.findAll(req, res, next))
