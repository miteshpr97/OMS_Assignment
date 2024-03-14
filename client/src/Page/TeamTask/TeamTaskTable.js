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



const TeamTaskTable = () => {
    const [data, setData] = useState();
    
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [filter, setFilter] = useState("All"); // Default filter is 'all'


  useEffect(() => {
    const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
    setUserData(userDataFromSession);
  }, []);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const apiUrl = '';
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          const result = await response.json();
          const reversedData = result.reverse();
          setData(reversedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);





  useEffect(() => {
    const fetchAssignedEmployees = async () => {
      try {
        const assigned = data.filter(
          (employee) => userData.EmployeeID === employee.EmployeeID
        );
        // const reversedData = assigned.reverse();
        setAssignedEmployees(assigned);
      } catch (error) {
        console.error("Error fetching assigned employees:", error);
      }
    };

    if (userData) {
      fetchAssignedEmployees();
    }
  }, [userData]);

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
      const apiUrl = `http://localhost:3306/api/taskDetails/delete/${TaskID}`;
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
      return task.TaskStatus.toLowerCase() === filter;
    }
  });


 
  return (
    <div className="viewTask-table">
      <Tabs
        value={filter}
        onChange={(event, newValue) => setFilter(newValue)}
        aria-label="Task Filters"
      >
        <Tab label="All" value="All" />
        <Tab label="Pending" value="pending" />
        <Tab label="Progress" value="progress" />
        <Tab label="Completed" value="completed" />
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
                Task Status
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
                  <TableCell className="vertical-border">
                    <IconButton
                      sx={{
                        color: "#055f85",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
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
        count={filteredTasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default TeamTaskTable;
