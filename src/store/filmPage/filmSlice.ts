
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ReqStatus } from '@/units/status'
import { Film, FilmId } from '@/units/films'
import { apiFetchFilm } from '@/api/filmApi'

interface FilmState {
  film: Film,
  reqStatus: ReqStatus,
}

export const filmDefault: Film = { 
  id: 0,
  title: ''
}

const filmStateDefault: FilmState = {
  film: filmDefault,
  reqStatus: ReqStatus.NONE,
}

export const fetchFilmAsync = 
  createAsyncThunk<Film, FilmId, {rejectValue: ReqStatus}>(
    'filmState/fetchFilmAsync',
    async function (filmId, ThunkAPI) {
      const { reqStatus, film } = await apiFetchFilm(filmId);
      if (reqStatus === ReqStatus.OK && film) {
        return ThunkAPI.fulfillWithValue(film)
      } else {
        return ThunkAPI.rejectWithValue(reqStatus)
      } 
    }
)

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
        fetchFilmAsync.pending, 
        (state) => {
          state.film = filmDefault;
          state.reqStatus = ReqStatus.LOADING;
        }
      )
      .addCase(
        fetchFilmAsync.fulfilled, 
        (state, action) => {
          state.film = action.payload;
          state.reqStatus = ReqStatus.OK;
        }
      )
      .addCase(
        fetchFilmAsync.rejected, 
        (state, action) => {
          state.film = filmDefault;
          state.reqStatus = action.payload ?? ReqStatus.ERROR;
        }
      )
  }
});

export const { setFilmState } = filmSlice.actions;

