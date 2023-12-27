import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserState } from '@/features/user/types'
import authAPI from '@/api/Auth/AuthAPI'
import { AxiosError } from 'axios'

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  error: null,
}

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  try {
    const { data: user } = await authAPI.getUser()
    return user
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.status
    }
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.user = payload!
        state.isLoggedIn = true
      })
      .addCase(fetchUser.rejected, (state, { error }) => {
        state.isLoggedIn = false
        state.error = error
      })
  },
})

export default userSlice.reducer
