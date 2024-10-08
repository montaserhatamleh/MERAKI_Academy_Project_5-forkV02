import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
    role: localStorage.getItem("role") || null,
    rider_id: localStorage.getItem("rider_id") || null,
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
    setRider_id: (state, action) => {
      state.rider_id = action.payload;
      localStorage.setItem("rider_id", action.payload);
    },
    setLogout: (state) => {
      state.token = null;
      state.userId = null;
      state.role = null;
      state.rider_id = null;
      localStorage.clear();
    },
  },
});

export const { setLogout, setRole, setToken, setUserId, setRider_id } =
  auth.actions;
export default auth.reducer;
