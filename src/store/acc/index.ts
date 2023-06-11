
import {combineReducers} from "@reduxjs/toolkit";

export * from './accReg/accRegSlice';

import {accRegReducer} from './accReg/accRegSlice';

export const accReducer = combineReducers({
  accReg: accRegReducer
});
