import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { format } from "date-fns";
import { updateEmployee, showEmployee } from "../../features/employee/createAction";

const EmployeeEditModal = ({ isOpen, onClose, employeeData }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (employeeData) {
      setFormData(employeeData);
    }
  }, [employeeData]);

  const handleClose = () => {
    onClose();
  };

  const dispatch = useDispatch();

  if (!isOpen || !formData) {
    return null;
  }

  const {
    FirstName,
    LastName,
    Email,
    ContactNumber,
    Gender,
    Address,
    JoinDate,
    EmploymentStatus,
    DepartmentID,
    DesignationID,
    DateOfBirth,
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
    dispatch(updateEmployee(formData));
    dispatch(showEmployee(formData))

    console.log(formData, "hhh");
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
              label="First Name"
              name="FirstName"
              value={FirstName}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              name="LastName"
              value={LastName}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              name="Email"
              value={Email}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Contact Number"
              name="ContactNumber"
              value={ContactNumber}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Address"
              name="Address"
              value={Address}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Join Date"
              type="date"
              name="JoinDate"
              value={formatDate(DateOfBirth)}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date of Birth"
              type="date"
              name="DateOfBirth"
              value={formatDate(DateOfBirth)}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                name="Gender"
                value={Gender}
                fullWidth
                onChange={handleChange}
              >
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Employment Status</InputLabel>
              <Select
                name="EmploymentStatus"
                value={EmploymentStatus}
                fullWidth
                onChange={handleChange}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Department ID"
              name="DepartmentID"
              value={DepartmentID}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Designation ID"
              name="DesignationID"
              value={DesignationID}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <br />
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
        
          <Button onClick={handleClose} variant="contained" sx={{background:"grey"}}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" sx={{background:"#055f85"}}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeEditModal;
