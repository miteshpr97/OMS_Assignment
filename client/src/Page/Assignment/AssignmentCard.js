import React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import "./Assignment.css";

const AssignmentCard = ({ countAssignmentData }) => {
  const statuses = [
    {
      status: "Pending",
      gradient: "linear-gradient(to right, red, hsla(0, 68%, 26%, 0.705))",
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
      status: "Complete",
      gradient: "linear-gradient(to right, green, rgba(0, 29, 0, 0.705))",
      color: "#28a745",
      emoji: <AssignmentTurnedInIcon sx={{ fontSize: "2rem" }} />,
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
              width: "auto",
              height: "auto",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              padding: "20px",
            }}
          >
            {/* <CardHeader title={status} sx={{textAlign:"center"}}/> */}
            <CardContent>
              <Typography
                style={{ textAlign: "center", fontSize: "2rem" }}
                variant="body2"
              >
                {countAssignmentData
                  ? countAssignmentData[`${status.toLowerCase()}_assignments`]
                  : "Loading..."}
              </Typography>
              <Typography variant="h6" component="div">
                Total {status}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography>{emoji}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssignmentCard;
