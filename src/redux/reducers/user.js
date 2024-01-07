import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    error: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
        logout: (state) => {
            return initialState;
        }
    }
})

export const { loginStart, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;