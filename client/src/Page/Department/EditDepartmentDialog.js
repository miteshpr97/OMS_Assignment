import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";

const EditDepartmentDialog = ({ open, handleClose, department, handleSaveChanges }) => {
  const [editedDepartment, setEditedDepartment] = useState({ ...department });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDepartment({ ...editedDepartment, [name]: value });
  };

  const handleSave = () => {
    handleSaveChanges(editedDepartment);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Department</DialogTitle>
      <br></br>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Department ID"
              variant="outlined"
              fullWidth
              name="DepartmentID"
              value={editedDepartment?.DepartmentID || ""}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Department Name"
              variant="outlined"
              fullWidth
              name="DepartmentName"
              value={editedDepartment?.DepartmentName || ""}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={handleSave} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDepartmentDialog;
