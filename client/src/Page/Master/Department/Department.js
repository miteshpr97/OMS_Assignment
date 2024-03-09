import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Button,
  Dialog,
  IconButton,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material"; // Import IconButton
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import { useDispatch, useSelector } from "react-redux";
import {
  createDepartmentData,
  fetchDepartmentData,
  deleteDepartmentData,
} from "../../../features/department/departmentActions";
import { selectDepartments } from "../../../features/department/departmentSlice";

import ViewDepartmentData from "./ViewDepartmentData";

const Department = () => {
  const dispatch = useDispatch();
  const departments = useSelector(selectDepartments);
  // const Loading = useSelector(selectLoading);
  // const error = useSelector(selectError);

  const [formData, setFormData] = useState({
    DepartmentName: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDepartmentData());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(createDepartmentData(formData));
      setFormData({ DepartmentName: "" }); // Reset form fields after submission if needed
      dispatch(fetchDepartmentData());
      handleClose();
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };

  const handleDeleteDepartment = async (DepartmentID) => {
    try {
      await dispatch(deleteDepartmentData(DepartmentID));
      console.log(DepartmentID);
      dispatch(fetchDepartmentData());
    } catch (error) {
      console.error("Error deleting designation:", error);
    }
  };

  return (
    <Box >
      <div style={{ padding: "10px", border: "2px solid #dddddd" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "10px",
          }}
        >
          <Typography variant="h5" style={{ fontWeight: "500" }}>
            Department Data
          </Typography>

          <Button
            onClick={handleClickOpen}
            variant="contained"
            sx={{
              backgroundColor: "#055f85",
              color: "#fff",
              padding: "8px 16px",
            }}
          >
            CREATE NEW DEPARTMENT
          </Button>
        </div>
        <ViewDepartmentData
          departments={departments}
          //  isLoading={isLoading}
          //  error={error}
          handleDeleteDepartment={handleDeleteDepartment }
        />
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontSize: "22px", padding: "16px 24px 5px 24px" }}>
          NEW DEPARTMENT
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 15,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <div className="New-departmemt">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <TextField
                    label="DepartmentName"
                    variant="outlined"
                    name="DepartmentName"
                    value={formData.DepartmentName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
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
                  variant="contained"
                  className="btn mt-2 custom-button"
                  disabled={isLoading}
                  style={{ backgroundColor: "#055f85", color: "#fff" }}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Department;
