import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid
} from "@mui/material";

const EditDesignationModel = ({ isOpen, handleClose, designation }) => {
  const [editedDesignation, setEditedDesignation] = useState({});

  useEffect(() => {
    setEditedDesignation({ ...designation  });
  }, [designation ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDesignation({ ...editedDesignation, [name]: value });
  };

  const handleSaveChanges = () => {
    // You can add logic here to save changes
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Department</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <TextField
                label="Designation Name"
                variant="outlined"
                name="DesignationName"
                value={editedDesignation.DesignationName || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveChanges} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDesignationModel;
