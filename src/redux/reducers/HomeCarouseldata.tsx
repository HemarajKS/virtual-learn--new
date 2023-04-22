import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AxiosError } from 'axios'

const initialState = {
  message: '',
  data: {},
  headers: [],
  isSuccess: false,
  isRejected: false,
  loading: false,
  category: '',
}

export const headerCarousel: any = createAsyncThunk(
  'headerCarousel/headerCarousel',
  async (arg: any, { rejectWithValue }) => {
    try {
      const fetchedCarouselData: any = await axios.request({
        method: 'get',
        url: `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/home/course`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
        },
      })

      return fetchedCarouselData
    } catch (err) {
      let error: any = err
      return rejectWithValue(
        error && error.response && error.response.data && error.response.data,
      )
    }
  },
)

export const headerCarouselSlice = createSlice({
  name: 'headerCarousel',
  initialState,
  reducers: {
    carouselData: (state, action) => {
      state.category = action.payload
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(headerCarousel.pending, (state, action) => {
      // Add user to the state array
      state.loading = true
    })
    builder.addCase(headerCarousel.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.headers = action
      state.isSuccess = true
    })
    builder.addCase(headerCarousel.rejected, (state, action) => {
      state.message = action.payload
      state.loading = false
      state.isRejected = true
    })
  },
})

export const { carouselData } = headerCarouselSlice.actions

export default headerCarouselSlice
