import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, Grid, InputLabel } from "@mui/material";
import StatusDialog from "./StatusDialog";

function Action({ StatusData }) {
  const [selectedValue, setSelectedValue] = useState("select");



  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackInput, setFeedbackInput] = useState("");
  const [assignment, setAssignmentData] = useState("");



  const handleFeedbackClick = (item) => {
    setIsFeedbackModalOpen(true);
    setAssignmentData(item);
  };

  const handleCloseFeedback = () => {
    setIsFeedbackModalOpen(false);
    setFeedbackInput(""); 
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleAdd = async (statusData) => {
    try {
      let newStatus;
      if (statusData.AssignmentStatus === "Assigned") {
        newStatus = "Progress";
      } else if (statusData.AssignmentStatus === "Progress") {
        newStatus = "Closed";
      } else {
       
        return;
      }
  
      const confirmed = window.confirm(`Move data to ${newStatus}?`);
  
      if (confirmed) {
        const apiUrl = `http://localhost:3306/api/assignmentDetails/${statusData.AssignmentID}/${statusData.EmployeeID}/${statusData.EmployeeID_AssignTo}/${newStatus}`;
  
        const response = await fetch(apiUrl, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
  
        if (response.ok) {
          
          window.location.reload();
        } else {
          console.error("Error updating task:", response.status);
        }
      } else {
        // User clicked cancel, do nothing
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  

  return (
    <>
      <Grid item xs={4} md={4}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Select</InputLabel>
          <Select
            value={selectedValue}
            onChange={handleChange}
            size="small"
            name="Select"
            required
            label="Select"
           
          >
            {StatusData.AssignmentStatus === "Assigned" && (
              <>
                <MenuItem value="ACCEPT" onClick={() => handleAdd(StatusData)}>Accept</MenuItem>
                <MenuItem value="CANCEL" onClick={() => handleFeedbackClick(StatusData)}>Reject</MenuItem>
                <MenuItem disabled>Progress</MenuItem>
                <MenuItem disabled>Regret</MenuItem>
                <MenuItem disabled>Complete</MenuItem>
              </>
            )}
            {StatusData.AssignmentStatus === "Progress" && (
              <>
                <MenuItem value="Closed" onClick={() => handleAdd(StatusData)}>Complete</MenuItem>
                <MenuItem value="REGRET" onClick={() => handleFeedbackClick(StatusData)}>Regret</MenuItem>
                <MenuItem disabled>Accept</MenuItem>
                <MenuItem disabled>Reject</MenuItem>
                <MenuItem disabled>Progress</MenuItem>
              </>
            )}
            {StatusData.AssignmentStatus === "Closed" && (
              <>
                <MenuItem disabled>Accept</MenuItem>
                <MenuItem disabled>Reject</MenuItem>
                <MenuItem disabled>Progress</MenuItem>
                <MenuItem disabled>Regret</MenuItem>
                <MenuItem disabled>Complete</MenuItem>
              </>
            )}
            {StatusData.AssignmentStatus === "Regret" && (
              <>
                <MenuItem disabled>Accept</MenuItem>
                <MenuItem disabled>Reject</MenuItem>
                <MenuItem disabled>Progress</MenuItem>
                <MenuItem disabled>Regret</MenuItem>
                <MenuItem disabled>Complete</MenuItem>
              </>
            )}
            {StatusData.AssignmentStatus === "Reject" && (
              <>
                <MenuItem disabled>Accept</MenuItem>
                <MenuItem disabled>Reject</MenuItem>
                <MenuItem disabled>Progress</MenuItem>
                <MenuItem disabled>Regret</MenuItem>
                <MenuItem disabled>Complete</MenuItem>
              </>
            )}
          </Select>
        </FormControl>
      </Grid>
      <StatusDialog
        open={isFeedbackModalOpen}
        statusData={assignment}
        onClose={handleCloseFeedback}
      />
    </>
  );
}

export default Action;
