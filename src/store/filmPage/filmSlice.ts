
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ApiStatus, LoadStatus } from '@/types/resultTypes'
import { Film, FilmId } from '@/types/filmTypes'
import { apiFetchFilm } from '@/api/filmApi'

interface FilmState {
  film: Film,
  loadStatus: LoadStatus,
}

export const defaultFilm: Film = { 
  id: 0,
  title: ''
}

const defaultFilmState: FilmState = {
  film: defaultFilm,
  loadStatus: LoadStatus.INIT,
}

export const fetchFilmAsync = 
  createAsyncThunk<Film, FilmId, {rejectValue: ApiStatus}>(
    'film/fetchFilmAsync',
    async function (filmId, ThunkAPI) {
      const { apiStatus, film } = await apiFetchFilm(filmId);
      if (apiStatus === ApiStatus.OK && film) {
        return ThunkAPI.fulfillWithValue(film)
      } else {
        return ThunkAPI.rejectWithValue(apiStatus)
      } 
    }
)

const filmSlice = createSlice({
  name: 'film',

  initialState: defaultFilmState,

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
          state.film = defaultFilm,
          state.loadStatus = LoadStatus.LOADING
        }
      )
      .addCase(
        fetchFilmAsync.fulfilled, 
        (state, action) => {
          state.film = action.payload,
          state.loadStatus = LoadStatus.OK
        }
      )
      .addCase(
        fetchFilmAsync.rejected, 
        (state, action) => {
          state.film = defaultFilm,
          state.loadStatus = LoadStatus.ERROR
        }
      )
  }
});

export const filmReducer = filmSlice.reducer;

export const { setFilmState } = filmSlice.actions;

