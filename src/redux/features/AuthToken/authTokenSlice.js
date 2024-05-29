import {createSlice} from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const initialState = {
    authToken: null,
    refreshToken: null
};
export const authTokenSlice = createSlice({
    name: 'authToken',
    initialState,
    reducers: {
        setAuthToken: (state, action) => {
            state.authToken = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        }
    }
});
export const {setAuthToken, setRefreshToken} = authTokenSlice.actions;
export default authTokenSlice.reducer;
