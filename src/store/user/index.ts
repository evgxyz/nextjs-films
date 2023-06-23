
import {combineReducers} from '@reduxjs/toolkit';

export * from './userRegSlice';
import {userRegReducer} from './userRegSlice';

export * from './userLoginSlice';
import {userLoginReducer} from './userLoginSlice';

export const userReducer = combineReducers({
  userReg: userRegReducer,
  userLogin: userLoginReducer
});
