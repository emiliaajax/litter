import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice.js'
import litsReducer from '../features/lits/litsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lits: litsReducer
  }
})