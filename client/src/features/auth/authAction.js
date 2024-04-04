import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userAPI = "http://localhost:3306/api/userDetails";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    try {
      const response = await axios.get(userAPI, { withCredentials: true }); 
      const data = response.data;
     
      return data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
);
