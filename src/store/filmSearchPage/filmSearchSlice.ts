
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '@/store';
import {ReqStatus} from '@/units/status';
import {
  Film, FilmId, Genre, GenreId, Country, CountryId,
  filmSearchFilterDefault
} from '@/units/films';
import {apiFetchFilmSearchFilter} from '@/api/filmApi';

interface FilmSearchFilter {
  id: FilmId,
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

    setFilmSearchFilter: (state, action: PayloadAction<FilmSearchFilter>) => {
      state.filter = action.payload;
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
  createAsyncThunk<FilmSearchFilter, undefined, {state: RootState, rejectValue: ReqStatus}>(
    'filmSearch/fetchFilmSearchFilter',
    async function (_, ThunkAPI) {
      const lang = ThunkAPI.getState().settings.lang;
      const {reqStatus, filter} = await apiFetchFilmSearchFilter(lang);
      if (reqStatus === ReqStatus.OK && filter) {
        return ThunkAPI.fulfillWithValue(filter)
      } else {
        return ThunkAPI.rejectWithValue(reqStatus)
      } 
    }
);

export const {
  setFilmSearchState,
  setFilmSearchFilter
} = filmSearchSlice.actions;

