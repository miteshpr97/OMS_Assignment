
// departmentSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { createDepartmentData, fetchDepartmentData, deleteDepartmentData, updateDepartmentData } from "./departmentActions";

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
      })


      .addCase(updateDepartmentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDepartmentData.fulfilled, (state, action) => {
        state.loading = false;
        const updatedDepartment = action.payload;
        state.departmentName = state.departmentName.map(department => {
          if (department.DepartmentID === updatedDepartment.DepartmentID) {
            return { ...department, ...updatedDepartment };
          }
          return department;
        });
      })
      .addCase(updateDepartmentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      
  },
});

export const selectDepartments = (state) => state.department.departmentName;
export const selectDepartmentLoading = (state) => state.department.loading;
export const selectDepartmentError = (state) => state.department.error;

export default departmentSlice.reducer;
