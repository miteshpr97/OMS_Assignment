import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./Team.css";
import SideBar from "../../Component/SideBar"; // Assuming you have a SideBar component
import { EmployeeInfoModal } from "./EmployeeInfoModal";

export default function AllTeamMembers() {
  const [data, setData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null); // Add this line

  useEffect(() => {
    // Fetch department data when the component mounts
    fetchDepartmentData();
    fetchEmployeeData();
  }, []);

  // GET ALL EMPLOYEE DATA USING THIS APIs
  const fetchEmployeeData = async () => {
    try {
      const apiUrl = "http://localhost:3306/api/employee/allData";
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // GET DEPARTMENT id and name FETCH
  const fetchDepartmentData = async () => {
    try {
      // Make an API call to fetch department data
      const response = await fetch("http://localhost:3306/api/department");
      const data = await response.json();
      // Update the state with the fetched department data
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  // Filter employee data based on selected department
  const filteredEmployees = selectedDepartment
    ? data.filter(
        (employee) => employee.DepartmentID === selectedDepartment.DepartmentID
      )
    : data;

  const handleInfo = (employee) => {
    setIsInfoModalOpen(true);
    setSelectedEmployeeData(employee);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        {/* page uper header work */}
        <div
          style={{
            height: "70px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.5)",
            // border:"1px solid black",
            backgroundColor: "white",
            color: "black",
            padding: "0px 10px",
            marginTop: "10px",
          }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: "start", fontWeight: "500" }}
          >
            All Team
          </Typography>

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[{ DepartmentName: "All" }, ...departments]}
            getOptionLabel={(option) => option.DepartmentName}
            sx={{ width: 300, backgroundColor: "whitesmoke" }}
            onChange={(event, newValue) => {
              if (newValue && newValue.DepartmentName === "All") {
                setSelectedDepartment(null);
              } else {
                setSelectedDepartment(newValue);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="Department" />
            )}
          />
        </div>
        {/* employee profile */}
        <div className="card-container">
          {filteredEmployees.map((item) => (
            <Card
              key={item.EmployeeID}
              sx={{
                width: 180,
                margin: "10px",
                transition: "transform 0.3s ease-in-out",
                boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.5)",
              }}
            >
              <CardActionArea onClick={() => handleInfo(item)}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "10px",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: 140, width: 140, borderRadius: "50%" }}
                    src={
                      item.Employee_Profile
                        ? `http://localhost:3306/api/employee/${item.Employee_Profile}`
                        : ""
                    }
                    alt="Employee Profile"
                  />
                </div>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    align="center"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {item.FirstName} {item.LastName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    ID: {item.EmployeeID}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center" }}>
                <Link
                  to={`/createteam/${item.EmployeeID}`}
                  key={item.EmployeeID}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    style={{ backgroundColor: "#055f85" }}
                    size="small"
                    variant="contained"
                  >
                    Create Team
                  </Button>
                </Link>
              </CardActions>
            </Card>
          ))}
        </div>
        <EmployeeInfoModal
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
          employeeData={selectedEmployeeData}
        />
      </Box>
    </Box>
  );
}