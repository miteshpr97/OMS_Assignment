import React from "react";
import SideBar from "../../Component/SideBar";
import Box from "@mui/material/Box";
import Deapartment from './Department/Department'


export default function Master() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div>
        <Deapartment/>
        </div>
        
      </Box>
    </Box>
  );
}
