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

export const catSubBasic: any = createAsyncThunk(
  "catSubBasic/catSubBasic",
  async (arg: any, { rejectWithValue }) => {
    try {
      const fetchedcatSubBasic: any = await axios.request({
        method: "get",
        url: `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/basicCoursesOfSub?subCategoryId=${arg}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      });

      return fetchedcatSubBasic;
    } catch (err) {
      let error: any = err;
      return rejectWithValue(
        error && error.response && error.response.data && error.response.data
      );
    }
  }
);

export const catSubBasicSlice = createSlice({
  name: "catSubBasic",
  initialState,
  reducers: {
    catSubBasicisSuccess: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(catSubBasic.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(catSubBasic.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.headers = action;
      state.isSuccess = true;
    });
    builder.addCase(catSubBasic.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isRejected = true;
      state.data = [];
    });
  },
});

export const { catSubBasicisSuccess } = catSubBasicSlice.actions;

export default catSubBasicSlice;
