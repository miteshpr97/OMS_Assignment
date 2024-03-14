import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createTaskData, fetchTaskData } from "../../features/Task/TaskActions";

const TaskDialog = ({ open, onClose }) => {
  const [taskData, setTaskData] = useState({
    EmployeeID: "",
    StartDate: "",
    EndDate: "",
    TaskDescription: "",
  });

  const [userData, setUserData] = useState(null);
  const [validated, setValidated] = useState(false); // Add state for form validation

  const dispatch = useDispatch();

  useEffect(() => {
    const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
    setUserData(userDataFromSession);
  }, []);

  useEffect(() => {
    dispatch(fetchTaskData());
  }, [dispatch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createTaskData({
        ...taskData,
        EmployeeID: userData.EmployeeID,
      })
    );
    dispatch(fetchTaskData(taskData));
    setTaskData({
      EmployeeID: "",
      StartDate: "",
      EndDate: "",
      TaskDescription: "",
    });

    onClose();
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} noValidate validated={validated}>
          {" "}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Employee ID"
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              className="btn mt-2 custom-button"
              style={{
                backgroundColor: "#055f85",
                borderColor: "#055f85",
                color: "white",
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;

// const handleSubmit = (event) => {
//   event.preventDefault();
//   dispatch(createTaskData(taskData));
//   onClose();
// };
