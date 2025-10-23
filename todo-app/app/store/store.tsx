// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import listReducer from "../list/listSlice";
import todoReducer from "../todo/todoSlice";
export const store = configureStore({
  reducer: {
    todoItem: todoReducer,
    lists: listReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
