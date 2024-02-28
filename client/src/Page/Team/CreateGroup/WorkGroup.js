import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const WorkGroup = ({
  profileData,
  workGroupData,
  updateAssignedEmployees,
  handleDeleteWorkGroupData,
}) => {
  const [assignedEmployees, setAssignedEmployees] = useState([]);

  useEffect(() => {
    if (
      profileData &&
      workGroupData &&
      profileData.length > 0 &&
      workGroupData.length > 0
    ) {
      const assigned = workGroupData.filter((employee) => {
        return profileData.some(
          (item) => item.EmployeeID === employee.EmployeeID_Assigner
        );
      });
      setAssignedEmployees(assigned);
      updateAssignedEmployees(assigned);
    }
  }, [profileData, workGroupData]);

  const handleDeleteWorkGroup = (workgroupID) => {
    handleDeleteWorkGroupData(workgroupID);
  };

  return (
    <div style={{ padding: "20px" }}>
      {profileData &&
        profileData.length > 0 &&
        profileData.map((employee) => (
          <div style={{ padding: "10px" }} key={employee.EmployeeID}>
            <Typography
              style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                textTransform: "capitalize",
              }}
            >
              {employee.FirstName} {employee.LastName} - Teams
            </Typography>
          </div>
        ))}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#44756d" }}>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                WorkGroupID
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                EmployeeID_Assigner
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Employee AssigTo
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Department
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignedEmployees.map((employee) => (
              <TableRow key={employee.WorkGroupID}>
                <TableCell>{employee.WorkGroupID}</TableCell>
                <TableCell>{employee.EmployeeID_Assigner}</TableCell>
                <TableCell>
                  {employee.EmployeeID_AssignTo} --{" "}
                  {employee.Assignee_FirstName} {employee.Assignee_LastName}
                </TableCell>
                <TableCell>{employee.Department_Name}</TableCell>
                <TableCell>
                  <DeleteIcon
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteWorkGroup(employee.WorkGroupID)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default WorkGroup;
