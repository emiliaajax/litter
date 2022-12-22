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

export const getUser = createAsyncThunk('auth/user', async (id, thunkAPI) => {
  try {
    return await authService.getUser(id)
  } catch (error) {
    const message = error.response.data.message || (error.response && error.response.data && error.response.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getFollowings = createAsyncThunk('auth/followings', async (thunkAPI) => {
  try {
    return await authService.getFollowings()
  } catch (error) {
    const message = error.response.data.message || (error.response && error.response.data && error.response.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const follow = createAsyncThunk('auth/follow', async (id, thunkAPI) => {
  try {
    return await authService.follow(id)
  } catch (error) {
    const message = error.response.data.message || (error.response && error.response.data && error.response.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const unfollow = createAsyncThunk('auth/unfollow', async (id, thunkAPI) => {
  try {
    return await authService.unfollow(id)
  } catch (error) {
    const message = error.response.data.message || (error.response && error.response.data && error.response.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isSuccess = false
      state.message = ''
      state.isPending = false
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
      .addCase(getUser.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isError = false
        state.member = action.payload.user
        state.isPending = false
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.payload.user
        state.member = null
        state.isPending = false
      })
      .addCase(getFollowings.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isError = false
        state.followings = action.payload
        state.isPending = false
      })
      .addCase(getFollowings.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
        state.followings = null
        state.isPending = false
      })
      .addCase(getFollowings.pending, (state, action) => {
        state.isPending = true
      })
      .addCase(follow.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isError = false
        state.isPending = false
      })
      .addCase(follow.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
        state.isPending = false
      })
      .addCase(unfollow.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isError = false
        state.isPending = false
      })
      .addCase(unfollow.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
        state.isPending = false
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer