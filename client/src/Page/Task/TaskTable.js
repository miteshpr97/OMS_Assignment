import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Tab, Table, Tabs } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import moment from "moment";

const TaskTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);

  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [userData, setUserData] = useState(null);

  console.log(assignedEmployees, "hello");

  useEffect(() => {
    const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
    setUserData(userDataFromSession);
  }, []);

  // getting data in table of login user
  useEffect(() => {
    const fetchAssignedEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:3306/api/taskDetails"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const assigned = data.filter(
          (employee) => userData.EmployeeID === employee.EmployeeID
        );
        const reversedData = assigned.reverse();
        setAssignedEmployees(reversedData);
      } catch (error) {
        console.error("Error fetching assigned employees:", error);
      }
    };

    if (userData) {
      fetchAssignedEmployees();
    }
  }, [userData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = assignedEmployees.slice(indexOfFirstItem, indexOfLastItem);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  


  // delete btn
  const handleDelete = async (TaskID) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) {
      // If the user clicks "Cancel" in the confirmation dialog, do nothing
      return;
    }

    try {
      const apiUrl = `http://localhost:3306/api/taskDetails/delete/${TaskID}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted item from both data and filteredData arrays
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

  return (
    <div className="assignment-table">
      <Typography variant="h5" style={{ fontWeight: "500" }}>
        Task Data
      </Typography>

      <div className="p-2">
        <Tabs
          defaultActiveKey="Pending"
          id="uncontrolled-tab-example"
          className="mb-3 mt-2"
        >
          {/* pending table data  */}
          <Tab
            eventKey="Pending"
            title="Pending"
            style={{ maxHeight: "400px", overflowY: "auto", marginTop: "20px" }}
          >
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Task ID</th>
                  <th>EmployeeID</th>
                  <th>Task Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Created At</th>
                  <th>Task Status</th>
                  <th>Type</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => {
                  // Only render rows where the status is 'Pending'
                  if (item.TaskStatus === "Pending") {
                    return (
                      <tr key={item.TaskID}>
                        <td>{item.TaskID}</td>
                        <td>{item.EmployeeID}</td>
                        <td>{item.TaskDescription}</td>
                        <td>{moment(item.StartDate).format("DD/MM/YYYY")}</td>
                        <td>{moment(item.EndDate).format("DD/MM/YYYY")}</td>
                        <td>{moment(item.CreatedAt).format("DD/MM/YYYY")}</td>
                        <td style={{ color: "red" }}>
                          {item.TaskStatus}
                        </td>
                        <td>{item.Type}</td>
                        <td
                          style={{
                            color: "#055f85",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                        >
                          <EditNoteIcon />
                        </td>
                        <td
                          style={{
                            color: "red",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(item.TaskID)}
                        >
                          <DeleteIcon />
                        </td>
                      </tr>
                    );
                  }
                  return null; // If status is not 'Pending', don't render the row
                })}
              </tbody>
            </Table>
          </Tab>

          {/* progress table data  */}

          <Tab
            eventKey="Progress"
            title="Progress"
            style={{ maxHeight: "400px", overflowY: "auto", marginTop: "20px" }}
          >
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                <th>Task ID</th>
                  <th>EmployeeID</th>
                  <th>Task Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Created At</th>
                  <th>Task Status</th>
                  <th>Type</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => {
                  // Only render rows where the status is 'Progress'
                  if (item.TaskStatus === "Progress") {
                    return (
                        <tr key={item.TaskID}>
                        <td>{item.TaskID}</td>
                        <td>{item.EmployeeID}</td>
                        <td>{item.TaskDescription}</td>
                        <td>{moment(item.StartDate).format("DD/MM/YYYY")}</td>
                        <td>{moment(item.EndDate).format("DD/MM/YYYY")}</td>
                        <td>{moment(item.CreatedAt).format("DD/MM/YYYY")}</td>
                        <td style={{ color: "red" }}>
                          {item.TaskStatus}
                        </td>
                        <td>{item.Type}</td>
                        <td
                          style={{
                            color: "#055f85",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                        >
                          <EditNoteIcon />
                        </td>
                        <td
                          style={{
                            color: "red",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(item.TaskID)}
                        >
                          <DeleteIcon />
                        </td>
                      </tr>
                    );
                  }
                  return null; // If status is not 'Pending', don't render the row
                })}
              </tbody>
            </Table>
          </Tab>

          {/* complete table data  */}
          <Tab
            eventKey="Completed"
            title="Completed"
            style={{ maxHeight: "400px", overflowY: "auto", marginTop: "20px" }}
          >
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                <th>Task ID</th>
                  <th>EmployeeID</th>
                  <th>Task Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Created At</th>
                  <th>Task Status</th>
                  <th>Type</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => {
                  // Only render rows where the status is 'Completed'
                  if (item.TaskStatus === "Completed") {
                    return (
                        <tr key={item.TaskID}>
                        <td>{item.TaskID}</td>
                        <td>{item.EmployeeID}</td>
                        <td>{item.TaskDescription}</td>
                        <td>{moment(item.StartDate).format("DD/MM/YYYY")}</td>
                        <td>{moment(item.EndDate).format("DD/MM/YYYY")}</td>
                        <td>{moment(item.CreatedAt).format("DD/MM/YYYY")}</td>
                        <td style={{ color: "red" }}>
                          {item.TaskStatus}
                        </td>
                        <td>{item.Type}</td>
                        <td
                          style={{
                            color: "#055f85",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                        >
                          <EditNoteIcon />
                        </td>
                        <td
                          style={{
                            color: "red",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(item.TaskID)}
                        >
                          <DeleteIcon />
                        </td>
                      </tr>
                    );
                  }
                  return null; // If status is not 'Pending', don't render the row
                })}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </div>

      {/* Pagination */}
      <ul className="pagination">
        {Array.from(
          { length: Math.ceil(filteredData.length / itemsPerPage) },
          (_, index) => (
            <li key={index} className="page-item">
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default TaskTable;





















// import { useState, useEffect } from "react";
// import SideBar from "../../Component/SideBar";
// import Box from "@mui/material/Box";
// import { Modal, Button, Table, Tab, Tabs, Pagination } from "react-bootstrap";
// import { format } from "date-fns";
// import { Typography } from "@mui/material";
// import "./ViewAssignment.css";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import TaskTable from "../Task/TaskTable";

// const ViewAssignment = () => {
//   const [tableData, setTableData] = useState([]);
//   const [activeTab, setActiveTab] = useState("Pending");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(20);

//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
//     setUserData(userDataFromSession);
//   }, []);

//   useEffect(() => {
//     const fetchAssignedEmployees = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3306/api/assignmentDetails/allData"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const data = await response.json();
//         const assigned = data.filter(
//           (employee) => userData.EmployeeID === employee.EmployeeID_AssignTo
//         );

//         const reversedData = assigned.reverse();
//         setTableData(reversedData);
//       } catch (error) {
//         console.error("Error fetching assigned employees:", error);
//       }
//     };

//     if (userData) {
//       fetchAssignedEmployees();
//     }
//   }, [userData]);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setCurrentPage(1); // Reset current page when switching tabs
//   };

//   const userDatas = JSON.parse(sessionStorage.getItem("userData"));

//   const filterDataByTab = () => {
//     if (activeTab === "Pending") {
//       return tableData.filter((item) => item.AssignmentStatus === "Pending");
//     } else if (activeTab === "Progress") {
//       return tableData.filter((item) => item.AssignmentStatus === "Progress");
//     } else if (activeTab === "Completed") {
//       return tableData.filter((item) => item.AssignmentStatus === "Completed");
//     }
//     return [];
//   };

//   const filteredItems = filterDataByTab();

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <Box sx={{ display: "flex" }}>
//       <SideBar />
//       <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
//         <Typography style={{textTransform:'capitalize', fontSize:'1.2rem'}}>
//           {userDatas.FirstName} {userDatas.LastName}
//         </Typography>

//         <div className="assignment-table">
//           <Typography variant="h5" style={{ fontWeight: "500" }}>
//             Assignment Data
//           </Typography>
//           <div className="p-2">
//             <Tabs
//               defaultActiveKey="Pending"
//               id="uncontrolled-tab-example"
//               className="mb-3 mt-2"
//               onSelect={(tab) => handleTabChange(tab)}
//             >
//               <Tab eventKey="Pending" title="Pending">
//                 <TableComponent data={currentItems} />
//               </Tab>
//               <Tab eventKey="Progress" title="Progress">
//                 <TableComponent data={currentItems} />
//               </Tab>
//               <Tab eventKey="Completed" title="Completed">
//                 <TableComponent data={currentItems} />
//               </Tab>
//             </Tabs>
//             <Pagination>
//               {Array.from({
//                 length: Math.ceil(filteredItems.length / itemsPerPage),
//               }).map((_, index) => (
//                 <Pagination.Item
//                   key={index}
//                   active={index + 1 === currentPage}
//                   onClick={() => paginate(index + 1)}
//                 >
//                   {index + 1}
//                 </Pagination.Item>
//               ))}
//             </Pagination>
//           </div>
//         </div>
//         <div>
//           <TaskTable />
//         </div>
//       </Box>
//     </Box>
//   );
// };

// const TableComponent = ({ data }) => {
//   const [selectedDescription, setSelectedDescription] = useState(null);

//   // Function to handle click on description cell
//   const handleDescriptionClick = (description) => {
//     setSelectedDescription(description);
//   };

//   // Function to close the modal
//   const handleClose = () => {
//     setSelectedDescription(null);
//   };

//   // Add function
//   const handleAdd = async (AssignmentID, AssignmentStatus) => {
//     try {
//       let apiUrl;
//       if (AssignmentStatus === "Pending") {
//         apiUrl = `http://localhost:3306/api/assignmentDetails/${AssignmentID}/Progress`;
//       } else if (AssignmentStatus === "Progress") {
//         apiUrl = `http://localhost:3306/api/assignmentDetails/${AssignmentID}/Completed`;
//       } else {
//         // If status is already 'Complete', do nothing
//         return;
//       }

//       const response = await fetch(apiUrl, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });

//       if (response.ok) {
//         alert(
//           `Data moved to ${
//             AssignmentStatus === "Pending" ? "progress" : "completed"
//           }`
//         );
//         window.location.reload();
//         // Optionally, you may want to update the UI to reflect the status change
//       } else {
//         console.error("Error updating task:", response.status);
//       }
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   return (
//     <div>
//       <Table striped bordered hover size="sm" className="small-table">
//         <thead>
//           <tr>
//             <th>Assignment ID</th>
//             <th>Assigner</th>
//             {/* <th>AssignTo</th> */}
//             <th>Assignment Description</th>
//             <th>Assign Date</th>
//             <th>Deadline Date</th>
//             <th>Status</th>
//             <th>Priority</th>
//             <th>Type</th>
//             <th>Add</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index}>
//               <td>{item.AssignmentID}</td>
//               <td>
//                 {item.EmployeeID}-{item.Assigner_FirstName}
//               </td>
//               {/* <td>
//                 {item.EmployeeID_AssignTo}--{item.Assignee_FirstName}
//               </td> */}
//               <td
//                 onClick={() =>
//                   handleDescriptionClick(item.Assignment_Description)
//                 }
//                 style={{ cursor: "pointer" }}
//               >
//                 {item.Assignment_Description.slice(0, 50)}
//               </td>
//               <td>{format(new Date(item.AssignDate), "dd/MM/yyyy")}</td>
//               <td>{format(new Date(item.DeadlineDate), "dd/MM/yyyy")}</td>
//               <td>
//                 {item.AssignmentStatus === "Pending" ? (
//                   <span style={{ color: "red" }}>{item.AssignmentStatus}</span>
//                 ) : item.AssignmentStatus === "Progress" ? (
//                   <span style={{ color: "orange" }}>
//                     {item.AssignmentStatus}
//                   </span>
//                 ) : (
//                   <span style={{ color: "green" }}>
//                     {item.AssignmentStatus}
//                   </span>
//                 )}
//               </td>

//               <td>{item.AssignmentPriority}</td>
//               <td>{item.Type}</td>
//               <td>
//                 {item.AssignmentStatus === "Completed" ? (
//                   // Render your icon for 'Complete' status here
//                   <CheckCircleIcon sx={{ color: "green" }} />
//                 ) : (
//                   // Render 'AddBoxIcon' for other statuses
//                   <AddBoxIcon
//                     sx={{ color: "#055f85", cursor: "pointer" }}
//                     onClick={() =>
//                       handleAdd(item.AssignmentID, item.AssignmentStatus)
//                     }
//                   />
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Modal to display full description */}
//       <Modal
//         show={selectedDescription !== null}
//         onHide={handleClose}
//         style={{ marginTop: "60px" }}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Assignment Description</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>{selectedDescription}</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ViewAssignment;



// import * as React from "react";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import SideBar from "../../Component/SideBar";
// import { useState, useEffect } from "react";
// import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
// import { makeStyles } from "@material-ui/core/styles";

// // Move useStyles outside of the component function
// const useStyles = makeStyles((theme) => ({
//   table: {
//     minWidth: 650,
//   },
//   tableHeaderCell: {
//     fontWeight: "bold",
//     backgroundColor: "#44756d",
//     color: theme.palette.getContrastText(theme.palette.primary.dark),
//   },
//   name: {
//     fontSize: "0.9rem",
//   },
//   status: {
//     fontWeight: "bold",
//     fontSize: "0.75rem",
//     color: "white",
//     borderRadius: 8,
//     padding: "5px 10px",
//     marginTop: "17px",
//     display: "inline-block",
//   },
// }));

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`tabpanel-${index}`}
//       aria-labelledby={`tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `tab-${index}`,
//     "aria-controls": `tabpanel-${index}`,
//   };
// }

// export default function ViewAssignment() {
//   const [value, setValue] = useState(0);
//   const [assignmentSectionValue, setAssignmentSectionValue] = useState(0);
//   const [taskSectionValue, setTaskSectionValue] = useState(0);
//   const [tableData, setTableData] = useState([]);
//   const [taskData, setTaskData] = useState([]);

//   const classes = useStyles(); // Initialize useStyles here

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleAssignmentSectionChange = (event, newValue) => {
//     setAssignmentSectionValue(newValue);
//   };

//   const handleTaskSectionChange = (event, newValue) => {
//     setTaskSectionValue(newValue);
//   };

//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
//     setUserData(userDataFromSession);
//   }, []);

//   // Assignment data fetch
//   useEffect(() => {
//     const fetchAssignedEmployees = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3306/api/assignmentDetails/allData"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const data = await response.json();
//         // console.log(data, "assigan");
//         const assigned = data.filter(
//           (employee) => userData.EmployeeID === employee.EmployeeID_AssignTo
//         );

//         const reversedData = assigned.reverse();
//         // console.log(reversedData,"reverserd");
//         setTableData(reversedData);
//       } catch (error) {
//         console.error("Error fetching assigned employees:", error);
//       }
//     };

//     if (userData) {
//       fetchAssignedEmployees();
//     }
//   }, [userData]);

//   // console.log(tableData, "datatable");

//   // task data fetch
//   useEffect(() => {
//     const fetchTaskEmployees = async () => {
//       try {
//         const response = await fetch("http://localhost:3306/api/taskDetails");
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const data = await response.json();
//         // console.log(data, "assigan");
//         const assigned = data.filter(
//           (employee) => userData.EmployeeID === employee.EmployeeID
//         );

//         const reversedData = assigned.reverse();
//         // console.log(reversedData,"reverserd");
//         setTaskData(reversedData);
//       } catch (error) {
//         console.error("Error fetching assigned employees:", error);
//       }
//     };

//     if (userData) {
//       fetchTaskEmployees();
//     }
//   }, [userData]);

//   // console.log(taskData, "tsk data");

//   return (
//     <Box sx={{ display: "flex" }}>
//       <SideBar />
//       <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
//         <div className="assignment-table">
//           <Typography variant="h5" style={{ fontWeight: "500" }}>
//             Assignment Data
//           </Typography>

//           <Box sx={{ width: "100%" }}>
//             <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//               <Tabs
//                 value={value}
//                 onChange={handleChange}
//                 aria-label="basic tabs example"
//               >
//                 <Tab label="Assignment" {...a11yProps(0)} />
//                 <Tab label="Task" {...a11yProps(1)} />
//               </Tabs>
//             </Box>

//             {/* Assigment table section  */}
//             <CustomTabPanel value={value} index={0}>
//               <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//                 <Tabs
//                   value={assignmentSectionValue}
//                   onChange={handleAssignmentSectionChange}
//                   aria-label="assignment section tabs"
//                 >
//                   <Tab label="Pending" {...a11yProps(0)} />
//                   <Tab label="Progress" {...a11yProps(1)} />
//                   <Tab label="Completed" {...a11yProps(2)} />
//                 </Tabs>
//               </Box>

//               <CustomTabPanel value={assignmentSectionValue} index={0}>
//                 {/* Table for Pending */}
//                 <Table striped bordered hover size="sm" className="small-table">
//                   <thead>
//                     <tr>
//                       <th>Assignment ID</th>
//                       <th>Assigner</th>
//                       <th>Assignment Description</th>
//                       <th>Assign Date</th>
//                       <th>Deadline Date</th>
//                       <th>Status</th>
//                       <th>Priority</th>
//                       <th>Type</th>
//                       <th>Add</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {tableData
//                       .filter((item) => item.AssignmentStatus === "Pending")
//                       .map((item) => (
//                         <tr key={item.AssignmentID}>
//                           <td>{item.AssignmentID}</td>
//                           <td>
//                             {item.EmployeeID}-{item.Assigner_FirstName}
//                           </td>
//                           <td>{item.Assignment_Description}</td>
//                           <td>{item.AssignDate}</td>
//                           <td>{item.DeadlineDate}</td>
//                           <td>{item.AssignmentStatus}</td>
//                           <td>{item.AssignmentPriority}</td>
//                           <td>{item.Type}</td>
//                           <td>add</td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </Table>
//               </CustomTabPanel>

//               <CustomTabPanel value={assignmentSectionValue} index={1}>
//                 {/* Table for Progress */}
//                 <Table striped bordered hover size="sm" className="small-table">
//                   <thead>
//                     <tr>
//                       <th>Assignment ID</th>
//                       <th>Assigner</th>
//                       <th>Assignment Description</th>
//                       <th>Assign Date</th>
//                       <th>Deadline Date</th>
//                       <th>Status</th>
//                       <th>Priority</th>
//                       <th>Type</th>
//                       <th>Add</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {tableData
//                       .filter((item) => item.AssignmentStatus === "Progress")
//                       .map((item) => (
//                         <tr key={item.AssignmentID}>
//                           <td>{item.AssignmentID}</td>
//                           <td>
//                             {item.EmployeeID}-{item.Assigner_FirstName}
//                           </td>
//                           <td>{item.Assignment_Description}</td>
//                           <td>{item.AssignDate}</td>
//                           <td>{item.DeadlineDate}</td>
//                           <td>{item.AssignmentStatus}</td>
//                           <td>{item.AssignmentPriority}</td>
//                           <td>{item.Type}</td>
//                           <td>add</td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </Table>
//               </CustomTabPanel>
//               <CustomTabPanel value={assignmentSectionValue} index={2}>
//                 {/* Table for Completed */}
//                 <Table striped bordered hover size="sm" className="small-table">
//                   <thead>
//                     <tr>
//                       <th>Assignment ID</th>
//                       <th>Assigner</th>
//                       <th>Assignment Description</th>
//                       <th>Assign Date</th>
//                       <th>Deadline Date</th>
//                       <th>Status</th>
//                       <th>Priority</th>
//                       <th>Type</th>
//                       <th>Add</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {tableData
//                       .filter((item) => item.AssignmentStatus === "Completed")
//                       .map((item) => (
//                         <tr key={item.AssignmentID}>
//                           <td>{item.AssignmentID}</td>
//                           <td>
//                             {item.EmployeeID}-{item.Assigner_FirstName}
//                           </td>
//                           <td>{item.Assignment_Description}</td>
//                           <td>{item.AssignDate}</td>
//                           <td>{item.DeadlineDate}</td>
//                           <td>{item.AssignmentStatus}</td>
//                           <td>{item.AssignmentPriority}</td>
//                           <td>{item.Type}</td>
//                           <td>add</td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </Table>
//               </CustomTabPanel>
//             </CustomTabPanel>

//             {/* task table section  */}
//             <CustomTabPanel value={value} index={1}>
//               <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//                 <Tabs
//                   value={taskSectionValue}
//                   onChange={handleTaskSectionChange}
//                   aria-label="task section tabs"
//                 >
//                   <Tab label="Pending" {...a11yProps(0)} />
//                   <Tab label="Progress" {...a11yProps(1)} />
//                   <Tab label="Completed" {...a11yProps(2)} />
//                 </Tabs>
//               </Box>
//               <CustomTabPanel value={taskSectionValue} index={0}>
//                 {/* Table for Task Pending */}
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell className={classes.tableHeaderCell}>Task ID</TableCell>
//                       <TableCell className={classes.tableHeaderCell}>Task Description</TableCell>
//                       <TableCell className={classes.tableHeaderCell}>Start Date</TableCell>
//                       <TableCell className={classes.tableHeaderCell}>End Date</TableCell>
//                       <TableCell className={classes.tableHeaderCell}>CreatedAt</TableCell>
//                       <TableCell className={classes.tableHeaderCell}>Status</TableCell>
//                       <TableCell className={classes.tableHeaderCell}> Type</TableCell>
//                       <TableCell className={classes.tableHeaderCell}>Add</TableCell>

//                     </TableRow>
//                   </TableHead>

//                   <TableBody>
//                     {taskData
//                       .filter((data) => data.TaskStatus === "Pending")
//                       .map((data, index) => (
//                         <TableRow key={data.TaskID} 
//                         style={{
//                           backgroundColor: index % 2 === 0 ? "#D3D3D3" : "white",
//                         }}>
//                           <TableCell className={classes.name}>{data.TaskID}</TableCell>
//                           <TableCell className={classes.name}>{data.TaskDescription}</TableCell>
//                           <TableCell className={classes.name}>{data.StartDate}</TableCell>
//                           <TableCell className={classes.name}>{data.EndDate}</TableCell>
//                           <TableCell className={classes.name}>{data.CreatedAt}</TableCell>
//                           <TableCell className={classes.name}>{data.TaskStatus}</TableCell>
//                           <TableCell className={classes.name}>{data.Type}</TableCell>
//                           <TableCell className={classes.name}>add</TableCell>
//                         </TableRow>
//                       ))}
//                  </TableBody>
//                 </Table>
//               </CustomTabPanel>
//               <CustomTabPanel value={taskSectionValue} index={1}>
//                 {/* Table for Task Progress */}
//                 <Table striped bordered hover size="sm" className="small-table">
//                   <thead>
//                     <tr>
//                       <th>TaskID</th>
//                       <th>TaskDescription</th>
//                       <th>StartDate</th>
//                       <th>EndDate</th>
//                       <th>CreatedAt</th>
//                       <th>Status</th>
//                       <th>Type</th>
//                       <th>Add</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {taskData
//                       .filter((data) => data.TaskStatus === "Progress")
//                       .map((data) => (
//                         <tr key={data.TaskID}>
//                           <td>{data.TaskID}</td>
//                           <td>{data.TaskDescription}</td>
//                           <td>{data.StartDate}</td>
//                           <td>{data.EndDate}</td>
//                           <td>{data.CreatedAt}</td>
//                           <td>{data.TaskStatus}</td>
//                           <td>{data.Type}</td>
//                           <td>add</td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </Table>
//               </CustomTabPanel>
//               <CustomTabPanel value={taskSectionValue} index={2}>
//                 {/* Table for Task Completed */}
//                 <Table striped bordered hover size="sm" className="small-table">
//                   <thead>
//                     <tr>
//                       <th>TaskID</th>
//                       <th>TaskDescription</th>
//                       <th>StartDate</th>
//                       <th>EndDate</th>
//                       <th>CreatedAt</th>
//                       <th>Status</th>
//                       <th>Type</th>
//                       <th>Add</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {taskData
//                       .filter((data) => data.TaskStatus === "Completed")
//                       .map((data) => (
//                         <tr key={data.TaskID}>
//                           <td>{data.TaskID}</td>
//                           <td>{data.TaskDescription}</td>
//                           <td>{data.StartDate}</td>
//                           <td>{data.EndDate}</td>
//                           <td>{data.CreatedAt}</td>
//                           <td>{data.TaskStatus}</td>
//                           <td>{data.Type}</td>
//                           <td>add</td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </Table>
//               </CustomTabPanel>
//             </CustomTabPanel>
//           </Box>
//         </div>
//       </Box>
//     </Box>
//   );
// }
