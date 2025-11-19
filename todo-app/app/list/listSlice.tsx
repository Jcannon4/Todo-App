import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sortTodoOrder } from '../utils';
export interface TodoItemProps {
  todoId: string;
  msg: string;
  isComplete: boolean;
}
export interface TodoState {
  items: Record<string, TodoItemProps>; // O(1) access
  order: string[]; // sorted by UI rules
  incompleteCount: number;
}
export interface ListItemProps {
  title: string;
  id: string;
  todo: TodoState;
}
export interface ListState {
  lists: Record<string, ListItemProps>; // map for O(1) access
  order: string[];
}

const initialState: ListState = {
  lists: {},
  order: [],
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    createListState: (
      state,
      action: PayloadAction<{ lists: ListItemProps[] }>
    ) => {
      const inputs = action.payload.lists;

      inputs.forEach((newList) => {
        if (newList.title.trim() === '' || state.lists[newList.id]) return;

        state.lists[newList.id] = newList;
        state.order.push(newList.id);
      });
    },
    loadInitialState: (state, action) => {
      const { lists, todos } = action.payload;
      lists.forEach((list: ListItemProps) => {
        state.lists[list.id] = {
          ...list,
          todo: {
            items: {},
            order: [],
            incompleteCount: 0,
          },
        };
        state.order.push(list.id);
      });

      todos.forEach((todo: TodoItemProps) => {
        const list = state.lists[todo.todoId];
        if (!list) return;

        list.todo.items[todo.todoId] = {
          todoId: todo.todoId,
          msg: todo.msg,
          isComplete: todo.isComplete,
        };

        list.todo.order.push(todo.todoId);
      });
    },
    reorderLists: (state, action) => {
      state.order = action.payload; // just pass reordered ids
    },

    deleteList: (state, action: PayloadAction<{ listID: string }>) => {
      const { listID } = action.payload;
      if (!state.lists[listID]) return;
      delete state.lists[listID];
      state.order = state.order.filter((x) => x !== listID);
    },
    editListName: (
      state,
      action: PayloadAction<{ newName: string; listID: string }>
    ) => {
      state.lists[action.payload.listID].title = action.payload.newName;
    },
    reconcileListId: (
      state,
      action: PayloadAction<{ tmpID: string; realID: string }>
    ) => {
      const { tmpID, realID } = action.payload;
      const existing = state.lists[tmpID];
      if (!existing) return;

      // Move data to new record under real ID
      state.lists[realID] = { ...existing, id: realID };
      delete state.lists[tmpID];

      // Fix order array
      const idx = state.order.indexOf(tmpID);
      if (idx !== -1) state.order[idx] = realID;
    },
    addTodos: (
      state,
      action: PayloadAction<{ listId: string; todos: TodoItemProps[] }>
    ) => {
      const { listId, todos } = action.payload;
      console.log(
        `List Id: ${action.payload.listId} \n ListItemProps ${action.payload.todos}\n`
      );
      const list = state.lists[listId]; // O(1) listId query to Record
      if (!list) return; // Did not find list
      console.log(' Found the list\n');

      todos.forEach((todo) => {
        if (!list.todo.items[todo.todoId]) {
          list.todo.items[todo.todoId] = todo;
          list.todo.order.unshift(todo.todoId); // add to top (or bottom, depending)
          if (!todo.isComplete) list.todo.incompleteCount++;
        }
      });

      // Apply sorting rule after adding
      list.todo.order = sortTodoOrder(list.todo.items, list.todo.order);
    },

    toggleTodo: (
      state,
      action: PayloadAction<{ listId: string; todoId: string }>
    ) => {
      const { listId, todoId } = action.payload;
      const list = state.lists[listId];
      const todo = list?.todo.items[todoId];
      if (!todo) return;

      todo.isComplete = !todo.isComplete;

      // Update counts
      list.todo.incompleteCount = Object.values(list.todo.items).filter(
        (t) => !t.isComplete
      ).length;

      // Resort
      list.todo.order = sortTodoOrder(list.todo.items, list.todo.order);
    },
    deleteTodo: (
      state,
      action: PayloadAction<{ listId: string; todoId: string }>
    ) => {
      const { listId, todoId } = action.payload;

      // 1. Locate the parent list and the todo item
      const list = state.lists[listId];
      const todoItem = list?.todo.items[todoId];

      // Safety check: ensure both the list and the todo item exist
      if (!list || !todoItem) {
        // Optionally log an error if the item wasn't found
        console.warn(`Could not find todoId: ${todoId} in listId: ${listId}.`);
        return state;
      }

      // 2. Update incomplete count *before* deleting the item
      // If the item was not complete, we must decrement the count
      if (!todoItem.isComplete) {
        list.todo.incompleteCount -= 1;
      }

      // 3. Delete the todo item from the items map (O(1) access)
      delete list.todo.items[todoId];

      // 4. Remove the todoId from the order array
      list.todo.order = list.todo.order.filter((id) => id !== todoId);
    },
  },
});
export const {
  createListState,
  deleteList,
  reorderLists,
  editListName,
  reconcileListId,
  loadInitialState,
  addTodos,
  deleteTodo,
  toggleTodo,
} = listSlice.actions;
export default listSlice.reducer;
