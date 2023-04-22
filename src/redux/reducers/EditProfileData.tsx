import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosError } from "axios";

const initialState = {
  message: "",
  data: {},
  headers: [],
  isSuccess: false,
  isRejected: false,
  loading: false,
};

export const ProfileClick: any = createAsyncThunk(
  "ProfileClick/EditProfileData",
  async (arg: any, { rejectWithValue }) => {
    try {
      const fetchedEditData: any = await axios.request({
        method: "get",
        url: `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/myProfile`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        },
      });

      return fetchedEditData;
    } catch (err) {
      let error: any = err;
      return rejectWithValue(
        error && error.response && error.response.data && error.response.data
      );
    }
  }
);

export const EditProfileSlice = createSlice({
  name: "EditProfileData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(ProfileClick.pending, (state, action) => {
      // Add user to the state array
      state.loading = true;
    });
    builder.addCase(ProfileClick.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.headers = action;
      state.isSuccess = true;
    });
    builder.addCase(ProfileClick.rejected, (state, action) => {
      state.message = action.payload;
      state.loading = false;
      state.isRejected = true;
    });
  },
});

export default EditProfileSlice;
