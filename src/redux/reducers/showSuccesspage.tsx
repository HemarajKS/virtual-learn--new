import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  value: false,
};

export const showSuccessPageSlice = createSlice({
  name: 'showSuccessPage',
  initialState,
  reducers: {
    showSuccessPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showSuccessPage } = showSuccessPageSlice.actions;

export default showSuccessPageSlice.reducer;
