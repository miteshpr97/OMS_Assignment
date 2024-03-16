import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define your API endpoints
const loginAPI = "http://localhost:3306/api/userDetails/login";
const signupAPI = "http://localhost:3306/api/userDetails";
const logoutAPI = "http://localhost:3306/api/userDetails/logout";

// Action creator for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(loginAPI, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      
      const data = response.data;
      if (response.status === 200 && data.user) {
        sessionStorage.setItem('userData', JSON.stringify(data.user));
        localStorage.setItem('token', JSON.stringify(data.token));
        return data;
      } else {
        return rejectWithValue('Invalid Employee ID or Password');
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action creator for signup
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(signupAPI, formData);
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Action creator for logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(logoutAPI);
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
