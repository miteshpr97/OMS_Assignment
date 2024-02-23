import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SideBar from "../../../Component/SideBar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import profile from "./profilenn.png";
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
            height: "80px",
            display: "flex",
            alignItems: "center",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
            backgroundColor: "white",
            color: "black",
          }}
        >
          <div style={{ width: "30%" }}>
            <Typography variant="h5" sx={{ textAlign: "start" }}>
              CREATE TEAM
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "70%",
              marginRight: "10px",
            }}
          >
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
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Employee"
                  variant="outlined"
                />
              )}
            />
          </div>
        </div>
        <br />

        <Box
          className="createTeam-container"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#f9f9f9",
            height: "400px",
          }}
        >
          <div>
            {profileData &&
              profileData.map((items) => (
                <Card
                  key={items.EmployeeID}
                  sx={{
                    width: 200,
                    height: 200,
                    margin: "10px",
                    padding: "10px",
                  }}
                >
                  <CardActionArea>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      {/* <CardMedia
                        component="img"
                        image={profile}
                        alt="profile"
                        sx={{ height: "100px", width: "100px" }}
                      /> */}

                      <CardMedia
                        component="img"
                        sx={{ height: 140, width: 140, borderRadius: "50%" }}
                        src={
                          items.Employee_Profile
                            ? `http://localhost:3306/api/employee/${items.Employee_Profile}`
                            : ""
                        }
                        alt="Employee Profile"
                      />
                    </Box>
                    <CardContent sx={{ textAlign: "center" }}>
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
          <Box sx={{ marginLeft: "50px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ width: "900px" }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
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

        <br />
        <br />

        <SelectedEmployeesTable
          selectedEmployees={selectedEmployees}
          handleSubmitSelectEmployee={handleSubmitSelectEmployee}
        />

        <br />
        <br />
        <div>
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
