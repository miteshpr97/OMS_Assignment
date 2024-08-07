import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import SideBar from "../../Component/SideBar";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAssignmentData } from "../../features/assignment/assignmentAction";
// import { selectAssignment } from "../../features/assignment/assignmentSlice";

import { MyTeamInfoModal } from "./MyTeamInfoModal";




const apiBasedUrl = process.env.REACT_APP_API_URL;

export default function MyTeam() {
  // const dispatch = useDispatch();
  // const assignmentData = useSelector(selectAssignment);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);


 

  // useEffect(() => {
  //   dispatch(fetchAssignmentData());
  // }, [dispatch]);


  useEffect(() => {
    const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
    setUserData(userDataFromSession);
  }, []);

  useEffect(() => {
    fetchDepartmentData();
    // fetchEmployeeData();
  }, []);

  useEffect(() => {
    const fetchAssignedEmployees = async () => {
      try {
        const response = await fetch(
          `${apiBasedUrl}/api/workGroup/allData`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const assigned = data.filter(
          (employee) => userData.EmployeeID === employee.EmployeeID_Assigner
        );
   
        setAssignedEmployees(assigned);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching assigned employees:", error);
        setError("Error fetching assigned employees"); // Set error state
      }
    };

    if (userData) {
      fetchAssignedEmployees();
    }
  }, [userData]);

  // GET DEPARTMENT id and name FETCH
  const fetchDepartmentData = async () => {
    try {
      // Make an API call to fetch department data
      const response = await fetch(`${apiBasedUrl}/api/department`);
      const data = await response.json();
      // Update the state with the fetched department data
      setDepartments(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching department data:", error);
      setError("Error fetching department data"); // Set error state
    }
  };

  // Filter employee data based on selected department
  const filteredAssignedEmployees = selectedDepartment
    ? assignedEmployees.filter(
        (employee) =>
          selectedDepartment.DepartmentID === employee.DepartmentID_AssignTo
      )
    : assignedEmployees;

   

    const handleInfo = (assignedEmployees) => {
      setIsInfoModalOpen(true);
      setSelectedEmployeeData(assignedEmployees);
    };
    
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box
        component="main"
        sx={{ flexGrow: 1, marginTop: "55px", padding: "20px" }}
      >
        {/* page upper header work */}
        <div
          style={{
            height: "70px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
            backgroundColor: "white",
            color: "black",
            padding: "0px 10px",
            marginTop: "10px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textTransform: "capitalize",
              textAlign: "start",
              fontWeight: "500",
            }}
          >
            {userData && `${userData.FirstName} ${userData.LastName}`} Team's
          </Typography>

          <div style={{ display: "flex" }}>
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
              style={{ marginRight: "30px" }}
            />
            <Button
              component={Link}
              to="/assignment"
              variant="contained"
              sx={{
                backgroundColor: "#055f85",
                color: "#fff",
                margin: "10px 0px",
              }}
            >
              Create Assignment
            </Button>
          </div>
        </div>
        {/* Employee profiles */}
        <div className="card-container">
          {error ? (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          ) : (
            filteredAssignedEmployees.map((item) => (
              <Card
                key={item.EmployeeID_AssignTo}
                sx={{
                  width: 180,
                  margin: "10px",
                  transition: "transform 0.3s ease-in-out",
                  boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.5)",
                  display:"flex",
                  flexDirection:"column",
                  justifyContent:"space-between",
                  alignItems:"center"
                }}
              >
                <CardActionArea onClick={() => handleInfo(item)} >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems:"center",
                      paddingTop: "10px",
                    }}
                  >
                    {/* <CardMedia
                      component="img"
                      src={
                        item.Assignee_Profile
                          ? `http://localhost:3306/api/employee/Profile/${item.EmployeeID_AssignTo}`
                          : "/placeholder_image.jpg"
                      }
                      alt="Employee Profile"
                      sx={{ height: 140, width: 140, borderRadius: "50%" }}
                    /> */}

                    <CardMedia
                      component="img"
                      // src={
                      //   item.Assignee_Profile
                      //     ? `http://localhost:3306/api/employee/${item.Assignee_Profile}`
                      //     : "/placeholder_image.jpg"
                      // }
                      src={item.Assignee_Profile}
                      alt="Employee Profile"
                  
                      sx={{ height: 120, width: 120, borderRadius: "50%" }}
                    />
                  </div>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h7"
                      component="div"
                      align="center"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {item.Assignee_FirstName} {item.Assignee_LastName}
                    </Typography>
                    <Typography
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {item.Department_Name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                    >
                      ID: {item.EmployeeID_AssignTo}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          )}
        </div>
        <MyTeamInfoModal
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
          employeeData={selectedEmployeeData}
        />
      </Box>
    </Box>
  );
}
