// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   Button,
//   Grid,
//   FormControl,
//   MenuItem,
//   Select,
// } from "@mui/material";
// import { format } from "date-fns";
// import {useDispatch} from "react-redux";
// import { fetchAssignmentData,updateAssignmentData } from "../../features/assignment/assignmentAction";

// const AssignmentEditModal = ({ isOpen, onClose, assignmentData }) => {
//   const [formData, setFormData] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (assignmentData) {
//       setFormData(assignmentData);
//     }
//   }, [assignmentData]);

//   const handleClose = () => {
//     onClose();
//   };

//   if (!isOpen || !formData) {
//     return null;
//   }

//   const { Assignment_Description, DeadlineDate, AssignmentPriority } = formData;

//   const formatDate = (dateString) => {
//     return format(new Date(dateString), "yyyy-MM-dd");
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSave = () => {
//     dispatch(updateAssignmentData(formData));
//     dispatch(fetchAssignmentData(formData));
//     handleClose();
//   };

//   return (
//     <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
//       <DialogTitle>Edit Employee</DialogTitle>
//       <br></br>
//       <DialogContent>
//         <Grid container spacing={2}>
//           <Grid item xs={6}>
//             <TextField
//               label="Assignment Description"
//               name="Assignment_Description"
//               value={Assignment_Description}
//               fullWidth
//               onChange={handleChange}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="DeadlineDate"
//               name="DeadlineDate"
//               value={formatDate(DeadlineDate)}
//               fullWidth
//               onChange={handleChange}
//             />
//           </Grid>

//           <Grid item xs={6}>
//             <FormControl fullWidth>
//               <Select
//                 name="AssignmentPriority"
//                 value={AssignmentPriority}
//                 fullWidth
//                 onChange={handleChange}
//               >
//                 <MenuItem value="High">High</MenuItem>
//                 <MenuItem value="Medium">Medium</MenuItem>
//                 <MenuItem value="Low">Low</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>
//         <br />
//         <div
//           style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
//         >
//           <Button onClick={handleSave} variant="contained" color="primary">
//             Save
//           </Button>
//           <Button onClick={handleClose} variant="contained" color="secondary">
//             Cancel
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AssignmentEditModal;




import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { fetchAssignmentData, updateAssignmentData } from "../../features/assignment/assignmentAction";

const AssignmentEditModal = ({ isOpen, onClose, assignmentData }) => {
  const [formData, setFormData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (assignmentData) {
      setFormData(assignmentData);
    }
  }, [assignmentData]);

  const handleClose = () => {
    onClose();
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "yyyy-MM-dd");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3306/api/assignmentDetails/update/${formData.AssignmentID}/${formData.EmployeeID}/${formData.EmployeeID_AssignTo}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AssignmentPriority: formData.AssignmentPriority,
          Assignment_Description: formData.Assignment_Description,
          DeadlineDate: formData.DeadlineDate
        }),
      });

      if (response.ok) {
        dispatch(updateAssignmentData(formData));
        dispatch(fetchAssignmentData(formData));
        handleClose();
      } else {
        console.error("Failed to update assignment priority");
      }
    } catch (error) {
      console.error("Error occurred while updating assignment priority:", error);
    }
  };


  // const handleSave = () => {
  //   // Create an object with only the fields you want to update
  //   const updatedFields = {
  //     AssignmentPriority: formData.AssignmentPriority,
  //     Assignment_Description: formData.Assignment_Description,
  //     DeadlineDate: formData.DeadlineDate,
  //   };

  //   // Dispatch action to update assignment data with only the updated fields
  //   dispatch(updateAssignmentData(updatedFields));

  //   handleClose();
  // };


  if (!isOpen || !formData) {
    return null;
  }

  const { Assignment_Description, DeadlineDate, AssignmentPriority } = formData;

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Employee</DialogTitle>
      <br />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Assignment Description"
              name="Assignment_Description"
              value={Assignment_Description}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="DeadlineDate"
              name="DeadlineDate"
              value={formatDate(DeadlineDate)}
              fullWidth
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <Select
                name="AssignmentPriority"
                value={AssignmentPriority}
                fullWidth
                onChange={handleChange}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <br />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentEditModal;
