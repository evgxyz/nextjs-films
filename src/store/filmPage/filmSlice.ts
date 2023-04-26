
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Film, FilmId } from '@/types/filmTypes'
import { ApiStatus } from '@/types/apiTypes'
import { apiFetchFilm } from '@/api/filmApi'

interface FilmState {
  film: Film,
  status: string
}

export const defaultFilm: Film = { 
  id: 0, 
  title: ''
}

const defaultFilmState: FilmState = {
  film: defaultFilm,
  status: ''
}

export const fetchFilmAsync = 
  createAsyncThunk<Film, FilmId, {rejectValue: string}>(
    'film/getFilmAsync',
    async function (filmId, ThunkAPI) {
      const {apiStatus, film} = await apiFetchFilm(filmId);
      if (apiStatus === ApiStatus.OK && film) {
        return ThunkAPI.fulfillWithValue(film)
      } else {
        return ThunkAPI.rejectWithValue(`error`)
      } 
    }
)

const filmSlice = createSlice({
  name: 'film',
  initialState: defaultFilmState,

  reducers: {
    setFilm: (state, action: PayloadAction<Film>) => {
      state.film = action.payload;
      state.status = 'ok';
    },
  },

  extraReducers: builder => {
    builder
      .addCase(
        fetchFilmAsync.pending, 
        (state) => {
          state.film = defaultFilm,
          state.status = 'loading'
        }
      )
      .addCase(
        fetchFilmAsync.fulfilled, 
        (state, action) => {
          state.film = action.payload,
          state.status = 'ok'
        }
      )
      .addCase(
        fetchFilmAsync.rejected, 
        (state, action) => {
          state.film = defaultFilm,
          state.status = action.payload ?? 'error'
        }
      )
  }
});

export const filmReducer = filmSlice.reducer;

export const { setFilm } = filmSlice.actions;
