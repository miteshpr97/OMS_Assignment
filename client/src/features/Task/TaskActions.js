// // taskAction.js

// import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
// import axios from "axios";

// //  creating task data

// export const createTaskData = createAsyncThunk(
//   "task/createTaskData",
//   async (taskData) => { 
//     try {
//       const response = await axios.post('http://localhost:3306/api/taskDetails/withID', taskData);
//       const data = response.data;
//       return data;
//     } catch (error) {
//       return isRejectedWithValue(error.response.data);
//     }
//   }
// );

// //  fetching task data
// export const fetchTaskData = createAsyncThunk(
//   "Ttask/fetchTaskData",
//   async () => {
//     try {
//       const response = await axios.get('http://localhost:3306/api/taskDetails/');
//       const data = response.data;
//       const reverse = data.reverse();
//       return reverse;
//     } catch (error) {
//       return isRejectedWithValue(error.response.data);
//     }
//   }
// );

// //  deleting task data
// export const deleteTaskData = createAsyncThunk(
//   "task/deleteTaskData",
//   async (TaskID) => {
//     try {
//       const url = `http://localhost:3306/api/taskDetails/delete/${TaskID}`;
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

// creating task data
export const createTaskData = createAsyncThunk(
  "task/createTaskData",
  async (taskData) => {
    try {
      const response = await axios.post(`${apiUrl}/api/taskDetails/withID`, taskData);
      const data = response.data;
      return data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);

// fetching task data
export const fetchTaskData = createAsyncThunk(
  "task/fetchTaskData",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/taskDetails/`);
      const data = response.data;
      const reverse = data.reverse();
      return reverse;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);

// deleting task data
export const deleteTaskData = createAsyncThunk(
  "task/deleteTaskData",
  async (TaskID) => {
    try {
      const url = `${apiUrl}/api/taskDetails/delete/${TaskID}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);
