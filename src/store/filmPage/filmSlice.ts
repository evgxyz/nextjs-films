
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '@/store';
import {Lang} from '@/units/lang';
import {ReqStatus} from '@/units/status';
import {Film, FilmId, filmDefault} from '@/units/films';
import {apiFetchFilm} from '@/api/filmApi';

interface FilmState {
  film: Film,
  reqStatus: ReqStatus,
}

const filmStateDefault: FilmState = {
  film: filmDefault,
  reqStatus: ReqStatus.NONE,
}

export const filmSlice = createSlice({
  name: 'filmState',

  initialState: filmStateDefault,

  reducers: {
    setFilmState: (state, action: PayloadAction<FilmState>) => {
      state = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(
        fetchFilm.pending, 
        (state) => {
          state.film = filmDefault;
          state.reqStatus = ReqStatus.LOADING;
        }
      )
      .addCase(
        fetchFilm.fulfilled, 
        (state, action) => {
          state.film = action.payload;
          state.reqStatus = ReqStatus.OK;
        }
      )
      .addCase(
        fetchFilm.rejected, 
        (state, action) => {
          state.film = filmDefault;
          state.reqStatus = action.payload ?? ReqStatus.ERROR;
        }
      )
  }
});

export const fetchFilm = 
  createAsyncThunk<Film, {filmId: FilmId}, {state: RootState, rejectValue: ReqStatus}>(
    'filmState/fetchFilm',
    async function ({filmId}, ThunkAPI) {
      const lang = ThunkAPI.getState().settings.lang;
      const {reqStatus, film} = await apiFetchFilm(filmId, lang);
      if (reqStatus === ReqStatus.OK && film) {
        return ThunkAPI.fulfillWithValue(film)
      } else {
        return ThunkAPI.rejectWithValue(reqStatus)
      } 
    }
);

export const {setFilmState} = filmSlice.actions;

