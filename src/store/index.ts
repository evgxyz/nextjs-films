
import { 
  combineReducers, 
  configureStore, 
  Action,
  ThunkAction,
} from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { filmPageReducer } from './filmPage';

const combinedReducer = combineReducers({
  // mainPage: mainPageReducer,
  // filmsPage: filmsPageReducer,
  filmPage: filmPageReducer,
});

const wrapperReducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, 
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore = () =>
  configureStore({
    reducer: wrapperReducer,
  });

export type Store = ReturnType<typeof makeStore>;
export type RootState = ReturnType<Store['getState']>;
export type AppDispatch = Store['dispatch'];
export type AppThunk<ReturnType = void> = 
  ThunkAction<ReturnType, RootState, unknown, Action>;

export const wrapper = createWrapper(makeStore, { debug: true });
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
