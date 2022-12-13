import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem('user'))

export const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  message: ''
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    const message = error.response.data.message || (error.response && error.response.data && error.response.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message = error.response.data.message || (error.response && error.response.data && error.response.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  return await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isSuccess = false
      state.message = ''
      state.updated = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.isSuccess = true
        state.user = null
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer