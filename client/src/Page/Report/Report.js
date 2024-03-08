import React from "react";
import SideBar from "../../Component/SideBar";
import{Box, Typography}  from "@mui/material";

//import TaskTable from "./TaskTable";

export default function Report() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
       <Typography>Report</Typography>
      </Box>
    </Box>
  );
}
