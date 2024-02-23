import React from 'react';
import "./Assignment.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Typography } from '@mui/material';

const AssignmentCard = ({ countAssignmentData }) => {
  const statuses = [
    { status: "Pending", color: "#dc3545" },
    { status: "Progress", color: "#F29727" },
    { status: "Complete", color: "#28a745" }
  ];

  console.log(countAssignmentData);
  return (
    <div className='Assignmentcard-container'>
      <Typography variant="h5" style={{ fontWeight: "500" }}>Assignment Status</Typography>
      <div className="assignment-card">
        {statuses.map(({ status, color }) => (
          <Card
            key={status}
            sx={{
              backgroundColor: color,
              color: "white",
              width: "16rem",
              height: "10rem",
              marginBottom: "16px",
             
            }}
          >
            <CardHeader title={status} />
            <CardContent>
              <Typography variant="h6" component="div">
                {status} Assignment's
              </Typography>
              <Typography style={{ display: 'flex', justifyContent: "center", fontSize: '1.2rem' }} variant="body2">
                {countAssignmentData ? countAssignmentData[`${status.toLowerCase()}_assignments`] : 'Loading...'}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AssignmentCard;
