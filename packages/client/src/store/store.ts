import { combineReducers, configureStore } from '@reduxjs/toolkit'

import themeReducer from '@/features/theme/themeSlice'
import userReducer from '@/features/user/userSlice'
import leaderboardReducer from '@/features/leaderboard/leaderboardSlice'

const isClient = typeof window !== 'undefined'

export const store = configureStore({
  reducer: combineReducers({
    theme: themeReducer,
    user: userReducer,
    leaderboard: leaderboardReducer,
  }),
  preloadedState: isClient ? window.__PRELOADED_STATE__ : {},
})

if (isClient) delete window.__PRELOADED_STATE__

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
