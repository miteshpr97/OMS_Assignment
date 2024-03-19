import React, { useState } from "react";
import { Modal, Box, TextField, Button, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CloseIcon from "@mui/icons-material/Close";

const StatusDialog = ({ open, onClose, statusData }) => {
  const [feedbackInput, setFeedbackInput] = useState({
    Feedback: "",
  });

  const handleFeedbackInputChange = (event) => {
    setFeedbackInput({
      ...feedbackInput,
      Feedback: event.target.value,
    });
  };
  

  const handleSubmitFeedback = async () => {
    try {
      let apiUrl;
      if (statusData.AssignmentStatus === "Progress") {
        apiUrl = `http://localhost:3306/api/assignmentDetails/${statusData.AssignmentID}/regret`;
      } else if (statusData.AssignmentStatus === "Assigned") {
        apiUrl = `http://localhost:3306/api/assignmentDetails/${statusData.AssignmentID}/reject`;
      } else {
        // Handle other cases or throw an error
        return;
      }
  
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(feedbackInput),
      });
  
      if (response.ok) {
        alert(`Assignment ${statusData.AssignmentStatus === "Progress" ? "regreted" : "rejected"} successfully`);
        onClose();
      } else {
        console.error("Error updating assignment:", response.status);
      }
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };
  

  // const handleAdd = async (AssignmentID, AssignmentStatus) => {
  //   try {
  //     const apiUrl = `http://localhost:3306/api/assignmentDetails/${AssignmentID}/${
  //       AssignmentStatus === "Assigned" ? "Progress" : "Completed"
  //     }`;

  //     const response = await fetch(apiUrl, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //     });

  //     if (response.ok) {
  //       alert(
  //         `Data moved to ${
  //           AssignmentStatus === "Assigned" ? "Progress" : "Completed"
  //         }`
  //       );
  //       window.location.reload();
  //     } else {
  //       console.error("Error updating task:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error updating task:", error);
  //   }
  // };

  return (
    <Modal open={open} onClose={onClose}>
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
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 15,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* {statusData.AssignmentStatus === "Completed" ? (
          <CheckCircleIcon sx={{ color: "green", fontSize: "1.4rem" }} />
        ) : (
          statusData.AssignmentStatus !== "Regret" && (
            <>
              <span>Add To Progress</span>
              <AddBoxIcon
                sx={{
                  color: "#055f85",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                }}
                onClick={() =>
                  handleAdd(
                    statusData.AssignmentID,
                    statusData.AssignmentStatus
                  )
                }
              />
            </>
          )
        )} */}

        {statusData.AssignmentStatus !== "Completed" &&
          statusData.AssignmentStatus !== "Regret" && 
            statusData.AssignmentStatus !== "Reject" && (
            <>
              <TextField
                label="Feedback"
                multiline
                rows={4}
                fullWidth
                value={feedbackInput.Feedback}
                onChange={handleFeedbackInputChange}
                sx={{ mt: 2 }}
                required
              />

              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={handleSubmitFeedback}
                  variant="contained"
                  color="primary"
                >
                  Cancel Assignment
                </Button>
              </Box>
            </>
          )}

        {statusData.AssignmentStatus === "Completed" && (
          <span><CheckCircleIcon sx={{color:"green"}}/> Assignment is completed</span>
        )}
        {statusData.AssignmentStatus === "Reject" && (
          <span>Assignment has been rejected</span>
        )}
        {statusData.AssignmentStatus === "Regret" && (
          <span>Assignment has been regreted</span>
        )}
      </Box>
    </Modal>
  );
};

export default StatusDialog;
