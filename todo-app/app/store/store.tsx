// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../counter/counterSlice'; // Import your slice reducer
import listReducer from '../list/listSlice';
import todoReducer from '../todo/todoSlice';
export const store = configureStore({
    reducer: {
        counter: counterReducer, // Add your slice reducer here
        list: listReducer,
        todoItem: todoReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;