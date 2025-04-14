import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authentication: false,
    token: null,
    userId: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.authentication = true
            state.token = action.payload.token
            state.userId = action.payload.userId
        },
        logout(state) {
            state.authentication = false
            state.token = null
            state.userId = null
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;