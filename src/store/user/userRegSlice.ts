
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '@/store';
import {ReqStatus, isReqStatusOK} from '@/units/status';
import {
  UserRegInfo, 
  UserRegResult, 
  userRegResultDefault, 
  userRegStateDefault
} from '@/units/user';
import {apiQueryUserReg} from '@/api/userApi';
import cookie from 'js-cookie';

export const userRegSlice = createSlice({
  name: 'userReg',

  initialState: structuredClone(userRegStateDefault),

  reducers: {
    updateUserRegResult: (state, action: PayloadAction<Partial<UserRegResult>>) => {
      state.userRegResult = Object.assign(state.userRegResult, action.payload);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(
        queryUserReg.pending, 
        (state) => {
          state.userRegResult = {
            ...structuredClone(userRegResultDefault),
            reqStatus: ReqStatus.LOADING
          }
        }
      )
      .addCase(
        queryUserReg.fulfilled, 
        (state, action) => {
          state.userRegResult = {
            ...action.payload,
            reqStatus: ReqStatus.OK
          }
        }
      )
      .addCase(
        queryUserReg.rejected, 
        (state, action) => {
          state.userRegResult.reqStatus = action.payload ?? ReqStatus.ERROR;
        }
      )
  }
});

export const queryUserReg = 
  createAsyncThunk<
    UserRegResult, 
    UserRegInfo, 
    {state: RootState, rejectValue: ReqStatus}
  >(
    'user/userReg',
    async function (userRegInfo, ThunkAPI) {
      const {userRegResult, reqStatus} = await apiQueryUserReg(userRegInfo);
      if (isReqStatusOK(reqStatus) && userRegResult) {
        return ThunkAPI.fulfillWithValue(userRegResult)
      } else {
        return ThunkAPI.rejectWithValue(reqStatus)
      } 
    }
);

export const {
  updateUserRegResult
} = userRegSlice.actions;

export const userRegReducer = userRegSlice.reducer;
