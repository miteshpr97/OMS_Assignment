// taskAction.js

import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

//  creating designation data

export const createTaskData = createAsyncThunk(
  "task/createTaskData",
  async (taskData) => { 
    try {
      const response = await axios.post('http://localhost:3306/api/taskDetails/withID', taskData);
      const data = response.data;
      return data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);


//  fetching designation data
export const fetchTaskData = createAsyncThunk(
  "Ttask/fetchTaskData",
  async () => {
    try {
      const response = await axios.get('http://localhost:3306/api/taskDetails/');
      const data = response.data;
      const reverse = data.reverse();
      return reverse;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);

//  deleting designation data
export const deleteTaskData = createAsyncThunk(
  "task/deleteTaskData",
  async (TaskID) => {
    try {
      const url = `http://localhost:3306/api/taskDetails/delete/${TaskID}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);
