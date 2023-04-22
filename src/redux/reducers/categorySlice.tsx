import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  value: [],
  topsearch: [],
  allSearchDataValue: []
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    categorydata: (state, action) => {
      state.value = action.payload;
    },
    topsearchData: (state, action) => {
      state.topsearch = action.payload;
    },
    searchDataValueState: (state, action) => {
      state.allSearchDataValue = action.payload;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { categorydata, topsearchData, searchDataValueState } = categorySlice.actions;

export default categorySlice.reducer;