// import { createSlice } from "@reduxjs/toolkit";
// import { createEmployee, showEmployee, fetchNextEmployeeId, deleteEmployee, fetchEmployeeProfileData } from "./createAction";

// export const employeeDetailsSlice = createSlice({
//   name: 'employeeDetails',
//   initialState: {
//     employee: [],
//     loading: false,
//     error: null,
//     nextEmployeeId: null,
//     profileData: null, // New state to store employee profile data
//     selectEmployees: [],
//   },
//   reducers: {
//     deleteEmployeeState: (state, action) => {
//       state.employee = state.employee.filter(emp => emp.id !== action.payload.employeeId);
//     },
//     setProfileData: (state, action) => {
//       state.profileData = action.payload;
//     },
    
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createEmployee.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createEmployee.fulfilled, (state, action) => {
//         state.loading = false;
//         state.employee = action.payload;
//       })
//       .addCase(createEmployee.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(showEmployee.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(showEmployee.fulfilled, (state, action) => {
//         state.loading = false;
//         state.employee = action.payload;
//       })
//       .addCase(showEmployee.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchNextEmployeeId.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchNextEmployeeId.fulfilled, (state, action) => {
//         state.loading = false;
//         state.nextEmployeeId = action.payload;
//       })
//       .addCase(fetchNextEmployeeId.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(deleteEmployee.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteEmployee.fulfilled, (state, action) => {
//         state.loading = false;
//       })
//       .addCase(deleteEmployee.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Handling fetchEmployeeProfileData
//       .addCase(fetchEmployeeProfileData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchEmployeeProfileData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.profileData = action.payload;
//       })
//       .addCase(fetchEmployeeProfileData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const selectEmployee = (state) => state.employeeDetails.employee;
// export const selectLoading = (state) => state.employeeDetails.loading;
// export const selectError = (state) => state.employeeDetails.error;
// export const selectNextEmployeeId = (state) => state.employeeDetails.nextEmployeeId;
// export const selectProfileData = (state) => state.employeeDetails.profileData; // Selector for profile data

// export default employeeDetailsSlice.reducer;







import { createSlice } from "@reduxjs/toolkit";
import { createEmployee, showEmployee, fetchNextEmployeeId, deleteEmployee, fetchEmployeeProfileData, updateEmployee } from "./createAction";

export const employeeDetailsSlice = createSlice({
  name: 'employeeDetails',
  initialState: {
    employee: [],
    loading: false,
    error: null,
    nextEmployeeId: null,
    profileData: null, // New state to store employee profile data
    selectEmployees: [],
  },
  reducers: {
    deleteEmployeeState: (state, action) => {
      state.employee = state.employee.filter(emp => emp.id !== action.payload.employeeId);
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(showEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(showEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchNextEmployeeId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNextEmployeeId.fulfilled, (state, action) => {
        state.loading = false;
        state.nextEmployeeId = action.payload;
      })
      .addCase(fetchNextEmployeeId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEmployeeProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
      })
      .addCase(fetchEmployeeProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = state.employee.map(emp => {
          if (emp.EmployeeID === action.payload.EmployeeID) {
            return action.payload; // Replace the existing employee with the updated one
          } else {
            return emp; // Return unchanged employee
          }
        });
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectEmployee = (state) => state.employeeDetails.employee;
export const selectLoading = (state) => state.employeeDetails.loading;
export const selectError = (state) => state.employeeDetails.error;
export const selectNextEmployeeId = (state) => state.employeeDetails.nextEmployeeId;
export const selectProfileData = (state) => state.employeeDetails.profileData; // Selector for profile data

export default employeeDetailsSlice.reducer;




