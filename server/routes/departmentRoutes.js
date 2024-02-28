const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

// Get all departments
router.get("/", departmentController.getAllDepartments);

// Get particular department's data by their department id
router.get("/:DepartmentID", departmentController.getDepartmentById);

// Insert department's data with auto generated id
router.post("/withID", departmentController.addDepartmentWithId);

// Updating department's data
router.patch("/update/:DepartmentID", departmentController.updateDepartment);

// Deleting department's data
router.delete("/delete/:DepartmentID", departmentController.deleteDepartment);

module.exports = router;
