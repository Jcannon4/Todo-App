import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListItemProps } from "./listItem";
import { feederData } from "./testdata";
interface ListState {
  data: ListItemProps[];
  completedLists: ListItemProps[];
  incompleteLists: ListItemProps[];
  count: number;
}

const initialState: ListState = {
  data: [
    {
      id: "a5",
      title: "List A",
      isArchived: false,
      todoItems: feederData,
      isComplete: false,
    },
    {
      id: "b5",
      title: "Item B",
      isArchived: false,
      todoItems: feederData,
      isComplete: true,
    },
  ],

  completedLists: [
    {
      id: "b5",
      title: "Item B",
      isArchived: false,
      todoItems: feederData,
      isComplete: true,
    },
  ],
  incompleteLists: [
    {
      id: "a5",
      title: "List A",
      isArchived: false,
      todoItems: feederData,
      isComplete: false,
    },
  ],
  count: 0,
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<ListItemProps[]>) => {
      const inputs = action.payload;
      console.log(" LIST OUTPUT : \n" + inputs);
      inputs.map((list) => {
        if (list.title.trim() !== "") {
          const index = state.incompleteLists.push(list);
          state.data.splice(index - 1, 0, list);
        }
      });

      state.count = state.data.length;
    },
  },
});
export const { addList } = listSlice.actions;
export default listSlice.reducer;
