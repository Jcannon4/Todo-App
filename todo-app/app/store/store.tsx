// src/app/store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import listReducer from '../list/listSlice';
import menuReducer from '../menu/menuSlice';
export const store = configureStore({
  reducer: {
    data: listReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
