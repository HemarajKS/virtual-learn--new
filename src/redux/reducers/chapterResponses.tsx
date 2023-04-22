import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError } from 'axios';

const initialState = {
  message: '',
  data: [],
  headers: [],
  isSuccess: false,
  isRejected: false,
  loading: false,
};

export const chapterResponse: any = createAsyncThunk(
  'chapterResponse/chapterResponse',
  async (arg: any, { rejectWithValue }) => {
    try {
      const fetchedData: any = await axios.request({
        method: 'get',
        url: `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/courseChapterResponse?courseId=${arg}`,
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

export const chapterResponseSlice = createSlice({
  name: 'chapterResponse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(chapterResponse.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(chapterResponse.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.headers = action;
      state.isSuccess = true;
    });
    builder.addCase(chapterResponse.rejected, (state, action) => {
      action.payload && action.payload.message && alert(action.payload.message);
      state.message = action.payload;
      state.loading = false;
      state.isRejected = true;
    });
  },
});

export const {} = chapterResponseSlice.actions;

export default chapterResponseSlice;
