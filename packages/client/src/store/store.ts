import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userReducer from '@/features/user/userSlice'
import leaderboardReducer from '@/features/leaderboard/leaderboardSlice'

export const store = configureStore({
  reducer: combineReducers({
    user: userReducer,
    leaderboard: leaderboardReducer,
  }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
