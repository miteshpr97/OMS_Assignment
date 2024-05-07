import React, { useEffect, useState } from "react";
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
import { format } from "date-fns";

import "./Alert.css";

const AlertTable = ({alertData, handleDeleteAlert}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [selectedAlertData, setSelectedAlertData] = useState(null);



  alertData = Array.isArray(alertData) ? alertData : [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = alertData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(alertData.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };


  return (
    <div>
      <TableContainer
        component={Paper}
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          marginTop: "20px",
        }}
      >
        <Table size="small">
          <TableHead className="customTableHead">
            <TableRow>
              <TableCell
                className="vertical-border"
                sx={{
                  color: "white",
                  padding: "10px 16px",
                  fontSize: "15px",
                }}
              >
                Alert ID
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{
                  color: "white",
                  padding: "10px 16px",
                  fontSize: "15px",
                }}
              >
                Assigner ID
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{
                  color: "white",
                  padding: "10px 16px",
                  fontSize: "15px",
                }}
              >
                AssignTo ID
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{
                  color: "white",
                  padding: "10px 16px",
                  fontSize: "15px",
                }}
              >
                Alert Note
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{
                  color: "white",
                  padding: "10px 16px",
                  fontSize: "15px",
                }}
              >
                Reminder
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{
                  color: "white",
                  padding: "10px 16px",
                  fontSize: "15px",
                }}
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {currentItems.map((item) => (
              <TableRow key={item.AlertID} className="custom-row">
                <TableCell className="vertical-border">
                  {item.AlertID}
                </TableCell>
                <TableCell className="vertical-border" sx={{}}>
                  {item.EmployeeID} - {item.Assigner_FirstName}
                </TableCell>
                <TableCell className="vertical-border">
                  {item.EmployeeID_AssignTo} - {item.Assignee_FirstName}
                </TableCell>
                <TableCell className="vertical-border">
                  {item.Alert_Note}
                </TableCell>
                <TableCell className="vertical-border">
                  {format(new Date(item.ReminderDay), "dd/MM/yyyy")}
                </TableCell>
                <TableCell className="vertical-border">
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => handleDeleteAlert(item.AlertID)}
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


      {/* Confirmation Dialog */}
      {/* <Dialog
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this item?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default AlertTable;
