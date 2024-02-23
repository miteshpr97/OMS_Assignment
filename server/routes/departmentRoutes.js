const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

// Get all departments
router.get("/", departmentController.getAllDepartments);

// Insert department's data
router.post("/", departmentController.addDepartment);

// Get last department id
router.get("/lastDepartmentId", departmentController.getLastDepartmentId);

// Get next department id
router.get("/nextDepartmentId", departmentController.getNextDepartmentId);

// Updating department's data
router.patch("/update/:DepartmentID", departmentController.updateDepartment);

// Deleting department's data
router.delete("/delete/:DepartmentID", departmentController.deleteDepartment);

module.exports = router;
