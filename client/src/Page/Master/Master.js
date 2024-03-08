import React from "react";
import SideBar from "../../Component/SideBar";
import Box from "@mui/material/Box";
import Department from './Department/Department'
import NewDesignation from "./Designation/NewDesignation";


export default function Master() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div>
        <Department/>
        </div>
        <div style={{marginTop:"40px"}}>
       <NewDesignation/>
        </div>
        
      </Box>
    </Box>
  );
}
