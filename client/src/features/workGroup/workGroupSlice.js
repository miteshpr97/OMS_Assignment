
// workgroupSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchWorkGroupData,
  createWorkGroup,
  deleteWorkGroupData,
} from "./workGroupAction";

export const workgroupSlice = createSlice({
  name: "workgroup",
  initialState: {
    workGroupData: [],
    loading: false,
    error: null,
    selectedEmployees: [],
  },
  reducers: {
    addSelectedEmployee(state, action) {
      state.selectedEmployees.push(action.payload);
    },
    removeSelectedEmployee(state, action) {
      state.selectedEmployees = state.selectedEmployees.filter(
        (employee) => employee.EmployeeID !== action.payload.EmployeeID
      );
    },
    clearSelectedEmployees(state) {
      state.selectedEmployees = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkGroupData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkGroupData.fulfilled, (state, action) => {
        state.loading = false;
        state.workGroupData = action.payload;
      })
      .addCase(fetchWorkGroupData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createWorkGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWorkGroup.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally, you can update state.data if needed
      })
      .addCase(createWorkGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteWorkGroupData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkGroupData.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted work group from state.data if needed
        state.workGroupData = state.workGroupData.filter(workgroup => workgroup.WorkGroupID !== action.payload);
      })
      .addCase(deleteWorkGroupData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectWorkGroups = (state) => state.workgroup.workGroupData;
export const selectWorkGroupLoading = (state) => state.workgroup.loading;
export const selectWorkGroupError = (state) => state.workgroup.error;

// Corrected export statement
export const { addSelectedEmployee, removeSelectedEmployee, clearSelectedEmployees } = workgroupSlice.actions;

export default workgroupSlice.reducer;
