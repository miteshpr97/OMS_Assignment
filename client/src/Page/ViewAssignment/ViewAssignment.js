// import { useState, useEffect } from "react";
// import { Box, Typography, Modal, Button } from "@mui/material";
// import { format } from "date-fns";
// import SideBar from "../../Component/SideBar";
// import TaskTable from "../Task/TaskTable";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import {
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Tabs,
//   Tab,
//   Pagination,
// } from "@mui/material";
// import "./ViewAssignment.css";
// import TaskDialog from "./Task";

// const ViewAssignment = () => {
//   const [assignmentData, setAssignmentData] = useState([]);
//   const [activeTab, setActiveTab] = useState("Pending");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [userData, setUserData] = useState(null);
//   const itemsPerPage = 20;
//   const userDatas = JSON.parse(sessionStorage.getItem("userData"));
//   const [activeTabData, setActiveTabData] = useState("Assignment");
//   const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);

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
//         setAssignmentData(reversedData);
//       } catch (error) {
//         console.error("Error fetching assigned employees:", error);
//       }
//     };

//     if (userData) {
//       fetchAssignedEmployees();
//     }
//   }, [userData]);

//   const handleTabChangeA = (event, newValue) => {
//     setActiveTabData(newValue);
//     setCurrentPage(1);
//   };

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//     setCurrentPage(1);
//   };

//   const filterDataByTab = () => {
//     return activeTabData === "Assignment"
//       ? assignmentData.filter((item) => item.AssignmentStatus === activeTab)
//       : [];
//   };

//   const filteredItems = filterDataByTab();
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleTaskDialogOpen = () => {
//     setIsTaskDialogOpen(true);
//   };

//   const handleTaskDialogClose = () => {
//     setIsTaskDialogOpen(false);
//   };

//   const handleCreateTask = (taskName) => {
//     // Implement your logic for creating a task
//     console.log("Creating task:", taskName);
//     handleTaskDialogClose(); // Close the dialog after task creation
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <SideBar />
//       <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
//         <Typography style={{ textTransform: "capitalize", fontSize: "1.2rem" }}>
//           {userDatas.FirstName} {userDatas.LastName}
//         </Typography>

//         <div className="assignment-table">
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography variant="h5" style={{ fontWeight: "500" }}>
//               Assignment Data
//             </Typography>
//             <Button
//               onClick={handleTaskDialogOpen}
//               variant="contained"
//               sx={{
//                 backgroundColor: "#055f85",
//                 color: "#fff",
//                 padding: "8px 16px",
//               }}
//             >
//               CREATE Task
//             </Button>
//           </div>
//           <Tabs
//             value={activeTabData}
//             onChange={handleTabChangeA}
//             className="mb-3 mt-2"
//             indicatorColor="primary"
//             textColor="primary"
//           >
//             <Tab label="Assignment" value="Assignment" />
//             <Tab label="Task" value="Task" />
//           </Tabs>

//           <Tabs
//             value={activeTab}
//             onChange={handleTabChange}
//             className="mb-3 mt-2"
//             indicatorColor="primary"
//             textColor="primary"
//           >
//             <Tab label="Pending" value="Pending" />
//             <Tab label="Progress" value="Progress" />
//             <Tab label="Completed" value="Completed" />
//           </Tabs>

//           <TableComponent data={currentItems} />
//           <Pagination
//             count={Math.ceil(filteredItems.length / itemsPerPage)}
//             color="primary"
//             onChange={(event, page) => paginate(page)}
//           />

//           <div>{activeTabData === "Task" && <TaskTable />}</div>
//         </div>

//         <TaskDialog
//           open={isTaskDialogOpen}
//           onClose={handleTaskDialogClose}
//           onCreateTask={handleCreateTask}
//         />
//       </Box>
//     </Box>
//   );
// };

// const TableComponent = ({ data }) => {
//   const [selectedDescription, setSelectedDescription] = useState(null);

//   const handleDescriptionClick = (description) =>
//     setSelectedDescription(description);
//   const handleClose = () => setSelectedDescription(null);

//   const handleAdd = async (AssignmentID, AssignmentStatus) => {
//     try {
//       const apiUrl = `http://localhost:3306/api/assignmentDetails/${AssignmentID}/${
//         AssignmentStatus === "Pending" ? "Progress" : "Completed"
//       }`;
//       const response = await fetch(apiUrl, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//       });

//       if (response.ok) {
//         alert(
//           `Data moved to ${
//             AssignmentStatus === "Pending" ? "progress" : "completed"
//           }`
//         );
//         window.location.reload();
//       } else {
//         console.error("Error updating task:", response.status);
//       }
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   return (
//     <div>
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>Assignment ID</TableCell>
//             <TableCell>Assigner</TableCell>
//             <TableCell>Assignment Description</TableCell>
//             <TableCell>Assign Date</TableCell>
//             <TableCell>Deadline Date</TableCell>
//             <TableCell>Status</TableCell>
//             <TableCell>Priority</TableCell>
//             {/* <TableCell>Type</TableCell> */}
//             <TableCell>Add</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((item, index) => (
//             <TableRow key={index}>
//               <TableCell>{item.AssignmentID}</TableCell>
//               <TableCell>{`${item.EmployeeID}-${item.Assigner_FirstName}`}</TableCell>
//               <TableCell
//                 onClick={() =>
//                   handleDescriptionClick(item.Assignment_Description)
//                 }
//                 style={{ cursor: "pointer" }}
//               >
//                 {item.Assignment_Description.slice(0, 50)}
//               </TableCell>
//               <TableCell>
//                 {format(new Date(item.AssignDate), "dd/MM/yyyy")}
//               </TableCell>
//               <TableCell>
//                 {format(new Date(item.DeadlineDate), "dd/MM/yyyy")}
//               </TableCell>
//               <TableCell
//                 style={{
//                   color:
//                     item.AssignmentStatus === "Pending"
//                       ? "red"
//                       : item.AssignmentStatus === "Progress"
//                       ? "orange"
//                       : "green",
//                 }}
//               >
//                 {item.AssignmentStatus}
//               </TableCell>
//               <TableCell>{item.AssignmentPriority}</TableCell>
//               {/* <TableCell>{item.Type}</TableCell> */}
//               <TableCell>
//                 {item.AssignmentStatus === "Completed" ? (
//                   <CheckCircleIcon sx={{ color: "green" }} />
//                 ) : (
//                   <AddBoxIcon
//                     sx={{ color: "#055f85", cursor: "pointer" }}
//                     onClick={() =>
//                       handleAdd(item.AssignmentID, item.AssignmentStatus)
//                     }
//                   />
//                 )}
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       <Modal open={selectedDescription !== null} onClose={handleClose}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <Typography variant="h6">Assignment Description</Typography>
//           <Typography>{selectedDescription}</Typography>
//           <Button onClick={handleClose}>Close</Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default ViewAssignment;

// // import { useState, useEffect } from "react";
// // import { Box, Typography, Modal, Button, Tabs, Tab, Pagination } from "@mui/material";
// // import { format } from "date-fns";
// // import SideBar from "../../Component/SideBar";
// // import TaskTable from "../Task/TaskTable";
// // import AssignmentTable from "./AssignmentTable";
// // import "./ViewAssignment.css";

// // const ViewAssignment = () => {
// //   const [assignmentData, setAssignmentData] = useState([]);
// //   const [activeTab, setActiveTab] = useState("Pending");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [userData, setUserData] = useState(null);
// //   const itemsPerPage = 20;
// //   const userDatas = JSON.parse(sessionStorage.getItem("userData"));
// //   const [activeTabData, setActiveTabData] = useState("Assignment");
// //   const [selectedDescription, setSelectedDescription] = useState(null);

// //   useEffect(() => {
// //     const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
// //     setUserData(userDataFromSession);
// //   }, []);

// //   useEffect(() => {
// //     const fetchAssignedEmployees = async () => {
// //       try {
// //         const response = await fetch(
// //           "http://localhost:3306/api/assignmentDetails/allData"
// //         );
// //         if (!response.ok) {
// //           throw new Error("Failed to fetch data");
// //         }
// //         const data = await response.json();
// //         const assigned = data.filter(
// //           (employee) => userData.EmployeeID === employee.EmployeeID_AssignTo
// //         );
// //         const reversedData = assigned.reverse();
// //         setAssignmentData(reversedData);
// //       } catch (error) {
// //         console.error("Error fetching assigned employees:", error);
// //       }
// //     };

// //     if (userData) {
// //       fetchAssignedEmployees();
// //     }
// //   }, [userData]);

// //   const handleTabChangeA = (event, newValue) => {
// //     setActiveTabData(newValue);
// //     setCurrentPage(1);
// //   };

// //   const handleTabChange = (event, newValue) => {
// //     setActiveTab(newValue);
// //     setCurrentPage(1);
// //   };

// //   const filterDataByTab = () => {
// //     return activeTabData === "Assignment"
// //       ? assignmentData.filter((item) => item.AssignmentStatus === activeTab)
// //       : [];
// //   };

// //   const filteredItems = filterDataByTab();
// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

// //   const paginate = (pageNumber) => setCurrentPage(pageNumber);

// //   const handleDescriptionClick = (description) => setSelectedDescription(description);
// //   const handleClose = () => setSelectedDescription(null);

// //   const handleAdd = async (AssignmentID, AssignmentStatus) => {
// //     try {
// //       const apiUrl = `http://localhost:3306/api/assignmentDetails/${AssignmentID}/${
// //         AssignmentStatus === "Pending" ? "Progress" : "Completed"
// //       }`;
// //       const response = await fetch(apiUrl, {
// //         method: "PATCH",
// //         headers: { "Content-Type": "application/json" },
// //         credentials: "include",
// //       });

// //       if (response.ok) {
// //         alert(
// //           `Data moved to ${
// //             AssignmentStatus === "Pending" ? "progress" : "completed"
// //           }`
// //         );
// //         window.location.reload();
// //       } else {
// //         console.error("Error updating task:", response.status);
// //       }
// //     } catch (error) {
// //       console.error("Error updating task:", error);
// //     }
// //   };

// //   return (
// //     <Box sx={{ display: "flex" }}>
// //       <SideBar />
// //       <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
// //         <Typography style={{ textTransform: "capitalize", fontSize: "1.2rem" }}>
// //           {userDatas.FirstName} {userDatas.LastName}
// //         </Typography>

// //         <div className="assignment-table">
// //           <Typography variant="h5" style={{ fontWeight: "500" }}>
// //             Assignment Data
// //           </Typography>

// //           <Tabs
// //             value={activeTabData}
// //             onChange={handleTabChangeA}
// //             className="mb-3 mt-2"
// //             indicatorColor="primary"
// //             textColor="primary"
// //           >
// //             <Tab label="Assignment" value="Assignment" />
// //             <Tab label="Task" value="Task" />
// //           </Tabs>

// //           <Tabs
// //             value={activeTab}
// //             onChange={handleTabChange}
// //             className="mb-3 mt-2"
// //             indicatorColor="primary"
// //             textColor="primary"
// //           >
// //             <Tab label="Pending" value="Pending" />
// //             <Tab label="Progress" value="Progress" />
// //             <Tab label="Completed" value="Completed" />
// //           </Tabs>

// //           <AssignmentTable
// //             data={currentItems}
// //             handleAdd={handleAdd}
// //             handleDescriptionClick={handleDescriptionClick}
// //             selectedDescription={selectedDescription}
// //             handleClose={handleClose}
// //           />

// //           <Pagination
// //             count={Math.ceil(filteredItems.length / itemsPerPage)}
// //             color="primary"
// //             onChange={(event, page) => paginate(page)}
// //           />

// //           <div>
// //             {activeTabData === "Task" && <TaskTable />}
// //           </div>

// //         </div>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default ViewAssignment;






import { useState, useEffect } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import { format } from "date-fns";
import SideBar from "../../Component/SideBar";
import TaskTable from "../Task/TaskTable";
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
import TaskDialog from "./Task";

const ViewAssignment = () => {
  const [assignmentData, setAssignmentData] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState(null);
  const itemsPerPage = 20;
  const userDatas = JSON.parse(sessionStorage.getItem("userData"));
  const [activeTabData, setActiveTabData] = useState("Assignment");
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);

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
        const reversedData = assigned.reverse();
        setAssignmentData(reversedData);
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

  // const filterDataByTab = () => {
  //   return activeTabData === "Assignment"
  //     ? assignmentData.filter((item) => item.AssignmentStatus === activeTab)
  //     : [];
  // };

  const filterDataByTab = () => {


    if (activeTabData === "Assignment") {
      if (activeTab === "All") {
        return assignmentData;
      } else {
        return assignmentData.filter((item) => item.AssignmentStatus === activeTab);
      }
    } else {
      return [];

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
        {/* <Typography style={{ textTransform: "capitalize", fontSize: "1.2rem" }}>
          {userDatas.FirstName} {userDatas.LastName}
        </Typography> */}

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

          <div>{activeTabData === "Task" && <TaskTable />}</div>
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
  const handleClose = () => setSelectedDescription(null);

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
            AssignmentStatus === "Pending" ? "progress" : "completed"
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
    <div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Assignment ID</TableCell>
            <TableCell>Assigner</TableCell>
            <TableCell>Assignment Description</TableCell>
            <TableCell>Assign Date</TableCell>
            <TableCell>Deadline Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Add</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.AssignmentID}</TableCell>
              <TableCell>{`${item.EmployeeID}-${item.Assigner_FirstName}`}</TableCell>
              <TableCell
                onClick={() =>
                  handleDescriptionClick(item.Assignment_Description)
                }
                style={{ cursor: "pointer" }}
              >
                {item.Assignment_Description.slice(0, 50)}
              </TableCell>
              <TableCell>
                {format(new Date(item.AssignDate), "dd/MM/yyyy")}
              </TableCell>
              <TableCell>
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
              >
                {item.AssignmentStatus}
              </TableCell>
              <TableCell>{item.AssignmentPriority}</TableCell>
              <TableCell>
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

      <Modal open={selectedDescription !== null} onClose={handleClose}>
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
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewAssignment;
