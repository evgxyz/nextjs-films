
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '@/store';
import {ReqStatus, isReqStatusOK} from '@/units/status';
import {
  AccLoginInfo, 
  AccLoginResult, 
  accLoginResultDefault, 
  accLoginStateDefault
} from '@/units/acc';
import {apiQueryAccLogin} from '@/api/accApi';
import cookie from 'js-cookie';

export const accLoginSlice = createSlice({
  name: 'accLogin',

  initialState: structuredClone(accLoginStateDefault),

  reducers: {
    updateAccLoginResult: (state, action: PayloadAction<Partial<AccLoginResult>>) => {
      state.accLoginResult = Object.assign(state.accLoginResult, action.payload);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(
        queryAccLogin.pending, 
        (state) => {
          state.accLoginResult = {
            ...structuredClone(accLoginResultDefault),
            reqStatus: ReqStatus.LOADING
          }
        }
      )
      .addCase(
        queryAccLogin.fulfilled, 
        (state, action) => {
          state.accLoginResult = {
            ...action.payload,
            reqStatus: ReqStatus.OK
          }
        }
      )
      .addCase(
        queryAccLogin.rejected, 
        (state, action) => {
          state.accLoginResult.reqStatus = action.payload ?? ReqStatus.ERROR;
        }
      )
  }
});

export const queryAccLogin = 
  createAsyncThunk<
    AccLoginResult, 
    AccLoginInfo, 
    {state: RootState, rejectValue: ReqStatus}
  >(
    'acc/accLogin',
    async function (accLoginInfo, ThunkAPI) {
      const {accLoginResult, reqStatus} = await apiQueryAccLogin(accLoginInfo);
      if (isReqStatusOK(reqStatus) && accLoginResult) {
        return ThunkAPI.fulfillWithValue(accLoginResult)
      } else {
        return ThunkAPI.rejectWithValue(reqStatus)
      } 
    }
);

export const {
  updateAccLoginResult
} = accLoginSlice.actions;

export const accLoginReducer = accLoginSlice.reducer;
