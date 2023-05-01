
import { combineReducers } from 'redux';
import { settingsSlice } from './settingsSlice';

export const settingsReducer = settingsSlice.reducer;

export * from './settingsSlice';
