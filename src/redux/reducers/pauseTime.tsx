import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
    ptime: '',
    courseID: '',
    unmount: '',
    chapterID: '',
    lessonID: '',
    accordianID: ''
};


export const pauseTimeReducer = createSlice({
    name: 'pauseTime',
    initialState,
    reducers: {
        pauseTimeState: (state, { payload }) => {
            state.ptime = payload
        },
        courseIDState: (state, { payload }) => {
            state.courseID = payload
        },
        unmountState: (state, { payload }) => {
            state.unmount = payload
        },
        chapterIDState: (state, { payload }) => {
            state.chapterID = payload
        },
        lessonIDState: (state, { payload }) => {
            state.lessonID = payload;
        },
        accordianIDState: (state, { payload }) => {
            state.accordianID = payload;
        },
    },
});

export const { pauseTimeState, courseIDState, unmountState, chapterIDState, lessonIDState, accordianIDState } = pauseTimeReducer.actions;
export default pauseTimeReducer.reducer;