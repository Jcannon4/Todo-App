import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoItemProps } from './todoItem';

interface TodoState {
    data: TodoItemProps[],
    completed: TodoItemProps[],
    count: number;
}
const initialState: TodoState = {
    data:
        [{ id: 'a1', msg: 'Item A', isComplete: false },
        { id: 'b2', msg: 'Item B', isComplete: false },
        { id: 'c3', msg: 'Item C', isComplete: false }],
    completed: [],
    count: 0,
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<TodoItemProps>) => {
            state.data.push(action.payload);
            state.count = state.data.length;
        },

        toggleComplete: (state, action: PayloadAction<string>) => {
            const todo = state.data.find(item => item.id === action.payload);
            if (todo) todo.isComplete = !todo.isComplete;
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            console.log(" FIRING DELETE FROM REDUCER, deleting item with id: \n" + action.payload);
            state.data = state.data.filter(item => item.id !== action.payload);
        }

    },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;