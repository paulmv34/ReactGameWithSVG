import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserState } from '@/features/user/types'
import authAPI from '@/api/Auth/AuthAPI'
import { ErrorObject } from '@/types/types'
import { getErrorMessage } from '@/utils/getErrorMessage'

const initialState: UserState = {
  user: null,
  isLoggedIn: null,
  error: null,
}

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const { data: user } = await authAPI.getUser()
    return user
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error))
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.error = null
        state.isLoggedIn = null
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.user = payload
        state.isLoggedIn = true
      })
      .addCase(fetchUser.rejected, (state, { payload }) => {
        state.isLoggedIn = false
        state.user = null
        state.error = payload as ErrorObject
      })
  },
})

export default userSlice.reducer
