import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const TaskDialog = ({ open, onClose, onCreateTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleSaveTask = () => {
    const newTask = {
      name: taskName,
      description: taskDescription
    };
    onCreateTask(newTask);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="taskName"
          label="Task Name"
          type="text"
          fullWidth
          value={taskName}
          onChange={handleTaskNameChange}
        />
        <TextField
          margin="dense"
          id="taskDescription"
          label="Task Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={taskDescription}
          onChange={handleTaskDescriptionChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveTask} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
