import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";

import {
  fetchDepartmentData,
  updateDepartmentData,
} from "../../../features/department/departmentActions";

const EditDepartmentModel = ({ isOpen, handleClose, department }) => {
  const [editedDepartment, setEditedDepartment] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setEditedDepartment({ ...department });
  }, [department]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDepartment({ ...editedDepartment, [name]: value });
  };

  const handleSaveChanges = () => {
    dispatch(
      updateDepartmentData({
        DepartmentID: editedDepartment.DepartmentID,
        formData: editedDepartment,
      })
    );
    dispatch(fetchDepartmentData());
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Department</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <TextField
                label="Department Name"
                variant="outlined"
                name="DepartmentName"
                value={editedDepartment.DepartmentName || ""}
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
