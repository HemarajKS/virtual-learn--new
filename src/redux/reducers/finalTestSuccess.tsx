import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  value: false,
};

export const finaltestShowPageSlice = createSlice({
  name: 'finaltestShowPage',
  initialState,
  reducers: {
    finaltestShowPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { finaltestShowPage } = finaltestShowPageSlice.actions;
