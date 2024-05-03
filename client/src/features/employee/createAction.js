
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const createEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (formData, { rejectWithValue }) => {
    try {
      const formDataWithImage = new FormData();
      for (const key in formData) {
        formDataWithImage.append(key, formData[key]);
      }

      const response = await fetch(`${apiUrl}/api/employee/`, {
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
      const response = await axios.get(`${apiUrl}/api/employee/`);
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
      const response = await axios.get(`${apiUrl}/api/employee/nextEmployeeId`);
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
      await axios.delete(`${apiUrl}/api/employee/delete/${employeeId}`);
      await dispatch(fetchNextEmployeeId());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmployeeProfileData = createAsyncThunk(
  'employee/fetchEmployeeProfileData',
  async (id) => {
    const response = await fetch(`${apiUrl}/api/employee/allData/${id}`);
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
      const { EmployeeID, ...updatedData } = employeeData;
      const response = await axios.patch(`${apiUrl}/api/employee/update/${EmployeeID}`, updatedData);

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      return await response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

