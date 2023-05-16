
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PageTitle, NavStack} from '@/units/page';
import {appName} from '@/config';

interface PageEnv {
  title?: PageTitle,
  navStack?: NavStack,
  description?: string,
  keywords?: string,
}

const pageEnvDefault: PageEnv = {
  title: appName,
  navStack: [],
  description: '',
  keywords: '',
}

export const pageEnvSlice = createSlice({
  name: 'pageEnv',

  initialState: structuredClone(pageEnvDefault),

  reducers: {
    setPageEnv: (state, action: PayloadAction<PageEnv>) => {
      const pageEnv = Object.assign(structuredClone(pageEnvDefault), action.payload);
      pageEnv.title = pageEnv.title !== '' ? `${pageEnv.title} | ${appName}` : appName;
      state = pageEnv;
    },

    updatePageEnv: (state, action: PayloadAction<PageEnv>) => {
      state = Object.assign(state, action.payload);
    },

    setPageTitle: (state, action: PayloadAction<PageTitle | undefined>) => {
      let title = action.payload ?? '';
      state.title = title !== '' ? `${title} | ${appName}` : appName;
    },
  }
});

export const { 
  setPageEnv,
  updatePageEnv
} = pageEnvSlice.actions;

export const pageEnvReducer = pageEnvSlice.reducer;


