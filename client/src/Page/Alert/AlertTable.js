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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TablePagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";

import "./Alert.css";

const AlertTable = () => {
  const [data, setData] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedAlertID, setSelectedAlertID] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const apiUrl = "http://localhost:3306/api/alertDetails";
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const apiUrl = `http://localhost:3306/api/alertDetails/delete/${selectedAlertID}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Remove the deleted item from the data array
        setData((prevData) =>
          prevData.filter((item) => item.AlertID !== selectedAlertID)
        );
        // Close the confirmation dialog
        setOpenConfirmation(false);
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleOpenConfirmation = (alertID) => {
    setSelectedAlertID(alertID);
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
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
                    onClick={() => handleOpenConfirmation(item.AlertID)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
     
      />

      {/* Confirmation Dialog */}
      <Dialog
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
      </Dialog>
    </div>
  );
};

export default AlertTable;
