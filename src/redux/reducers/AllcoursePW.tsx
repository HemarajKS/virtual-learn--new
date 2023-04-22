import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  message: '',
  pageLimit: 4,
  pageNum: 1,
  data: [],
  headers: [],
  isSuccess: false,
  isRejected: false,
  loading: false,
};

export const allCoursePW: any = createAsyncThunk(
  'allCoursePW/allCoursePW',
  async (arg: any, { rejectWithValue }) => {
    try {
      const fetchedData: any = await axios.request({
        method: 'get',
        url: `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/home/course/all/pagination?pageNumber=${arg.pageNum}&pageLimit=${arg.pageLimit}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
        },
      });

      return fetchedData;
    } catch (err) {
      let error: any = err;
      return rejectWithValue(
        error && error.response && error.response.data && error.response.data
      );
    }
  }
);

export const allCoursePWSlice = createSlice({
  name: 'allCoursePW',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(allCoursePW.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(allCoursePW.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.headers = action;
      state.isSuccess = true;
    });
    builder.addCase(allCoursePW.rejected, (state, action) => {
      action.payload && action.payload.message && alert(action.payload.message);
      state.message = action.payload;
      state.loading = false;
      state.isRejected = true;
    });
  },
});

export const {} = allCoursePWSlice.actions;

export default allCoursePWSlice;
