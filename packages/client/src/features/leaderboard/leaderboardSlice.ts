import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { State } from '@/features/leaderboard/types'
import LeaderboardService from '@/services/leaderboard.service'
import { ErrorObject, LeaderboardNewRecord, LeaderboardTeamData } from '@/types/types'
import { getErrorMessage } from '@/utils/getErrorMessage'

const initialState: State = {
  records: [],
  isLoading: true,
  error: null,
}

export const addUser = createAsyncThunk(
  'leaderboard/addUser',
  async (payload: LeaderboardNewRecord, { rejectWithValue }) => {
    try {
      return await LeaderboardService.addUser(payload)
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const fetchByTeam = createAsyncThunk(
  'leaderboard/fetchByTeam',
  async ({ payload, teamName }: LeaderboardTeamData, { rejectWithValue }) => {
    try {
      return await LeaderboardService.fetchTeamLeaderboard(payload, teamName)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addUser.rejected, (state, { payload }) => {
        state.error = payload as ErrorObject
      })
      .addCase(fetchByTeam.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.records = payload
      })
      .addCase(fetchByTeam.rejected, (state, { payload }) => {
        state.error = payload as ErrorObject
      })
  },
})

export default leaderboardSlice.reducer
