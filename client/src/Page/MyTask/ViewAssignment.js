import { useState, useEffect } from "react";
import { Box, Typography, Modal, Button, TextField } from "@mui/material";
import { format } from "date-fns";
import SideBar from "../../Component/SideBar";
import TaskTable from "./TaskTable";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Pagination,
} from "@mui/material";
import "./ViewAssignment.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignmentData } from "../../features/assignment/assignmentAction";
import { selectAssignment } from "../../features/assignment/assignmentSlice";
import TaskDialog from "./Task";


const ViewAssignment = () => {
  const [assignmentData, setAssignmentData] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState(null);
  const itemsPerPage = 20;
  const [activeTabData, setActiveTabData] = useState("Assignment");
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);


  const dispatch = useDispatch();
  const assignment = useSelector(selectAssignment);

  useEffect(() => {
    dispatch(fetchAssignmentData());
  }, [dispatch]);

  useEffect(() => {
    const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
    setUserData(userDataFromSession);
  }, []);

  useEffect(() => {
    const fetchAssignedEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:3306/api/assignmentDetails/allData"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const assigned = data.filter(
          (employee) => userData.EmployeeID === employee.EmployeeID_AssignTo
        );

        setAssignmentData(assigned);
      } catch (error) {
        console.error("Error fetching assigned employees:", error);
      }
    };

    if (userData) {
      fetchAssignedEmployees();
    }
  }, [userData]);

  const handleTabChangeA = (event, newValue) => {
    setActiveTabData(newValue);
    setCurrentPage(1);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setCurrentPage(1);
  };

  const filterDataByTab = () => {
    if (activeTab === "All") {
      return assignmentData;
    } else {
      return assignmentData.filter(
        (item) => item.AssignmentStatus === activeTab
      );
    }
  };

  const filteredItems = filterDataByTab();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleTaskDialogOpen = () => {
    setIsTaskDialogOpen(true);
  };

  const handleTaskDialogClose = () => {
    setIsTaskDialogOpen(false);
  };

  const handleCreateTask = (taskName) => {
    // Implement your logic for creating a task
    console.log("Creating task:", taskName);
    handleTaskDialogClose(); // Close the dialog after task creation
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div className="viewAssignment-table">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" style={{ fontWeight: "500" }}>
              My Assignment Data
            </Typography>
            <Button
              onClick={handleTaskDialogOpen}
              variant="contained"
              sx={{
                backgroundColor: "#055f85",
                color: "#fff",
                padding: "8px 16px",
              }}
            >
              CREATE TASK
            </Button>
          </div>
          <Tabs
            value={activeTabData}
            onChange={handleTabChangeA}
            className="mb-3 mt-2"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Assignment" value="Assignment" />
            <Tab label="Task" value="Task" />
          </Tabs>

          {activeTabData === "Assignment" && (
            <div>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                className="mb-3 mt-2"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="All" value="All" />
                <Tab label="Pending" value="Pending" />
                <Tab label="Progress" value="Progress" />
                <Tab label="Completed" value="Completed" />
              </Tabs>

              <TableComponent data={currentItems} />
              <Pagination
                count={Math.ceil(filteredItems.length / itemsPerPage)}
                color="primary"
                onChange={(event, page) => paginate(page)}
              />
            </div>
          )}

          {activeTabData === "Task" && <TaskTable />}
        </div>

        <TaskDialog
          open={isTaskDialogOpen}
          onClose={handleTaskDialogClose}
          onCreateTask={handleCreateTask}
        />
      </Box>
    </Box>
  );
};

const TableComponent = ({ data }) => {
  const [selectedDescription, setSelectedDescription] = useState(null);

  const handleDescriptionClick = (description) =>
    setSelectedDescription(description);
  const handleCloseDescription = () => setSelectedDescription(null);

  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackInput, setFeedbackInput] = useState("");

  const handleFeedbackClick = (feedback) => {
    console.log(feedback);
    setSelectedFeedback(feedback);
    setIsFeedbackModalOpen(true);
  };

  const handleCloseFeedback = () => {
    setIsFeedbackModalOpen(false);
    setFeedbackInput(""); // Clear the feedback input when closing the modal
  };

  const handleFeedbackInputChange = (event) => {
    setFeedbackInput(event.target.value);
  };

  const handleSubmitFeedback = () => {
    // Handle submission of feedback here
    console.log("Feedback submitted:", feedbackInput);
    handleCloseFeedback();
  };

  const handleAdd = async (AssignmentID, AssignmentStatus) => {
    try {
      const apiUrl = `http://localhost:3306/api/assignmentDetails/${AssignmentID}/${
        AssignmentStatus === "Pending" ? "Progress" : "Completed"
      }`;
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        alert(
          `Data moved to ${
            AssignmentStatus === "Pending" ? "Progress" : "Completed"
          }`
        );
        window.location.reload();
      } else {
        console.error("Error updating task:", response.status);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="table-container">
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
              Assigner
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
              sx={{ color: "white", padding: "10px 16px", fontSize: "15px", }}
            >
              Feedback
            </TableCell>
            <TableCell
              className="vertical-border"
              sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
            >
              Add
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="custom-row">
              <TableCell className="vertical-border">
                {item.AssignmentID}
              </TableCell>
              <TableCell className="vertical-border">{`${item.EmployeeID}-${item.Assigner_FirstName}`}</TableCell>
              <TableCell
                onClick={() =>
                  handleDescriptionClick(item.Assignment_Description)
                }
                style={{ cursor: "pointer" }}
                className="vertical-border"
              >
                {item.Assignment_Description.slice(0, 50)}
              </TableCell>
              <TableCell className="vertical-border">
                {format(new Date(item.AssignDate), "dd/MM/yyyy")}
              </TableCell>
              <TableCell className="vertical-border">
                {format(new Date(item.DeadlineDate), "dd/MM/yyyy")}
              </TableCell>
              <TableCell
                style={{
                  color:
                    item.AssignmentStatus === "Pending"
                      ? "red"
                      : item.AssignmentStatus === "Progress"
                      ? "orange"
                      : "green",
                }}
                className="vertical-border"
              >
                {item.AssignmentStatus}
              </TableCell>
              <TableCell className="vertical-border">
                {item.AssignmentPriority}
              </TableCell>
              <TableCell
                className="vertical-border"
                onClick={() => handleFeedbackClick(item.Feedback)}
              >
                {item.Feedback ? (
                  item.Feedback
                ) : (
                  <p style={{color:"grey"}}>
                  Give Feedback
                  </p> 
                )}
              </TableCell>
              <TableCell className="vertical-border">
                {item.AssignmentStatus === "Completed" ? (
                  <CheckCircleIcon sx={{ color: "green" }} />
                ) : (
                  <AddBoxIcon
                    sx={{ color: "#055f85", cursor: "pointer" }}
                    onClick={() =>
                      handleAdd(item.AssignmentID, item.AssignmentStatus)
                    }
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        open={selectedDescription !== null}
        onClose={handleCloseDescription}
      >
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
          <Typography variant="h6">Assignment Description</Typography>
          <Typography>{selectedDescription}</Typography>
          <Button onClick={handleCloseDescription}>Close</Button>
        </Box>
      </Modal>
      <Modal open={isFeedbackModalOpen} onClose={handleCloseFeedback}>
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
          <Typography variant="h6">Provide Feedback</Typography>
          <TextField
            label="Feedback"
            multiline
            rows={4}
            fullWidth
            value={selectedFeedback}
            onChange={handleFeedbackInputChange}
            sx={{ mt: 2 }}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleCloseFeedback}>Cancel</Button>
            <Button
              onClick={handleSubmitFeedback}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewAssignment;
