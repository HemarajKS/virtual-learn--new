import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosError } from "axios";

const initialState = {
  message: "",
  data: [],
  headers: [],
  isSuccess: false,
  isRejected: false,
  loading: false,
};

export const subCatAdvance: any = createAsyncThunk(
  "subCatAdvance/subCatAdvance",
  async (arg: any, { rejectWithValue }) => {
    try {
      const fetchedsubCatAdvance: any = await axios.request({
        method: "get",
        url: `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/advanceCoursesOfSub?subCategoryId=${arg}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      });

      return fetchedsubCatAdvance;
    } catch (err) {
      let error: any = err;
      return rejectWithValue(
        error && error.response && error.response.data && error.response.data
      );
    }
  }
);

export const subCatAdvanceSlice = createSlice({
  name: "subCatAdvance",
  initialState,
  reducers: {
    subCatAdvanceisSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(subCatAdvance.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(subCatAdvance.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.headers = action;
      state.isSuccess = true;
    });
    builder.addCase(subCatAdvance.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isRejected = true;
      state.data = [];
    });
  },
});

export const { subCatAdvanceisSuccess } = subCatAdvanceSlice.actions;

export default subCatAdvanceSlice;
