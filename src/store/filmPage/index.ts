
import { combineReducers } from 'redux'
import { filmReducer } from './filmSlice'

export const filmPageReducer = combineReducers({
  film: filmReducer,
});

export * from './filmSlice'
