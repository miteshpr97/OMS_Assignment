import React, { useState, useEffect } from "react";
import SideBar from "../../Component/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Button,
  Dialog,
  IconButton,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material"; // Import IconButton
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import Checkbox from '@mui/material/Checkbox';



import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

import AlertTable from "./AlertTable";

const CreateAlert = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div style={{ padding: "10px", border: "2px solid #dddddd" }}>
          <div
            style={{
              backgroundColor: successMessage
                ? "#b4dab471"
                : error
                ? "#ffd2d280"
                : "transparent",
              color: successMessage ? "green" : error ? "red" : "transparent",
              padding: "2px 10px",
            }}
          >
            {loading && (
              <p style={{ margin: "5px" }}>
                {" "}
                <HourglassBottomIcon /> Loading...
              </p>
            )}
            {error && (
              <p style={{ margin: "5px" }}>
                {" "}
                <ErrorOutlineIcon /> {error}
              </p>
            )}
            {successMessage && (
              <p style={{ margin: "0px" }}>
                {" "}
                <TaskAltIcon /> {successMessage}
              </p>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "10px",
            }}
          >
            <Typography variant="h5" style={{ fontWeight: "500" }}>
              Alert Data
            </Typography>

            <Button
              onClick={handleClickOpen}
              variant="contained"
              sx={{
                backgroundColor: "#055f85",
                color: "#fff",
                padding: "8px 16px",
              }}
            >
              CREATE NEW Alert
            </Button>
          </div>
          <AlertTable />
        </div>
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontSize: "22px", padding: "16px 24px 5px 24px" }}>
            NEW ALERT
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 15,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <div>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Select Employee</InputLabel>
                      <Select label="EmployeeID" name="EmployeeID" required>
                        <MenuItem>123</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Alert Note"
                      variant="outlined"
                      name="AlertNote"
                      fullWidth
                      size="medium"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Reminder Day"
                      variant="outlined"
                      type="date"
                      name="ReminderDay"
                      size="medium"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Reminder before"
                      variant="outlined"
                      type="number"
                      name="Reminderbefore"
                      fullWidth
                      size="medium"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Reminder counts"
                      variant="outlined"
                      type="number"
                      name="Remindercounts"
                      fullWidth
                      size="medium"
                      required
                    />
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <TextField
                      label="Reminder time 1"
                      variant="outlined"
                      type="time"
                      name="Remindertime1"
                      size="medium"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                    />
                  </Grid>

                  <Grid item xs={4} md={4}>
                    <TextField
                      label="Reminder time 2"
                      variant="outlined"
                      type="time"
                      name="Remindertime2"
                      size="medium"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Reminder time 3"
                      type="time"
                      variant="outlined"
                      name="Remindertime3"
                      required
                      fullWidth
                      size="medium"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                

                  <Grid item xs={12} md={4}>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                      <span style={{marginRight:"20px"}}>Reminder type</span>
                      <span style={{marginRight:"10px"}}> sms<Checkbox {...label}  /></span>
                      <span style={{marginRight:"10px"}} > email<Checkbox {...label}  /></span>
                      <span style={{marginRight:"10px"}}> alerm<Checkbox {...label}  disabled checked /></span>
                      <span style={{marginRight:"10px"}}> popup<Checkbox {...label} disabled checked /></span>
                      
                    </div>
                  </Grid>

                  <Container
                    sx={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Grid item xs={1}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        sx={{ backgroundColor: "#055f85", marginTop: "10px" }}
                      >
                        {isLoading ? "Submitting..." : "Submit"}
                      </Button>
                    </Grid>
                  </Container>
                </Grid>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default CreateAlert;
