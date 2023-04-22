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

export const pauseUnmount: any = createAsyncThunk(
    'pauseUnmount/pause',
    async (arg: any, { rejectWithValue }) => {
        try {
            const fetchedData: any = await axios.request({
                method: 'put',
                url:
                    'http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/user/pauseTime',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
                },
                data: arg,
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

export const pauseSlice = createSlice({
    name: 'pause',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(pauseUnmount.pending, (state, action) => {
            // Add user to the state array
            state.loading = true
        })
        builder.addCase(pauseUnmount.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.headers = action
            state.isSuccess = true
            state.message = 'api called'
        })
        builder.addCase(pauseUnmount.rejected, (state, action) => {
            state.message = action.payload
            state.loading = false
            state.isRejected = true
        })
    },
})

export default pauseSlice
