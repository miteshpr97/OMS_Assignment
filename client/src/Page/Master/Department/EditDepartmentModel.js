import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid
} from "@mui/material";

const EditDepartmentModel = ({ isOpen, handleClose, department }) => {
  const [editedDepartment, setEditedDepartment] = useState({});

 
  useEffect(() => {
    setEditedDepartment({ ...department });
  }, [department]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDepartment({ ...editedDepartment, [name]: value });
  };

  const handleSaveChanges = () => {
    // You can add logic here to save changes
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Department</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={3} >
            <Grid item md={12}>
              <TextField
                label="Department Name"
                variant="outlined"
                name="DepartmentName"
                value={editedDepartment.DepartmentName || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveChanges} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDepartmentModel;
