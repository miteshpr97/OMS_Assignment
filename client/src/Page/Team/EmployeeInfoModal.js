import React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function EmployeeInfoModal({ isOpen, onClose, employeeData }) {
  console.log(employeeData, "dhodw");
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          p: 4,
          maxWidth: 400,
          minWidth: 300,
          borderRadius: 4,
          width: "100%",
          
        }}
      >
        {employeeData && (
          <>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 15,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
              Employee Information
            </Typography>

         
            <Typography variant="body1" sx={{ mb: 2, textTransform: "capitalize" }}>
              <strong>Name :</strong> {employeeData.FirstName}{" "}
              {employeeData.LastName}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>ID :</strong> {employeeData.EmployeeID}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Email :</strong> {employeeData.Email}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textTransform: "capitalize" }}>
              <strong>Department Name :</strong> {employeeData.DepartmentName}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textTransform: "capitalize" }}>
              <strong>Designation Name :</strong> {employeeData.DesignationName}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                textAlign: "center",
                color: employeeData.EmploymentStatus === "Active" ? "green" : "red",
              }}
            >
              {employeeData.EmploymentStatus}
            </Typography>
          </>
        )}
      </Box>
    </Modal>
  );
}
