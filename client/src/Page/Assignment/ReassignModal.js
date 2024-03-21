// import React, { useState } from "react";
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, MenuItem } from "@mui/material";

// const ReassignModal = ({ open, onClose, reassignmentData, }) => {   //assignedEmployees 
//     const [assignmentData, setAssignmentData] = useState({
//         EmployeeID_AssignTo: "",
//         AssignDate: "",
//         DeadlineDate: "",
//         AssignmentPriority: "",
//         Assignment_Description: ""
//     });

//     console.log(reassignmentData)

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setAssignmentData({
//             ...assignmentData,
//             [name]: value
//         });
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Handle form submission logic
//     };

//     const handleCancelAssignment = () => {
//         onClose();
//     };

//     return (
//         <Dialog open={open} onClose={onClose}>
//             <DialogTitle>RE-ASSIGN</DialogTitle>
//             <DialogContent dividers>
//                 <form noValidate onSubmit={handleSubmit}>
//                     <Grid container spacing={3}>
//                         <Grid item md={6}>
//                             <TextField
//                                 fullWidth
//                                 id="EmployeeID"
//                                 label="Employee ID"
//                                 placeholder="Employee ID"
//                                 value={reassignmentData.EmployeeID}
//                                 InputProps={{
//                                     readOnly: true,
//                                 }}
//                             />
//                         </Grid>
//                         <Grid item md={6}>
//                             <TextField
//                                 select
//                                 fullWidth
//                                 id="EmployeeID_AssignTo"
//                                 label="Employee Assign To"
//                                 name="EmployeeID_AssignTo"
//                                 value={assignmentData.EmployeeID_AssignTo}
//                                 onChange={handleInputChange}
//                                 required
//                                 InputProps={{
//                                     readOnly: true,
//                                 }}
//                             >
//                                 <option value="">Select Employee Assign To</option>

//                                 {/* {assignedEmployees.map((item, index) => (
//                                     <option key={index} value={item.EmployeeID_AssignTo}>
//                                         {item.EmployeeID_AssignTo} - {item.Assignee_FirstName}
//                                     </option>
//                                 ))} */}
//                             </TextField>
//                         </Grid>
//                         {/* Additional form fields */}
//                         <Grid item md={4}>
//                             <TextField
//                                 fullWidth
//                                 id="AssignDate"
//                                 label="Assign Date"
//                                 value={reassignmentData.AssignDate}
//                                 InputProps={{
//                                     readOnly: true,
//                                 }}
//                             />
//                         </Grid>
//                         <Grid item md={4}>
//                             <TextField
//                                 type="date"
//                                 fullWidth
//                                 id="DeadlineDate"
//                                 label="Deadline Date"
//                                 required
//                                 name="DeadlineDate"
//                                 value={assignmentData.DeadlineDate}
//                                 onChange={handleInputChange}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                 }}
//                             />
//                         </Grid>
//                         <Grid item md={4}>
//                             <TextField
//                                 select
//                                 fullWidth
//                                 id="AssignmentPriority"
//                                 label="Priority"
//                                 required
//                                 name="AssignmentPriority"
//                                 value={assignmentData.AssignmentPriority}
//                                 onChange={handleInputChange}
//                             >
//                                 <MenuItem value="">Select priority</MenuItem>
//                                 <MenuItem value="High">High</MenuItem>
//                                 <MenuItem value="Medium">Medium</MenuItem>
//                                 <MenuItem value="Low">Low</MenuItem>
//                             </TextField>
//                         </Grid>
//                         <Grid item md={12}>
//                             <TextField
//                                 fullWidth
//                                 multiline
//                                 id="Assignment_Description"
//                                 label="Assignment Description"
//                                 placeholder="Give Assignment...."
//                                 name="Assignment_Description"
//                                 value={reassignmentData.Assignment_Description}
//                                 onChange={handleInputChange}
//                             />
//                         </Grid>
//                     </Grid>
                    
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={handleCancelAssignment} color="primary">
//                     Cancel
//                 </Button>
//                 <Button onClick={handleCancelAssignment} color="primary">
//                     Submit
//               </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default ReassignModal;
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, MenuItem } from "@mui/material";

const ReassignModal = ({ open, onClose, reassignmentData }) => {
    const [assignmentData, setAssignmentData] = useState({
        EmployeeID_AssignTo: "EMP006",
        AssignDate: "",
        DeadlineDate: "",
        AssignmentPriority: "",
        Assignment_Description: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAssignmentData({
            ...assignmentData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3306/api/assignmentDetails/${reassignmentData.AssignmentID}/${reassignmentData.EmployeeID}/${assignmentData.EmployeeID_AssignTo}/reassign`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(assignmentData)
            });
            if (response.ok) {
                // Handle success
                console.log("Reassignment successful");
            } else {
                // Handle error
                console.error("Reassignment failed");
            }
        } catch (error) {
            console.error("Error occurred during reassignment:", error);
        }
    };

    const handleCancelAssignment = () => {
        onClose();
    };

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
                                value={reassignmentData.EmployeeID}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                select
                                fullWidth
                                id="EmployeeID_AssignTo"
                                label="Employee Assign To"
                                name="EmployeeID_AssignTo"
                                value={assignmentData.EmployeeID_AssignTo}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Employee Assign To</option>
                                <MenuItem value="EMP006">EMP006</MenuItem>
                            </TextField>
                        </Grid>
                        {/* Additional form fields */}
                        <Grid item md={4}>
                            <TextField
                                fullWidth
                                id="AssignDate"
                                label="Assign Date"
                                value={reassignmentData.AssignDate}
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
                                value={assignmentData.DeadlineDate}
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
                                value={assignmentData.AssignmentPriority}
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
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelAssignment} color="primary">
                    Cancel
                </Button>
                <Button type="submit" onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReassignModal;
