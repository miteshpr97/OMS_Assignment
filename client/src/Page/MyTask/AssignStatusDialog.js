import React, { useState } from "react";
import { Modal, Box, TextField, Button, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
      let actionVerb;

      if (statusData.AssignmentStatus === "Progress") {
        apiUrl = `http://localhost:3306/api/assignmentDetails/${statusData.AssignmentID}/${statusData.EmployeeID}/${statusData.EmployeeID_AssignTo}/regret`;
        actionVerb = "regreted";
      } else if (statusData.AssignmentStatus === "Assigned") {
        apiUrl = `http://localhost:3306/api/assignmentDetails/${statusData.AssignmentID}/${statusData.EmployeeID}/${statusData.EmployeeID_AssignTo}/reject`;
        actionVerb = "rejected";
      } else {
        // Handle other cases or throw an error
        return;
      }

      const confirmed = window.confirm(
        `Are you sure you want to ${actionVerb} this assignment?`
      );

      if (!confirmed) {
        return; // User cancelled, do nothing
      }

      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(feedbackInput),
      });

      if (response.ok) {
        onClose();
        window.location.reload(); // Reload the page
      } else {
        console.error("Error updating assignment:", response.status);
      }
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };

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

        {statusData.AssignmentStatus !== "Closed" &&
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

        {statusData.AssignmentStatus === "Closed" && (
          <span>
            <CheckCircleIcon sx={{ color: "green" }} /> Assignment is Closed
          </span>
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
