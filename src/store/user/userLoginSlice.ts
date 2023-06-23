
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '@/store';
import {ReqStatus, isReqStatusOK} from '@/units/status';
import {
  UserLoginInfo, 
  UserLoginResult, 
  userLoginResultDefault, 
  userLoginStateDefault
} from '@/units/user';
import {apiQueryUserLogin} from '@/api/userApi';
import cookie from 'js-cookie';

export const userLoginSlice = createSlice({
  name: 'userLogin',

  initialState: structuredClone(userLoginStateDefault),

  reducers: {
    updateUserLoginResult: (state, action: PayloadAction<Partial<UserLoginResult>>) => {
      state.userLoginResult = Object.assign(state.userLoginResult, action.payload);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(
        queryUserLogin.pending, 
        (state) => {
          state.userLoginResult = {
            ...structuredClone(userLoginResultDefault),
            reqStatus: ReqStatus.LOADING
          }
        }
      )
      .addCase(
        queryUserLogin.fulfilled, 
        (state, action) => {
          state.userLoginResult = {
            ...action.payload,
            reqStatus: ReqStatus.OK
          }
        }
      )
      .addCase(
        queryUserLogin.rejected, 
        (state, action) => {
          state.userLoginResult.reqStatus = action.payload ?? ReqStatus.ERROR;
        }
      )
  }
});

export const queryUserLogin = 
  createAsyncThunk<
    UserLoginResult, 
    UserLoginInfo, 
    {state: RootState, rejectValue: ReqStatus}
  >(
    'user/userLogin',
    async function (userLoginInfo, ThunkAPI) {
      const {userLoginResult, reqStatus} = await apiQueryUserLogin(userLoginInfo);
      if (isReqStatusOK(reqStatus) && userLoginResult) {
        return ThunkAPI.fulfillWithValue(userLoginResult)
      } else {
        return ThunkAPI.rejectWithValue(reqStatus)
      } 
    }
);

export const {
  updateUserLoginResult
} = userLoginSlice.actions;

export const userLoginReducer = userLoginSlice.reducer;
