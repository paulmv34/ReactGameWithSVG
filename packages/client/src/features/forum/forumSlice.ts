import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { State } from '@/features/forum/types'
import { forumApi } from '@/api/forumApi'
import { getErrorMessage } from '@/utils/getErrorMessage'

const initialState: State = {
  sectionData: {
    isLoading: true,
    error: null,
    sections: [],
    selectedSection: null,
  },
}

export const getSections = createAsyncThunk('forum/getSections', async (_, { rejectWithValue }) => {
  try {
    const { data } = await forumApi.getSections()
    return data
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error))
  }
})

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    handleSelectionAction: (state, { payload }: PayloadAction<number>) => {
      const targetSelected = state.sectionData.sections.find((section) => section.id === payload) || null
      state.sectionData.selectedSection = targetSelected
    },
  },
  extraReducers(builder) {
    builder.addCase(getSections.fulfilled, (state, { payload }) => {
      state.sectionData.isLoading = false
      state.sectionData.sections = payload
    })
  },
})

export default forumSlice.reducer
export const { handleSelectionAction } = forumSlice.actions
