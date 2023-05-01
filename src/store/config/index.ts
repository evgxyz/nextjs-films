
import { combineReducers } from 'redux';
import { configSlice } from './configSlice';

export const configReducer = configSlice.reducer;

export * from './configSlice';
