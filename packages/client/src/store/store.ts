import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userReducer from '@/features/user/userSlice'

export const store = configureStore({
  reducer: combineReducers({
    user: userReducer,
  }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
