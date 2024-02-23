

// import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
// import axios from "axios";

// const POST_URL = "http://localhost:3306/api/employee/";
// const NEXT_EMPLOYEE_ID_URL =
//   "http://localhost:3306/api/employee/nextEmployeeId";

// const DELETE_EMPLOYEE_URL = "http://localhost:3306/api/employee/delete/";

// //new employee Insert
// export const createEmployee = createAsyncThunk(
//   "employee/addEmployee",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const formDataWithImage = new FormData();
//       for (const key in formData) {
//         formDataWithImage.append(key, formData[key]);
//       }

//       const response = await fetch("http://localhost:3306/api/employee", {
//         method: "POST",
//         body: formDataWithImage,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to add employee");
//       }

//       return await response.json();
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Read employee
// export const showEmployee = createAsyncThunk("showEmployee", async (data) => {
//   try {
//     const response = await axios.get(POST_URL, data);
//     console.log(response.data);
//     // Reverse the data array
//     const reversedData = response.data.reverse();

//     return reversedData;
//   } catch (error) {
//     return isRejectedWithValue(error.response);
//   }
// });

// //next employeeID
// export const fetchNextEmployeeId = createAsyncThunk(
//   "employee/nextEmployeeId",
//   async () => {
//     try {
//       const response = await axios.get(NEXT_EMPLOYEE_ID_URL);
//       return response.data;
//     } catch (error) {
//       throw new Error("Failed to fetch next employee ID");
//     }
//   }
// );

// export const deleteEmployee = createAsyncThunk(
//   "employee/deleteEmployee",
//   async (employeeId, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await axios.delete(
//         `${DELETE_EMPLOYEE_URL}${employeeId}`
//       );
//       // After successful deletion, fetch the next employee ID
//       await dispatch(fetchNextEmployeeId());
//       return response.data; // If you expect some response data after deletion
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchEmployeeProfileData = createAsyncThunk(
//   'employee/fetchEmployeeProfileData',
//   async (id) => {
//     const response = await fetch(`http://localhost:3306/api/employee/allData/${id}`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch employee data');
//     }
//     const data = await response.json();
//     return data;
//   }
// );










import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:3306/api/employee/";
const UPDATE_EMPLOYEE_URL = `${API_BASE_URL}update/`;
const NEXT_EMPLOYEE_ID_URL = `${API_BASE_URL}nextEmployeeId`;
const DELETE_EMPLOYEE_URL = `${API_BASE_URL}delete/`;

export const createEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (formData, { rejectWithValue }) => {
    try {
      const formDataWithImage = new FormData();
      for (const key in formData) {
        formDataWithImage.append(key, formData[key]);
      }

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        body: formDataWithImage,
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const showEmployee = createAsyncThunk(
  "employee/showEmployee",
  async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      const reversedData = response.data.reverse();
      return reversedData;
    } catch (error) {
      return isRejectedWithValue(error.response);
    }
  }
);

export const fetchNextEmployeeId = createAsyncThunk(
  "employee/fetchNextEmployeeId",
  async () => {
    try {
      const response = await axios.get(NEXT_EMPLOYEE_ID_URL);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch next employee ID");
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (employeeId, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${DELETE_EMPLOYEE_URL}${employeeId}`);
      await dispatch(fetchNextEmployeeId());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmployeeProfileData = createAsyncThunk(
  'employee/fetchEmployeeProfileData',
  async (id) => {
    const response = await fetch(`${API_BASE_URL}allData/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch employee data');
    }
    const data = await response.json();
    return data;
  }
);


export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (employeeData, { rejectWithValue }) => {
    try {
      const { employeeId, ...updatedData } = employeeData;
      const response = await axios.patch(`${UPDATE_EMPLOYEE_URL}${employeeId}`, updatedData);

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      return await response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

