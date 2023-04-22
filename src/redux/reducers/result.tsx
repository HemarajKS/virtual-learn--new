import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
  value: {},
}

export const quizAnswerSlice = createSlice({
  name: 'quizAnswer',
  initialState,
  reducers: {
    quizAnswer: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { quizAnswer } = quizAnswerSlice.actions

export default quizAnswerSlice.reducer
