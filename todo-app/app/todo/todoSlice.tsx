import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoItemProps } from "./todoItem";

interface TodoState {
  data: TodoItemProps[];
  completed: TodoItemProps[];
  incomplete: TodoItemProps[];
  count: number;
}
const initialState: TodoState = {
  data: [
    { id: "a1", msg: "Item A", isComplete: false },
    { id: "b2", msg: "Item B", isComplete: false },
    { id: "c3", msg: "Item C", isComplete: false },
    { id: "d4", msg: "Item D", isComplete: true },
  ],

  completed: [{ id: "d4", msg: "Item D", isComplete: true }],
  incomplete: [
    { id: "a1", msg: "Item A", isComplete: false },
    { id: "b2", msg: "Item B", isComplete: false },
    { id: "c3", msg: "Item C", isComplete: false },
  ],
  count: 0,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoItemProps>) => {
      const index = state.incomplete.push(action.payload);
      state.data.splice(index - 1, 0, action.payload);
      state.count = state.data.length;
    },

    toggleComplete: (
      state,
      action: PayloadAction<{ id: string; isComplete: boolean }>
    ) => {
      //When toggle is pressed, we know which array it will belong to
      // Check statement so we dont need to search two arrays
      const curItem = action.payload;
      if (curItem.isComplete) {
        // Item state came in as true
        // Parse completed state and find item, O(n) operation
        // Grab the index of item so that we can splice our original array O(n)
        const startIndex: number = state.completed.findIndex(
          (item) => item.id === curItem.id
        );
        // splice() item from array (memory complexity increase, since copy array is formed)
        // Also catch the removed item in an array of type TodoItemProps
        const isolatedArray: TodoItemProps[] = state.completed.splice(
          startIndex,
          1
        ); // magic number 1 indicates we remove 1 item
        // toggle the isCompete status
        isolatedArray[0].isComplete = !isolatedArray[0].isComplete;
        state.incomplete.push(isolatedArray[0]);
        // place new todo item into the state.completed array
      } else {
        // Item state came in as false, change to True
        const startIndex: number = state.incomplete.findIndex(
          (item) => item.id === curItem.id
        );
        // splice() item from array (memory complexity increase, since copy array is formed)
        // Also catch the removed item in an array of type TodoItemProps
        const isolatedArray: TodoItemProps[] = state.incomplete.splice(
          startIndex,
          1
        ); // magic number 1 indicates we remove 1 item
        // toggle the isCompete status
        isolatedArray[0].isComplete = !isolatedArray[0].isComplete;
        state.completed.push(isolatedArray[0]);
      }
      // WIth the data changes made, now populate the data array
      state.data = state.incomplete.concat(state.completed);
    },
    deleteTodo: (
      state,
      action: PayloadAction<{ id: string; isComplete: boolean }>
    ) => {
      console.log(
        " FIRING DELETE FROM REDUCER, deleting item with id: \n" +
          action.payload.id +
          " " +
          action.payload.isComplete
      );
      state.data = state.data.filter((item) => item.id !== action.payload.id);

      if (action.payload.isComplete) {
        state.completed = state.completed.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.incomplete = state.incomplete.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
