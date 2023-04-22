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

export const MobileNotifyClick: any = createAsyncThunk(
  "MobileNotifyClick/MobileNotifiyData",
  async (arg: any, { rejectWithValue }) => {
    try {
      const fetchedMobileNotifyData: any = await axios.request({
        method: "get",
        url: `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/menu`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      });

      return fetchedMobileNotifyData;
    } catch (err) {
      let error: any = err;
      return rejectWithValue(
        error && error.response && error.response.data && error.response.data
      );
    }
  }
);

export const MobileNotifySlice = createSlice({
  name: "MobileNotifiyData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(MobileNotifyClick.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(MobileNotifyClick.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.headers = action;
      state.isSuccess = true;
    });
    builder.addCase(MobileNotifyClick.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isRejected = true;
    });
  },
});

export default MobileNotifySlice;
