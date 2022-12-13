import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../feature/auth/authSlice.js'
import litsReducer from '../feature/lits/litsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lits: litsReducer
  }
})