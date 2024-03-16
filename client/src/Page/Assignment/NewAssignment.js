import React, { useState, useEffect } from "react";
import SideBar from "../../Component/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import AssignmentCard from "./AssignmentCard";
import AssignmentTable from "./AssignmentTable";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAssignmentData,
  createAssignment,
  fetchAssignmentCounts,
  deleteAssignmentData,
} from "../../features/assignment/assignmentAction";
import {
  selectAssignment,
  selectAssignmentCounts,
  selectAssignmentLoading,
  selectAssignmentError,
} from "../../features/assignment/assignmentSlice";
import "./Assignment.css";

export default function NewAssignment() {
  const [validated, setValidated] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    // AssignmentID: "",
    EmployeeID: "",
    EmployeeID_AssignTo: "",
    AssignDate: new Date().toISOString().split("T")[0],
    DeadlineDate: "",
    AssignmentPriority: "",
    Assignment_Description: "",
  });

  const dispatch = useDispatch();
  const assignmentDatas = useSelector(selectAssignment);
  const countAssignmentData = useSelector(selectAssignmentCounts);
  const loading = useSelector(selectAssignmentLoading);
  const error = useSelector(selectAssignmentError);

  useEffect(() => {
    // Fetch assignment data when the component mounts
    dispatch(fetchAssignmentData());
    dispatch(fetchAssignmentCounts());
  }, [dispatch]);

  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
    setUserData(userDataFromSession);
  }, []);

  useEffect(() => {
    const fetchAssignedEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:3306/api/workGroup/allData"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const assigned = data.filter(
          (employee) => userData.EmployeeID === employee.EmployeeID_Assigner
        );
        setAssignedEmployees(assigned);
      } catch (error) {
        console.error("Error fetching assigned employees:", error);
      }
    };

    if (userData) {
      fetchAssignedEmployees();
    }
  }, [userData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAssignmentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    // Dispatch the action to create the assignment
    dispatch(
      createAssignment({
        ...assignmentData,
        EmployeeID: userData.EmployeeID,
      })
    ).then(() => {
      setAssignmentData({
        EmployeeID: "",
        EmployeeID_AssignTo: "",
        AssignDate: new Date().toISOString().split("T")[0],
        DeadlineDate: "",
        AssignmentPriority: "",
        Assignment_Description: "",
      });

      // Dispatch action to fetch assignment data again
      dispatch(fetchAssignmentData());
    });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleEmployeeSelect = async (event) => {
    const selectedEmployeeId = event.target.value;
    const selectedEmployee = assignedEmployees.find(
      (employee) => employee.EmployeeID_AssignTo === selectedEmployeeId
    );
    try {
      // Dispatch the thunk action creator to fetch assignment counts
      dispatch(fetchAssignmentCounts(selectedEmployee.EmployeeID_AssignTo));
    } catch (error) {
      console.error("Error fetching assignment counts:", error);
    }
  };

  const handleDeleteAssignment = async (DepartmentID) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this Department?"
      );
      if (!confirmed) {
        return; // Exit function if user cancels deletion
      }

      await dispatch(deleteAssignmentData(DepartmentID));
      // console.log(DepartmentID);

      dispatch(fetchAssignmentData());
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div className="assignment-container">
          <AssignmentCard countAssignmentData={countAssignmentData} />
          <div className="create-assignment">
            <Typography variant="h5" style={{ fontWeight: "500" }}>
              Create Assignment
            </Typography>
            <form noValidate validated={validated} onSubmit={handleSubmit}>
              <Grid container spacing={3} className="mb-3">
                <Grid item md={6}>
                  <TextField
                    fullWidth
                    id="EmployeeID"
                    label="Employee ID"
                    placeholder="Employee ID"
                    value={userData.EmployeeID}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    select
                    fullWidth
                    id="EmployeeID_AssignTo"
                    //     label="Employee Assign To"
                    name="EmployeeID_AssignTo"
                    value={assignmentData.EmployeeID_AssignTo}
                    onChange={(event) => {
                      handleInputChange(event);
                      handleEmployeeSelect(event);
                    }}
                    required
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="">Select Employee Assign To </option>
                    {assignedEmployees.map((item, index) => (
                      <option key={index} value={item.EmployeeID_AssignTo}>
                        {item.EmployeeID_AssignTo} - {item.Assignee_FirstName}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Grid container spacing={3} className="mb-3">
                <Grid item md={4}>
                  <TextField
                    type="date"
                    fullWidth
                    id="AssignDate"
                    label="Assign Date"
                    required
                    name="AssignDate"
                    value={assignmentData.AssignDate}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    type="date"
                    fullWidth
                    id="DeadlineDate"
                    label="Deadline Date"
                    required
                    name="DeadlineDate"
                    value={assignmentData.DeadlineDate}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    select
                    fullWidth
                    id="AssignmentPriority"
                    label="Priority"
                    required
                    name="AssignmentPriority"
                    value={assignmentData.AssignmentPriority}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="">Select priority</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <Grid container spacing={3} className="mb-3">
                <Grid item md={12}>
                  <TextField
                    fullWidth
                    multiline
                    id="Assignment_Description"
                    label="Assignment Description"
                    placeholder="Give Assignment...."
                    name="Assignment_Description"
                    value={assignmentData.Assignment_Description}
                    onChange={handleInputChange}
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
                  style={{ backgroundColor: "#055f85", color: "#fff" }}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
          <AssignmentTable
            userData={userData}
            assignmentDatas={assignmentDatas}
            loading={loading}
            error={error}
            handleDeleteAssignment={handleDeleteAssignment}
          />
        </div>
      </Box>
    </Box>
  );
}
