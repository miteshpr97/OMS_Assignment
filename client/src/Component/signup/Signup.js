import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import HeaderSignUp from "./HeaderSignUp";
import TextField from "@mui/material/TextField";

const customTheme = createTheme({
  palette: {
    background: {
      default: "#c3ddd9",
    },
  },
});

export default function SignUp() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    EmployeeID: "",
    Username: "",
    Password: "",
    confirm_password: "",
    Role: "User", // Default role
    acceptTerms: false,
  });

console.log(formData, "ijabvsbibcbaiub");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://localhost:3306/api/employee";
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        setData(result.reverse()); // Reverse the order of fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Check if the Password and Confirm_Password fields match
    if (formData.Password !== formData.confirm_password) {
      alert("Passwords do not match. Please re-enter.");
      return; // Do not proceed with form submission
    }
  
    try {
      const apiUrl = "http://localhost:3306/api/userDetails";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log("Form data submitted successfully");
        // Reset form inputs
        setFormData({
          EmployeeID: "",
          Username: "",
          Password: "",
          confirm_password: "",
          Role: "User",
          acceptTerms: false,
        });
      } else {
        console.error("Failed to submit form data:", response.statusText);
        // Optionally, you can handle error response here
      }
    } catch (error) {
      console.error("Error submitting form data:", error.message);
      // Optionally, you can handle other errors here
    }
  };
  
  

  return (
    <ThemeProvider theme={customTheme}>
      <HeaderSignUp />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card>
            <CardContent>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
              </span>
              <Typography
                style={{ display: "flex", justifyContent: "center" }}
                component="h1"
                variant="h5"
              >
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="employee-id-label">
                        Employee ID
                      </InputLabel>
                      <Select
                        labelId="employee-id-label"
                        id="EmployeeID"
                        name="EmployeeID"
                        value={formData.EmployeeID}
                        onChange={handleChange}
                        label="Employee ID"
                      >
                        {data.map((item) => (
                          <MenuItem key={item.id} value={item.EmployeeID}>
                            {item.EmployeeID} -- {item.FirstName}{" "}
                            {item.LastName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                 <Grid item xs={6}>
                    <TextField
                      label="Username"
                      variant="outlined"
                      name="Username"
                      value={formData.Username}
                      onChange={handleChange}
                      fullWidth
                      size="medium"
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="Password"
                      label="Password"
                      type="password"
                      id="Password"
                      autoComplete="new-password"
                      value={formData.Password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="confirm_password"
                      label="Confirm Password"
                      type="password"
                      id="confirm_password"
                      autoComplete="new-password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="role-label">Role</InputLabel>
                      <Select
                        labelId="role-label"
                        id="Role"
                        name="Role"
                        value={formData.Role}
                        onChange={handleChange}
                        label="Role"
                      >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="User">User</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.acceptTerms}
                          color="primary"
                          name="acceptTerms"
                          onChange={handleChange}
                        />
                      }
                      label="I accept all terms and conditions"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
