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
}

export const CatSubCategories: any = createAsyncThunk(
  'CatSubCategories/CatSubCategories',
  async (arg: any, { rejectWithValue }) => {
    try {
      const fetchedsubCategoriesData: any = await axios.request({
        method: 'get',
        url: `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/allCoursesOfSubCategory?subCategoryId=${arg}`,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
        },
      })

      return fetchedsubCategoriesData
    } catch (err) {
      let error: any = err
      return rejectWithValue(
        error && error.response && error.response.data && error.response.data,
      )
    }
  },
)

export const CatSubCategoriesSlice = createSlice({
  name: 'CatSubCategories',
  initialState,
  reducers: {
    CatSubCategoriesisSuccess: (state) => {
      state.isSuccess = false
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(CatSubCategories.pending, (state, action) => {
      // Add user to the state array
      state.loading = true
    })
    builder.addCase(CatSubCategories.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.headers = action
      state.isSuccess = true
    })
    builder.addCase(CatSubCategories.rejected, (state, action) => {
      state.message = action.payload
      state.loading = false
      state.isRejected = true
      state.data = []
    })
  },
})

export const { CatSubCategoriesisSuccess } = CatSubCategoriesSlice.actions

export default CatSubCategoriesSlice
