import React, { useState } from "react";
import {
  Modal,
  Box,

  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CloseIcon from "@mui/icons-material/Close";

const FeedbackDialog = ({ open, onClose, onSubmit, statusData }) => {
  const [feedbackInput, setFeedbackInput] = useState("");

  const handleFeedbackInputChange = (event) => {
    setFeedbackInput(event.target.value);
  };

  const handleSubmitFeedback = () => {
    onSubmit(feedbackInput);
    setFeedbackInput(""); // Clear feedback input after submission
  };

  const handleAdd = async (AssignmentID, AssignmentStatus) => {
    try {
      const apiUrl = `http://localhost:3306/api/assignmentDetails/${AssignmentID}/${
        AssignmentStatus === "Pending" ? "Progress" : "Completed"
      }`;
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        alert(
          `Data moved to ${
            AssignmentStatus === "Pending" ? "Progress" : "Completed"
          }`
        );
        window.location.reload();
      } else {
        console.error("Error updating task:", response.status);
      }
    } catch (error) {
      console.error("Error updating task:", error);
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
        </IconButton>{" "}

        
        {statusData.AssignmentStatus === "Completed" ? (
          <CheckCircleIcon sx={{ color: "green", fontSize: "1.4rem" }} />
        ) : (
          <AddBoxIcon
            sx={{
              color: "#055f85",
              cursor: "pointer",
              fontSize: "1.5rem",
            }}
                    
            onClick={() =>
              handleAdd(statusData.AssignmentID, statusData.AssignmentStatus)
            }
            
          />
         
        )}
        
        <TextField
          label="Feedback"
          multiline
          rows={4}
          fullWidth
          value={feedbackInput}
          onChange={handleFeedbackInputChange}
          sx={{ mt: 2 }}
        />
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={handleSubmitFeedback}
            variant="contained"
            color="primary"
          >
            cancel Assignment
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FeedbackDialog;
