import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const FeedbackDialog = ({ open, onClose, onSubmit }) => {
  const [feedbackInput, setFeedbackInput] = useState("");

  const handleFeedbackInputChange = (event) => {
    setFeedbackInput(event.target.value);
  };

  const handleSubmitFeedback = () => {
    onSubmit(feedbackInput);
    setFeedbackInput(""); // Clear feedback input after submission
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
        <Typography variant="h6">Provide Feedback</Typography>
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
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmitFeedback} variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FeedbackDialog;
