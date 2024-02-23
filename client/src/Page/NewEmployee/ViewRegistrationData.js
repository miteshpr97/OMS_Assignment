import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EmployeeEditModal from "./EmployeeEditModal";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "#44756d",
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  name: {
    fontSize: "0.9rem",
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    borderRadius: 8,
    padding: "5px 10px",
    marginTop: "17px",
    display: "inline-block",
  },
}));

const ViewRegistrationData = ({ employeeData, deleteEmployee }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null); // New state to hold selected employee data

  const classes = useStyles();

  if (
    !employeeData ||
    !Array.isArray(employeeData) ||
    employeeData.length === 0
  ) {
    return (
      <Typography variant="h6" gutterBottom>
        No employee data available
      </Typography>
    );
  }

  const handleEditClick = (employee) => {
    // Modified to accept entire employee object
    setIsEditModalOpen(true);

    setSelectedEmployeeData(employee); // Store selected employee data
  };

  return (
    <div className="Employee-table">
      <div>
        <Typography variant="h5" style={{ fontWeight: "500" }}>
          Employee Data
        </Typography>
      </div>
      <br />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>
              Employee ID
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>
              Designation
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>
              Department
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
            <TableCell className={classes.tableHeaderCell}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData.map((item, index) => (
            <TableRow
              key={item._id}
              style={{ backgroundColor: index % 2 === 0 ? "#D3D3D3" : "white" }}
            >
              <TableCell className={classes.name}>{item.EmployeeID}</TableCell>
              <TableCell
                className={classes.name}
              >{`${item.FirstName} ${item.LastName}`}</TableCell>
              <TableCell className={classes.name}>
                {item.DesignationID}
              </TableCell>
              <TableCell className={classes.name}>
                {item.DepartmentID}
              </TableCell>
              <TableCell
                className={classes.status}
                style={{
                  fontWeight: "bold",
                  fontSize: "0.75rem",
                  color: "white",
                  borderRadius: 8,
                  padding: "5px 10px",
                  marginTop: "17px",
                  display: "inline-block",

                  backgroundColor:
                    (item.EmploymentStatus === "Active" && "#4E9B47") ||
                    (item.EmploymentStatus === "Inactive" && "#6d6b6b"),
                  //  padding: "2px 10px", // Adjust the padding to make it smaller
                }}
              >
                {item.EmploymentStatus}
              </TableCell>

              <TableCell>
                <IconButton
                  sx={{ color: "#188bc0", height: "5px" }}
                  onClick={() => handleEditClick(item)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  sx={{ color: "#c53531", height: "5px" }}
                  onClick={() => deleteEmployee(item.EmployeeID)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EmployeeEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        employeeData={selectedEmployeeData} // Pass selected employee data to the modal
      />
    </div>
  );
};

export default ViewRegistrationData;
