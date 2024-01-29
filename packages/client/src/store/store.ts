import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userReducer from '@/features/user/userSlice'
import leaderboardReducer from '@/features/leaderboard/leaderboardSlice'

export const store = configureStore({
  reducer: combineReducers({
    user: userReducer,
    leaderboard: leaderboardReducer,
  }),
  preloadedState: window.__PRELOADED_STATE__,
})

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
