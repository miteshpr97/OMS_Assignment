import React, { useState } from "react";
import SideBar from "../../Component/SideBar";
import Box from "@mui/material/Box";

import {
  Button,
  TextField,
  Grid,
  Dialog,
  IconButton,
  DialogContent,
  DialogTitle,
} from "@mui/material"; // Import IconButton
import ViewDepartmentData from "./ViewDepartmentData";
import "./Department.css";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon

const Department = () => {
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    DepartmentID: "",
    DepartmentName: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity() === true) {
      try {
        setIsLoading(true);
        const apiUrl = "http://localhost:3306/api/department/withID";
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) console.log("Registration successful!");
        else console.error("Registration failed:", response.statusText);
      } catch (error) {
        console.error("Error submitting data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
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
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontSize: "22px", padding: "16px 24px 5px 24px" }}>
            New Department
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
              <form noValidate validated={validated} onSubmit={handleSubmit}>
                <Grid container spacing={3} className="mt-2">
                  <Grid item md={12}>
                    <TextField
                      fullWidth
                      label="Department Name"
                      variant="outlined"
                      value={formData.DepartmentName}
                      onChange={handleInputChange}
                      name="DepartmentName"
                      size="small"
                      required
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
        <ViewDepartmentData />
      </Box>
    </Box>
  );
};

export default Department;
