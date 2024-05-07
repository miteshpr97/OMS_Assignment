// In store.js
import { configureStore } from "@reduxjs/toolkit";
import employeeDetailsReducer from "../features/employee/employeeDetailsSlice";
import departmentReducer from "../features/department/departmentSlice";
import workgroupReducer from "../features/workGroup/workGroupSlice";
import assignmentReducer from "../features/assignment/assignmentSlice";
import designationReducer from "../features/designation/designationSlice"; // Import the designation reducer
import taskReducer from "../features/Task/TaskSlice";
import authReducer from   "../features/auth/authSlice";
import alertReducer from "../features/alert/alertSlice";

export const store = configureStore({
  reducer: {
    employeeDetails: employeeDetailsReducer,
    department: departmentReducer,
    designation: designationReducer,
    workgroup: workgroupReducer,
    assignment: assignmentReducer,
    task: taskReducer,
    user: authReducer,
    alert: alertReducer,
  },
});
