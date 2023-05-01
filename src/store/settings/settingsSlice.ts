
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Lang, defaultLang } from '@/units/lang'

interface SettingsState {
  lang: Lang,
}

const defaultSettingsState = {
  lang: defaultLang,
}

export const settingsSlice = createSlice({
  name: 'settingsState',

  initialState: defaultSettingsState,

  reducers: {
    setLang: (state, action: PayloadAction<Lang>) => {
      state.lang = action.payload;
    },
  },
});

export const { setLang } = settingsSlice.actions;

