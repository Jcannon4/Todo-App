import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sortTodoOrder } from '../utils';
import { apiFetchAllData } from '@/api/services';
import { v6 as uuidv6 } from 'uuid';
export interface TodoItemProps {
  todoId: string;
  msg: string;
  _internal_uuid: string;
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
  _internal_uuid: string;
  todo: TodoState;
}
export interface ListState {
  lists: Record<string, ListItemProps>; // map for O(1) access
  order: string[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ListState = {
  lists: {},
  order: [],
  loading: 'idle',
  error: null,
};

export const fetchAllData = createAsyncThunk('data/all', async () => {
  // This will return { lists, todos }
  const response = await apiFetchAllData();
  return response;
});

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
      action: PayloadAction<{
        responses: { tempId: string; realId: number; order: number }[];
      }>
    ) => {
      console.log('RECONCILIATION FUNCTION FIRING!');
      for (const map of action.payload.responses) {
        const { tempId, realId } = map;

        // Convert realId to string for state consistency
        const realIdStr = realId.toString();

        // Find the temporary list object
        const existing = state.lists[tempId];
        if (!existing) continue;

        // 1. Create the new entry with the realId as the key
        state.lists[realIdStr] = {
          ...existing,
          id: realIdStr, // <-- FIX: Use the actual realId (as a string)
        };

        // 2. Delete the old temporary entry
        delete state.lists[tempId];

        // 3. Fix the order array
        const idx = state.order.indexOf(tempId);
        if (idx !== -1) {
          state.order[idx] = realIdStr; // <-- FIX: Use the string ID
        }
      }
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
          list.todo.order.push(todo.todoId);
          if (!todo.isComplete) list.todo.incompleteCount++;
        }
      });

      // Apply sorting rule after adding
      list.todo.order = sortTodoOrder(list.todo.items, list.todo.order);
    },
    reconcileTodoId: (
      state,
      action: PayloadAction<{
        responses: {
          tempId: string;
          realId: number;
          todo_order: number;
          parentID: number;
        }[];
      }>
    ) => {
      for (const map of action.payload.responses) {
        const { tempId, realId, parentID } = map;
        const realIdStr = realId.toString();
        const list = state.lists[parentID];

        if (!list) continue; // Safety check

        // 1. Find the temporary todo object
        const existingTodo = list.todo.items[tempId];
        if (!existingTodo) continue;

        // 2. Create the new entry with the realId as the key
        // This preserves the stable _internal_uuid!
        list.todo.items[realIdStr] = {
          ...existingTodo,
          todoId: realIdStr, // Update the data ID
        };

        // 3. Delete the old temporary entry
        delete list.todo.items[tempId];

        // 4. Fix the order array
        const idx = list.todo.order.indexOf(tempId);
        if (idx !== -1) {
          list.todo.order[idx] = realIdStr; // Replace tempId with realId
        }
      }
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllData.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch Data.';
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        const { lists, todos } = action.payload;

        // Reset state
        state.lists = {};
        state.order = [];

        // 1. Process and load lists
        lists.forEach((list: any) => {
          const listIdStr = list.list_id.toString();
          state.lists[listIdStr] = {
            id: listIdStr,
            title: list.title,
            _internal_uuid: uuidv6(), // Generate stable key
            todo: {
              items: {},
              order: [],
              incompleteCount: 0,
            },
          };
          state.order.push(listIdStr);
        });

        // 2. Process and load todos
        todos.forEach((todo: any) => {
          const listIdStr = todo.list_id.toString();
          const todoIdStr = todo.todo_id.toString();

          // Find the parent list
          const parentList = state.lists[listIdStr];
          if (!parentList) {
            console.warn(`Todo ${todo.todo_id} has no parent list!`);
            return;
          }
          // Add todo to its parent
          parentList.todo.items[todoIdStr] = {
            todoId: todoIdStr,
            msg: todo.msg,
            isComplete: !!todo.isComplete, // Convert 0/1 to boolean
            _internal_uuid: uuidv6(), // Generate stable key
          };
          parentList.todo.order.push(todoIdStr);

          // Update incomplete count
          if (!todo.isComplete) {
            parentList.todo.incompleteCount++;
          }
        });

        state.loading = 'succeeded';
        state.error = null;
      });
  },
});
export const {
  createListState,
  deleteList,
  reorderLists,
  editListName,
  reconcileListId,
  reconcileTodoId,
  addTodos,
  deleteTodo,
  toggleTodo,
} = listSlice.actions;
export default listSlice.reducer;
