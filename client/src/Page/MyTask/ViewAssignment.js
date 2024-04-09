import { useState, useEffect } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import { format } from "date-fns";
import SideBar from "../../Component/SideBar";
import TaskTable from "./TaskTable";

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

import Action from "./Action";

const ViewAssignment = () => {
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

  if (!userData) {
    return <div>Loading...</div>;
  }

  const assignmentData = assignment.filter((item) => {
    return item.EmployeeID_AssignTo === userData.EmployeeID;
  });

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
    handleTaskDialogClose();
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
                <Tab label="Assigned" value="Assigned" />
                <Tab label="Progress" value="Progress" />
                <Tab label="Closed" value="Closed" />
                <Tab label="Reject" value="Reject" />
                <Tab label="Regret" value="Regret" />
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

  return (
    <div className="table-container">
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
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="custom-row">
              <TableCell
                className="vertical-border"
                sx={{ padding: "10px 16px" }}
              >
                {item.AssignmentID}
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ padding: "10px 16px" }}
              >{`${item.EmployeeID}-${item.Assigner_FirstName}`}</TableCell>

              <TableCell
                style={{ cursor: "pointer", width:"300px", padding:"6px" }}
                className="vertical-border"
              >
                <div
                  style={{
                    maxWidth:"100%",
                    maxHeight: "100px", // Set your maximum height here
                    overflowY: "auto", // Enable vertical scrolling
                  }}
                  onClick={() =>
                    handleDescriptionClick(item.Assignment_Description)
                  }
                >
                  {item.Assignment_Description}
                </div>
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ padding: "10px 16px" }}
              >
                {format(new Date(item.AssignDate), "dd/MM/yyyy")}
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ padding: "10px 16px" }}
              >
                {format(new Date(item.DeadlineDate), "dd/MM/yyyy")}
              </TableCell>

              <TableCell
                className="vertical-border"
                sx={{ padding: "10px 16px" }}
              >
                {item.AssignmentPriority}
              </TableCell>

              <TableCell
                className="vertical-border"
                sx={{ padding: "10px 16px" }}
              >
                <Action StatusData={item} />
              </TableCell>

              <TableCell
                style={{
                  color:
                    item.AssignmentStatus === "Assigned"
                      ? "blue"
                      : item.AssignmentStatus === "Progress"
                      ? "orange"
                      : item.AssignmentStatus === "Reject"
                      ? "red"
                      : item.AssignmentStatus === "Regret"
                      ? "brown"
                      : "green",
                  padding: "10px 16px",
                }}
                className="vertical-border"
              >
                {item.AssignmentStatus}
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
    </div>
  );
};

export default ViewAssignment;
