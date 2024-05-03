// // departmentActions.js

// import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
// import axios from "axios";

// //  creating department data

// export const createDepartmentData = createAsyncThunk(
//   "department/createDepartmentData",
//   async (formData) => { // Ensure formData is being received
//     try {
//       const response = await axios.post('http://localhost:3306/api/department/withID', formData);
//       const data = response.data;
//       return data;
//     } catch (error) {
//       return isRejectedWithValue(error.response.data);
//     }
//   }
// );

// //  fetching department data
// export const fetchDepartmentData = createAsyncThunk(
//   "department/fetchDepartmentData",
//   async () => {
//     try {
//       const response = await axios.get('http://localhost:3306/api/department');
//       const data = response.data;
//       //const reverse = data.reverse();
//       return data;
//     } catch (error) {
//       return isRejectedWithValue(error.response.data);
//     }
//   }
// );

// // update department data
// export const updateDepartmentData = createAsyncThunk(
//   "department/updateDepartmentData", 
//   async ({ DepartmentID, formData }) => {
//     try {
//       const url = `http://localhost:3306/api/department/update/${DepartmentID}`;
//       const response = await axios.patch(url, formData); 
//       return response.data;
//     } catch (error) {
//       return isRejectedWithValue(error.response.data);
//     }
//   }
// );


// //  deleting department data
// export const deleteDepartmentData = createAsyncThunk(
//   "department/deleteDepartmentData",
//   async (DepartmentID) => {
//     try {
//       const url = `http://localhost:3306/api/department/delete/${DepartmentID}`;
//       const response = await axios.delete(url);
//       return response.data;
//     } catch (error) {
//       return isRejectedWithValue(error.response.data);
//     }
//   }
// );





import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// creating department data
export const createDepartmentData = createAsyncThunk(
  "department/createDepartmentData",
  async (formData) => {
    try {
      const response = await axios.post(`${apiUrl}/api/department/withID`, formData);
      const data = response.data;
      return data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);

// fetching department data
export const fetchDepartmentData = createAsyncThunk(
  "department/fetchDepartmentData",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/department`);
      const data = response.data;
      return data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);

// update department data
export const updateDepartmentData = createAsyncThunk(
  "department/updateDepartmentData",
  async ({ DepartmentID, formData }) => {
    try {
      const url = `${apiUrl}/api/department/update/${DepartmentID}`;
      const response = await axios.patch(url, formData);
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);

// deleting department data
export const deleteDepartmentData = createAsyncThunk(
  "department/deleteDepartmentData",
  async (DepartmentID) => {
    try {
      const url = `${apiUrl}/api/department/delete/${DepartmentID}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);
