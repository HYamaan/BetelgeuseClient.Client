import {createSlice} from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const initialState = {
    courseId: "2d920b7c-5f46-49a5-bd90-420c815728f2",

};

export const courseInformationSlice = createSlice({
    name: 'authToken',
    initialState,
    reducers: {
        setCourseId: (state, action) => {
            state.courseId = action.payload;
        },
    }
});
export const {setCourseId} = courseInformationSlice.actions;
export default courseInformationSlice.reducer;
