// ViewDepartmentData.js
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { makeStyles } from "@material-ui/core/styles";
import EditDepartmentModel from "./EditDepartmentModel";

const useStyles = makeStyles({
  tableRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#f2f2f2",
    },
  },
  tableCell: {
    border: "1px solid #dddddd",
    padding: 8,
  },
  editButton: {
    color: "#055f85",
  },
  deleteButton: {
    color: "red",
  },
  tableHeadCell: {
    backgroundColor: "#5c7c77", 
    color: "white", 
    border: "1px solid #dddddd",
    padding: 8,
  },
});

const ViewDepartmentData = ({ departments, handleDeleteDepartment, }) => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDepartmentData, setSelectedDepartmentData] = useState(null);

  departments = Array.isArray(departments) ? departments : [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = departments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(departments.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleEditClick = (department) => {
    setIsEditModalOpen(true);
    setSelectedDepartmentData(department);
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        style={{ maxHeight: "400px", overflowY: "auto", marginTop: "20px" }}
      >
        <Table aria-label="department table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell}>
                Department ID
              </TableCell>
              <TableCell className={classes.tableHeadCell}>
                Department Name
              </TableCell>
              <TableCell className={classes.tableHeadCell}>Edit</TableCell>
              <TableCell className={classes.tableHeadCell}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.DepartmentID} className={classes.tableRow}>
                <TableCell className={classes.tableCell}>
                  {item.DepartmentID}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {item.DepartmentName}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <IconButton className={classes.editButton}>
                    <EditNoteIcon
                      onClick={() => handleEditClick(item)}
                    />
                  </IconButton>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <IconButton
                    className={classes.deleteButton}
                    onClick={() => handleDeleteDepartment(item.DepartmentID)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        size="large"
        style={{ marginTop: "20px", display: "flex" }}
      />

      <EditDepartmentModel
        isOpen={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        department={selectedDepartmentData}
       
      />
    </div>
  );
};

export default ViewDepartmentData;
