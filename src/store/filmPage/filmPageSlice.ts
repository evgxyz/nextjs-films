
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '@/store';
import {ReqStatus} from '@/units/status';
import {Film, FilmId, filmDefault} from '@/units/films';
import {apiFetchFilm} from '@/api/filmApi';

interface FilmPageState {
  film: Film,
  reqStatus: ReqStatus,
}

const filmPageStateDefault: FilmPageState = {
  film: filmDefault,
  reqStatus: ReqStatus.NONE,
}

const filmPageSlice = createSlice({
  name: 'filmPage',

  initialState: filmPageStateDefault,

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
          state.reqStatus = ReqStatus.LOADING;
        }
      )
      .addCase(
        fetchFilmPage.fulfilled, 
        (state, action) => {
          state.film = action.payload;
          state.reqStatus = ReqStatus.OK;
        }
      )
      .addCase(
        fetchFilmPage.rejected, 
        (state, action) => {
          state.film = filmDefault;
          state.reqStatus = action.payload ?? ReqStatus.ERROR;
        }
      )
  }
});

export const fetchFilmPage = 
  createAsyncThunk<Film, {filmId?: FilmId}, {state: RootState, rejectValue: ReqStatus}>(
    'filmPage/fetchFilmPage',
    async function ({filmId}, ThunkAPI) {
      const lang = ThunkAPI.getState().settings.lang;
      filmId ??= ThunkAPI.getState().filmPage.film.id;
      
      const {reqStatus, film} = await apiFetchFilm(filmId, lang);
      
      if (reqStatus === ReqStatus.OK && film) {
        return ThunkAPI.fulfillWithValue(film)
      } else {
        return ThunkAPI.rejectWithValue(reqStatus)
      } 
    }
);

export const {setFilmPageState} = filmPageSlice.actions;

export const filmPageReducer = filmPageSlice.reducer; 
