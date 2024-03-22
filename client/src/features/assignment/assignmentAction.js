// assignementActions.js
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

//fetch department Data
export const fetchAssignmentData = createAsyncThunk(
  "assignment/fetchAssignmentData",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:3306/api/assignmentDetails/allData"
      );
      const Data = response.data;
      const reverse = Data.reverse();
      return reverse;
    } catch (error) {
      return isRejectedWithValue(error.response);
    }
  }
);

// craete assignment
export const createAssignment = createAsyncThunk(
  "assignment/createAssignment",
  async (assignmentData) => {
    try {
      const response = await axios.post(
        "http://localhost:3306/api/assignmentDetails/",
        assignmentData
      );
      const data = response.data;

      return data;
    } catch (error) {
      return isRejectedWithValue(error.response);
    }
  }
);

// Fetch assignment counts based on EmployeeID_AssignTo
export const fetchAssignmentCounts = createAsyncThunk(
  "assignment/fetchAssignmentCounts",
  async (EmployeeID_AssignTo) => {
    try {
      const response = await axios.get(
        `http://localhost:3306/api/assignmentDetails/${EmployeeID_AssignTo}/assignmentCounts`
      );
      const assignmentCounts = response.data;

      return assignmentCounts;
    } catch (error) {
      return isRejectedWithValue(error.response);
    }
  }
);

//  deleting assignment data
export const deleteAssignmentData = createAsyncThunk(
  "assignment/deleteAssignmentData",
  async (AssignmentID,EmployeeID, EmployeeID_AssignTo) => {
    try {
      const url = `http://localhost:3306/api/assignmentDetails/delete/${AssignmentID}/${EmployeeID}/${EmployeeID_AssignTo}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);



// update department data
export const updateAssignmentData = createAsyncThunk(
  "assignment/updateAssignmentData", 
  async ({ AssignmentID,EmployeeID,EmployeeID_AssignTo, formData }) => {
    try {
      const url = `http://localhost:3306/api/assignmentDetails/update/${AssignmentID}/${EmployeeID}/${EmployeeID_AssignTo}`;
      const response = await axios.patch(url, formData); 
      return response.data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);





