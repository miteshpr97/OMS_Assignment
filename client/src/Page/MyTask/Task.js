import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from "@mui/material";

const TaskDialog = ({ open, onClose }) => {
  const [taskData, setTaskData] = useState({
    EmployeeID: "",
    StartDate: "",
    EndDate: "",
    TaskDescription: "",
  });
  const [userData, setUserData] = useState(null);
  const [validated, setValidated] = useState(false); // Add state for form validation

  useEffect(() => {
    const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
    setUserData(userDataFromSession);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3306/api/taskDetails/withID",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...taskData,
            EmployeeID: userData.EmployeeID,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Response:", responseData);

      // Reset the form data after successful submission
      setTaskData({
    
        EmployeeID: "",
        StartDate: "",
        EndDate: "",
   
        TaskStatus: "",
        TaskDescription: "",
      });

      // Reset form validation
      setValidated(false);
      window.alert("Form submitted successfully!");

      // Close the dialog
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Loding....</div>;
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
