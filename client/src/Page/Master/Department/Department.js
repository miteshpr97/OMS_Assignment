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
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
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
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

      // Handle success response
      setSuccessMessage("Department Created successfully!");

      // Clear the success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

      setFormData({ DepartmentName: "" }); // Reset form fields after submission if needed
      dispatch(fetchDepartmentData());
      handleClose();
    } catch (error) {
      console.error("Error creating department:", error);
      setError("Error adding department");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDepartment = async (DepartmentID) => {
    setLoading(true);
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this Department?"
      );
      if (!confirmed) {
        setLoading(false);
        return; // Exit function if user cancels deletion
      }

      await dispatch(deleteDepartmentData(DepartmentID));
      // console.log(DepartmentID);

      setSuccessMessage("Department deleted successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

      dispatch(fetchDepartmentData());
    } catch (error) {
      console.error("Error deleting department:", error);
      setError("Error deleting department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <div style={{ padding: "10px", border: "2px solid #dddddd" }}>
        <div
          style={{
            backgroundColor: successMessage
              ? "#b4dab471"
              : error
              ? "#ffd2d280"
              : "transparent",
            color: successMessage ? "green" : error ? "red" : "transparent",
            padding: "2px 10px",
          }}
        >
          {loading && (
            <p style={{ margin: "5px" }}>
              {" "}
              <HourglassBottomIcon /> Loading...
            </p>
          )}
          {error && (
            <p style={{ margin: "5px" }}>
              {" "}
              <ErrorOutlineIcon /> {error}
            </p>
          )}
          {successMessage && (
            <p style={{ margin: "0px" }}>
              {" "}
              <TaskAltIcon /> {successMessage}
            </p>
          )}
        </div>

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
          handleDeleteDepartment={handleDeleteDepartment}
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
