import express from 'express'
import { router as userRouter } from './user-router.js'
import { router as accountRouter } from './account-router.js'
import { router as followingRouter } from './following-router.js'

export const router = express.Router()

router.use('/auth', accountRouter)

router.use('/users/:id/followings', followingRouter)

router.use('/users', userRouter)
