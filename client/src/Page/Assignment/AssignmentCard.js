import React from "react";

import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CancelIcon from '@mui/icons-material/Cancel';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import "./Assignment.css";

const AssignmentCard = ({ countAssignmentData }) => {
  const statuses = [
    {
      status: "Assigned",
      gradient: "linear-gradient(to right, #007baf, #054f6e)",
      color: "#dc3545",
      emoji: <PendingActionsIcon sx={{ fontSize: "2rem" }} />,
    },
    {
      status: "Progress",
      gradient: "linear-gradient(to right, orange, rgba(56, 36, 0, 0.712))",
      color: "#F29727",
      emoji: <HourglassTopIcon sx={{ fontSize: "2rem" }} />,
    },
    {
      status: "Closed",
      gradient: "linear-gradient(to right, green, rgba(0, 29, 0, 0.705))",
      color: "#28a745",
      emoji: <AssignmentTurnedInIcon sx={{ fontSize: "2rem" }} />,
    },
   
    {
      status: "Regret",
      gradient: "linear-gradient(to right, brown, #440000ad)",
      color: "#28a745",
      emoji: <ThumbDownIcon sx={{ fontSize: "2rem" }} />,
    },
    {
      status: "Reject",
      gradient: "linear-gradient(to right, red, hsla(0, 68%, 26%, 0.705))",
      color: "#28a745",
      emoji: <CancelIcon sx={{ fontSize: "2.1rem" }} />,
    },
  ];


  return (
    <div className="Assignmentcard-container">
      <Typography variant="h5" style={{ fontWeight: "500" }}>
        Assignment Status
      </Typography>
      <div className="assignment-card">
        {statuses.map(({ status, color, gradient, emoji }) => (
          <Card
            key={status}
            sx={{
              backgroundImage: gradient, // Applying linear gradient
              color: "white",
              width: "230px",
              height: "150px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              padding: "20px",
            }}
          >
            {/* <CardHeader title={status} sx={{textAlign:"center"}}/> */}
            <CardContent sx={{padding:"0px"}}>
              <Typography
                style={{ textAlign: "center", fontSize: "2rem"}}
                variant="body2"
              >
                {countAssignmentData 
                  ? status === "Assigned"
                    ? countAssignmentData.Assigned_assignments
                    : status === "Closed"
                    ? countAssignmentData.Completed_assignments
                    : status === "Progress"
                    ? countAssignmentData.Progress_assignments
                    : status === "Reject"
                    ? countAssignmentData.Rejected_assignments
                    : status === "Regret"
                    ? countAssignmentData.Regret_assignments
                    : "Unknown Status"
                  : "Loading..."}
              </Typography>

              <Typography variant="h7" component="div">
                Total {status}
              </Typography>
            </CardContent>
            <CardContent sx={{padding:"5px"}}>
              <Typography sx={{padding:"5px"}}>{emoji}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssignmentCard;
