import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Pagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableRow: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f2f2f2',
    
    },
    fontSize:"0.5rem"
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

const ViewDesignation = ({ designationData, handleDeleteDesignation  }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  designationData = Array.isArray(designationData) ?  designationData : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = designationData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(designationData.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const classes = useStyles();

  return (
    <div className="Department-table">
      <TableContainer component={Paper} style={{ maxHeight: "400px", overflowY: "auto", marginTop: "20px" }}>
        <Table aria-label="striped bordered table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell}>Designation ID</TableCell>
              <TableCell className={classes.tableHeadCell}>Designation Name</TableCell>
              <TableCell className={classes.tableHeadCell}>Edit</TableCell>
              <TableCell className={classes.tableHeadCell}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.DesignationID} className={classes.tableRow}>
                <TableCell className={classes.tableCell}>{item.DesignationID}</TableCell>
                <TableCell className={classes.tableCell}>{item.DesignationName}</TableCell>
                <TableCell className={classes.tableCell}>
                  <IconButton sx={{color: "#055f85"}}>
                    <EditNoteIcon />
                  </IconButton>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <IconButton sx={{color:"red"}} onClick={() => handleDeleteDesignation (item.DesignationID)}>
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
        style={{ marginTop: '20px', display: 'flex', }}
      />
    </div>
  );
};

export default ViewDesignation;


