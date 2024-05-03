// // SideBar.js
// import React, { useState } from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";

// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Header from "./header/Header";
// import { useNavigate, useLocation } from "react-router-dom";
// import { menuItems } from "./menuItems"; // Import the menuItems

// //  import logo from "../assets/images/Gl-Logo.png";
// import logo from "../assets/images/OWM_Final.png";

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
//   background: "white",
//   color: "white",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   background: "white",
//   color: "white",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
//   height: "64px", // Set the minimum height to 140px

//   backgroundImage: `url(${logo})`, // Set the logo as the background image
//   backgroundSize: "60px auto",
//   backgroundRepeat: "no-repeat",
//   backgroundPosition: "center",
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function SideBar() {
//   const theme = useTheme();
//   const [open, setOpen] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation(); // Add this line to get the current location

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <Header open={open} handleDrawerOpen={handleDrawerOpen} />
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose} style={{ color: "#035d84" }}>
//             {theme.direction === "rtl" ? <MenuIcon /> : <MenuIcon />}
//           </IconButton>

//         </DrawerHeader>

//         <Divider style={{backgroundColor:"#055f85"}} />
//         <List style={{ marginTop:'10px'}}>
//           {menuItems.map((item, index) => (
//             <ListItem
//               key={index}
//               disablePadding
//               sx={{ display: "block" }}
//               onClick={() => navigate(item.path)}
//             >
//               <ListItemButton
//                 sx={{
//                   minHeight: 58,
//                   color: "#055f85",

//                   justifyContent: open ? "initial" : "center",
//                   px: 2.5,
//                   borderBottom: "1px solid #ccc",
//                   // Add styles for the active menu item based on the route
//                   ...(location.pathname === item.path && {
//                     background: "#055f85",
//                     color: "white",
//                   }),
//                   ":hover": {
//                     background: "rgba(8, 104, 142, 0.5)", // Add the desired hover background color
//                     color: "white", // Add the desired hover text color
//                   },
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : "auto",
//                     justifyContent: "center",

//                     color: "#055f85",
//                     ...(location.pathname === item.path && {
//                       background: "055f85",
//                       color: "white",
//                     }),
//                     ":hover": {
//                       background: "rgba(8, 104, 142, 0.5)", // Add the desired hover background color
//                       color: "white", // Add the desired hover text color
//                     },
//                   }}
//                 >
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText
//                   primary={
//                     <div style={{ fontSize: "0.9rem", fontFamily: "Roboto" }}>
//                       {item.text}
//                     </div>
//                   }
//                   sx={{
//                     opacity: open ? 1 : 0,
//                   }}
//                 />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>

//       </Drawer>
//     </Box>
//   );
// }

// SideBar.js
import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Header from "./header/Header";
import { useNavigate, useLocation } from "react-router-dom";
import { menuItems } from "./menuItems"; // Import the menuItems

//  import logo from "../assets/images/Gl-Logo.png";
import logo from "../assets/images/OWM_Final.png";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "white",
  color: "white",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  background: "white",
  color: "white",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  height: "64px", // Set the minimum height to 140px

  backgroundImage: `url(${logo})`, // Set the logo as the background image
  backgroundSize: "60px auto",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = JSON.parse(sessionStorage.getItem("userData"));

  // Check if userRole is null or undefined
  if (userRole === null || userRole === undefined) {
    // Render loading state or redirect to login page
    return (
      <div>
        <Header/>
      </div>
    );
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} style={{ color: "#035d84" }}>
            {theme.direction === "rtl" ? <MenuIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider style={{ backgroundColor: "#055f85" }} />

        <List style={{ marginTop: "10px" }}>
          {menuItems.map((item, index) => {
            if (userRole.Role === "Admin") {
              // Render menu items for Admin role
              if (
                item.text === "Home" ||
                item.text === "Employee" ||
                item.text === "Master" ||
                item.text === "Team" ||
                item.text === "Alert"
              ) {
                return (
                  <RenderMenuItem
                    key={index}
                    item={item}
                    navigate={navigate}
                    location={location}
                  />
                );
              }
            } else if (userRole.Role === "User") {
              // Render menu items for User role
              if (
                item.text === "Home" ||
                item.text === "My Team" ||
                item.text === "Assignment" ||
                item.text === "My Task" ||
                item.text === "Team Task" ||
                item.text === "Report"
              ) {
                return (
                  <RenderMenuItem
                    key={index}
                    item={item}
                    navigate={navigate}
                    location={location}
                  />
                );
              }
            } else {
              // Render all menu items for other roles
              return (
                <RenderMenuItem
                  key={index}
                  item={item}
                  navigate={navigate}
                  location={location}
                />
              );
            }
            return null;
          })}
        </List>
      </Drawer>
    </Box>
  );
}

// Create a separate component to render menu items
const RenderMenuItem = ({ item, navigate, location }) => {
  return (
    <ListItem
      disablePadding
      sx={{ display: "block" }}
      onClick={() => navigate(item.path)}
    >
      <ListItemButton
        sx={{
          minHeight: 58,
          color: "#055f85",
          justifyContent: "initial",
          px: 2.5,
          borderBottom: "1px solid #ccc",
          ...(location.pathname === item.path && {
            background: "#055f85",
            color: "white",
          }),
          ":hover": {
            background: "rgba(8, 104, 142, 0.5)",
            color: "white",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 3,
            justifyContent: "center",
            color: "#055f85",
            ...(location.pathname === item.path && {
              background: "#055f85",
              color: "white",
            }),
            ":hover": {
              background: "rgba(8, 104, 142, 0.5)",
              color: "white",
            },
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={
            <div style={{ fontSize: "0.9rem", fontFamily: "Roboto" }}>
              {item.text}
            </div>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};
