// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const userAPI = "http://localhost:3306/api/userDetails";

// export const fetchUserData = createAsyncThunk(
//   "user/fetchUserData",
//   async () => {
//     try {
//       const response = await axios.get(userAPI, { withCredentials: true }); 
//       const data = response.data;
     
//       return data;
//     } catch (error) {
//       throw new Error(error.response.data);
//     }
//   }
// );





import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Access environment variable
const apiUrl = process.env.REACT_APP_API_URL;

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/userDetails`, { withCredentials: true }); 
      const data = response.data;
     
      return data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
);
