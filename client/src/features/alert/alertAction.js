

import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// creating Alert data
export const createAlertData = createAsyncThunk(
  "alert/createAlertData",
  async (formData) => {
    try {
      const response = await axios.post(`${apiUrl}/api/alertDetails/`, formData);
      const data = response.data;
      console.log("dhdhdhhdhd")
      return data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);

// fetching alert data
export const fetchAlertData = createAsyncThunk(
  "alert/fetchAlertData",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/alertDetails`);
      const data = response.data;
      return data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);


// deleting designation data
export const deleteAlertData = createAsyncThunk(
  "alert/deleteAlertData",
  async (selectedAlertID) => {
    try {
      const url = `${apiUrl}/api/alertDetails/delete/${selectedAlertID}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);
