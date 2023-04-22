import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  value: [],
};

export const allcourseSlice = createSlice({
  name: 'allcourse',
  initialState,
  reducers: {
    coursedata: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { coursedata } = allcourseSlice.actions;

export default allcourseSlice.reducer;
