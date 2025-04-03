import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authentication: false,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.authentication = true
            state.token = action.payload
        },
        logout(state) {
            state.authentication = false
            state.token = null
        }
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;