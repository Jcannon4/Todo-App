import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TodoItem from './todoItem';

interface TodoState {
    data: TodoItem[],
    count: number;
}
const initialState: TodoState = {
    data: 
    [{ id: 'a1', msg: 'Item A', isComplete: false },
    { id: 'b2', msg: 'Item B', isComplete: false },
    { id: 'c3', msg: 'Item C', isComplete: false }],
    count: 0,
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<TodoItem>) => {
            state.data.push(action.payload);
            state.count = state.data.length;
        },

        toggleComplete: (state, action : PayloadAction<string>) => {
            const todo = state.data.find(item => item.id === action.payload);
            if (todo) todo.isComplete = !todo.isComplete;
        },

    },
});

export const { addTodo, toggleComplete } = todoSlice.actions;
export default todoSlice.reducer;