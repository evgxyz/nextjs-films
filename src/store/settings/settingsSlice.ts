
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Lang, isLang} from '@/units/lang';
import {settingsDefault} from '@/units/settings';
import cookie from 'js-cookie';

export const settingsSlice = createSlice({
  name: 'settings',

  initialState: structuredClone(settingsDefault),

  reducers: {
    setSettingsFromCookies: (state, action: PayloadAction<Record<string, string>>) => {
      const {lang} = action.payload;
      if (isLang(lang)) {
        state.lang = lang as Lang;
        cookie.set('lang', lang, {expires: 30, secure: true});
      }
    },

    setLang: (state, action: PayloadAction<Lang>) => {
      const lang = action.payload;
      state.lang = lang;
      cookie.set('lang', lang, {expires: 30, secure: true});
    },
  },
});

export const { 
  setSettingsFromCookies, 
  setLang 
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
