import { createSlice } from "@reduxjs/toolkit";


export const auth = createSlice({
    name: "auth",
    initialState : {
        token: localStorage.getItem("token") || null,
        userId: localStorage.getItem("userId") || null,
        role: localStorage.getItem("role")|| null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
            localStorage.setItem("userId", action.payload);
        },
        setRole: (state, action) => {
            state.role = action.payload;
            localStorage.setItem("role", action.payload);
        },
        setLogout: (state) => {
            state.token = null;
            state.userId = null;
            state.role = null;
            localStorage.clear();
        },
    },
});

export const {  setLogout,setRole ,setToken,setUserId } = auth.actions;
export default auth.reducer;
