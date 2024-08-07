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

} from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditNoteIcon from "@mui/icons-material/EditNote";
import moment from "moment";



const apiBasedUrl = process.env.REACT_APP_API_URL;


const TeamTaskTable = () => {
  const [data, setData] = useState([]);

  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [filter, setFilter] = useState("All");



useEffect(() => {
    const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
    setUserData(userDataFromSession);
}, []);

useEffect(() => {
  const fetchData = async () => {
      try {
          if (userData) {
              const apiUrl = `${apiBasedUrl}/api/workGroup/task`;
              const response = await fetch(apiUrl, {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
                  },
              });
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              const result = await response.json();

              // Filter the data where EmployeeID_Assigner matches userData.EmployeeID
              const filteredData = result.filter(item => item.EmployeeID_Assigner === userData.EmployeeID);

              setData(filteredData.reverse());
          }
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };

  fetchData();
}, [userData]);




  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredTasks = data.filter((task) => {
    if (filter === "All") {
      return true;
    } else {
      return task.TaskStatus.toLowerCase() === filter;
    }
  });

  if(!userData){
    return <div> Loding...</div>
  }

 
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
                sx={{
                  color: "white",
                  padding: "10px 16px",
                  fontSize: "15px",
                }}
              >
                Task ID
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{
                  color: "white",
                  padding: "10px 16px",
                  fontSize: "15px",
                }}
              >
                EmployeeID
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{
                  color: "white",
                  padding: "10px 16px",
                  fontSize: "15px",
                }}
              >
                Task Description
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{
                  color: "white",
                  padding: "10px 16px",
                  fontSize: "15px",
                }}
              >
                Start Date
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{
                  color: "white",
                  padding: "10px 16px",
                  fontSize: "15px",
                }}
              >
                End Date
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{
                  color: "white",
                  padding: "10px 16px",
                  fontSize: "15px",
                }}
              >
                Created At
              </TableCell>
              <TableCell
                className="vertical-border"
                sx={{
                  color: "white",
                  padding: "10px 16px",
                  fontSize: "15px",
                }}
              >
                Task Status
              </TableCell>
              {/* <TableCell
                className="vertical-border"
                sx={{
                  color: "white",
                  padding: "10px 16px",
                  fontSize: "15px",
                }}
              >
                Action
              </TableCell> */}
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
                    {item.EmployeeID} -{item.FirstName}
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
                  {/* <TableCell className="vertical-border">
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
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell> */}
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