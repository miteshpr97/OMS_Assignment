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
