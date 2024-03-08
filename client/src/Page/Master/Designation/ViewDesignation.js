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

import EditDesignationModel from "./EditDesignationModel";


const ViewDesignation = ({ designationData, handleDeleteDesignation }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDesignationData, setSelectedDesignationData] = useState(null);


  designationData = Array.isArray(designationData) ? designationData : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = designationData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(designationData.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };




  const handleEditClick = (designation) => {
    setIsEditModalOpen(true);
    setSelectedDesignationData(designation);
    
  };

  return (
    <div className="Department-table">
      <TableContainer
        component={Paper}
        style={{ maxHeight: "400px", overflowY: "auto", marginTop: "20px" }}
      >
        <Table size="small">
          <TableHead className="customTableHead">
            <TableRow>
              <TableCell className="vertical-border" sx={{color:"white", padding:"10px 16px", fontSize:"15px"}}>
                Designation ID
              </TableCell>
              <TableCell className="vertical-border" sx={{color:"white", padding:"10px 16px", fontSize:"15px"}}>
                Designation Name
              </TableCell>
              <TableCell className="vertical-border" sx={{color:"white", padding:"10px 16px", fontSize:"15px"}}>Edit</TableCell>
              <TableCell className="vertical-border" sx={{color:"white", padding:"10px 16px", fontSize:"15px"}}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.DesignationID} >
                <TableCell className="vertical-border" >
                  {item.DesignationID}
                </TableCell >
                <TableCell className="vertical-border">
                  {item.DesignationName}
                </TableCell>
                <TableCell className="vertical-border">
                  <IconButton >
                    <EditNoteIcon
                    sx={{color:"#055f85"}}
                     onClick={() => handleEditClick(item)}
                    />
                  </IconButton>
                </TableCell>
                <TableCell className="vertical-border">
                  <IconButton
                    sx={{color:"red"}}
                    onClick={() => handleDeleteDesignation(item.DesignationID)}
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

      <EditDesignationModel
        isOpen={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        designation={selectedDesignationData}
      />
    </div>
  );
};

export default ViewDesignation;
