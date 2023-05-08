
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '@/store';
import {ReqStatus} from '@/units/status';
import {
  Film, FilmId, Genre, GenreId, Country, CountryId,
  FilmSearchParams, filmSearchParamsDefault,
  FilmSearchResults,
} from '@/units/films';
import {apiFetchFilmSearchResults} from '@/api/filmApi';

interface FilmSearchState {
  //options: FilmSearchOptions,
  params: FilmSearchParams,
  results: FilmSearchResults,
  reqStatus: ReqStatus,
}

const filmSearchStateDefault: FilmSearchState = {
  //options: 
  params: filmSearchParamsDefault,
  results: [],
  reqStatus: ReqStatus.NONE,
}

export const filmSearchSlice = createSlice({
  name: 'filmSearch',
  
  initialState: filmSearchStateDefault,

  reducers: {
    setFilmSearchState: (state, action: PayloadAction<FilmSearchState>) => {
      state = action.payload;
    },

    setFilmSearchParams: (state, action: PayloadAction<FilmSearchParams>) => {
      state.params = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(
        fetchFilmSearchResults.pending, 
        (state) => {
          state.results = [];
          state.reqStatus = ReqStatus.LOADING;
        }
      )
      .addCase(
        fetchFilmSearchResults.fulfilled, 
        (state, action) => {
          state.results = action.payload;
          state.reqStatus = ReqStatus.OK;
        }
      )
      .addCase(
        fetchFilmSearchResults.rejected, 
        (state, action) => {
          state.results = [];
          state.reqStatus = action.payload ?? ReqStatus.ERROR;
        }
      )
  }
})

/* export const fetchFilmSearchFilter = 
  createAsyncThunk<FilmSearchFilter, void, {state: RootState, rejectValue: ReqStatus}>(
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
); */

export const fetchFilmSearchResults = 
  createAsyncThunk<FilmSearchResults, void, {state: RootState, rejectValue: ReqStatus}>(
    'filmSearch/fetchFilmSearchResults',
    async function (_, ThunkAPI) {
      const lang = ThunkAPI.getState().settings.lang;
      const params = ThunkAPI.getState().filmSearchPage.filmSearch.params;
      const {reqStatus, results} = await apiFetchFilmSearchResults(params, lang);
      if (reqStatus === ReqStatus.OK && results) {
        return ThunkAPI.fulfillWithValue(results)
      } else {
        return ThunkAPI.rejectWithValue(reqStatus)
      } 
    }
);

export const {
  setFilmSearchState,
  setFilmSearchParams,
} = filmSearchSlice.actions;

