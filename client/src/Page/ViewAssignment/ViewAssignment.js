import { useState, useEffect } from "react";
import SideBar from "../../Component/SideBar";
import Box from "@mui/material/Box";
import { Modal, Button, Table, Tab, Tabs, Pagination } from "react-bootstrap";
import { format } from "date-fns";
import { Typography } from "@mui/material";
import "./ViewAssignment.css";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TaskTable from "../Task/TaskTable";

const ViewAssignment = () => {
  const [tableData, setTableData] = useState([]);
  const [activeTab, setActiveTab] = useState("Pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const [userData, setUserData] = useState(null);

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
        setTableData(reversedData);
      } catch (error) {
        console.error("Error fetching assigned employees:", error);
      }
    };

    if (userData) {
      fetchAssignedEmployees();
    }
  }, [userData]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset current page when switching tabs
  };

  const userDatas = JSON.parse(sessionStorage.getItem("userData"));

  const filterDataByTab = () => {
    if (activeTab === "Pending") {
      return tableData.filter((item) => item.AssignmentStatus === "Pending");
    } else if (activeTab === "Progress") {
      return tableData.filter((item) => item.AssignmentStatus === "Progress");
    } else if (activeTab === "Completed") {
      return tableData.filter((item) => item.AssignmentStatus === "Completed");
    }
    return [];
  };

  const filteredItems = filterDataByTab();

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Typography style={{textTransform:'capitalize', fontSize:'1.2rem'}}> 
          {userDatas.FirstName} {userDatas.LastName}
        </Typography>

        <div className="assignment-table">
          <Typography variant="h5" style={{ fontWeight: "500" }}>
            Assignment Data
          </Typography>
          <div className="p-2">
            <Tabs
              defaultActiveKey="Pending"
              id="uncontrolled-tab-example"
              className="mb-3 mt-2"
              onSelect={(tab) => handleTabChange(tab)}
            >
              <Tab eventKey="Pending" title="Pending">
                <TableComponent data={currentItems} />
              </Tab>
              <Tab eventKey="Progress" title="Progress">
                <TableComponent data={currentItems} />
              </Tab>
              <Tab eventKey="Completed" title="Completed">
                <TableComponent data={currentItems} />
              </Tab>
            </Tabs>
            <Pagination>
              {Array.from({
                length: Math.ceil(filteredItems.length / itemsPerPage),
              }).map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </div>
        <div>
          <TaskTable />
        </div>
      </Box>
    </Box>
  );
};

const TableComponent = ({ data }) => {
  const [selectedDescription, setSelectedDescription] = useState(null);

  // Function to handle click on description cell
  const handleDescriptionClick = (description) => {
    setSelectedDescription(description);
  };

  // Function to close the modal
  const handleClose = () => {
    setSelectedDescription(null);
  };

  const handleAdd = async (AssignmentID, AssignmentStatus) => {
    try {
      let apiUrl;
      if (AssignmentStatus === "Pending") {
        apiUrl = `http://localhost:3306/api/assignmentDetails/${AssignmentID}/Progress`;
      } else if (AssignmentStatus === "Progress") {
        apiUrl = `http://localhost:3306/api/assignmentDetails/${AssignmentID}/Completed`;
      } else {
        // If status is already 'Complete', do nothing
        return;
      }

      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        alert(
          `Data moved to ${
            AssignmentStatus === "Pending" ? "progress" : "completed"
          }`
        );
        window.location.reload();
        // Optionally, you may want to update the UI to reflect the status change
      } else {
        console.error("Error updating task:", response.status);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <Table striped bordered hover size="sm" className="small-table">
        <thead>
          <tr>
            <th>Assignment ID</th>
            <th>Assigner</th>
            {/* <th>AssignTo</th> */}
            <th>Assignment Description</th>
            <th>Assign Date</th>
            <th>Deadline Date</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Type</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.AssignmentID}</td>
              <td>
                {item.EmployeeID}-{item.Assigner_FirstName}
              </td>
              {/* <td>
                {item.EmployeeID_AssignTo}--{item.Assignee_FirstName}
              </td> */}
              <td
                onClick={() =>
                  handleDescriptionClick(item.Assignment_Description)
                }
                style={{ cursor: "pointer" }}
              >
                {item.Assignment_Description.slice(0, 50)}
              </td>
              <td>{format(new Date(item.AssignDate), "dd/MM/yyyy")}</td>
              <td>{format(new Date(item.DeadlineDate), "dd/MM/yyyy")}</td>
              <td>
                {item.AssignmentStatus === "Pending" ? (
                  <span style={{ color: "red" }}>{item.AssignmentStatus}</span>
                ) : item.AssignmentStatus === "Progress" ? (
                  <span style={{ color: "orange" }}>
                    {item.AssignmentStatus}
                  </span>
                ) : (
                  <span style={{ color: "green" }}>
                    {item.AssignmentStatus}
                  </span>
                )}
              </td>

              <td>{item.AssignmentPriority}</td>
              <td>{item.Type}</td>
              <td>
                {item.AssignmentStatus === "Completed" ? (
                  // Render your icon for 'Complete' status here
                  <CheckCircleIcon sx={{ color: "green" }} />
                ) : (
                  // Render 'AddBoxIcon' for other statuses
                  <AddBoxIcon
                    sx={{ color: "#055f85", cursor: "pointer" }}
                    onClick={() =>
                      handleAdd(item.AssignmentID, item.AssignmentStatus)
                    }
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal to display full description */}
      <Modal
        show={selectedDescription !== null}
        onHide={handleClose}
        style={{ marginTop: "60px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Assignment Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedDescription}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewAssignment;
