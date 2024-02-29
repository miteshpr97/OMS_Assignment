import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Pagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { makeStyles } from '@material-ui/core/styles';
import "./Department.css"

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
  tableHeadCell: {
    backgroundColor: '#5c7c77', // Set the background color of TableHead cells to blue
    color: 'white', // Set the text color to white for better contrast
    border: '1px solid #dddddd',
    padding: 8,
  },
 
});

const ViewDepartmentData = ({ departments = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = departments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(departments.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleDelete = async (DepartmentID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");

    if (!confirmDelete) {
      return;
    }

    try {
      const apiUrl = `http://localhost:3306/api/designation/delete/${DepartmentID}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted item from both data and filteredData arrays
        departments((prevData) =>
          prevData.filter((item) => item.DepartmentID !== DepartmentID)
        );
      } else {
        console.error("Error deleting item:", response.status);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
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
                  <IconButton sx={{color:"#055f85"}}>
                    <EditNoteIcon />
                  </IconButton>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <IconButton sx={{color:"red"}} onClick={() => handleDelete(item.DepartmentID)}>
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
