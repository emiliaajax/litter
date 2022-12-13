import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import litsService from './litsService'

export const initialState = {
  isError: false,
  isSuccess: false,
  message: ''
}

export const getHundredLatestLits = createAsyncThunk('lits/latest', async (thunkAPI) => {
  try {
    return await litsService.getHundredLatestLits()
  } catch (error) {
    const message = error.response.data.message || (error.response && error.response.data && error.response.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getLitsById = createAsyncThunk('lits/id', async (thunkAPI, id) => {
  try {
    return await litsService.getLitsById(id)
  } catch (error) {
    const message = error.response.data.message || (error.response && error.response.data && error.response.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const postLit = createAsyncThunk('lits/create', async (thunkAPI, litData) => {
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
      .addCase(getLitsById.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isError = false
        state.lits = action.payload
        state.isPending = false
      })
      .addCase(getLitsById.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isSuccess = false
        state.lits = null
        state.isPending = false
      })
      .addCase(getLitsById.pending, (state) => {
        state.isPending = true
      })
      .addCase(postLit.fulfilled, (state) => {
        state.isSuccess = true
        state.isError = false
        state.isPending = false
      })
      .addCase(postLit.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
        state.isSuccess = false
        state.isPending = false
      })
  }
})

export const { reset } = litsSlice.actions
export default litsSlice.reducer