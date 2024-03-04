import React, { useState,  useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid
} from "@mui/material";

const TaskDialog = ({ open, onClose, onCreateTask }) => {
  const [taskData, setTaskData] = useState({
    TaskID: "",
    EmployeeID:"",
    StartDate: "",
    EndDate: "",
    CreatedAt: "",
    TaskDescription: "",
  });
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
    setUserData(userDataFromSession);
  }, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSaveTask = () => {
    // Validation example: Check if required fields are not empty
    if (!taskData.TaskID || !taskData.StartDate || !taskData.EndDate || !taskData.CreatedAt || !taskData.TaskDescription) {
      alert("Please fill in all fields");
      return;
    }

    const newTask = { ...taskData };
    onCreateTask(newTask);
    onClose();

    // Clear form fields after submission
    setTaskData({
      TaskID: "",
      StartDate: "",
      EndDate: "",
      CreatedAt: "",
      TaskDescription: "",
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Task ID"
                variant="outlined"
                fullWidth
                margin="normal"
                name="EmployeeID"
                value={userData.EmployeeID}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Employee ID"
                variant="outlined"
                fullWidth
                margin="normal"
                name="TaskID"
                value={taskData.TaskID}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
                variant="outlined"
                fullWidth
                margin="normal"
                type="date"
                name="StartDate"
                value={taskData.StartDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date"
                variant="outlined"
                fullWidth
                margin="normal"
                type="date"
                name="EndDate"
                value={taskData.EndDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Created At"
                variant="outlined"
                fullWidth
                margin="normal"
                type="date"
                name="CreatedAt"
                value={taskData.CreatedAt}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Task Description"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                name="TaskDescription"
                value={taskData.TaskDescription}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveTask} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
