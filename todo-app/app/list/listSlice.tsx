import { createSlice } from '@reduxjs/toolkit';
interface ListState {
    showText: boolean;
    texts: string[];
    count: number;
  }
  
  const initialState: ListState = {
    showText: false,
    texts: [],
    count: 0,
  };
  
  const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        addText: (state) => {
            state.count +=1;
            state.texts.push(`Sentence number ${state.count}`);
        },
      toggleText: (state) => {
        state.showText = !state.showText;
      },
    },
  });
  
  export const { toggleText , addText} = listSlice.actions;
  export default listSlice.reducer;