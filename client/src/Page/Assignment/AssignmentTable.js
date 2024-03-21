import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
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
  Modal,
} from "@mui/material";
import { format } from "date-fns";
import "./Assignment.css";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import FeedbackIcon from "@mui/icons-material/Feedback";
import AssignmentEditModal from "./AssignmentEditModal";
import ReassignModal from "./ReassignModal";

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
          <Tab label="Reject" value="Reject" />
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
  const [selectedAssignmentID, setSelectedAssignmentID] = useState(null);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const [reassignmentData, setReassignmentData] = useState("");




  const handleEditClick = (data) => {
    setIsEditModalOpen(true);
    setSelectedAssignmentData(data);
  };

  const handleFeedbackClick = (assignmentID) => {
    setSelectedAssignmentID(assignmentID);
  };

  const handleCloseFeedback = () => {
    setSelectedAssignmentID(null);
    
  };


  const handleReassignClick = (reAssignData) => {
    setIsReassignModalOpen(true);
    setReassignmentData(reAssignData)
  }
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
                A-ID
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
                Reject Time
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                Regret Time
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                Close Time
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
                Feedback
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
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                Re-Assign
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
                  {item.RejectTimeStamp == null ? (
                    <span>Loading</span>
                  ) : (
                    <>
                      {format(new Date(item.RejectTimeStamp), "dd/MM/yyyy")}{" "}
                      {format(new Date(item.RejectTimeStamp), "HH:mm:ss")}
                      <FeedbackIcon
                        onClick={() => handleFeedbackClick(item.AssignmentID)}
                        sx={{ color: "#055f85" }}

                      />
                    </>
                  )}
                </TableCell>
                <TableCell className="vertical-border">
                  {item.RegretTimeStamp == null ? (
                    <span>Loading</span>
                  ) : (
                    <>
                      {format(new Date(item.RegretTimeStamp), "dd/MM/yyyy")}{" "}
                      {format(new Date(item.RegretTimeStamp), "HH:mm:ss")}
                      <FeedbackIcon
                        onClick={() => handleFeedbackClick(item.AssignmentID)}
                        sx={{ color: "#055f85" }}
                      />
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
                <TableCell className="vertical-border" >
                  {item.Feedback}
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


                <TableCell>
                  {(item.AssignmentStatus === "Reject" || item.AssignmentStatus === "Regret") && (
                    <Button
                      onClick={() => handleReassignClick(item)}
                      color="secondary"
                    >
                      Reassign
                    </Button>
                  )}
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

      <FeedbackModal
        isOpen={selectedAssignmentID !== null}
        onClose={handleCloseFeedback}
        assignmentID={selectedAssignmentID}
        assignmentDatas={data}
      />

      <ReassignModal
        open={isReassignModalOpen}
        reassignmentData = {reassignmentData}
        onClose={() => setIsReassignModalOpen(false)}
      />


    </div>
  );
};

const FeedbackModal = ({ isOpen, onClose, assignmentID, assignmentDatas }) => {
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    // Load feedback for the selected assignment ID
    const selectedAssignment = assignmentDatas.find(
      (item) => item.AssignmentID === assignmentID
    );
    if (selectedAssignment) {
      setFeedback(selectedAssignment.Feedback);
    }
  }, [assignmentID, assignmentDatas]);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6">Feedback for Assignment</Typography>
        <Typography variant="body1">{feedback}</Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button onClick={onClose}>Close</Button>
        </Box>
      </Box>
    </Modal>

  );
};




const getStatusColor = (status) => {
  switch (status) {
    case "Assigned":
      return "blue";
    case "Progress":
      return "orange";
    case "Closed":
      return "green";
    case "Regret":
      return "brown";
    case "Reject":
      return "red";
    default:
      return "inherit";
  }
};





export default AssignmentTable;



















