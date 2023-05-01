
import { combineReducers } from 'redux'
import { filmSlice } from './filmSlice'

export const filmPageReducer = combineReducers({
  [filmSlice.name]: filmSlice.reducer,
});

export * from './filmSlice'
