import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SideBar from "../../../Component/SideBar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
// import profile from "./profilenn.png";
import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  CardContent,
  Typography,
  Box,
  Autocomplete,
  CardActionArea,
  CardMedia,
  TablePagination,
} from "@mui/material";
import WorkGroup from "./WorkGroup";
import SelectedEmployeesTable from "./SelectedEmployeesTable";

import { fetchEmployeeProfileData } from "../../../features/employee/createAction";
import { fetchDepartmentData } from "../../../features/department/departmentActions";
import { fetchWorkGroupData } from "../../../features/workGroup/workGroupAction";
import {
  createWorkGroup,
  deleteWorkGroupData,
} from "../../../features/workGroup/workGroupAction";
import { addSelectedEmployee } from "../../../features/workGroup/workGroupSlice";

const Create = () => {
  const { EmployeeID } = useParams();
  const dispatch = useDispatch();

  const { profileData } = useSelector((state) => state.employeeDetails);
  const { selectedEmployees } = useSelector((state) => state.workgroup);

  const { departmentName } = useSelector((state) => state.department);
  const { workGroupData } = useSelector((state) => state.workgroup);

  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentData, setDepartmentData] = useState([]);
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  console.log(departmentData, "fkfjjfjfjfjfj")

  useEffect(() => {
    dispatch(fetchEmployeeProfileData(EmployeeID));
    dispatch(fetchDepartmentData());
    dispatch(fetchWorkGroupData());
  }, [EmployeeID, dispatch]);

  // department select from Autocompltete input form
  const handleDepartmentSelect = async (department) => {
    setSelectedDepartment(department);
    try {
      const response = await fetch(
        `http://localhost:3306/api/employee/dNames?department=${department.DepartmentName}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      const filteredData = data.filter(
        (employee) => employee.DepartmentID === department.DepartmentID
      );
      setDepartmentData(filteredData);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  //data add from employee table
  const handleAddEmployee = (employeeID) => {
    const employee = departmentData.find(
      (emp) => emp.EmployeeID === employeeID
    );
    dispatch(addSelectedEmployee(employee));
  };

  // add data submit
  const handleSubmitSelectEmployee = async () => {
    try {
      const dataToSend = selectedEmployees.map((employee) => ({
        EmployeeID_Assigner: profileData.map((item) => item.EmployeeID),
        EmployeeID_AssignTo: employee.EmployeeID,
        DepartmentID_AssignTo: employee.DepartmentID,
        CreatedDate: new Date().toISOString(),
        CreatedBy: "Admin",
      }));

      await dispatch(createWorkGroup(dataToSend));
      dispatch(fetchWorkGroupData());
      console.log("Data submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteWorkGroup = (workgroupID) => {
    dispatch(deleteWorkGroupData(workgroupID));
  };

  const filteremployeData = departmentData
    ? departmentData.filter(
        (employee) =>
          !assignedEmployees.some(
            (assignedEmployee) =>
              assignedEmployee.EmployeeID_AssignTo === employee.EmployeeID
          )
      )
    : [];

  const filteredDepartmentData = filteremployeData
    ? filteremployeData.filter(
        (employee) =>
          !profileData
            .map((item) => item.EmployeeID)
            .includes(employee.EmployeeID)
      )
    : [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div
          style={{
            height: "70px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
             boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
           // border:"1px solid black",
            backgroundColor: "white",
            color: "black",
            padding:'0px 10px',
            marginTop:"10px"
          }}
        >
          
            <Typography variant="h5" sx={{ textAlign: "start",fontWeight: "500"   }}>
              CREATE TEAM
            </Typography>
         
        
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={selectedDepartment}
              options={departmentName}
              getOptionLabel={(option) => option.DepartmentName}
              onChange={(event, newValue) => {
                setSelectedDepartment(newValue);
                handleDepartmentSelect(newValue);
              }}
              sx={{
                m: 1,
                width: 400,
                backgroundColor: "whitesmoke",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Employee"
                  variant="outlined"
                />
              )}
            />
          </div>
    <br />

        <Box
          className="createTeam-container"
          sx={{
            display: "flex",
            justifyContent: "space-between",

            marginTop: "10px",
            padding: "20px",
            backgroundColor: "whitesmoke",
            border: "1px solid black",
            height: "450px",
            width: "auto",
          }}
        >
          <div style={{ width: 180, marginLeft:"10px" }}>
            {profileData &&
              profileData.map((items) => (
                <Card
                  key={items.EmployeeID}
                  sx={{
                    width: 180,
                    margin: "10px",
                    padding: "10px",
                     border:"1px solid grey"
                  }}
                >
                  <CardActionArea>
                    <Box sx={{ display: "flex", justifyContent: "center", padding:"10px"  }}>
                      {/* <CardMedia
                        component="img"
                        image={profile}
                        alt="profile"
                        sx={{ height: "100px", width: "100px" }}
                      /> */}

                      <CardMedia
                        component="img"
                        sx={{ height: 100, width: 100, borderRadius: "50%" }}
                        src={
                          items.Employee_Profile
                            ? `http://localhost:3306/api/employee/${items.Employee_Profile}`
                            : ""
                        }
                        alt="Employee Profile"
                      />
                    </Box>
                    <CardContent sx={{ textAlign: "center", textTransform:'capitalize'  }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {items.FirstName} {items.LastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {items.EmployeeID}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
          </div>
          <Box sx={{ marginLeft: "50px", width: "75%"  }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ width: "100%" }}>
                <TableContainer component={Paper}>
                  <Table  aria-label="simple table">
                    <TableHead>
                      <TableRow style={{ backgroundColor: "#44756d" }}>
                        <TableCell
                          style={{ fontWeight: "bold", color: "white" }}
                        >
                          Employee ID
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold", color: "white" }}
                        >
                          Name
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold", color: "white" }}
                        >
                          Designation
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold", color: "white" }}
                        >
                          Status
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold", color: "white" }}
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? filteredDepartmentData.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : filteredDepartmentData
                      ).map((employee) => (
                        <TableRow key={employee.EmployeeID}>
                          <TableCell>{employee.EmployeeID}</TableCell>
                          <TableCell>{`${employee.FirstName} ${employee.LastName}`}</TableCell>
                          <TableCell>{employee.DepartmentName}</TableCell>
                          <TableCell>{employee.EmploymentStatus}</TableCell>

                          {selectedEmployees.some(
                            (emp) => emp.EmployeeID === employee.EmployeeID
                          ) ? (
                            <TableCell>
                              <CheckIcon />
                            </TableCell>
                          ) : (
                            <TableCell
                              sx={{
                                fontSize: "18px",
                                color: "green",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleAddEmployee(employee.EmployeeID)
                              }
                            >
                              <AddCircleOutlineIcon />
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredDepartmentData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    //style={{backgroundColor:'#828988', color:'white'}}
                  />
                </TableContainer>
              </div>
            </div>
          </Box>
        </Box>

       

        <div style={{ backgroundColor: "whitesmoke", height: "450px" , marginTop:"40px", border:"1px solid black"}}>
        <SelectedEmployeesTable
          selectedEmployees={selectedEmployees}
          handleSubmitSelectEmployee={handleSubmitSelectEmployee}
        />
</div>
        
        <div style={{ backgroundColor: "whitesmoke", height: "450px" , marginTop:"40px", border:"1px solid black"}}>
          <WorkGroup
            profileData={profileData}
            workGroupData={workGroupData}
            updateAssignedEmployees={setAssignedEmployees}
            handleDeleteWorkGroupData={handleDeleteWorkGroup}
          />
          </div>
       
      </Box>
    </Box>
  );
};

export default Create;
