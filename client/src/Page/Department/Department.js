import React, { useEffect, useState } from "react";
import SideBar from "../../Component/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, TextField, Grid } from "@mui/material";
import ViewDepartmentData from "./ViewDepartmentData";
import "./Department.css";

const Department = () => {
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    DepartmentID: "",
    DepartmentName: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
        const apiUrl = "http://localhost:3306/api/department";
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

  //last number data
  useEffect(() => {
    const fetchLastJobNo = async () => {
      try {
        const response = await fetch(
          "http://localhost:3306/api/department/lastDepartmentId",
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );
        if (response.ok) {
          const data = await response.json();
          const numericPart = parseInt(data.lastDepartmentId.slice(4), 10);
          if (!isNaN(numericPart)) {
            const nextJobNo = numericPart + 1;
            setFormData({
              ...formData,
              DepartmentID: `DEPT${nextJobNo.toString().padStart(3, "0")}`,
            });
          } else {
            console.error("Invalid numeric part:", data.lastDepartmentId);
          }
        } else {
          console.error("Failed to fetch last JobNo");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchLastJobNo();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div className="New-departmemt">
          <Typography variant="h5" style={{ fontWeight: "500" }}>
            New Department
          </Typography>
          <form noValidate validated={validated} onSubmit={handleSubmit}>
            <Grid container spacing={3} className="mt-2">
              <Grid item md={6}>
                <TextField
                  fullWidth
                  label="Department ID"
                  variant="outlined"
                  value={formData.DepartmentID}
                  onChange={handleInputChange}
                  name="DepartmentID"
                  size="small"
                  required
                />
              </Grid>
              <Grid item md={6}>
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

        <ViewDepartmentData />
      </Box>
    </Box>
  );
};

export default Department;
