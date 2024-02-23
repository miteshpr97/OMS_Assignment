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
import Card from "@mui/material/Card"; // Import Card component
import CardContent from "@mui/material/CardContent"; // Import CardContent component
import HeaderSignUp from "./HeaderSignUp";
import TextField from "@mui/material/TextField";

const customTheme = createTheme({
  palette: {
    background: {
      default: '#c3ddd9',
    },
  },
});

export default function SignUp() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    EmployeeID: "",
    Username: "",
    Password: "",
    ConfirmPassword: "", // Include ConfirmPassword field in formData
    acceptTerms: false,
  });

  console.log(data, "dkdhd");

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };



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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the Password and ConfirmPassword fields match
    if (formData.Password !== formData.ConfirmPassword) {
      alert("Passwords do not match. Please re-enter.");
      return; // Do not proceed with form submission
    }
    console.log(formData);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <HeaderSignUp />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card>
            <CardContent>
              {" "}
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
                    <FormControl fullWidth>
                      <InputLabel id="employee-id-label">
                        Employee ID
                      </InputLabel>
                      <Select
                        labelId="employee-id-label"
                        id="EmployeeID"
                        name="EmployeeID"
                        value={formData.EmployeeID}
                        onChange={handleChange}
                      >
                        {data.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.EmployeeID} -- {item.FirstName}{" "}
                            {item.LastName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="username-label">Username</InputLabel>
                      <Select
                        labelId="username-label"
                        id="Username"
                        name="Username"
                        value={formData.Username}
                        onChange={handleChange}
                      >
                        {data.map((item) => (
                          <MenuItem key={item.id} value={item.username}>
                            {item.username}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                      name="ConfirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="ConfirmPassword"
                      autoComplete="new-password"
                      value={formData.ConfirmPassword}
                      onChange={handleChange}
                    />
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
