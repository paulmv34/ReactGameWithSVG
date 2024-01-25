import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { State } from '@/features/leaderboard/types'
import LeaderboardService from '@/services/leaderboard.service'
import { LeaderboardNewRecord, LeaderboardResponseItem, LeaderboardTeamData } from '@/types/types'

const initialState: State = {
  records: [],
}

export const addUser = createAsyncThunk('leaderboard/addUser', async (payload: LeaderboardNewRecord): Promise<void> => {
  try {
    return await LeaderboardService.addUser(payload)
  } catch (error) {
    console.error('Cannot add user')
    throw error
  }
})

export const fetchByTeam = createAsyncThunk(
  'leaderboard/fetchByTeam',
  async ({ payload, teamName }: LeaderboardTeamData): Promise<LeaderboardResponseItem[]> => {
    try {
      return await LeaderboardService.fetchTeamLeaderboard(payload, teamName)
    } catch (error) {
      console.error('Cannot add user')
      throw error
    }
  }
)

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
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
        state.records = payload
      })
      .addCase(fetchByTeam.rejected, () => {
        console.log('Error')
      })
  },
})

export default leaderboardSlice.reducer
