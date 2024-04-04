// authAction.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userAPI = "http://localhost:3306/api/userDetails";


export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async () => {
    try {
      const response = await axios.get(userAPI);
      const data = response.data.user;
     
      return data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  }
);



//authAction.js

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const userAPI = "http://localhost:3306/api/userDetails";

// export const fetchUserData = createAsyncThunk(
//   "user/fetchUserData",
//   async (_, { rejectWithValue }) => {
//     try {
//       // Retrieve JWT token from local storage
//       const token = localStorage.getItem('token');
      
     
//       const response = await axios.get(userAPI, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       // Return user data from response
//       return response.data.user;
//     } catch (error) {
     
//       return rejectWithValue(error.message);
//     }
//   }
// );
