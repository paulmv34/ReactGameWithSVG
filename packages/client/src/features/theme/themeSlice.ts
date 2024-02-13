import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { State } from '@/features/theme/types'
import { ErrorObject, Themes, ThemesPayload } from '@/types/types'
import { getErrorMessage } from '@/utils/getErrorMessage'
import ThemeService from '@/services/theme.service'

export const setTheme = createAsyncThunk('theme/setTheme', async (payload: ThemesPayload, { rejectWithValue }) => {
  try {
    const result = await ThemeService.setTheme(payload.theme)
    localStorage.setItem('theme', result)
    return { theme: result }
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error))
  }
})

export const fetchTheme = createAsyncThunk('theme/fetchTheme', async (_, { rejectWithValue }) => {
  try {
    const result = await ThemeService.getTheme()
    localStorage.setItem('theme', result)
    return { theme: result }
  } catch (error) {
    return rejectWithValue(getErrorMessage(error))
  }
})

const defaultTheme = 'system'

const initialState: State = {
  theme: defaultTheme,
  isLoading: true,
  error: null,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeLocal: (state, action) => {
      localStorage.setItem('theme', action.payload.theme)
      state.theme = action.payload.theme
    },
    getThemeLocal: (state) => {
      state.theme = (localStorage.getItem('theme') as Themes) ?? defaultTheme
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setTheme.rejected, (state, { payload }) => {
        state.error = payload as ErrorObject
      })
      .addCase(setTheme.fulfilled, (state, { payload }) => {
        state.theme = payload.theme as Themes
      })
      .addCase(fetchTheme.rejected, (state, { payload }) => {
        state.error = payload as ErrorObject
      })
      .addCase(fetchTheme.fulfilled, (state, { payload }) => {
        state.theme = payload.theme as Themes
      })
  },
})

export const { getThemeLocal, setThemeLocal } = themeSlice.actions

export default themeSlice.reducer
