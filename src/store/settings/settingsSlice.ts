
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Lang, langDefault } from '@/units/locale';

interface Settings {
  lang: Lang,
}

const settingsDefault: Settings = {
  lang: langDefault,
}

export const settingsSlice = createSlice({
  name: 'settings',

  initialState: settingsDefault,

  reducers: {
    setSettings: (state, action: PayloadAction<Settings>) => {
      state = action.payload;
    },

    setLang: (state, action: PayloadAction<Lang>) => {
      state.lang = action.payload;
    },
  },

  /* extraReducers: builder => {
    builder
      .addCase(
        initSettingsAsync.fulfilled, 
        (state, action) => {
         
        }
      )
  } */
});

/* export const initSettingsAsync = 
  createAsyncThunk(
    'settings/initSettingsAsync',
    async function () {
    }
)

function saveSettings(settings: Settings) {
  localStorage.setItem('settings', JSON.stringify(settings));
} */

export const { setLang } = settingsSlice.actions;


