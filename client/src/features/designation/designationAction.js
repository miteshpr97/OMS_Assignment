// desiganationAction.js

import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

//  creating designation data

export const createDesignationData = createAsyncThunk(
  "designation/createDesignation",
  async (formData) => { // Ensure formData is being received
    try {
      const response = await axios.post('http://localhost:3306/api/designation/withID', formData);
      const data = response.data;
      return data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);


//  fetching designation data
export const fetchDesignationData = createAsyncThunk(
  "designation/fetchDesignation",
  async () => {
    try {
      const response = await axios.get('http://localhost:3306/api/designation');
      const data = response.data;
      //const reverse = data.reverse();
      return data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);

//  deleting designation data
export const deleteDesignationData = createAsyncThunk(
  "designation/deleteDesignationData",
  async (DesignationID) => {
    try {
      const url = `http://localhost:3306/api/designationdelete/${DesignationID}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);
