import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import litsService from './litsService.js'

export const initialState = {
  isError: false,
  isSuccess: false,
  message: '',
  isPending: false
}

export const getHundredLatestLits = createAsyncThunk('lits/latest', async (thunkAPI) => {
  try {
    return await litsService.getHundredLatestLits()
  } catch (error) {
    const message = error.response.data.message || (error.response && error.response.data && error.response.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getUserLits = createAsyncThunk('lits/id', async (id, thunkAPI) => {
  try {
    return await litsService.getUserLits(id)
  } catch (error) {
    const message = error.response.data.message || (error.response && error.response.data && error.response.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getAllLitsForLitterBox = createAsyncThunk('lits/all', async (thunkAPI) => {
  try {
    return await litsService.getAllLitsForLitterBox()
  } catch (error) {
    const message = error.response.data.message || (error.response && error.response.data && error.response.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const postLit = createAsyncThunk('lits/create', async (litData, thunkAPI) => {
  try {
    return await litsService.postLit(litData)
  } catch (error) {
    const message = error.response.data.message || (error.response && error.response.data && error.response.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const litsSlice = createSlice({
  name: 'lits',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isSuccess = false
      state.message = ''
      state.isPending = false
      state.isPosted = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHundredLatestLits.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isError = false
        state.lits = action.payload
        state.isPending = false
      })
      .addCase(getHundredLatestLits.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isSuccess = false
        state.isPending = false
      })
      .addCase(getHundredLatestLits.pending, (state) => {
        state.isPending = true
      })
      .addCase(getUserLits.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isError = false
        state.lits = action.payload
        state.isPending = false
      })
      .addCase(getUserLits.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isSuccess = false
        state.lits = null
        state.isPending = false
      })
      .addCase(getUserLits.pending, (state) => {
        state.isPending = true
      })
      .addCase(getAllLitsForLitterBox.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isError = false
        state.lits = action.payload
        state.isPending = false
      })
      .addCase(getAllLitsForLitterBox.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
        state.lits = null
        state.isPending = false
      })
      .addCase(getAllLitsForLitterBox.pending, (state, action) => {
        state.isPending = true
      })
      .addCase(postLit.fulfilled, (state) => {
        state.isSuccess = true
        state.isError = false
        state.isPending = false
        state.isPosted = true
      })
      .addCase(postLit.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isSuccess = false
        state.isPending = false
        state.isPosted = false
      })
  }
})

export const { reset } = litsSlice.actions
export default litsSlice.reducer
