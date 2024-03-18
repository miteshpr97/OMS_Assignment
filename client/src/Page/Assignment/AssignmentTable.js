import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tab,
  Tabs,
  Typography,
  Pagination,
  IconButton,
} from "@mui/material";
import { format } from "date-fns";
import "./Assignment.css";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentEditModal from "./AssignmentEditModal";

const AssignmentTable = ({
  userData,
  assignmentDatas,
  loading,
  error,
  handleDeleteAssignment,
}) => {
  const [tableData, setTableData] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [selectedDescription, setSelectedDescription] = useState(null);

  useEffect(() => {
    if (!loading && !error && assignmentDatas && assignmentDatas.length > 0) {
      const assigned = assignmentDatas.filter(
        (employee) => userData.EmployeeID === employee.EmployeeID
      );
      const reversedData = assigned.reverse();
      setTableData(reversedData);
    }
  }, [assignmentDatas, userData, loading, error, handleDeleteAssignment]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setCurrentPage(1); // Reset current page when switching tabs
  };

  const filterDataByTab = () => {
    if (activeTab === "All") {
      return tableData;
    } else {
      return tableData.filter((item) => item.AssignmentStatus === activeTab);
    }
  };

  const filteredItems = filterDataByTab();

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleDescriptionClick = (description) => {
    setSelectedDescription(description);
  };

  const handleCloseDialog = () => {
    setSelectedDescription(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="assignment-table">
      <Typography variant="h5" style={{ fontWeight: "500" }}>
        Given Assignment Data
      </Typography>

      <div className="p-2">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="assignment tabs"
          className="mb-3 mt-2"
        >
          <Tab label="All" value="All" />
          <Tab label="Assigned" value="Assigned" />
          <Tab label="Progress" value="Progress" />
          <Tab label="Completed" value="Completed" />
          <Tab label="Regret" value="Regret" />
        </Tabs>

        <TableComponent
          data={currentItems}
          handleDescriptionClick={handleDescriptionClick}
          handleDeleteAssignment={handleDeleteAssignment}
        />

        <Pagination
          count={Math.ceil(filteredItems.length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
          className="pagination"
        />
      </div>

      <Dialog
        open={selectedDescription !== null}
        onClose={handleCloseDialog}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">Assignment Description</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{selectedDescription}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const TableComponent = ({
  data,
  handleDescriptionClick,
  handleDeleteAssignment,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAssignmentData, setSelectedAssignmentData] = useState(null);

  console.log(data, "data show For Assigner");
  const handleEditClick = (data) => {
    setIsEditModalOpen(true);
    setSelectedAssignmentData(data);
  };

  console.log(data, "djhdhdh");

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead className="customTableHead">
            <TableRow>
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                Assignment ID
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                AssignTo
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                Assignment Description
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                Assign Date
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                Deadline Date
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                Accept Time
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                Cancel Time
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                Compelete Time
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                Status
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                Priority
              </TableCell>

              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} className="custom-row">
                <TableCell className="vertical-border">
                  {item.AssignmentID}
                </TableCell>
                <TableCell className="vertical-border">
                  {item.EmployeeID_AssignTo} - {item.Assignee_FirstName}
                </TableCell>
                <TableCell
                  className="vertical-border"
                  onClick={() =>
                    handleDescriptionClick(item.Assignment_Description)
                  }
                  style={{ cursor: "pointer", maxWidth: "60px" }}
                >
                  {item.Assignment_Description}
                </TableCell>
                <TableCell className="vertical-border">
                  {format(new Date(item.AssignDate), "dd/MM/yyyy")}
                </TableCell>
                <TableCell className="vertical-border">
                  {format(new Date(item.DeadlineDate), "dd/MM/yyyy")}
                </TableCell>

                <TableCell className="vertical-border">
                  {item.AcceptTimestamp == null ? (
                    <span>Not Accept</span>
                  ) : (
                    <>
                      {format(new Date(item.AcceptTimestamp), "dd/MM/yyyy")}{" "}
                      {format(new Date(item.AcceptTimestamp), "HH:mm:ss")}
                    </>
                  )}
                </TableCell>

                <TableCell className="vertical-border">
                  {item.CancelTimestamp == null ? (
                    <span>Loading</span>
                  ) : (
                    <>
                      {format(new Date(item.CancelTimestamp), "dd/MM/yyyy")}{" "}
                      {format(new Date(item.CancelTimestamp), "HH:mm:ss")}
                    </>
                  )}
                </TableCell>

                <TableCell className="vertical-border">
                  {item.CompletionTimestamp == null ? (
                    <span>Progress</span>
                  ) : (
                    <>
                      {format(new Date(item.CompletionTimestamp), "dd/MM/yyyy")}{" "}
                      {format(new Date(item.CompletionTimestamp), "HH:mm:ss")}
                    </>
                  )}
                </TableCell>

                <TableCell className="vertical-border">
                  <span
                    style={{ color: getStatusColor(item.AssignmentStatus) }}
                  >
                    {item.AssignmentStatus}
                  </span>
                </TableCell>
                <TableCell className="vertical-border">
                  {item.AssignmentPriority}
                </TableCell>

                <TableCell className="vertical-border">
                  <IconButton
                    sx={{
                      color: "#055f85",
                    }}
                    onClick={() => handleEditClick(item)}
                  >
                    <EditNoteIcon />
                  </IconButton>

                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => handleDeleteAssignment(item.AssignmentID)}
                  >
                    <DeleteIcon sx={{ fontSize: "1.3rem" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AssignmentEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        assignmentData={selectedAssignmentData}
      />
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status) {
    case "Assigned":
      return "blue";
    case "Progress":
      return "orange";
    case "Completed":
      return "green";
    case "Regret":
      return "red";
    default:
      return "inherit";
  }
};

export default AssignmentTable;
