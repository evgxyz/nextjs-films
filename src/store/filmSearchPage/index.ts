
import { combineReducers } from 'redux';
import { filmSearchSlice } from './filmSearchSlice';

export const filmSearchPageReducer = combineReducers({
  [filmSearchSlice.name]: filmSearchSlice.reducer,
}); 

export * from './filmSearchSlice'
