// import { useState } from "react";
// import { Table, TableHead, TableBody, TableRow, TableCell, Modal, Typography, Button } from "@mui/material";
// import { format } from "date-fns";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// const AssignmentTable = ({
//   data,
//   handleAdd,
//   handleDescriptionClick,
//   selectedDescription,
//   handleClose,
// }) => {
//   const [selectedDescription, setSelectedDescription] = useState(null);

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
//             <TableCell>Type</TableCell>
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
//               <TableCell>{item.Type}</TableCell>
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

// export default AssignmentTable;
