import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,

} from "@mui/material";
import { format } from "date-fns";


const TaskEditModal = ({ isOpen, onClose, taskData }) => {
  const [formData, setFormData] = useState(null);

console.log(taskData, "edit");
  useEffect(() => {
    if (taskData) {
      setFormData(taskData);
    }
  }, [taskData]);

  const handleClose = () => {
    onClose();
  };

  if (!isOpen || !formData) {
    return null;
  }

  const {
    TaskDescription,
    StartDate,
    CreatedAt,
    EndDate,
  } = formData;

  const formatDate = (dateString) => {
    return format(new Date(dateString), "yyyy-MM-dd");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
  
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Employee</DialogTitle>
      <br></br>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Task Description "
              name="TaskDescription"
              value={TaskDescription}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Start Date"
              name="StartDate"
              value={formatDate(StartDate)}
              fullWidth
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Created At"
              name="CreatedAt"
              value={formatDate(CreatedAt)}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="End Date"
              name="EndDate"
              value={formatDate(EndDate)}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <br />
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskEditModal;
