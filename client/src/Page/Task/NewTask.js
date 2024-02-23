import React, { useState, useEffect } from "react";
import SideBar from "../../Component/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
//import TaskTable from "./TaskTable";


export default function NewTask() {
  const [validated, setValidated] = useState(false);
  const [taskData, setTaskData] = useState({
    TaskID: "",
    StartDate: new Date().toISOString().split("T")[0],
    EndDate: "",
    CreatedAt: "",
    TaskStatus:"",
    TaskDescription: "",
    EmployeeID: "",
  });
  const [loginEmployees, setLoginEmployees] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
    setUserData(userDataFromSession);
  }, []);

  // login employee data 
  useEffect(() => {
    const fetchLoginEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:3306/api/workGroup/allData"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const assigned = data.filter(
          (employee) => userData.EmployeeID === employee.EmployeeID
        );
        setLoginEmployees(assigned);
      } catch (error) {
        console.error("Error fetching assigned employees:", error);
      }
    };

    if (userData) {
      fetchLoginEmployees();
    }
  }, [userData]);

  // auto generated task no 
  useEffect(() => {
    const fetchLastTaskId = async () => {
      try {
        const response = await fetch(
          "http://localhost:3306/api/taskDetails/lastTaskId"
        );
        if (response.ok) {
          const data = await response.json();
          const numericPart = parseInt(data.lastTaskId.slice(2), 10);
          if (!isNaN(numericPart)) {
            const nextJobNo = numericPart + 1;
            setTaskData((prevState) => ({
              ...prevState,
              TaskID: `T${nextJobNo.toString().padStart(3, "0")}`,
            }));
          } else {
            console.error("Invalid numeric part:", data.lastTaskId);
          }
        } else {
          console.error("Failed to fetch last AssignmentID");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchLastTaskId();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
  
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
  
    try {
      const response = await fetch(
        "http://localhost:3306/api/taskDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...taskData,
            EmployeeID: userData.EmployeeID,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const responseData = await response.json();
      console.log("Response:", responseData);
  
      // Reset the form data after successful submission
      setTaskData({
       
        TaskID: "",
        StartDate: "",
        EndDate: "",
        CreatedAt: "",
        TaskStatus:"",
        TaskDescription: "",
        EmployeeID: "",
      });
  
      // Reset form validation
      setValidated(false);
      window.alert("Form submitted successfully!");

       // Reload the page
    window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div className="assignment-container">
      
          <div className="create-assignment">
            <Typography variant="h5" style={{ fontWeight: "500" }}>
              Create Task
            </Typography>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label>Task ID</Form.Label>
                  <Form.Control
                   style={{ fontWeight: "600", fontSize: "16px" }}
                    required
                    type="text"
                    placeholder="Task ID"
                    name="TaskID"
                    value={taskData.TaskID}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Employee ID"
                    value={userData.EmployeeID}
                    readOnly
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                
              </Row>
              <Row className="mb-3">
              <Form.Group as={Col} md="4">
                  <Form.Label htmlFor="StartDate">
                   Start Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    aria-label="Default select example"
                    name="StartDate"
                    value={taskData.StartDate}
                    onChange={handleInputChange}
                    required
                    style={{ fontSize: "15px" }}
                  />
                   
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="EndDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="End Date"
                    required
                    name="EndDate"
                    value={taskData.EndDate}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide End Date
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom04">
                  <Form.Label>Created At</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Created At"
                    required
                    name="CreatedAt"
                    value={taskData.CreatedAt}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide Created At
                  </Form.Control.Feedback>
                </Form.Group>
               
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="TaskDescription">
                  <Form.Label>Task Description</Form.Label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="TaskDescription"
                    placeholder="Give Task...."
                    name="TaskDescription"
                    value={taskData.TaskDescription}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Give Task!</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  className="btn mt-2 custom-button"
                  style={{ backgroundColor: "#055f85", borderColor: "#055f85" }}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
            {/* <TaskTable/> */}
        </div>
      </Box>
    </Box>
  );
}
