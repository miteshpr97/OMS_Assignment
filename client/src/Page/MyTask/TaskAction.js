import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, Grid, InputLabel } from "@mui/material";

function TaskAction({ StatusData }) {
  const [selectedValue, setSelectedValue] = useState("select");
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleAdd = async () => {
    try {
      let newStatus;
      if (StatusData.TaskStatus === "Assigned") {
        newStatus = "Progress";
      } else if (StatusData.TaskStatus === "Progress") {
        newStatus = "Closed";
      } else {
        return;
      }

      const confirmed = window.confirm(`Move data to ${newStatus}?`);

      if (confirmed) {
        const apiUrlData = `${apiUrl}/api/taskDetails/${StatusData.TaskID}/${newStatus}`;

        const response = await fetch(apiUrlData, {
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
    <Grid item xs={4} md={4}>
      <FormControl fullWidth variant="outlined" sx={{width:"80px", marginLeft:"5px"}}>
        <InputLabel>Select</InputLabel>
        <Select
          value={selectedValue}
          onChange={handleChange}
          size="small"
          name="Select"
          required
          label="Select"
        >
          {StatusData.TaskStatus === "Assigned" && (
            <>
              <MenuItem value="Progress" onClick={handleAdd}>
                Accept
              </MenuItem>
              <MenuItem disabled>Progress</MenuItem>
              <MenuItem disabled>Complete</MenuItem>
            </>
          )}
          {StatusData.TaskStatus === "Progress" && (
            <>
              <MenuItem value="Closed" onClick={handleAdd}>
                Complete
              </MenuItem>
              <MenuItem disabled>Accept</MenuItem>
              <MenuItem disabled>Progress</MenuItem>
            </>
          )}
          {StatusData.TaskStatus === "Closed" && (
            <>
              <MenuItem disabled>Accept</MenuItem>
              <MenuItem disabled>Progress</MenuItem>
              <MenuItem disabled>Complete</MenuItem>
            </>
          )}
        </Select>
      </FormControl>
    </Grid>
  );
}

export default TaskAction;
