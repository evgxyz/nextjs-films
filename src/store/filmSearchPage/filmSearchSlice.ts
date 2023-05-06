
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {ReqStatus} from '@/units/status';
import {Film, FilmId, Genre, GenreId, Country, CountryId} from '@/units/films';
import {apiFetchFilm} from '@/api/filmApi';

interface FilmSearchFilter {
  title: string,
  genres: (Genre & {selected: boolean})[],
  countries: (Country & {selected: boolean})[],
}

type FilmSearchResult = Film[];

interface FilmSearchState {
  filter: FilmSearchFilter,
  result: FilmSearchResult,
  reqStatus: ReqStatus,
}

const filmSearchFilterDefault: FilmSearchFilter = { 
  title: '',
  genres: [],
  countries: [],
}

const filmSearchStateDefault: FilmSearchState = {
  filter: filmSearchFilterDefault,
  result: [],
  reqStatus: ReqStatus.NONE,
}

export const filmSearchSlice = createSlice({
  name: 'filmSearch',

  initialState: filmSearchStateDefault,

  reducers: {
    setFilmSearchState: (state, action: PayloadAction<FilmSearchState>) => {
      state = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(
        fetchFilmSearchFilter.pending, 
        (state) => {
          state.filter = filmSearchFilterDefault;
          state.reqStatus = ReqStatus.LOADING;
        }
      )
      .addCase(
        fetchFilmSearchFilter.fulfilled, 
        (state, action) => {
          state.filter = action.payload;
          state.reqStatus = ReqStatus.OK;
        }
      )
      .addCase(
        fetchFilmSearchFilter.rejected, 
        (state, action) => {
          state.filter = filmSearchFilterDefault;
          state.reqStatus = action.payload ?? ReqStatus.ERROR;
        }
      )
  }
})

export const fetchFilmSearchFilter = 
  createAsyncThunk<FilmSearchFilter, undefined, {rejectValue: ReqStatus}>(
    'filmSearch/fetchFilmSearchFilter',
    async function (_, ThunkAPI) {
      const { reqStatus, filter } = await apiFetchFilmSearchFilter();
      if (reqStatus === ReqStatus.OK && filter) {
        return ThunkAPI.fulfillWithValue(filter)
      } else {
        return ThunkAPI.rejectWithValue(reqStatus)
      } 
    }
)

export const {setFilmSearchState} = filmSearchSlice.actions;

