import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface menuState {
  isOpen: boolean;
}

const initialState: menuState = {
  isOpen: false,
};
const menuSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    toggleMenu: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    menuOff: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { toggleMenu, menuOff } = menuSlice.actions;
export default menuSlice.reducer;
