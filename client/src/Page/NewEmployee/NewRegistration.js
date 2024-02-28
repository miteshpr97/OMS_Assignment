import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  Container,
  IconButton,
} from "@mui/material";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { fetchDepartmentData } from "../../features/department/departmentActions";
import CloseIcon from "@mui/icons-material/Close";

import "./RegisterPage.css";
import { useDispatch, useSelector } from "react-redux";
function NewRegistration({ addEmployee, nextEmployeeId }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    //  EmployeeID: nextEmployeeId ? nextEmployeeId.nextEmployeeId || "" : "",
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    Gender: "",
    ContactNumber: "",
    Email: "",
    Address: "",
    JoinDate: "",
    EmploymentStatus: "",
    DepartmentID: "",
    DesignationID: "",
    Employee_Profile: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  // const [departmentData, setDepartmentData] = useState([]);
  const [deginationData, setDeginationData] = useState([]);

  const departmentData = useSelector(
    (state) => state.department.departmentName
  );

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchDepartmentData());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch department data
        const departmentResponse = await fetch(
          "http://localhost:3306/api/department"
        );
        if (departmentResponse.ok) {
          const departmentData = await departmentResponse.json();
        } else {
          console.error("Failed to fetch department data");
        }

        // Fetch designation data
        const designationResponse = await fetch(
          "http://localhost:3306/api/designation"
        );
        if (designationResponse.ok) {
          const designationData = await designationResponse.json();
          setDeginationData(designationData);
        } else {
          console.error("Failed to fetch designation data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

 

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "Employee_Profile" && files.length > 0) {
      // Set file in state if selected
      setFormData((prevData) => ({
        ...prevData,
        Employee_Profile: files[0],
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    // Check if the input field is ContactNumber and if the value matches the desired format
    if (name === "ContactNumber" && /^\d{0,10}$/.test(value)) {
      // Update the state only if the value matches the format
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // Check if ContactNumber has exactly 10 digits
    if (formData.ContactNumber.trim().length !== 10) {
      newErrors.ContactNumber = 'Phone number must be 10 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };




  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     await addEmployee(formData);

  //     console.log(formData);
  //     setFormData({
  //       //   EmployeeID: "",
  //       FirstName: "",
  //       LastName: "",
  //       DateOfBirth: "",
  //       Gender: "",
  //       ContactNumber: "",
  //       Email: "",
  //       Address: "",
  //       JoinDate: "",
  //       EmploymentStatus: "",
  //       DepartmentID: "",
  //       DesignationID: "",
  //       Employee_Profile: "",
  //     });
  //     handleClose();
  //   } catch (error) {
  //     console.error("Error adding employee:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (validate()) {
      try {
        await addEmployee(formData);
        console.log(formData);
        setFormData({
         
          FirstName: "",
          LastName: "",
          DateOfBirth: "",
          Gender: "",
          ContactNumber: "",
          Email: "",
          Address: "",
          JoinDate: "",
          EmploymentStatus: "",
          DepartmentID: "",
          DesignationID: "",
          Employee_Profile: "",
        });
        handleClose();
      } catch (error) {
        console.error("Error adding employee:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Form validation failed
      console.error('Form validation failed');
      setIsLoading(false);
    }
  };
  

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
          padding: "10px",
        }}
      >
        <Typography variant="h5" style={{ fontWeight: "500" }}>
          Employee Data
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
          CREATE NEW EMPLOYEE
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ fontSize: "22px", padding: "16px 24px 10px 24px" }}>
          New Employee
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
          <div className="Employee-container">
            <div className="register">
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {/* <Grid item xs={4}>
              <TextField
                label="Employee ID"
                variant="outlined"
                name="EmployeeID"
                value={formData.EmployeeID}
                onChange={handleInputChange}
                required
                fullWidth
                size="medium"
              />
            </Grid> */}
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="First Name"
                      variant="outlined"
                      name="FirstName"
                      value={formData.FirstName}
                      onChange={handleInputChange}
                      fullWidth
                      size="medium"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      name="LastName"
                      value={formData.LastName}
                      onChange={handleInputChange}
                      fullWidth
                      size="medium"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      type="email"
                      name="Email"
                      value={formData.Email}
                      onChange={handleInputChange}
                      fullWidth
                      size="medium"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Phone Number"
                      variant="outlined"
                      type="tel"
                      name="ContactNumber"
                      value={formData.ContactNumber}
                      onChange={handleInputChange}
                      fullWidth
                      size="medium"
                      error={!!errors.ContactNumber}
                      helperText={errors.ContactNumber}
                      required
                    />
                  </Grid>

                  <Grid item xs={4} md={4}>
                    <FormControl fullWidth required>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        value={formData.Gender}
                        onChange={handleInputChange}
                        name="Gender"
                        label="Gender"
                        size="medium"
                        required
                      >
                        <MenuItem value="M">Male</MenuItem>
                        <MenuItem value="F">Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Address"
                      variant="outlined"
                      name="Address"
                      value={formData.Address}
                      onChange={handleInputChange}
                      fullWidth
                      size="medium"
                      required
                    />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <TextField
                      label="Join Date"
                      variant="outlined"
                      type="date"
                      name="JoinDate"
                      value={formData.JoinDate}
                      size="medium"
                      onChange={handleInputChange}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Date of Birth"
                      type="date"
                      variant="outlined"
                      name="DateOfBirth"
                      value={formData.DateOfBirth}
                      onChange={handleInputChange}
                      required
                      fullWidth
                      size="medium"
                      InputLabelProps={{
                        shrink: true,
                      }}
                   
                    />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Employment Status</InputLabel>
                      <Select
                        value={formData.EmploymentStatus}
                        onChange={handleInputChange}
                        label="Employment Status"
                        name="EmploymentStatus"
                        required
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Department ID</InputLabel>
                      <Select
                        value={formData.DepartmentID}
                        onChange={handleInputChange}
                        label="Department ID"
                        name="DepartmentID"
                        required
                      >
                        {departmentData.map((department) => (
                          <MenuItem
                            key={department._id}
                            value={department.DepartmentID}
                          >
                            {department.DepartmentID} -{" "}
                            {department.DepartmentName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Designation ID</InputLabel>
                      <Select
                        value={formData.DesignationID}
                        onChange={handleInputChange}
                        label="Designation ID"
                        name="DesignationID"
                        required
                      >
                        {deginationData.map((designation) => (
                          <MenuItem
                            key={designation._id}
                            value={designation.DesignationID}
                          >
                            {designation.DesignationID} -{" "}
                            {designation.DesignationName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      variant="outlined"
                      name="Employee_Profile"
                      type="file"
                      accept="image/*"
                      onChange={handleInputChange}
                      fullWidth
                      size="medium"
                      required
                    />
                  </Grid>

                  <Container
                    sx={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Grid item xs={1}>
                      <Button
                        type="submit"
                        variant="contained"
                        // color="primary"

                        disabled={isLoading}
                        sx={{ backgroundColor: "#055f85", marginTop: "10px" }}
                      >
                        {isLoading ? "Submitting..." : "Submit"}
                      </Button>
                    </Grid>
                  </Container>
                </Grid>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewRegistration;
