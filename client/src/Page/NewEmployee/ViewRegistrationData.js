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

import DeleteIcon from "@mui/icons-material/Delete";
import EmployeeEditModal from "./EmployeeEditModal";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TablePagination from "@mui/material/TablePagination";
import EditNoteIcon from "@mui/icons-material/EditNote";

const ViewRegistrationData = ({ employeeData, deleteEmployee }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

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
      <Table size="small">
        <TableHead className="customTableHead">
          <TableRow>
            <TableCell
              className="vertical-border"
              sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
            >
              Employee ID
            </TableCell>
            <TableCell
              className="vertical-border"
              sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
            >
              Name
            </TableCell>
            <TableCell
              className="vertical-border"
              sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
            >
              Designation
            </TableCell>
            <TableCell
              className="vertical-border"
              sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
            >
              Department / Project
            </TableCell>
            <TableCell
              className="vertical-border"
              sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
            >
              Status
            </TableCell>
            <TableCell
              className="vertical-border"
              sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
            >
              Action
            </TableCell>
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
            <TableRow key={item._id} className="custom-row">
              <TableCell
                className="vertical-border"
                sx={{ padding: "10px 16px", fontSize: "15px" }}
              >
                {item.EmployeeID}
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{
                  textTransform: "capitalize",
                  padding: "10px 16px",
                  fontSize: "15px",
                }}
              >{`${item.FirstName} ${item.LastName}`}</TableCell>
              <TableCell
                className="vertical-border"
                sx={{ padding: "10px 16px", fontSize: "15px" }}
              >
                {item.DesignationName}
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ padding: "10px 16px", fontSize: "15px" }}
              >
                {item.DepartmentName}
              </TableCell>

              <TableCell
                className="vertical-border"
                style={{
                  color:
                    (item.EmploymentStatus === "Active" && "#4E9B47") ||
                    (item.EmploymentStatus === "Inactive" && "#FF5733"),
                  padding: "10px 16px",
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

              <TableCell className="vertical-border">
                <IconButton
                  sx={{ color: "#055f85", height: "6px" }}
                  onClick={() => handleEditClick(item)}
                >
                  <EditNoteIcon />
                </IconButton>

                <IconButton
                  sx={{ color: "red", height: "5px" }}
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
