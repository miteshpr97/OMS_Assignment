import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAlertData,
  createAlertData,
  deleteAlertData,
} from "./alertAction"

// Initial state
const initialState = {
  alertData: [],
  loading: false,
  error: null,
};

// Create a Redux slice
const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetching alert data
      .addCase(fetchAlertData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlertData.fulfilled, (state, action) => {
        state.loading = false;
        state.alertData = action.payload;
      })
      .addCase(fetchAlertData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Creating alert data
      .addCase(createAlertData.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAlertData.fulfilled, (state, action) => {
        state.loading = false;
        state.alertData.push(action.payload);
      })
      .addCase(createAlertData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Deleting alert data
      .addCase(deleteAlertData.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAlertData.fulfilled, (state, action) => {
        state.loading = false;
        state.alertData = state.alertData.filter(
          (alert) =>
            alert.AlertID !== action.payload.AlertID
        );
      })
      .addCase(deleteAlertData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

   
     
  },
});

// Export selectors to access state
export const selectAlertData = (state) => state.alert.alertData;
export const selectLoading = (state) => state.alert.loading;
export const selectError = (state) => state.alert.error;

export default alertSlice.reducer;
