tb_employee's Api

// Get all data of employees
http://localhost:3306/api/employee/allData

// Get all data of employees with their department and designation names
http://localhost:3306/api/employee/dNames

// Add a new employee
http://localhost:3306/api/employee

// Get latest or last employee id
http://localhost:3306/api/employee/lastEmployeeId

// Getting next employee id
http://localhost:3306/api/employee/nextEmployeeId

// Update employee's data
http://localhost:3306/api/employee/update/:EmployeeID

// Deleting employee's data
http://localhost:3306/api/employee/delete/:EmployeeID


tb_userdetails Api

// get all user details
http://localhost:3306/api/userDetails

// add user details
http://localhost:3306/api/userDetails

// update user details
http://localhost:3306/api/userDetails/update/:EmployeeID

// delete user details
http://localhost:3306/api/userDetails/delete/:EmployeeID

// login user through their details
http://localhost:3306/api/userDetails/login

// forget password
http://localhost:3306/api/userDetails/forgetPassword

//reset password
http://localhost:3306/api/userDetails/resetPassword/:token

// logout user
http://localhost:3306/api/userDetails/logout


tb_department's Api

// Get all departments
http://localhost:3306/api/department

// Insert department's data
http://localhost:3306/api/department

// Get last department id
http://localhost:3306/api/department/lastDepartmentId

// Getting next department id
http://localhost:3306/api/designation/nextDepartmentId

// Updating department's data
http://localhost:3306/api/department/update/:DepartmentID

// Deleting department's data
http://localhost:3306/api/department/delete/:DepartmentID


tb_designation's Api

// Get all designations
http://localhost:3306/api/designation

// Insert designation's data
http://localhost:3306/api/designation

// Get last designation id
http://localhost:3306/api/designation/lastDesignationId

// Getting next designation id
http://localhost:3306/api/designation/nextDesignationId

// Updating designation's data
http://localhost:3306/api/designation/update/:DesignationID

// Deleting designation's data
http://localhost:3306/api/designation/delete/:DesignationID


tb_workGroup's Api

// Get all work groups
http://localhost:3306/api/workGroup

//get all data from employee table using join and merged it with work group table(Mitesh)
http://localhost:3306/api/workGroup/allData

// Get all data about a particular group
http://localhost:3306/api/workGroup/:EmployeeID_Assigner

// Add a new work group (single)
http://localhost:3306/api/workGroup

// Add a new work group (multiple)
http://localhost:3306/api/workGroup/multiple

// Update work group's data
http://localhost:3306/api/workGroup/update/:WorkGroupID

// Deleting a work group
http://localhost:3306/api/workGroup/delete/:WorkGroupID


tb_assignment's Api

// get all Assignment
http://localhost:3306/api/assignmentDetails

// Post or add Assignment
http://localhost:3306/api/assignmentDetails

// add Assignment Data (Mitesh)
http://localhost:3306/api/assignmentDetails/data

// all data show with name(Mitesh)
http://localhost:3306/api/assignmentDetails/allData

// get last assignment id
http://localhost:3306/api/assignmentDetails/lastAssignmentId

// Getting next assignment id
http://localhost:3306/api/assignmentDetails/nextAssignmentId

// update assignment
http://localhost:3306/api/assignmentDetails/update/:AssignmentID

// update assignment status from pending to progress
http://localhost:3306/api/assignmentDetails/:AssignmentID/progress

// update assignment status from progress to completed
http://localhost:3306/api/assignmentDetails/:AssignmentID/completed

// number of pending assignments
http://localhost:3306/api/assignmentDetails/pending-assignments

// number of pending assignments of an employee
http://localhost:3306/api/assignmentDetails/:EmployeeID_AssignTo/pending-assignments

// number of progress assignments
http://localhost:3306/api/assignmentDetails/progress-assignments

// number of progress assignments of an employee
http://localhost:3306/api/assignmentDetails/:EmployeeID_AssignTo/progress-assignments

// number of completed assignments
http://localhost:3306/api/assignmentDetails/completed-assignments

// number of completed assignments of an employee
http://localhost:3306/api/assignmentDetails/:EmployeeID_AssignTo/completed-assignments

// delete assignment
http://localhost:3306/api/assignmentDetails/delete/:AssignmentID


tb_task's Api

// get all task details
http://localhost:3306/api/taskDetails

// add task details
http://localhost:3306/api/taskDetails

// get all task details
http://localhost:3306/api/taskDetails/lastTaskId

// Getting next task id
http://localhost:3306/api/taskDetails/nextTaskId

// update task details
http://localhost:3306/api/taskDetails/update/:TaskID

// delete task details
http://localhost:3306/api/taskDetails/delete/:TaskID