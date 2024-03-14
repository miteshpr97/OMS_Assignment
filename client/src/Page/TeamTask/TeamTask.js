import { Box, Typography } from "@mui/material";
import React from "react";
import SideBar from "../../Component/SideBar";
import TeamTaskTable from "./TeamTaskTable";

const TeamTask = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div style={{border:"2px solid #dddddd", padding:"10px"}}>
        <Typography variant="h5" style={{ fontWeight: "500" }}>
              Team Task
            </Typography>
            <div style={{marginTop:"20px"}}>
            <TeamTaskTable/>
            </div>
        </div>
      </Box>
    </Box>
  );
};

export default TeamTask;