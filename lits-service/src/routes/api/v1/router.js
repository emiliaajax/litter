import express from 'express'
import { router as litsRouter } from './lits-routes.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({
  message: 'Welcome to version 1 of this API!'
}))

router.use('/lits', litsRouter)
