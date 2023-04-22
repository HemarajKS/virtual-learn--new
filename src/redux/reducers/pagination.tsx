import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  pageNum: 1,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    paginateNext: (state) => {
      state.pageNum = state.pageNum + 1;
    },
    paginatePrevious: (state) => {
      state.pageNum = state.pageNum - 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { paginateNext, paginatePrevious } = paginationSlice.actions;

export default paginationSlice.reducer;
