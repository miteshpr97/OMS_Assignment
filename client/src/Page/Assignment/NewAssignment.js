import React, { useState, useEffect } from "react";
import SideBar from "../../Component/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { FormControl, Grid, InputLabel, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import AssignmentCard from "./AssignmentCard";
import AssignmentTable from "./AssignmentTable";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAssignmentData,
  createAssignment,
  fetchAssignmentCounts,
} from "../../features/assignment/assignmentAction";
import {
  selectAssignment,
  selectAssignmentCounts,
  selectAssignmentLoading,
  selectAssignmentError,
} from "../../features/assignment/assignmentSlice";
import "./Assignment.css";
import { Checkbox, ListItemText, Select } from "@mui/material";

export default function NewAssignment() {
  const [validated, setValidated] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    EmployeeID: "",
    EmployeeID_AssignTo: [],
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

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
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
          `${apiUrl}/api/workGroup/allData`
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

  const handleEmployeeSelect = (event) => {
    const selectedEmployeeIds = event.target.value;
    setAssignmentData((prevState) => ({
      ...prevState,
      EmployeeID_AssignTo: selectedEmployeeIds,
    }));

    // Dispatch action to fetch assignment counts based on selected employees
    dispatch(fetchAssignmentCounts(selectedEmployeeIds));
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
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Select Employee AssignTo</InputLabel>
                    <Select
                      multiple
                      fullWidth
                      label="Select Employee AssignTo"
                      id="EmployeeID_AssignTo"
                      name="EmployeeID_AssignTo"
                      value={assignmentData.EmployeeID_AssignTo || []}
                      onChange={handleEmployeeSelect}
                      renderValue={(selected) => selected.join(", ")}
                      required
                    >
                      {assignedEmployees.map((employee) => (
                        <MenuItem
                          key={employee.EmployeeID_AssignTo}
                          value={employee.EmployeeID_AssignTo}
                        >
                          <Checkbox
                            checked={assignmentData.EmployeeID_AssignTo.includes(
                              employee.EmployeeID_AssignTo
                            )}
                          />
                          <ListItemText
                            primary={`${employee.EmployeeID_AssignTo} - ${employee.Assignee_FirstName}`}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
            assignedEmployees={assignedEmployees}
            loading={loading}
            error={error}
          />
        </div>
      </Box>
    </Box>
  );
}
