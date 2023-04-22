import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
    tab: 1,
    accordian: 1,
    mycoursetab: 1,
    hometab: 1,
    firstVideo:'',
    videoLink: '',
    notify:true,
};


export const mycourseReducer = createSlice({
    name: 'mycourse',
    initialState,
    reducers: {
        tabToggleState: (state, { payload }) => {
            state.tab = payload
        },
        mycoursetabToggleState: (state, { payload }) => {
            state.mycoursetab = payload
        },
        accordianToggleState: (state, { payload }) => {
            state.accordian = payload
        },
        homeTabToggleState: (state, { payload }) => {
            state.hometab = payload
        },
        videoLinkState: (state, { payload }) => {
            state.videoLink = payload
        },
        firstVideoState: (state, { payload }) => {
            state.firstVideo = payload
            // state.videoLink = payload
        },
        notifyState: (state, { payload }) => {
            state.notify = payload
            // state.videoLink = payload
        }

    },
});

export const { tabToggleState, accordianToggleState, mycoursetabToggleState, homeTabToggleState, videoLinkState, firstVideoState, notifyState } = mycourseReducer.actions;
export default mycourseReducer.reducer;