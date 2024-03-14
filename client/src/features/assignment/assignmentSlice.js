import { createSlice } from "@reduxjs/toolkit";
import { fetchAssignmentData, createAssignment, fetchAssignmentCounts, deleteAssignmentData } from "./assignmentAction";

export const assignmentSlice = createSlice({
  name: 'assignment',
  initialState: {
    assignmentData: [],
    assignmentCounts: {},
    loading: false,
    error: null,
  },
  reducers: {
    // Additional reducers can be defined here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignmentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignmentData.fulfilled, (state, action) => {
        state.loading = false;
        state.assignmentData = action.payload;
      })
      .addCase(fetchAssignmentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the created assignment if needed
      })
      .addCase(createAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAssignmentCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignmentCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.assignmentCounts = action.payload;
      })
      .addCase(fetchAssignmentCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

        // Deleting designation data
        .addCase(deleteAssignmentData.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteAssignmentData.fulfilled, (state, action) => {
          state.loading = false;
          state.assignmentData = state.assignmentData.filter(assignment => assignment.AssignmentID !== action.payload.AssignmentID);
        })
        .addCase(deleteAssignmentData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
  },
});

export const selectAssignment = (state) => state.assignment.assignmentData;
export const selectAssignmentCounts = (state) => state.assignment.assignmentCounts;
export const selectAssignmentLoading = (state) => state.assignment.loading;
export const selectAssignmentError = (state) => state.assignment.error;

export default assignmentSlice.reducer;
