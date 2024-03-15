const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeDetailsController");
const path = require("path");
const multer = require("multer");
// router.use(express.static("public"));
router.use(express.static(path.join(__dirname, '../public')));


const { authorizeUser } = require("../midderware/auth");

// for saving image using registration form
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.join(__dirname, "../public"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    return cb(null, name);
  },
});
const upload = multer({ storage: storage });

// Get all employees
router.get("/", employeeController.getAllEmployees);

// Get all employees whose user credential is not updated
router.get("/extra-employees-without-credentials", employeeController.getEmployeeWithNoUserCredential);

// Get all data of employees except admin
router.get("/allData", employeeController.getAllDataOfEmployees);

// Get all data of employees by their employee id
router.get("/dNames", employeeController.getDataOfEmployeesWithTheirDNames);

// Get all data of employees by their employee id
router.get(
  "/allData/:EmployeeID",
  employeeController.getAllDataOfEmployeesByEmployeeId
);

// Add a new employee
router.post(
  "/",
  upload.single("Employee_Profile"),
  employeeController.addEmployee
);

// Update employee's data
router.patch(
  "/update/:EmployeeID",
  upload.single("Employee_Profile"),
  employeeController.updateEmployee
);

// Deleting employee's data
router.delete("/delete/:EmployeeID", authorizeUser , employeeController.deleteEmployee);

module.exports = router;
