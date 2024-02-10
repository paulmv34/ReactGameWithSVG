import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { State } from '@/features/forum/types'
import { forumApi } from '@/api/forumApi'
import { getErrorMessage } from '@/utils/getErrorMessage'

const initialState: State = {
  isLoading: false,
  error: null,
  sections: [
    {
      id: 1,
      name: 'Игра',
      created_at: '2024-02-10T11:13:10.888Z',
      updated_at: '2024-02-10T11:13:10.888Z',
      topicCount: 0,
      messages: 0,
    },
    {
      id: 2,
      name: 'Обратная связь',
      created_at: '2024-02-10T11:13:10.888Z',
      updated_at: '2024-02-10T11:13:10.888Z',
      topicCount: 0,
      messages: 0,
    },
    {
      id: 3,
      name: 'Как попасть в топ???',
      created_at: '2024-02-10T11:13:10.888Z',
      updated_at: '2024-02-10T11:13:10.888Z',
      topicCount: 0,
      messages: 0,
    },
    {
      id: 4,
      name: 'Механики игры',
      created_at: '2024-02-10T11:13:10.888Z',
      updated_at: '2024-02-10T11:13:10.888Z',
      topicCount: 0,
      messages: 0,
    },
  ],
}

export const getSections = createAsyncThunk('forum/getSections', async (_, { rejectWithValue }) => {
  try {
    return await forumApi.getSections()
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error))
  }
})

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getSections.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.sections = payload.data
    })
  },
})

export default forumSlice.reducer
