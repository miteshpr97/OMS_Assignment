// import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
// import axios from "axios";

// //fetch department Data
// export const fetchDepartmentData= createAsyncThunk(
//     "department/fetchDepartmentData",
//     async () => {
//       try {
//         const response = await axios.get('http://localhost:3306/api/department');
//         const Data = response.data;

//         return Data;
    
//       } catch (error) {
//         return isRejectedWithValue(error.response);
//       }
//     }
//   );



// departmentActions.js
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

//fetch department Data
export const fetchDepartmentData = createAsyncThunk(
  "department/fetchDepartmentData",
  async () => {
    try {
      const response = await axios.get('http://localhost:3306/api/department');
      const Data = response.data;

      return Data;
  
    } catch (error) {
      return isRejectedWithValue(error.response);
    }
  }
);
