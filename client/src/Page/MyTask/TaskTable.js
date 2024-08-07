import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskData } from "../../features/Task/TaskActions";
import { selectTaskData } from "../../features/Task/TaskSlice";
import TaskEditModal from "./TaskEditModal";
import TaskAction from "./TaskAction";




const apiBasedUrl = process.env.REACT_APP_API_URL;


const TaskTable = () => {
  const dispatch = useDispatch();
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [filter, setFilter] = useState("All"); // Default filter is 'All'
  const taskData = useSelector(selectTaskData);

  useEffect(() => {
    dispatch(fetchTaskData());
  }, [dispatch]);

  useEffect(() => {
    const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
    setUserData(userDataFromSession);
  }, []);

  useEffect(() => {
    const fetchAssignedEmployees = async () => {
      try {
        const assigned = taskData.filter(
          (employee) => userData.EmployeeID === employee.EmployeeID
        );
        setAssignedEmployees(assigned);
      } catch (error) {
        console.error("Error fetching assigned employees:", error);
      }
    };

    if (userData) {
      fetchAssignedEmployees();
    }
  }, [userData, taskData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (TaskID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const apiUrl = `${apiBasedUrl}/api/taskDetails/delete/${TaskID}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        setAssignedEmployees((prevData) =>
          prevData.filter((item) => item.TaskID !== TaskID)
        );
      } else {
        console.error("Error deleting item:", response.status);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const filteredTasks = assignedEmployees.filter((task) => {
    if (filter === "All") {
      return true;
    } else {
      return task.TaskStatus.toLowerCase() === filter.toLowerCase();
    }
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTaskData, setSelectedTaskData] = useState(null);

  const handleEditClick = (taskData) => {
    setIsEditModalOpen(true);
    setSelectedTaskData(taskData);
  };

  return (
    <div className="viewTask-table">
      <Tabs
        value={filter}
        onChange={(event, newValue) => setFilter(newValue)}
        aria-label="Task Filters"
      >
        <Tab label="All" value="All" />
        <Tab label="Assigned" value="Assigned" />
        <Tab label="Progress" value="Progress" />
        <Tab label="Closed" value="Closed" />
      </Tabs>

      <TableContainer
        component={Paper}
        sx={{ background: "rgb(240, 240, 240)", boxShadow: "none" }}
      >
        <Table size="small" sx={{ marginTop: "16px" }}>
          <TableHead className="customTableHead">
            <TableRow>
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                Task ID
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                EmployeeID
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                Task Description
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                Start Date
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                End Date
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{ color: "white", padding: "10px 16px", fontSize: "15px" }}
              >
                Created At
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
                Task Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.TaskID} className="custom-row">
                  <TableCell className="vertical-border">
                    {item.TaskID}
                  </TableCell>
                  <TableCell className="vertical-border">
                    {item.EmployeeID}
                  </TableCell>
                  <TableCell className="vertical-border">
                    {item.TaskDescription}
                  </TableCell>
                  <TableCell className="vertical-border">
                    {moment(item.StartDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell className="vertical-border">
                    {moment(item.EndDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell className="vertical-border">
                    {moment(item.CreatedAt).format("DD/MM/YYYY")}
                  </TableCell>
                  
                  <TableCell className="vertical-border" style={{display:"flex"}}>
                    <IconButton
                      sx={{
                        color: "#055f85",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleEditClick(item)}
                    >
                      <EditNoteIcon />
                    </IconButton>

                    <IconButton
                      sx={{
                        color: "red",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(item.TaskID)}
                    >
                      <DeleteIcon sx={{fontSize:"1.3rem"}}/>
                    </IconButton>
                    <TaskAction StatusData={item}/>
                  </TableCell>

               
              <TableCell
                    className="vertical-border"
                    style={{
                      color:
                        item.TaskStatus === "Pending"
                          ? "red"
                          : item.TaskStatus === "Progress"
                          ? "orange"
                          : "green",
                    }}
                  >
                    {item.TaskStatus}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={filteredTasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TaskEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        taskData={selectedTaskData}
      />
    </div>
  );
};

export default TaskTable;
