
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '@/store';
import {ReqStatus, isReqStatusOK} from '@/units/status';
import {Lang, isLang} from '@/units/lang';
import {
  AccRegInfo, 
  AccRegResult, 
  accRegResultDefault, 
  accRegStateDefault
} from '@/units/acc';
import {apiQueryAccReg} from '@/api/accApi';
import cookie from 'js-cookie';

export const accRegSlice = createSlice({
  name: 'accReg',

  initialState: structuredClone(accRegStateDefault),

  reducers: {
    updateAccRegResult: (state, action: PayloadAction<Partial<AccRegResult>>) => {
      state = Object.assign(state, action.payload);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(
        queryAccReg.pending, 
        (state) => {
          state = {
            ...structuredClone(accRegResultDefault),
            reqStatus: ReqStatus.LOADING
          }
        }
      )
      .addCase(
        queryAccReg.fulfilled, 
        (state, action) => {
          state = {
            ...action.payload,
            reqStatus: ReqStatus.OK
          }
        }
      )
      .addCase(
        queryAccReg.rejected, 
        (state, action) => {
          state.reqStatus = action.payload ?? ReqStatus.ERROR;
        }
      )
  }
});

export const queryAccReg = 
  createAsyncThunk<
    AccRegResult, 
    AccRegInfo, 
    {state: RootState, rejectValue: ReqStatus}
  >(
    'acc/accReg',
    async function (accRegInfo, ThunkAPI) {
      const {accRegResult, reqStatus} = await apiQueryAccReg(accRegInfo);
      if (isReqStatusOK(reqStatus) && accRegResult) {
        return ThunkAPI.fulfillWithValue(accRegResult)
      } else {
        return ThunkAPI.rejectWithValue(reqStatus)
      } 
    }
);

export const {
  updateAccRegResult
} = accRegSlice.actions;

export const accRegReducer = accRegSlice.reducer;
