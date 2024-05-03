
// // workgroupActions.js
// import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
// import axios from "axios";

// // Fetching work group data
// export const fetchWorkGroupData = createAsyncThunk(
//   'workgroup/fetchWorkGroupData',
//   async () => {
//     try {
//       const response = await axios.get('http://localhost:3306/api/workGroup/allData');
//       const reverse = response.data.reverse()
//       return reverse ; // Return the data from the response
//     } catch (error) {
//       return isRejectedWithValue(error.message || 'Failed to fetch work group data'); // Use error message or a default message
//     }
//   }
// );

// // Submitting selected employees
// export const createWorkGroup = createAsyncThunk(
//   'workgroup/createWorkGroup',
//   async (dataToSend) => {
//     try {
//       const response = await axios.post("http://localhost:3306/api/workGroup/multiple", dataToSend, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       return response.data; // Return the data from the response
//     } catch (error) {
//       return isRejectedWithValue(error.message || 'Failed to submit selected employees'); // Use error message or a default message
//     }
//   }
// );

// // Deleting work group data
// export const deleteWorkGroupData = createAsyncThunk(
//   'workgroup/deleteWorkGroupData',
//   async (workgroupID, thunkAPI) => {
//     try {
//       await axios.delete(`http://localhost:3306/api/workGroup/delete/${workgroupID}`, {
//         headers: {
//           'Content-Type': 'application/json'
//           // Add any necessary headers like authorization token
//         }
//       });
//       return workgroupID; // Return the workgroupID upon successful deletion
//     } catch (error) {
//       return isRejectedWithValue(error.message || 'Failed to delete work group data'); // Use error message or a default message
//     }
//   }
// );





// workgroupActions.js
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

// Fetching work group data
export const fetchWorkGroupData = createAsyncThunk(
  'workgroup/fetchWorkGroupData',
  async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/workGroup/allData`);
      const reverse = response.data.reverse();
      return reverse;
    } catch (error) {
      return isRejectedWithValue(error.message || 'Failed to fetch work group data');
    }
  }
);

// Submitting selected employees
export const createWorkGroup = createAsyncThunk(
  'workgroup/createWorkGroup',
  async (dataToSend) => {
    try {
      const response = await axios.post(`${apiUrl}/api/workGroup/multiple`, dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.message || 'Failed to submit selected employees');
    }
  }
);

// Deleting work group data
export const deleteWorkGroupData = createAsyncThunk(
  'workgroup/deleteWorkGroupData',
  async (workgroupID, thunkAPI) => {
    try {
      await axios.delete(`${apiUrl}/api/workGroup/delete/${workgroupID}`, {
        headers: {
          'Content-Type': 'application/json'
          // Add any necessary headers like authorization token
        }
      });
      return workgroupID;
    } catch (error) {
      return isRejectedWithValue(error.message || 'Failed to delete work group data');
    }
  }
);
