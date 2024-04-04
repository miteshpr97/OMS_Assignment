import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData } from "./authAction"; // Import the async thunk

const initialState = {
  userData: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});


export const selectUserData = (state) => state.user.userData;

export default authSlice.reducer;
