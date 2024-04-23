import {createSlice} from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

const initialState = {
    authToken: null
};
export const authTokenSlice = createSlice({
    name: 'authToken',
    initialState,
    reducers: {
        setAuthToken: (state, action) => {
            state.authToken = action.payload;
            Cookies.set('authToken', action.payload);
        },
        removeAuthToken: (state, action) => {
            if (!state.authToken) {
                Cookies.remove('authToken');
            }
        }
    }
});
export const {setAuthToken} = authTokenSlice.actions;
export default authTokenSlice.reducer;
