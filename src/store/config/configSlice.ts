
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Lang, defaultLang } from '@/units/lang'

interface ConfigState {
  lang: Lang,
}

const defaultConfigState = {
  lang: defaultLang,
}

export const configSlice = createSlice({
  name: 'configState',

  initialState: defaultConfigState,

  reducers: {
    setLang: (state, action: PayloadAction<Lang>) => {
      state.lang = action.payload;
    },
  },
});

export const { setLang } = configSlice.actions;

