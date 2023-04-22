import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AxiosError } from 'axios'

const initialState = {
  message: '',
  data: [],
  headers: [],
  isSuccess: false,
  isRejected: false,
  loading: false,
  category: '',
}

export const basicCourse: any = createAsyncThunk(
  'basicCourse/basicCourse',
  async (arg: any, { rejectWithValue }) => {
    try {
      const fetchedData: any = await axios.request({
        method: 'get',
        url: `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/${arg}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
        },
      })

      return fetchedData
    } catch (err) {
      let error: any = err
      return rejectWithValue(
        error && error.response && error.response.data && error.response.data,
      )
    }
  },
)

export const basicCourseSlice = createSlice({
  name: 'basicCourse',
  initialState,
  reducers: {
    categoryName: (state, action) => {
      state.category = action.payload
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(basicCourse.pending, (state, action) => {
      // Add user to the state array
      state.loading = true
    })
    builder.addCase(basicCourse.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.headers = action
      state.isSuccess = true
    })
    builder.addCase(basicCourse.rejected, (state, action) => {
      state.message = action.payload
      state.loading = false
      state.isRejected = true
    })
  },
})

export const { categoryName } = basicCourseSlice.actions

export default basicCourseSlice
