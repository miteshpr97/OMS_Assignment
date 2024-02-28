const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

// Get all departments
router.get("/", departmentController.getAllDepartments);

// Insert department's data
router.post("/", departmentController.addDepartment);

// Insert department's data with auto generated id
router.post("/withID", departmentController.addDepartmentWithId);

// Get next department id
router.get("/nextDepartmentId", departmentController.getNextDepartmentId);

// Get particular department's data by their department id
router.get("/:DepartmentID", departmentController.getDepartmentById);

// Updating department's data
router.patch("/update/:DepartmentID", departmentController.updateDepartment);

// Deleting department's data
router.delete("/delete/:DepartmentID", departmentController.deleteDepartment);

module.exports = router;
