// import React, { useState, useEffect } from "react";
// import {
//   Modal,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Tab,
//   Tabs,
//   Typography,
//   Pagination,
// } from "@mui/material";
// import { format } from "date-fns";
// import "./Assignment.css";

// const AssignmentTable = ({ userData, assignmentDatas, loading, error }) => {
//   const [tableData, setTableData] = useState([]);
//   const [activeTab, setActiveTab] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(20);

//   useEffect(() => {
//     if (!loading && !error && assignmentDatas && assignmentDatas.length > 0) {
//       const assigned = assignmentDatas.filter(
//         (employee) => userData.EmployeeID === employee.EmployeeID
//       );
//       const reversedData = assigned.reverse();
//       setTableData(reversedData);
//     }
//   }, [assignmentDatas, userData, loading, error]);

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//     setCurrentPage(1); // Reset current page when switching tabs
//   };

//   const filterDataByTab = () => {
//     if (activeTab === "All") {
//       return tableData;
//     } else {
//       return tableData.filter((item) => item.AssignmentStatus === activeTab);
//     }
//   };

//   const filteredItems = filterDataByTab();

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const handleChangePage = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div className="assignment-table">
//       <Typography variant="h5" style={{ fontWeight: "500" }}>
//         Given Assignment Data
//       </Typography>

//       <div className="p-2">
//         <Tabs
//           value={activeTab}
//           onChange={handleTabChange}
//           aria-label="assignment tabs"
//           className="mb-3 mt-2"
//         >
//           <Tab label="All" value="All" />
//           <Tab label="Pending" value="Pending" />
//           <Tab label="Progress" value="Progress" />
//           <Tab label="Completed" value="Completed" />
//         </Tabs>

//         <TableComponent data={currentItems} />

//         <Pagination
//           count={Math.ceil(filteredItems.length / itemsPerPage)}
//           page={currentPage}
//           onChange={handleChangePage}
//           color="primary"
//           className="pagination"
//         />
//       </div>
//     </div>
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

//   return (
//     <div>
//       <TableContainer component={Paper}>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>Assignment ID</TableCell>
//               <TableCell>AssignTo</TableCell>
//               <TableCell>Assignment Description</TableCell>
//               <TableCell>Assign Date</TableCell>
//               <TableCell>Deadline Date</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Priority</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((item, index) => (
//               <TableRow key={index}>
//                 <TableCell>{item.AssignmentID}</TableCell>
//                 <TableCell>
//                   {item.EmployeeID_AssignTo} - {item.Assignee_FirstName}
//                 </TableCell>
//                 <TableCell
//                   onClick={() =>
//                     handleDescriptionClick(item.Assignment_Description)
//                   }
//                   style={{ cursor: "pointer" }}
//                 >
//                   {item.Assignment_Description.slice(0, 50)}
//                 </TableCell>
//                 <TableCell>
//                   {format(new Date(item.AssignDate), "dd/MM/yyyy")}
//                 </TableCell>
//                 <TableCell>
//                   {format(new Date(item.DeadlineDate), "dd/MM/yyyy")}
//                 </TableCell>
//                 <TableCell>
//                   <span
//                     style={{ color: getStatusColor(item.AssignmentStatus) }}
//                   >
//                     {item.AssignmentStatus}
//                   </span>
//                 </TableCell>
//                 <TableCell>{item.AssignmentPriority}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Modal to display full description */}
//       <Modal
//         open={selectedDescription !== null}
//         onClose={handleClose}
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

// const getStatusColor = (status) => {
//   switch (status) {
//     case "Pending":
//       return "red";
//     case "Progress":
//       return "orange";
//     case "Completed":
//       return "green";
//     default:
//       return "inherit";
//   }
// };

// export default AssignmentTable;



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
import FeedbackIcon from '@mui/icons-material/Feedback';

const AssignmentTable = ({ userData, assignmentDatas, loading, error, handleDeleteAssignment }) => {
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
          <Tab label="Pending" value="Pending" />
          <Tab label="Progress" value="Progress" />
          <Tab label="Completed" value="Completed" />
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


const TableComponent = ({ data, handleDescriptionClick, handleDeleteAssignment }) => {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAssignmentData, setSelectedAssignmentData] = useState(null);

console.log(data, "data show For Assigner")
  const handleEditClick = (data) => {
    setIsEditModalOpen(true);
    setSelectedAssignmentData(data);
  };
 
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
                Feedback
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
                  <span
                    style={{ color: getStatusColor(item.AssignmentStatus) }}
                  >
                    {item.AssignmentStatus}
                  </span>
                </TableCell>
                <TableCell className="vertical-border">
                  {item.AssignmentPriority}
                </TableCell>
                <TableCell
                className="vertical-border"
             
              >
                {item.Feedback ? (
                  item.Feedback
                ) : (
                  <p style={{color:"#a8a8a8d0", fontSize:"11px", margin:"0px"}}>
                    <FeedbackIcon sx={{fontSize:"15px"}}/>
                  No Feedback
                  </p> 
                )}
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
                    sx={{ color: "red"}}
                    onClick={() => handleDeleteAssignment(item.AssignmentID)}
                  >
                    <DeleteIcon sx={{fontSize:"1.3rem"}} />
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
    case "Pending":
      return "red";
    case "Progress":
      return "orange";
    case "Completed":
      return "green";
    default:
      return "inherit";
  }
};

export default AssignmentTable;
