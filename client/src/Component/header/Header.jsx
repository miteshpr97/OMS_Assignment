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
//         alert("logout successful");
//       } else {
//         console.log("logout failed");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   console.log(userData)

//   return (
//     <AppBar position="fixed" open={open} style={{ background: "#5c7c77" }}>
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
//         <div style={{ display: "flex", alignItems: "center" }}>
          
//             {userData && (
//               <CardMedia
//                 component="img"
//                 sx={{   borderRadius: "50%" , height:"40px", width:"40px", border:"1px solid white"}}
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
//             )}
         

//           <Popper id={id} open={isOpen} anchorEl={anchorEl}>
//             <Box
//               sx={{
//                 border: "none",
//                 p: 1,
//                 bgcolor: "#5c7c77",
//                 marginTop: "20px",
//               }}
//             >
//               <List>
//                 {userData && (
//                   <ListItem disablePadding>
//                     <ListItemButton>
//                       <ListItemText
//                         primary={`${userData.FirstName} ${userData.LastName} - ${userData.EmployeeID}`}
//                         sx={{ color: "white" }}
//                       />
//                     </ListItemButton>
//                   </ListItem>
//                 )}
//                 {!userData && (
//                   <ListItem disablePadding>
//                     <ListItemButton>
//                       <ListItemText
//                         primary="please Sign-in..."
//                         sx={{ color: "white" }}
//                       />
//                     </ListItemButton>
//                   </ListItem>
//                 )}
//                 <hr />

//                 {!userData && (
//                   <ListItem disablePadding>
//                     <Link
//                       to={"/loginpage"}
//                       style={{ textDecoration: "none", color: "white" }}
//                     >
//                       <ListItemButton>
//                         <ListItemIcon sx={{ color: "white" }}>
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
//                         style={{ textDecoration: "none", color: "white" }}
//                       >
//                         <ListItemButton>
//                           <ListItemIcon sx={{ color: "white" }}>
//                             <AppRegistrationIcon />
//                           </ListItemIcon>
//                           <ListItemText primary="SIGN-UP" />
//                         </ListItemButton>
//                       </Link>
//                     </ListItem>
//                     <ListItem disablePadding>
//                       <ListItemButton onClick={handleLogout}>
//                         <ListItemIcon sx={{ color: "white" }}>
//                           <LogoutIcon />
//                         </ListItemIcon>
//                         <ListItemText
//                           primary="SIGN-OUT"
//                           sx={{ color: "white" }}
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
} from "@mui/material";
import Popper from "@mui/material/Popper";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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

export default function Header({ open, handleDrawerOpen }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? "simple-popper" : undefined;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
    if (userDataFromSession) {
      setUserData(userDataFromSession);
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = "http://localhost:3306/api/userDetails/logout";
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
        alert("logout successful");
      } else {
        console.log("logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar position="fixed" open={open} style={{ background: "#5c7c77" }}>
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
        <div style={{ display: "flex", alignItems: "center", marginRight:"5px" }}>
        {userData ? (
              <CardMedia
                component="img"
                sx={{
                  borderRadius: "50%",
                  height: "40px",
                  width: "40px",
                  border: "none",
                }}
                src={
                  userData.Employee_Profile
                    ? `http://localhost:3306/api/employee/${userData.Employee_Profile}`
                    : ""
                }
                alt="Employee Profile"
                aria-describedby={id}
                type="button"
                onClick={handleClick}
              />
            ) : (
              <AccountCircleIcon
                sx={{
                  width: 40,
                  height: 40,
                }}
                aria-describedby={id}
                type="button"
                onClick={handleClick}
              />
            )}

          <Popper id={id} open={isOpen} anchorEl={anchorEl}>
            <Box
              sx={{
                border: "none",
                p: 1,
                bgcolor: "#5c7c77",
                marginTop: "15px",
                
              }}
            >
              <List>
                {userData && (
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary={`${userData.FirstName} ${userData.LastName} - ${userData.EmployeeID}`}
                        sx={{ color: "white" }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}
                {!userData && (
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText
                        primary="please Sign-in..."
                        sx={{ color: "white" }}
                      />
                    </ListItemButton>
                  </ListItem>
                )}
                <hr />

                {!userData && (
                  <ListItem disablePadding>
                    <Link
                      to={"/loginpage"}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <ListItemButton>
                        <ListItemIcon sx={{ color: "white" }}>
                          <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary="SIGN-IN" />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                )}

                {userData && (
                  <>
                    <ListItem disablePadding>
                      <Link
                        to={"/signuppage"}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <ListItemButton>
                          <ListItemIcon sx={{ color: "white" }}>
                            <AppRegistrationIcon />
                          </ListItemIcon>
                          <ListItemText primary="SIGN-UP" />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={handleLogout}>
                        <ListItemIcon sx={{ color: "white" }}>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="SIGN-OUT"
                          sx={{ color: "white" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </>
                )}
              </List>
            </Box>
          </Popper>
        </div>
      </Toolbar>
    </AppBar>
  );
}
