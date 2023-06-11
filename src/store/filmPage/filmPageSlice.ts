
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '@/store';
import {ReqStatus, isReqStatusOK} from '@/units/status';
import {
  FilmPageState, filmPageStateDefault,
  Film, filmDefault, 
  FilmId
} from '@/units/film';
import {apiFetchFilmPage} from '@/api/filmApi';

const filmPageSlice = createSlice({
  name: 'filmPage',

  initialState: structuredClone(filmPageStateDefault),

  reducers: {
    setFilmPageState: (state, action: PayloadAction<FilmPageState>) => {
      state = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(
        fetchFilmPage.pending, 
        (state) => {
          state.film = {
            ...structuredClone(filmDefault),
            reqStatus: ReqStatus.LOADING
          }
        }
      )
      .addCase(
        fetchFilmPage.fulfilled, 
        (state, action) => {
          state.film = {
            ...action.payload,
            reqStatus: ReqStatus.OK
          }
        }
      )
      .addCase(
        fetchFilmPage.rejected, 
        (state, action) => {
          state.film.reqStatus = action.payload ?? ReqStatus.ERROR;
        }
      )
  }
});

export const fetchFilmPage = 
  createAsyncThunk<Film, {filmId: FilmId}, {state: RootState, rejectValue: ReqStatus}>(
    'filmPage/fetchFilmPage',
    async function ({filmId}, ThunkAPI) {
      const lang = ThunkAPI.getState().settings.lang;
      const {film, reqStatus} = await apiFetchFilmPage(filmId, lang);
      if (isReqStatusOK(reqStatus) && film) {
        return ThunkAPI.fulfillWithValue(film)
      } else {
        return ThunkAPI.rejectWithValue(reqStatus)
      } 
    }
);

export const {setFilmPageState} = filmPageSlice.actions;

export const filmPageReducer = filmPageSlice.reducer; 
