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
import EditDepartmentModel from "./EditDepartmentModel";
import "../Master.css";


const ViewDepartmentData = ({ departments, handleDeleteDepartment}) => {

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
        style={{ maxHeight: "400px", overflowY: "auto", marginTop: "20px",  }}
      >
        <Table size="small">
          <TableHead className="customTableHead">
            <TableRow>
              <TableCell className="vertical-border" sx={{color:"white", padding:"10px 16px", fontSize:"15px"}}>
                Department ID
              </TableCell>
              <TableCell className="vertical-border" sx={{color:"white", padding:"10px 16px", fontSize:"15px"}}>
                Department Name
              </TableCell>
              <TableCell className="vertical-border" sx={{color:"white", padding:"10px 16px", fontSize:"15px"}}>Edit</TableCell>
              <TableCell className="vertical-border" sx={{color:"white", padding:"10px 16px", fontSize:"15px"}}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.DepartmentID} className="custom-row">
                <TableCell className="vertical-border">
                  {item.DepartmentID}
                </TableCell>
                <TableCell className="vertical-border">
                  {item.DepartmentName}
                </TableCell>
                <TableCell className="vertical-border">
                  <IconButton >
                    <EditNoteIcon
                    sx={{color:"#055f85"}}
                      onClick={() => handleEditClick(item)}
                    />
                  </IconButton>
                </TableCell>
                <TableCell className="vertical-border" >
                  <IconButton
                    sx={{color:"red" }}
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
