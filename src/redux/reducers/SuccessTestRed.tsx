import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  value: false,
};

export const testSuccessRedSlice = createSlice({
  name: 'testSuccessRed',
  initialState,
  reducers: {
    testSuccessRed: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { testSuccessRed } = testSuccessRedSlice.actions;

export default testSuccessRedSlice.reducer;
