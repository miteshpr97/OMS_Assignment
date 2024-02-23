const express = require("express");
const router = express.Router();
const auth = require("../midderware/auth");
const employeeController = require("../controllers/employeeDetailsController");
const path = require("path");
const multer = require("multer");
router.use(express.static('public'));

// for saving image using registration form 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.join(__dirname,'../public'))
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    return cb(null, name)
  }
})  
const upload = multer({ storage: storage });

// Define routes related to employees

// Get all employees
router.get("/", employeeController.getAllEmployees);

// Get all data of employees
router.get("/allData", employeeController.getAllDataOfEmployees);


// Get all data of employees by their employee id
router.get(
  "/allData/:EmployeeID",
  employeeController.getAllDataOfEmployeesByEmployeeId
);

// Get all data of employees by their employee id with departMentNames
router.get("/dNames", employeeController.getDataOfEmployeesWithTheirDNames);



// Add a new employee
router.post("/",upload.single('Employee_Profile'),employeeController.addEmployee);

// Getting next employee id
router.get("/nextEmployeeId", employeeController.getNextEmployeeId);


// Update employee's data
router.patch("/update/:EmployeeID", employeeController.updateEmployee);


// Deleting employee's data
router.delete("/delete/:EmployeeID", employeeController.deleteEmployee);

module.exports = router;
