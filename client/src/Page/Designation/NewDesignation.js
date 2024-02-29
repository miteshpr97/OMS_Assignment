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
// } from "@mui/material"; // Import IconButton
// import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createDesignationData,
//   fetchDesignationData,
//   deleteDesignationData
// } from "../../features/designation/designationAction";
// import {
//   selectdesignationData,
//   // selectLoading,
//   // selectError,
// } from "../../features/designation/designationSlice";

// import ViewDesignation from "./ViewDesignation";

// const NewDesignation = () => {
//   const dispatch = useDispatch();
//   const designationData = useSelector(selectdesignationData);
//   // const Loading = useSelector(selectLoading);
//   // const error = useSelector(selectError);

//   const [formData, setFormData] = useState({
//     DesignationName: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     dispatch(fetchDesignationData());
//   }, [dispatch]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await dispatch(createDesignationData(formData));
//       setFormData({ DesignationName: "" }); // Reset form fields after submission if needed
//       dispatch(fetchDesignationData());
//       handleClose();
//     } catch (error) {
//       console.error("Error creating department:", error);
//     }
//   };


  

//   return (
//     <Box sx={{ display: "flex" }}>
//       <SideBar />
//       <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
//         <div style={{ padding: "10px", border: "1px solid black" }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               paddingTop: "10px",
//             }}
//           >
//             <Typography variant="h5" style={{ fontWeight: "500" }}>
//               Designation Data
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
//               CREATE NEW DESIGNATION
//             </Button>
//           </div>
//           <ViewDesignation 
//           designationData={designationData} 
          

//           />
//         </div>
//         <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//           <DialogTitle sx={{ fontSize: "22px", padding: "16px 24px 5px 24px" }}>
//             NEW DESIGNATION
//           </DialogTitle>
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{
//               position: "absolute",
//               right: 15,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//           <DialogContent>
//             <div className="New-departmemt">
//               <form onSubmit={handleSubmit}>
//                 <Grid container spacing={3} className="mt-2">
//                   <Grid item md={12}>
//                     <TextField
//                       type="text"
//                       label="Designation Name"
//                       variant="outlined"
//                       name="DesignationName"
//                       value={formData.DesignationName}
//                       onChange={handleInputChange}
//                       fullWidth
//                       size="medium"
//                       required
//                     />
//                   </Grid>
//                 </Grid>

//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "flex-end",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     className="btn mt-2 custom-button"
//                     disabled={isLoading}
//                     style={{ backgroundColor: "#055f85", color: "#fff" }}
//                   >
//                     {isLoading ? "Submitting..." : "Submit"}
//                   </Button>
//                 </div>
//               </form>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </Box>
//     </Box>
//   );
// };

// export default NewDesignation;





import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDesignationData,
  fetchDesignationData,
  deleteDesignationData
} from "../../features/designation/designationAction";
import {
  selectdesignationData
} from "../../features/designation/designationSlice";

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
} from "@mui/material"; 
import CloseIcon from "@mui/icons-material/Close"; 
import ViewDesignation from "./ViewDesignation";

const NewDesignation = () => {
  const dispatch = useDispatch();
  const designationData = useSelector(selectdesignationData);

  const [formData, setFormData] = useState({
    DesignationName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDesignationData());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(createDesignationData(formData));
      setFormData({ DesignationName: "" });
      dispatch(fetchDesignationData());
      handleClose();
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };

  const handleDeleteDesignation = async (DesignationID) => {
    try {
      await dispatch(deleteDesignationData(DesignationID));
      console.log(DesignationID)
      dispatch(fetchDesignationData());
    } catch (error) {
      console.error("Error deleting designation:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div style={{ padding: "10px", border: "1px solid black" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "10px",
            }}
          >
            <Typography variant="h5" style={{ fontWeight: "500" }}>
              Designation Data
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
              CREATE NEW DESIGNATION
            </Button>
          </div>
          <ViewDesignation
            designationData={designationData}
            handleDeleteDesignation={handleDeleteDesignation}
          />
        </div>
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontSize: "22px", padding: "16px 24px 5px 24px" }}>
            NEW DESIGNATION
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
            <div className="New-departmemt">
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3} >
                  <Grid item md={12}>
                    <TextField
                      type="text"
                      label="Designation Name"
                      variant="outlined"
                      name="DesignationName"
                      value={formData.DesignationName}
                      onChange={handleInputChange}
                      fullWidth
                      size="medium"
                      required
                    />
                  </Grid>
                </Grid>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    className="btn mt-2 custom-button"
                    disabled={isLoading}
                    style={{ backgroundColor: "#055f85", color: "#fff" }}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default NewDesignation;
