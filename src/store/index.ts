
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { filmPageReducer } from './filmPage'

export const store = configureStore({
  reducer: {
    // mainPage: mainPageReducer,
    // filmsPage: filmsPageReducer,
    filmPage: filmPageReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector as TypedUseSelectorHook<RootState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();