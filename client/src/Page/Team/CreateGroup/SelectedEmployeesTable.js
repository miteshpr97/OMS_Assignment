

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeSelectedEmployee } from "../../../features/workGroup/workGroupSlice";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TablePagination,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const SelectedEmployeesTable = ({
  selectedEmployees,
  handleSubmitSelectEmployee,
}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div
      style={{ width:"100%", padding:"20px" }}
    >
      <TableContainer
        component={Paper}
        style={{ maxWidth: "100%", margin: "auto" }}
      >
        <Table aria-label="employee table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#44756d" }}>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Employee ID
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Department
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Status
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? selectedEmployees.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : selectedEmployees
            ).map((employee) => (
              <TableRow key={employee.EmployeeID}>
                <TableCell>{employee.EmployeeID}</TableCell>
                <TableCell>
                  {employee.FirstName} {employee.LastName}
                </TableCell>
                <TableCell>
                  {employee.DepartmentID}--{employee.DepartmentName}
                </TableCell>
                <TableCell>{employee.EmploymentStatus}</TableCell>
                <TableCell>
                  <DeleteIcon 
                    variant="contained"
                    color="error"
                    sx={{cursor:"pointer"}}
                    onClick={() =>
                      dispatch(
                        removeSelectedEmployee({
                          EmployeeID: employee.EmployeeID,
                        })
                      )
                    }
                  />
                    
                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "10px",
            marginTop:"10px"
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitSelectEmployee}
          >
            ADD
          </Button>
        </div>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          component="div"
          count={selectedEmployees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default SelectedEmployeesTable;
