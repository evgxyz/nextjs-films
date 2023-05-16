
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Lang, isLang, langDefault} from '@/units/lang';
import cookie from 'js-cookie';

interface Settings {
  cookies: Record<string, string>,
  lang: Lang,
}

const settingsDefault: Settings = {
  cookies: {},
  lang: langDefault,
}

export const settingsSlice = createSlice({
  name: 'settings',

  initialState: structuredClone(settingsDefault),

  reducers: {
    setSettingsFromCookies: (state, action: PayloadAction<Record<string, string>>) => {
      const {lang} = action.payload;
      if (lang && isLang(lang)) {
        state.lang = lang as Lang;
      }
    },

    setLang: (state, action: PayloadAction<Lang>) => {
      state.lang = action.payload;
      cookie.set('lang', state.lang);
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

export const { 
  setSettingsFromCookies, 
  setLang 
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;


