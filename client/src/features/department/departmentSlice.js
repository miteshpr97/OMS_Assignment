

import { createSlice } from "@reduxjs/toolkit";
import { createDepartmentData, fetchDepartmentData, deleteDepartmentData } from "./departmentActions";

export const departmentSlice = createSlice({
  name: 'department',
  initialState: {
    departmentName: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Define additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartmentData.pending, (state) => {
        state.loading = true;
        // state.error = null;
      })
      .addCase(fetchDepartmentData.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentName = action.payload;
      })
      .addCase(fetchDepartmentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDepartmentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDepartmentData.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentName = action.payload;
      })
      .addCase(createDepartmentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Deleting designation data
      .addCase(deleteDepartmentData.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDepartmentData.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentName = state.departmentName.filter(department => department.DepartmentID !== action.payload.DepartmentID);
      })
      .addCase(deleteDepartmentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

  },
});

export const selectDepartments = (state) => state.department.departmentName;
export const selectDepartmentLoading = (state) => state.department.loading;
export const selectDepartmentError = (state) => state.department.error;

export default departmentSlice.reducer;
