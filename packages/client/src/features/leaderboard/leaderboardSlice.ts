import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { State } from '@/features/leaderboard/types'
import LeaderboardService from '@/services/leaderboard.service'
import { LeaderboardData, LeaderboardNewRecord, LeaderboardTeamData } from '@/types/types'

const initialState: State = {
  data: [],
}

export const fetchAll = createAsyncThunk('leaderboard/fetchLeaderboard', async (payload: LeaderboardData) => {
  try {
    return await LeaderboardService.fetchAllData(payload)
  } catch (error) {
    console.log(error)
  }
})

export const addUser = createAsyncThunk('leaderboard/addUser', async (payload: LeaderboardNewRecord) => {
  try {
    return await LeaderboardService.addUser(payload)
  } catch (error) {
    console.log(error)
  }
})

export const fetchByTeam = createAsyncThunk(
  'leaderboard/fetchByTeam',
  async ({ payload, teamName }: LeaderboardTeamData) => {
    return await LeaderboardService.fetchTeamLeaderboard(payload, teamName)
  }
)

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAll.pending, () => {
        console.log('Pending...')
      })
      .addCase(fetchAll.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.data = payload
      })
      .addCase(fetchAll.rejected, () => {
        console.log('Error')
      })
      .addCase(addUser.pending, () => {
        console.log('Pending...')
      })
      .addCase(addUser.fulfilled, (state, { payload }) => {
        console.log(payload)
      })
      .addCase(addUser.rejected, () => {
        console.log('Error')
      })
      .addCase(fetchByTeam.pending, () => {
        console.log('Pending...')
      })
      .addCase(fetchByTeam.fulfilled, (state, { payload }) => {
        state.data = payload
      })
      .addCase(fetchByTeam.rejected, () => {
        console.log('Error')
      })
  },
})

export default leaderboardSlice.reducer
