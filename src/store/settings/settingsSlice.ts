
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Lang, langDefault } from '@/units/lang'

interface SettingsState {
  lang: Lang,
}

const settingsStateDefault = {
  lang: langDefault,
}

export const settingsSlice = createSlice({
  name: 'settingsState',

  initialState: settingsStateDefault,

  reducers: {
    setLang: (state, action: PayloadAction<Lang>) => {
      state.lang = action.payload;
    },
  },
});

export const { setLang } = settingsSlice.actions;

