// import React, { useEffect, useState } from "react";
// import { styled } from "@mui/material/styles";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import {
//   Box,
//   CardMedia,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import Popper from "@mui/material/Popper";
// import { Link, useNavigate } from "react-router-dom";
// import LoginIcon from "@mui/icons-material/Login";
// import LogoutIcon from "@mui/icons-material/Logout";
// import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// // Define the drawer width
// const drawerWidth = 240;

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// export default function Header({ open, handleDrawerOpen }) {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const navigate = useNavigate();

//   const handleClick = (event) => {
//     setAnchorEl(anchorEl ? null : event.currentTarget);
//   };

//   const isOpen = Boolean(anchorEl);
//   const id = isOpen ? "simple-popper" : undefined;

//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
//     if (userDataFromSession) {
//       setUserData(userDataFromSession);
//     }
//   }, []);

//   const handleLogout = async (e) => {
//     e.preventDefault();

//     // Ask for confirmation before logging out
//     const confirmLogout = window.confirm("Are you sure you want to logout?");
//     if (!confirmLogout) {
//       return; // Cancel logout if user selects cancel
//     }

//     try {
//       const apiUrl = "http://localhost:3306/api/userDetails/logout";
//       const response = await fetch(apiUrl, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });

//       if (response.ok) {
//         sessionStorage.removeItem("userData");
//         localStorage.removeItem("token");
//         navigate("/loginpage");
//       } else {
//         console.log("Logout failed");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <AppBar position="fixed" open={open} style={{ background: "#055f85" }}>
//       <Toolbar
//         style={{ justifyContent: "space-between", alignItems: "center" }}
//       >
//         <div>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(open && { display: "none" }),
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//         </div>

//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             marginRight: "5px",
//           }}
//         >
//           {userData ? (
//             <>
//               <div
//                 style={{
//                   textTransform: "capitalize",
//                   color: "white",
//                   display:"flex",
//                   textAlign: "center",
//                   marginRight: "5px",
//                   padding: "2px",
//                 }}
//               >
//                 <p style={{ margin: "0px", fontSize:"15px" }}> Hi, </p>
//                 <span style={{fontSize:"15px"}}>{userData.FirstName}</span>
//               </div>

//               <CardMedia
//                 component="img"
//                 sx={{
//                   borderRadius: "50%",
//                   height: "40px",
//                   width: "40px",
//                   border: "none",
//                 }}
//                 src={
//                   userData.Employee_Profile
//                     ? `http://localhost:3306/api/employee/${userData.Employee_Profile}`
//                     : ""
//                 }
//                 alt="Employee Profile"
//                 aria-describedby={id}
//                 type="button"
//                 onClick={handleClick}
//               />
//             </>
//           ) : (
//             <AccountCircleIcon
//               sx={{
//                 width: 40,
//                 height: 40,
//               }}
//               aria-describedby={id}
//               type="button"
//               onClick={handleClick}
//             />
//           )}

//           <Popper id={id} open={isOpen} anchorEl={anchorEl}>
//             <Box
//               sx={{
//                 border: "none",
//                 p: 1,
//                 bgcolor: "#dddddd", // Transparent blue color with alpha value 0.5
//                 marginTop: "15px",
//                 marginRight: "9px",
//               }}
//             >
//               <List>
//                 {userData && (
//                   <ListItem disablePadding>
//                     <ListItemButton>
//                       <ListItemText
//                         primary={`${userData.FirstName} ${userData.LastName} - ${userData.EmployeeID}`}
//                         sx={{ color: "#055f85" }}
//                       />
//                     </ListItemButton>
//                   </ListItem>
//                 )}
//                 {!userData && (
//                   <ListItem disablePadding>
//                     <ListItemButton>
//                       <ListItemText
//                         primary="please Sign-in..."
//                         sx={{ color: "#055f85" }}
//                       />
//                     </ListItemButton>
//                   </ListItem>
//                 )}
//                 <hr />

//                 {!userData && (
//                   <ListItem disablePadding>
//                     <Link
//                       to={"/loginpage"}
//                       style={{ textDecoration: "none", color: "#055f85" }}
//                     >
//                       <ListItemButton>
//                         <ListItemIcon sx={{ color: "#055f85" }}>
//                           <LoginIcon />
//                         </ListItemIcon>
//                         <ListItemText primary="SIGN-IN" />
//                       </ListItemButton>
//                     </Link>
//                   </ListItem>
//                 )}

//                 {userData && (
//                   <>
//                     <ListItem disablePadding>
//                       <Link
//                         to={"/signuppage"}
//                         style={{ textDecoration: "none", color: "#055f85" }}
//                       >
//                         <ListItemButton>
//                           <ListItemIcon sx={{ color: "#055f85" }}>
//                             <AppRegistrationIcon />
//                           </ListItemIcon>
//                           <ListItemText primary="SIGN-UP" />
//                         </ListItemButton>
//                       </Link>
//                     </ListItem>
//                     <ListItem disablePadding>
//                       <ListItemButton onClick={handleLogout}>
//                         <ListItemIcon sx={{ color: "#055f85" }}>
//                           <LogoutIcon />
//                         </ListItemIcon>
//                         <ListItemText
//                           primary="SIGN-OUT"
//                           sx={{ color: "#055f85" }}
//                         />
//                       </ListItemButton>
//                     </ListItem>
//                   </>
//                 )}
//               </List>
//             </Box>
//           </Popper>
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// }

import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  CardMedia,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserData } from "../../features/auth/authAction";
import { selectUserData } from "../../features/auth/authSlice";

// Define the drawer width
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



const apiBasedUrl = process.env.REACT_APP_API_URL;

export default function Header({ open, handleDrawerOpen }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const userData = useSelector(selectUserData);


  // console.log(userData, "iiiiii")

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  
  useEffect(() =>{
    dispatch(fetchUserData())
  }, [dispatch])

   const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
    if (userDataFromSession) {
      setUserData(userDataFromSession);
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();

    // Ask for confirmation before logging out
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) {
      return; // Cancel logout if user selects cancel
    }

    try {
      const apiUrl = `${apiBasedUrl}/api/userDetails/logout`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        sessionStorage.removeItem("userData");
        localStorage.removeItem("token");
        navigate("/loginpage");
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar position="fixed" open={open} style={{ background: "#055f85" }}>
      <Toolbar
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "5px",
          }}
        >
          {userData ? (
            <>
              <div
                style={{
                  textTransform: "capitalize",
                  color: "white",
                  display: "flex",
                  textAlign: "center",
                  marginRight: "5px",
                  padding: "2px",
                }}
              >
                <p style={{ margin: "0px", fontSize: "15px", marginRight:"3px" }}> Hi, </p>
                <span style={{ fontSize: "15px" }}>{userData.FirstName}</span>
              </div>

              <CardMedia
                component="img"
                sx={{
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                  border: "none",
                  cursor:"pointer"
                }}
                // src={
                //   userData.Employee_Profile
                //     ? `http://localhost:3306/api/employee/${userData.Employee_Profile}`
                //     : ""
                // }
                src={userData.Employee_Profile}
                alt="data"
                aria-describedby={isOpen ? "popover" : undefined}
                onClick={handleClick}
              />
            </>
          ) : (
            <AccountCircleIcon
              sx={{
                width: 40,
                height: 40,
                cursor:"pointer"
              }}
              aria-describedby={isOpen ? "popover" : undefined}
              onClick={handleClick}
            />
          )}

          <Popover
            id="popover"
            open={isOpen}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box
              sx={{
                border: "none",
                p: 1,
                bgcolor: "#dddddd", // Transparent blue color with alpha value 0.5
                
              }}
            >
              <List>
                {userData && (
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary={`${userData.FirstName} ${userData.LastName} - ${userData.EmployeeID}`}
                        sx={{ color: "#055f85" }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}
                {!userData && (
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary="Please Sign-In"
                        sx={{ color: "#055f85" }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}
                <hr />

                {!userData && (
                  <Link
                    to={"/loginpage"}
                    style={{ textDecoration: "none", color: "#055f85" }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon sx={{ color: "#055f85" }}>
                          <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary="SIGN-IN" />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                )}

                {userData && (
                  <>
                    <Link
                      to={"/signuppage"}
                      style={{ textDecoration: "none", color: "#055f85" }}
                    >
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon sx={{ color: "#055f85" }}>
                            <AppRegistrationIcon />
                          </ListItemIcon>
                          <ListItemText primary="SIGN-UP" />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                    <ListItem disablePadding>
                      <ListItemButton onClick={handleLogout}>
                        <ListItemIcon sx={{ color: "#055f85" }}>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="SIGN-OUT"
                          sx={{ color: "#055f85" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </>
                )}
              </List>
            </Box>
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  );
}
