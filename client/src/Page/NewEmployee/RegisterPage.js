// export default RegisterPage;
import React, { useState, useEffect } from "react";
import SideBar from "../../Component/SideBar";
import { Box } from "@mui/material";
import NewRegistration from "./NewRegistration";
import ViewRegistrationData from "./ViewRegistrationData";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployee,
  showEmployee,
  fetchNextEmployeeId,
  deleteEmployee as deleteEmployeeAction,
} from "../../features/employee/createAction";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

const RegisterPage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employeeDetails.employee);
  const nextEmployeeId = useSelector(
    (state) => state.employeeDetails.nextEmployeeId
  );

  useEffect(() => {
    dispatch(showEmployee());
    dispatch(fetchNextEmployeeId());
  }, [dispatch]);

  const addEmployee = async (formData) => {
    setLoading(true);
    try {
      const formDataWithImage = new FormData();
      for (const key in formData) {
        formDataWithImage.append(key, formData[key]);
      }
      // Dispatch the createEmployee action
      await dispatch(createEmployee(formData));

      // Handle success response
      setSuccessMessage("Registration successful!");

      // Clear the success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

      // Refetch employee data
      dispatch(showEmployee());
    } catch (error) {
      console.error("Error adding employee", error);
      setError("Error adding employee");
    } finally {
      setLoading(false);
    }
  };

  // Function to delete an employee
  const deleteEmployee = async (employeeID) => {
    setLoading(true);
    try {
      // Ask for confirmation before deleting
      const confirmed = window.confirm(
        "Are you sure you want to delete this employee?"
      );
      if (!confirmed) {
        setLoading(false);
        return; // Exit function if user cancels deletion
      }

      await dispatch(deleteEmployeeAction(employeeID)); // Dispatch the deleteEmployee action with the employee ID
      setSuccessMessage("Employee deleted successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      dispatch(showEmployee()); // Refetch employee data after deletion
    } catch (error) {
      console.error("Error deleting employee", error);
      setError("Error deleting employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div style={{ border:"2px solid #dddddd"}}>
        <div
            style={{
              backgroundColor: successMessage
                ? "#b4dab471"
                : error
                ? "#ffd2d280"
                : "transparent",
                color: successMessage
                ? "green"
                : error
                ? "red"
                : "transparent",
                padding:"2px 10px",
            }}
          >

            {loading && <p style={{margin:"5px"}}> <HourglassBottomIcon/> Loading...</p>}
            {error && <p style={{margin:"5px"}}> <ErrorOutlineIcon/> {error}</p>}
            {successMessage && <p style={{margin:"0px"}}> <TaskAltIcon/> {successMessage}</p>}
          </div>
          {/* Pass nextEmployeeId to NewRegistration component */}

          <NewRegistration
            addEmployee={addEmployee}
            nextEmployeeId={nextEmployeeId}
          />
          <br></br>
          <ViewRegistrationData
            employeeData={employee}
            deleteEmployee={deleteEmployee}
          />
        </div>
      </Box>
    </Box>
  );
};

export default RegisterPage;
