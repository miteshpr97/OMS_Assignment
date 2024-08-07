import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useParams } from "react-router-dom";

import { useState } from "react";

import HeaderForgotPassword from "./HeaderForgotPassword";

const apiBasedUrl = process.env.REACT_APP_API_URL;

const customTheme = createTheme({
  palette: {
    background: {
      default: "#c3ddd9",
    },
  },
});

export default function ResetPassword() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useParams();

  const [formData, setFormData] = useState({
    newPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const apiUrl = `${apiBasedUrl}/api/userDetails/resetPassword/${token}`;
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
          newPassword: "",
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
      <HeaderForgotPassword />
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card>
            <CardContent>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <Avatar sx={{ m: 1, bgcolor: "#055f85", color: "white" }}>
                  <LockResetIcon />
                </Avatar>
              </span>
              <Typography
                style={{ display: "flex", justifyContent: "center" }}
                component="h1"
                variant="h5"
              >
                Reset Password
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  required
                  fullWidth
                  name="newPassword"
                  label="Password"
                  type="password"
                  id="newPassword"
                  autoComplete="new-password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
                {/* 
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  autoComplete="new-password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                /> */}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: "#055f85" }}
                  disabled={loading}
                >
                  {loading ? "Reset in..." : "Reset my Password"}
                </Button>

                {error && (
                  <Typography color="error" align="center" sx={{ mt: 2 }}>
                    {error}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
