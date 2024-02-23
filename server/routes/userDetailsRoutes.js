const express = require("express");
const router = express.Router();
const userDetailsController = require("../controllers/userDetailsController");

// get all user details
router.get("/", userDetailsController.getAllUserDetails);

// add user details
router.post("/", userDetailsController.addUserDetails);

// update user details
router.patch("/update/:EmployeeID", userDetailsController.updateUserDetails);

// delete user details
router.delete("/delete/:EmployeeID", userDetailsController.deleteUserDetails);

// login user through their details
router.post("/login", userDetailsController.loginUser);

// forget password
router.post("/forgetPassword", userDetailsController.forgetPassword);

//reset password
router.post("/resetPassword/:token", userDetailsController.resetPassword);

// logout user
router.get("/logout", userDetailsController.logoutUser);

module.exports = router;
