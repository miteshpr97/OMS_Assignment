import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Pagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f2f2f2',
    },
  },
  tableCell: {
    border: '1px solid #dddddd',
    padding: 8,
  },
  editButton: {
    color: "#055f85",
  },
  deleteButton: {
    color: "red",
  },
  tableHeadCell: {
    backgroundColor: '#5c7c77', // Set the background color of TableHead cells to blue
    color: 'white', // Set the text color to white for better contrast
    border: '1px solid #dddddd',
    padding: 8,
  },
});

const ViewDepartmentData = ({ departments, handleDeleteDesignation }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  // Ensure designationData is initialized as an array
  departments = Array.isArray(departments) ? departments : [];
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = departments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(departments.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const classes = useStyles();

  return (
    <div className="Department-table">
      <TableContainer component={Paper} style={{ maxHeight: "400px", overflowY: "auto", marginTop: "20px" }}>
        <Table aria-label="designation table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell}>Department ID</TableCell>
              <TableCell className={classes.tableHeadCell}>Department Name</TableCell>
              <TableCell className={classes.tableHeadCell}>Edit</TableCell>
              <TableCell className={classes.tableHeadCell}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.DepartmentID} className={classes.tableRow}>
                <TableCell className={classes.tableCell}>{item.DepartmentID}</TableCell>
                <TableCell className={classes.tableCell}>{item.DepartmentName}</TableCell>
                <TableCell className={classes.tableCell}>
                  <IconButton className={classes.editButton}>
                    <EditNoteIcon />
                  </IconButton>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <IconButton className={classes.deleteButton} onClick={() => handleDeleteDesignation(item.DepartmentID)}>
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
        style={{ marginTop: '20px', display: 'flex' }}
      />
    </div>
  );
};

export default ViewDepartmentData;
