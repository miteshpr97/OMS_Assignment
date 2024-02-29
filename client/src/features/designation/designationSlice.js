import { createSlice } from "@reduxjs/toolkit";
import { fetchDesignationData, createDesignationData, deleteDesignationData } from './designationAction';

const initialState = {
  designationData: [],
  loading: false,
  error: null
};

const designationSlice = createSlice({
  name: "designation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetching designation data
      .addCase(fetchDesignationData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDesignationData.fulfilled, (state, action) => {
        state.loading = false;
        state.designationData = action.payload;
      })
      .addCase(fetchDesignationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Creating designation data
      .addCase(createDesignationData.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDesignationData.fulfilled, (state, action) => {
        state.loading = false;
        state.designationData.push(action.payload);
      })
      .addCase(createDesignationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Deleting designation data
      .addCase(deleteDesignationData.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDesignationData.fulfilled, (state, action) => {
        state.loading = false;
        state.designationData = state.designationData.filter(designation => designation.id !== action.payload.id);
      })
      .addCase(deleteDesignationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectdesignationData = (state) => state.designation.designationData;
export const selectLoading = (state) => state.designation.loading;
export const selectError = (state) => state.designation.error;

export default designationSlice.reducer;