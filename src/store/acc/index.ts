
import {combineReducers} from '@reduxjs/toolkit';

export * from './accRegSlice';
import {accRegReducer} from './accRegSlice';

export * from './accLoginSlice';
import {accLoginReducer} from './accLoginSlice';

export const accReducer = combineReducers({
  accReg: accRegReducer,
  accLogin: accLoginReducer
});
