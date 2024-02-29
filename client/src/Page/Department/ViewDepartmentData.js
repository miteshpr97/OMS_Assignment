import React, {  useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Pagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

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

  const handleDelete = async (DesignationID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");

    if (!confirmDelete) {
      return;
    }

    try {
      const apiUrl = `http://localhost:3306/api/designation/delete/${DesignationID}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted item from both data and filteredData arrays
        departments((prevData) =>
          prevData.filter((item) => item.DesignationID !== DesignationID)
        );
      } else {
        console.error("Error deleting item:", response.status);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="Department-table">
      <TableContainer component={Paper} style={{ maxHeight: "400px", overflowY: "auto", marginTop: "20px" }}>
        <Table className="table" aria-label="designation table">
          <TableHead>
            <TableRow>
            <TableCell>Department ID</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.DepartmentID}>
              <TableCell>{item.DepartmentID}</TableCell>
              <TableCell>{item.DepartmentName}</TableCell>
              <TableCell>
                <IconButton style={{ color: "#055f85" }}>
                  <EditNoteIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  style={{ color: "red" }}
                  onClick={() => handleDelete(item.DesignationID)}
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
        style={{ marginTop: '20px', display: 'flex',  }}
      />
    </div>
  );
};

export default ViewDepartmentData;
