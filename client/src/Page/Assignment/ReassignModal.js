// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Grid,
//   MenuItem,
// } from "@mui/material";
// import { format } from "date-fns";

// const ReassignModal = ({
//   open,
//   onClose,
//   assignmentData,
//   assignedEmployees,
// }) => {
//   const [assignmentData, setAssignmentData] = useState({
//     EmployeeID_AssignTo: "",
//     AssignDate: "",
//     DeadlineDate: "",
//     AssignmentPriority: "",
//     Assignment_Description: "",
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setAssignmentData({
//       ...assignmentData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("Form Data:", assignmentData);
//     // Handle form submission logic
//   };


//   const handleCancelAssignment = () => {
//     onClose();
//   };

//   // Filter out employees who already have assignments
//   const availableEmployees = assignedEmployees.filter(
//     (employee) => employee.EmployeeID_AssignTo !== assignmentData.EmployeeID_AssignTo
//   );

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>RE-ASSIGN</DialogTitle>
//       <DialogContent dividers>
//         <form noValidate onSubmit={handleSubmit}>
//           <Grid container spacing={3}>
//             <Grid item md={6}>
//               <TextField
//                 fullWidth
//                 id="EmployeeID"
//                 label="Employee ID"
//                 placeholder="Employee ID"
//                 value={assignmentData.EmployeeID}
//                 InputProps={{
//                   readOnly: true,
//                 }}
//               />
//             </Grid>
//             <Grid item md={6}>
//               <TextField
//                 fullWidth
//                 id="EmployeeID_AssignTo"
//                 label="Employee Assign To"
//                 name="EmployeeID_AssignTo"
//                 value={assignmentData.EmployeeID_AssignTo}
//                 onChange={handleInputChange}
//                 required
//                 select
//               >
//                 <MenuItem value="">Select Employee Assign To</MenuItem>
//                 {availableEmployees.map((item, index) => (
//                   <MenuItem
//                     key={index}
//                     value={item.EmployeeID_AssignTo}
//                   >{`${item.EmployeeID_AssignTo} - ${item.Assignee_FirstName}`}</MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             {/* Additional form fields */}
//             <Grid item md={4}>
//               <TextField
//                 fullWidth
//                 id="AssignDate"
//                 label="Assign Date"
//                 value={assignmentData.AssignDate ? format(new Date(assignmentData.AssignDate), "MM/dd/yyyy") : "Invalid Date"}
//                 InputProps={{
//                   readOnly: true,
//                 }}
//               />
//             </Grid>


//           <Grid item md={4}>
//             <TextField
//               type="date"
//               fullWidth
//               id="DeadlineDate"
//               label="Deadline Date"
//               required
//               name="DeadlineDate"
//               value={assignmentData.DeadlineDate}
//               onChange={handleInputChange}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </Grid>
//           <Grid item md={4}>
//             <TextField
//               select
//               fullWidth
//               id="AssignmentPriority"
//               label="Priority"
//               required
//               name="AssignmentPriority"
//               value={assignmentData.AssignmentPriority}
//               onChange={handleInputChange}
//             >
//               <MenuItem value="">Select priority</MenuItem>
//               <MenuItem value="High">High</MenuItem>
//               <MenuItem value="Medium">Medium</MenuItem>
//               <MenuItem value="Low">Low</MenuItem>
//             </TextField>
//           </Grid>
//           <Grid item md={12}>
//             <TextField
//               fullWidth
//               multiline
//               id="Assignment_Description"
//               label="Assignment Description"
//               placeholder="Give Assignment...."
//               name="Assignment_Description"
//               value={assignmentData.Assignment_Description}
//               onChange={handleInputChange}
//             />
//           </Grid>
//         </Grid>
//         <DialogActions>
//           <Button onClick={handleCancelAssignment} color="primary">
//             Cancel
//           </Button>
//           <Button type="submit" color="primary">
//             Submit
//           </Button>
//         </DialogActions>
//       </form>
//     </DialogContent>
//     </Dialog >
//   );
// };

// export default ReassignModal;





import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";
import { format } from "date-fns";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { fetchAssignmentData } from "../../features/assignment/assignmentAction";

const ReassignModal = ({
  open,
  onClose,
  assignmentData,
  assignedEmployees,
}) => {
  const [reassignmentData, setReAssignmentData] = useState({
    EmployeeID_AssignTo: "",
    AssignDate: "",
    DeadlineDate: "",
    AssignmentPriority: "",
    Assignment_Description: "",
  });
  const dispatch = useDispatch();

  const apiUrl = process.env.REACT_APP_API_URL;


  useEffect(() => {
    setReAssignmentData({
      EmployeeID_AssignTo: assignmentData.EmployeeID_AssignTo || "",
      AssignDate: assignmentData.AssignDate || "",
      DeadlineDate: assignmentData.DeadlineDate || "",
      AssignmentPriority: assignmentData.AssignmentPriority || "",
      Assignment_Description: assignmentData.Assignment_Description || "",
    });
  }, [assignmentData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReAssignmentData({
      ...reassignmentData,
      [name]: value,
    });
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data:", reassignmentData);

    try {
      const response = await axios.patch(`${apiUrl}/api/assignmentDetails/${assignmentData.AssignmentID}/${assignmentData.EmployeeID}/${assignmentData.EmployeeID_AssignTo}/reassign`, reassignmentData);
      console.log("Update response:", response.data);
      dispatch(fetchAssignmentData(reassignmentData));

      onClose();

    } catch (error) {
      console.error("Error updating assignment:", error);

    }
  };

  const handleCancelAssignment = () => {
    onClose();
  };

  const availableEmployees = assignedEmployees.filter(
    (employee) => employee.EmployeeID_AssignTo !== assignmentData.EmployeeID_AssignTo
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>RE-ASSIGN</DialogTitle>
      <DialogContent dividers>
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item md={6}>
              <TextField
                fullWidth
                id="EmployeeID"
                label="Employee ID"
                placeholder="Employee ID"
                value={assignmentData.EmployeeID}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                fullWidth
                id="EmployeeID_AssignTo"
                label="Employee Assign To"
                name="EmployeeID_AssignTo"
                value={reassignmentData.EmployeeID_AssignTo}
                onChange={handleInputChange}
                required
                select
              >
                <MenuItem value="">Select Employee Assign To</MenuItem>
                {availableEmployees.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.EmployeeID_AssignTo}
                  >{`${item.EmployeeID_AssignTo} - ${item.Assignee_FirstName}`}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={4}>
              <TextField
                fullWidth
                id="AssignDate"
                label="Assign Date"
                value={assignmentData.AssignDate ? format(new Date(assignmentData.AssignDate), "MM/dd/yyyy") : "Invalid Date"}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                type="date"
                fullWidth
                id="DeadlineDate"
                label="Deadline Date"
                required
                name="DeadlineDate"
                value={reassignmentData.DeadlineDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                select
                fullWidth
                id="AssignmentPriority"
                label="Priority"
                required
                name="AssignmentPriority"
                value={reassignmentData.AssignmentPriority}
                onChange={handleInputChange}
              >
                <MenuItem value="">Select priority</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </TextField>
            </Grid>
            <Grid item md={12}>
              <TextField
                fullWidth
                multiline
                id="Assignment_Description"
                label="Assignment Description"
                placeholder="Give Assignment...."
                name="Assignment_Description"
                value={reassignmentData.Assignment_Description}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleCancelAssignment} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReassignModal;










