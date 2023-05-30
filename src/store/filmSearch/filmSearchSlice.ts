
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '@/store';
import {ReqStatus, isReqStatusError, isReqStatusOK} from '@/units/status';
import {
  filmSearchStateDefault,
  FilmSearchOptions, filmSearchOptionsDefault,
  FilmSearchParams, 
  FilmSearchResults, filmSearchResultsDefault
} from '@/units/film';
import {
  apiFetchFilmSearchOptions,
  apiFetchFilmSearchTextAutocompl,
  apiFetchFilmSearchResults, 
} from '@/api/filmApi';

const filmSearchSlice = createSlice({
  name: 'filmSearch',

  initialState: structuredClone(filmSearchStateDefault),

  reducers: {
    setFilmSearchParams: (state, action: PayloadAction<FilmSearchParams>) => {
      state.params = action.payload;
    },

    updateFilmSearchParams: (state, action: PayloadAction<FilmSearchParams>) => {
      state.params = Object.assign(state.params, action.payload);
    },
  },

  extraReducers: builder => {
    builder
      //fetchFilmSearchOptions
      .addCase(
        fetchFilmSearchOptions.pending, 
        (state) => {
          state.options = {
            ...structuredClone(filmSearchOptionsDefault),
            reqStatus: ReqStatus.LOADING
          }
        }
      )
      .addCase(
        fetchFilmSearchOptions.fulfilled, 
        (state, action) => {
          state.options = {
            ...action.payload,
            reqStatus: ReqStatus.OK
          };
        }
      )
      .addCase(
        fetchFilmSearchOptions.rejected, 
        (state, action) => {
          state.options.reqStatus = action.payload ?? ReqStatus.ERROR;
        }
      )
      //fetchFilmSearchTextAutocompl
      .addCase(
        fetchFilmSearchTextAutocompl.pending, 
        (state) => {
          state.autocompl.text = {
            value: [],
            reqStatus: ReqStatus.LOADING
          }
        }
      )
      .addCase(
        fetchFilmSearchTextAutocompl.fulfilled, 
        (state, action) => {
          state.autocompl.text = {
            value: action.payload,
            reqStatus: ReqStatus.OK
          }
        }
      )
      .addCase(
        fetchFilmSearchTextAutocompl.rejected, 
        (state, action) => {
          state.autocompl.text.reqStatus = action.payload ?? ReqStatus.ERROR;
        }
      )
      //fetchFilmSearchResults
      .addCase(
        fetchFilmSearchResults.pending, 
        (state) => {
          state.results = {
            ...structuredClone(filmSearchResultsDefault),
            reqStatus: ReqStatus.LOADING
          }
        }
      )
      .addCase(
        fetchFilmSearchResults.fulfilled, 
        (state, action) => {
          state.results = {
            ...action.payload,
            reqStatus: ReqStatus.OK
          }
        }
      )
      .addCase(
        fetchFilmSearchResults.rejected, 
        (state, action) => {
          state.results.reqStatus = action.payload ?? ReqStatus.ERROR;
        }
      )
  }
});

export const fetchFilmSearchOptions = 
  createAsyncThunk<FilmSearchOptions, void, {state: RootState, rejectValue: ReqStatus}>(
    'filmSearch/fetchFilmSearchOptions',
    async function (_unused, ThunkAPI) {
      const lang = ThunkAPI.getState().settings.lang;
      const {options, reqStatus} = await apiFetchFilmSearchOptions(lang);
      if (isReqStatusOK(reqStatus) && options) {
        return ThunkAPI.fulfillWithValue(options)
      } else {
        return ThunkAPI.rejectWithValue(reqStatus)
      } 
    }
);

export const fetchFilmSearchTextAutocompl = 
  createAsyncThunk<string[], void, {state: RootState, rejectValue: ReqStatus}>(
    'filmSearch/fetchFilmSearchTextSugg',
    async function (_unused, ThunkAPI) {
      const text = ThunkAPI.getState().filmSearch.params.text ?? '';
      const {autocompl, reqStatus} = await apiFetchFilmSearchTextAutocompl(text);
      if (isReqStatusOK(reqStatus) && autocompl) {
        return ThunkAPI.fulfillWithValue(autocompl)
      } else {
        return ThunkAPI.rejectWithValue(reqStatus)
      } 
    }
);

export const fetchFilmSearchResults = 
  createAsyncThunk<FilmSearchResults, void, {state: RootState, rejectValue: ReqStatus}>(
    'filmSearch/fetchFilmSearchResults',
    async function (_unused, ThunkAPI) {   
      const optionsReqStatus = ThunkAPI.getState().filmSearch.options.reqStatus;
      if (isReqStatusError(optionsReqStatus)) {
        return ThunkAPI.rejectWithValue(optionsReqStatus);
      }

      const lang = ThunkAPI.getState().settings.lang;
      const params = ThunkAPI.getState().filmSearch.params;
      const {results, reqStatus} = await apiFetchFilmSearchResults(params, lang);
      if (isReqStatusOK(reqStatus) && results) {
        return ThunkAPI.fulfillWithValue(results);
      } else {
        return ThunkAPI.rejectWithValue(reqStatus);
      } 
    }
);

export const {
  setFilmSearchParams,
  updateFilmSearchParams,
} = filmSearchSlice.actions;

export const filmSearchReducer = filmSearchSlice.reducer; 
