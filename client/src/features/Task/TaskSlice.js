import { createSlice } from "@reduxjs/toolkit";
import { createTaskData, fetchTaskData, deleteTaskData } from "./TaskActions";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTaskData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTaskData.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTaskData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTaskData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskData.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTaskData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTaskData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTaskData.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(task => task.id !== action.meta.arg.id);
      })
      .addCase(deleteTaskData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectTaskData = (state) => state.task.tasks;
export const selectTaskLoading = (state) => state.task.loading;
export const selectTaskError = (state) => state.task.error;

export default taskSlice.reducer;
