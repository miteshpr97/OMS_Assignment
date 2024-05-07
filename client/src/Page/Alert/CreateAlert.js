// import React, { useState, useEffect } from "react";
// import SideBar from "../../Component/SideBar";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import {
//   Button,
//   Dialog,
//   IconButton,
//   DialogContent,
//   DialogTitle,
//   Grid,
//   TextField,
//   Container,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   ListItemText,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import Checkbox from "@mui/material/Checkbox";
// import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
// import AlertTable from "./AlertTable";
// import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import EmailIcon from "@mui/icons-material/Email";
// import AnnouncementIcon from "@mui/icons-material/Announcement";

// const CreateAlert = () => {
//   const [successMessage, setSuccessMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState([]);
//   const [userData, setUserData] = useState(null);

//   console.log(userData, "userdta");

//   useEffect(() => {
//     const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
//     setUserData(userDataFromSession);
//   }, []);

//   const [open, setOpen] = useState(false);
//   const label = { inputProps: { "aria-label": "Checkbox demo" } };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   useEffect(() => {
//     (async () => {
//       try {
//         const apiUrl = "http://localhost:3306/api/employee/allData";
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     })();
//   }, []);

//   const [formData, setFormData] = useState({
//     EmployeeID: " ",
//     EmployeeID_AssignTo: "",
//     Alert_Note: "",
//     ReminderDay: "",
//     RemindBeforeEventDay: "",
//     ReminderCounts: "",
//     ReminderTime1: "",
//     ReminderTime2: "",
//     ReminderTime3: "",
//     Is_Sms: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleCheckboxChange = (e, fieldName) => {
//     const { checked } = e.target;
//     setFormData((prevData) => ({ ...prevData, [fieldName]: checked }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.stopPropagation();
//       return;
//     }

//     try {
//       setIsLoading(true);
//       // Include EmployeeID in formData
//       const formDataWithEmployeeID = {
//         ...formData,
//         EmployeeID: userData.EmployeeID,
//       };
//       const apiUrl = "http://localhost:3306/api/alertDetails";
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formDataWithEmployeeID),
//       });
//       if (response.ok) {
//         setSuccessMessage("Registration successful!");
//         // Reset form inputs to null
//         setFormData({
//           EmployeeID: "",
//           EmployeeID_AssignTo: "",
//           Alert_Note: "",
//           ReminderDay: "",
//           RemindBeforeEventDay: "",
//           ReminderCounts: "",
//           ReminderTime1: "",
//           ReminderTime2: "",
//           ReminderTime3: "",
//           Is_Sms: "",
//         });
//         form.reset();
//         // Close the modal dialog
//         handleClose();
//         // Automatically hide the success message after 3 seconds
//         setTimeout(() => {
//           setSuccessMessage("");
//         }, 3000);
//       } else {
//         setError("Registration failed:" + response.statusText);
//       }
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       setError("Error submitting data: " + error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Box sx={{ display: "flex" }}>
//       <SideBar />
//       <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
//         <div style={{ padding: "10px", border: "2px solid #dddddd" }}>
//           <div
//             style={{
//               backgroundColor: successMessage
//                 ? "#b4dab471"
//                 : error
//                 ? "#ffd2d280"
//                 : "transparent",
//               color: successMessage ? "green" : error ? "red" : "transparent",
//               padding: "2px 10px",
//             }}
//           >
//             {loading && (
//               <p style={{ margin: "5px" }}>
//                 {" "}
//                 <HourglassBottomIcon /> Loading...
//               </p>
//             )}
//             {error && (
//               <p style={{ margin: "5px" }}>
//                 {" "}
//                 <ErrorOutlineIcon /> {error}
//               </p>
//             )}
//             {successMessage && (
//               <p style={{ margin: "0px" }}>
//                 {" "}
//                 <TaskAltIcon /> {successMessage}
//               </p>
//             )}
//           </div>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               paddingTop: "10px",
//             }}
//           >
//             <Typography variant="h5" style={{ fontWeight: "500" }}>
//               Alert Data
//             </Typography>

//             <Button
//               onClick={handleClickOpen}
//               variant="contained"
//               sx={{
//                 backgroundColor: "#055f85",
//                 color: "#fff",
//                 padding: "8px 16px",
//               }}
//             >
//               CREATE NEW Alert
//             </Button>
//           </div>
//           <AlertTable />
//         </div>
//         <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//           <DialogTitle sx={{ fontSize: "22px", padding: "16px 24px 5px 24px" }}>
//             NEW ALERT
//           </DialogTitle>
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{
//               position: "absolute",
//               right: 15,
//               top: 10,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//           <DialogContent sx={{ border: "2px solid #dddddd", margin: "10px" }}>
//             <div style={{}}>
//               <form onSubmit={handleSubmit}>
//                 <Grid container spacing={2}>
//                   <Grid item md={6}>
//                     <TextField
//                       fullWidth
//                       id="EmployeeID"
//                       label="Employee ID"
//                       placeholder="Employee ID"
//                       value={userData.EmployeeID}
//                       onChange={handleInputChange}
//                       InputProps={{
//                         readOnly: true,
//                       }}
//                     />
//                   </Grid>
//                   <Grid item md={6} xs={12}>
//                     <FormControl fullWidth variant="outlined">
//                       <InputLabel>Select Employee AssignTo</InputLabel>
//                       <Select
//                         multiple
//                         fullWidth
//                         id="EmployeeID_AssignTo"
//                         name="EmployeeID_AssignTo"
//                         label="Select Employee AssignTo"
//                         value={formData.EmployeeID_AssignTo || []}
//                         onChange={handleInputChange}
//                         renderValue={(selected) => selected.join(", ")}
//                         required
//                       >
//                         {data.map((employee) => (
//                           <MenuItem
//                             key={employee.EmployeeID}
//                             value={employee.EmployeeID}
//                           >
//                             <Checkbox
//                               checked={formData.EmployeeID_AssignTo.includes(
//                                 employee.EmployeeID
//                               )}
//                             />
//                             <ListItemText
//                               primary={`${employee.EmployeeID} - ${employee.FirstName}`}
//                             />
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       label="Alert Note"
//                       variant="outlined"
//                       name="Alert_Note"
//                       fullWidth
//                       size="medium"
//                       required
//                       value={formData.Alert_Note}
//                       onChange={handleInputChange}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <TextField
//                       label="Reminder Day"
//                       variant="outlined"
//                       type="date"
//                       name="ReminderDay"
//                       size="medium"
//                       fullWidth
//                       InputLabelProps={{
//                         shrink: true,
//                       }}
//                       required
//                       value={formData.ReminderDay}
//                       onChange={handleInputChange}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <TextField
//                       label="Reminder before"
//                       variant="outlined"
//                       type="number"
//                       name="RemindBeforeEventDay"
//                       fullWidth
//                       size="medium"
//                       required
//                       value={formData.RemindBeforeEventDay}
//                       onChange={handleInputChange}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                   <FormControl fullWidth variant="outlined">
//                       <InputLabel>Reminder Counts</InputLabel>
//                     <Select
//                       label="Reminder Counts"
//                       variant="outlined"
//                       type="number"
//                       name="ReminderCounts"
//                       fullWidth
//                       size="medium"
//                       required
//                       value={formData.ReminderCounts}
//                       onChange={handleInputChange}
//                     >
//                       <MenuItem>1</MenuItem>
//                       <MenuItem>2</MenuItem>
//                       <MenuItem>3</MenuItem>
//                     </Select>
//                   </FormControl>
//                   </Grid>
//                   <Grid item xs={4} md={4}>
//                     <TextField
//                       label="Reminder time 1"
//                       variant="outlined"
//                       type="time"
//                       name="ReminderTime1"
//                       size="medium"
//                       fullWidth
//                       InputLabelProps={{
//                         shrink: true,
//                       }}
//                       required
//                       value={formData.ReminderTime1}
//                       onChange={handleInputChange}
//                     />
//                   </Grid>

//                   <Grid item xs={4} md={4}>
//                     <TextField
//                       label="Reminder time 2"
//                       variant="outlined"
//                       type="time"
//                       name="ReminderTime2"
//                       size="medium"
//                       fullWidth
//                       InputLabelProps={{
//                         shrink: true,
//                       }}
//                       required
//                       value={formData.ReminderTime2}
//                       onChange={handleInputChange}
//                     />
//                   </Grid>
//                   <Grid item xs={4}>
//                     <TextField
//                       label="Reminder time 3"
//                       type="time"
//                       variant="outlined"
//                       name="ReminderTime3"
//                       required
//                       fullWidth
//                       size="medium"
//                       InputLabelProps={{
//                         shrink: true,
//                       }}
//                       value={formData.ReminderTime3}
//                       onChange={handleInputChange}
//                     />
//                   </Grid>

//                   <Grid item md={12} sx={{ height: "100%", marginTop: "5px" }}>
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         border: "1px solid #cecece",
//                         borderRadius: "5px",
//                         padding: "10px",
//                       }}
//                     >
//                       <span style={{}}>Reminder Type :</span>
//                       <span
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           alignItems: "center",
//                           justifyContent: "center",
//                         }}
//                       >
//                         <PermPhoneMsgIcon
//                           sx={{ color: "#055f85", fontSize: "30px" }}
//                         />
//                         <span style={{ fontSize: "12px" }}>SMS</span>
//                         <Checkbox
//                           {...label}
//                           checked={formData.Is_Sms}
//                           onChange={(e) => handleCheckboxChange(e, "Is_Sms")}
//                         />
//                       </span>
//                       <span
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           alignItems: "center",
//                           justifyContent: "center",
//                         }}
//                       >
//                         <WhatsAppIcon
//                           sx={{ color: "green", fontSize: "30px" }}
//                         />
//                         <span style={{ fontSize: "12px" }}>WhatsApp</span>
//                         <Checkbox
//                           {...label}
//                           checked={formData.Is_Whatsapp}
//                           onChange={(e) =>
//                             handleCheckboxChange(e, "Is_Whatsapp")
//                           }
//                         />
//                       </span>
//                       <span
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           alignItems: "center",
//                           justifyContent: "center",
//                         }}
//                       >
//                         <EmailIcon sx={{ color: "brown", fontSize: "30px" }} />
//                         <span style={{ fontSize: "12px" }}>Email</span>
//                         <Checkbox {...label} disabled checked />
//                       </span>
//                       <span
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           alignItems: "center",
//                           justifyContent: "center",
//                         }}
//                       >
//                         <AnnouncementIcon
//                           sx={{ color: "red", fontSize: "30px" }}
//                         />
//                         <span style={{ fontSize: "12px" }}>Alert</span>
//                         <Checkbox {...label} disabled checked />
//                       </span>
//                     </div>
//                   </Grid>

//                   <Container
//                     sx={{
//                       marginTop: "10px",
//                       display: "flex",
//                       justifyContent: "flex-end",
//                       marginRight: "20px",
//                     }}
//                   >
//                     <Grid item xs={1}>
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         disabled={isLoading}
//                         sx={{ backgroundColor: "#055f85" }}
//                       >
//                         {isLoading ? "Submitting..." : "Submit"}
//                       </Button>
//                     </Grid>
//                   </Container>
//                 </Grid>
//               </form>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </Box>
//     </Box>
//   );
// };

// export default CreateAlert;




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
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from "@mui/material/Checkbox";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import AlertTable from "./AlertTable";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import {
  createAlertData,
  fetchAlertData,
  deleteAlertData,
} from "../../features/alert/alertAction";
import { useDispatch, useSelector } from "react-redux";
import { selectAlertData } from "../../../src/features/alert/alertSlice";

const CreateAlert = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const alertData = useSelector(selectAlertData);


  // console.log("alert", alertData);


  useEffect(() => {
    dispatch(fetchAlertData());
  }, [dispatch]);

  useEffect(() => {
    const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
    setUserData(userDataFromSession);
  }, []);

  const [open, setOpen] = useState(false);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const apiUrl = "http://localhost:3306/api/employee/allData";
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const [formData, setFormData] = useState({
    EmployeeID: " ",
    EmployeeID_AssignTo: [],
    Alert_Note: "",
    ReminderDay: "",
    RemindBeforeEventDay: "",
    ReminderCounts: "",
    ReminderTime1: "",
    ReminderTime2: "",
    Is_Sms: "",
    Is_Whatsapp: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e, fieldName) => {
    const { checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [fieldName]: checked }));
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  
  //   // Extract EmployeeID from userData
  //   const { EmployeeID } = userData;
  
  //   // Combine EmployeeID with form data
  //   const formDataWithEmployeeID = {
  //     ...formData,
  //     EmployeeID: EmployeeID, // Include the EmployeeID from userData
  //   };


  //   console.log(formDataWithEmployeeID, "hhhhh")
  
  //   try {
  //     // Dispatch the action to create an alert with complete data
  //     await dispatch(createAlertData(formDataWithEmployeeID));
  
  //     // Handle success response
  //     setSuccessMessage("Alert created successfully!");
  
  //     // Clear the success message after 2 seconds
  //     setTimeout(() => {
  //       setSuccessMessage("");
  //     }, 2000);
  
  //     // Reset form data
  //     setFormData({
  //       EmployeeID_AssignTo: "",
  //       Alert_Note: "",
  //       ReminderDay: "",
  //       RemindBeforeEventDay: "",
  //       ReminderCounts: "",
  //       ReminderTime1: "",
  //       ReminderTime2: "",
  //       Is_Sms: "",
  //       Is_Whatsapp: "",
  //     });
  
  //     // // Close the dialog
  //     // handleClose();
  
  //     // // Refresh alert data after creation
  //     // dispatch(fetchAlertData());
  //   } catch (error) {
  //     console.error("Error creating alert:", error);
  //     setError("Error adding alert");
  //   } finally {
  //     setLoading(false);
  //   }
  // };




  //   const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.stopPropagation();
  //     return;
  //   }

  //   try {
  //     setIsLoading(true);
  //     // Include EmployeeID in formData
  //     const formDataWithEmployeeID = {
  //       ...formData,
  //       EmployeeID: userData.EmployeeID,
  //     };

  //     console.log(formDataWithEmployeeID, "kjjjj")
  //     const apiUrl = "http://localhost:3306/api/alertDetails";
  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formDataWithEmployeeID),
  //     });
  //     if (response.ok) {
  //       setSuccessMessage("Registration successful!");
  //       // Reset form inputs to null
  //       setFormData({
  //         EmployeeID: "",
  //         EmployeeID_AssignTo: "",
  //         Alert_Note: "",
  //         ReminderDay: "",
  //         RemindBeforeEventDay: "",
  //         ReminderCounts: "",
  //         ReminderTime1: "",
  //         ReminderTime2: "",
  //         ReminderTime3: "",
  //         Is_Sms: "",
  //       });
  //       form.reset();
  //       // Close the modal dialog
  //       handleClose();
  //       // Automatically hide the success message after 3 seconds
  //       setTimeout(() => {
  //         setSuccessMessage("");
  //       }, 3000);
  //     } else {
  //       setError("Registration failed:" + response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //     setError("Error submitting data: " + error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  


 const handleSubmit = async (event) => {
  event.preventDefault();
  const form = event.currentTarget;

  try {
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    setIsLoading(true);
    const formDataWithEmployeeID = {
      ...formData,
      EmployeeID: userData.EmployeeID,
    };

    console.log(formDataWithEmployeeID, "kkk");

    const apiUrl = "http://localhost:3306/api/alertDetails";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDataWithEmployeeID),
    });

    if (!response.ok) {
      throw new Error("Failed to submit data: " + response.statusText);
    }

    setSuccessMessage("Registration successful!");
    form.reset();
    handleClose();
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  } catch (error) {
    console.error("Error submitting data:", error);
    setError("Error submitting data: " + error.message);
  } finally {
    setIsLoading(false);
  }
};

 
  
  const handleDeleteAlert = async (AlertID) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this alert?"
      );
      if (!confirmed) {
        setLoading(false);
        return; // Exit function if user cancels deletion
      }

      await dispatch(deleteAlertData(AlertID));

      setSuccessMessage("alert deleted successfully!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      // console.log(DesignationID)
      dispatch(fetchAlertData());
    } catch (error) {
      console.error("Error deleting alert:", error);
      setError("Error deleting alert");
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const renderReminderTimeFields = () => {
    const { ReminderCounts } = formData;
    const reminderCount = parseInt(ReminderCounts);
    const reminderTimeFields = [];

    for (let i = 1; i <= reminderCount; i++) {
      reminderTimeFields.push(
        <Grid item xs={4} key={`reminderTime${i}`}>
          <TextField
            label={`Reminder time ${i}`}
            variant="outlined"
            type="time"
            name={`ReminderTime${i}`}
            size="medium"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            required
            value={formData[`ReminderTime${i}`]}
            onChange={handleInputChange}
          />
        </Grid>
      );
    }

    return reminderTimeFields;
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
          <AlertTable
            alertData={alertData}
            handleDeleteAlert={handleDeleteAlert}
          />
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
              top: 10,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent sx={{ border: "2px solid #dddddd", margin: "10px" }}>
            <div style={{}}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <TextField
                      fullWidth
                      id="EmployeeID"
                      label="Employee ID"
                      placeholder="Employee ID"
                      value={userData.EmployeeID || ""} // Use optional chaining and fallback to empty string
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Select Employee AssignTo</InputLabel>
                      <Select
                        multiple
                        fullWidth
                        id="EmployeeID_AssignTo"
                        name="EmployeeID_AssignTo"
                        label="Select Employee AssignTo"
                        value={formData.EmployeeID_AssignTo || []}
                        onChange={handleInputChange}
                        renderValue={(selected) => selected.join(", ")}
                        required
                      >
                        {data.map((employee) => (
                          <MenuItem
                            key={employee.EmployeeID}
                            value={employee.EmployeeID}
                          >
                            <Checkbox
                              checked={formData.EmployeeID_AssignTo.includes(
                                employee.EmployeeID
                              )}
                            />
                            <ListItemText
                              primary={`${employee.EmployeeID} - ${employee.FirstName}`}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Alert Note"
                      variant="outlined"
                      name="Alert_Note"
                      fullWidth
                      size="medium"
                      required
                      value={formData.Alert_Note}
                      onChange={handleInputChange}
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
                      value={formData.ReminderDay}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Remind DayBefore"
                      variant="outlined"
                      type="number"
                      name="RemindBeforeEventDay"
                      fullWidth
                      size="medium"
                      required
                      value={formData.RemindBeforeEventDay}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Reminder Counts</InputLabel>
                      <Select
                        label="Reminder Counts"
                        variant="outlined"
                        type="number"
                        name="ReminderCounts"
                        fullWidth
                        size="medium"
                        required
                        value={formData.ReminderCounts}
                        onChange={handleInputChange}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {renderReminderTimeFields()}

                  <Grid item md={12} sx={{ height: "100%", marginTop: "5px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: "1px solid #cecece",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <span style={{}}>Reminder Type :</span>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <PermPhoneMsgIcon
                          sx={{ color: "#055f85", fontSize: "30px" }}
                        />
                        <span style={{ fontSize: "12px" }}>SMS</span>
                        <Checkbox
                          {...label}
                          checked={formData.Is_Sms}
                          onChange={(e) => handleCheckboxChange(e, "Is_Sms")}
                        />
                      </span>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <WhatsAppIcon
                          sx={{ color: "green", fontSize: "30px" }}
                        />
                        <span style={{ fontSize: "12px" }}>WhatsApp</span>
                        <Checkbox
                          {...label}
                          checked={formData.Is_Whatsapp}
                          onChange={(e) =>
                            handleCheckboxChange(e, "Is_Whatsapp")
                          }
                        />
                      </span>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <EmailIcon sx={{ color: "brown", fontSize: "30px" }} />
                        <span style={{ fontSize: "12px" }}>Email</span>
                        <Checkbox {...label} disabled checked />
                      </span>
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <AnnouncementIcon
                          sx={{ color: "red", fontSize: "30px" }}
                        />
                        <span style={{ fontSize: "12px" }}>Alert</span>
                        <Checkbox {...label} disabled checked />
                      </span>
                    </div>
                  </Grid>

                  <Container
                    sx={{
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "flex-end",
                      marginRight: "20px",
                    }}
                  >
                    <Grid item xs={1}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        sx={{ backgroundColor: "#055f85" }}
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
