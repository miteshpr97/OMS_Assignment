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
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TablePagination from "@mui/material/TablePagination";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "#055f85",
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
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (employee) => {
    setIsEditModalOpen(true);
    setSelectedEmployeeData(employee);
  };

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

  return (
    <div className="Employee-table">
      <div>
        {/* <Typography variant="h5" style={{ fontWeight: "500" }}>
          Employee Data
        </Typography> */}
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
              Department / Project
            </TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
            <TableCell className={classes.tableHeaderCell}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? employeeData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : employeeData
          ).map((item, index) => (
            <TableRow
              key={item._id}
              style={{
                backgroundColor: index % 2 === 0 ? "#D3D3D3" : "white",
              }}
            >
              <TableCell className={classes.name}>{item.EmployeeID}</TableCell>
              <TableCell
                className={classes.name}
                sx={{ textTransform: "capitalize" }}
              >{`${item.FirstName} ${item.LastName}`}</TableCell>
              <TableCell className={classes.name}>
                {item.DesignationName}
              </TableCell>
              <TableCell className={classes.name}>
                {item.DepartmentName}
              </TableCell>

              <TableCell
                className={classes.name}
                style={{
                  color:
                    (item.EmploymentStatus === "Active" && "#4E9B47") ||
                    (item.EmploymentStatus === "Inactive" && "#FF5733"),
                }}
              >
                <FiberManualRecordIcon
                  style={{
                    color:
                      (item.EmploymentStatus === "Active" && "#4E9B47") ||
                      (item.EmploymentStatus === "Inactive" && "#FF5733"),
                    fontSize: "1rem",
                    marginRight: "3px",
                  }}
                />
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        component="div"
        count={employeeData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <EmployeeEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        employeeData={selectedEmployeeData}
      />
    </div>
  );
};

export default ViewRegistrationData;
