import express from 'express'

export const router = express.Router()

router.get('/', (req, res) => res.json({
  message: 'Welcome to version 1 of lits-service!'
}))
