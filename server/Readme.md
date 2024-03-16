tb_employee's Api

// Get all employees
http://localhost:3306/api/employee

// Get overall data of employees
http://localhost:3306/api/employee/allData

// Get all data of employees with their department and designation names
http://localhost:3306/api/employee/dNames

// Add a new employee
http://localhost:3306/api/employee

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

// Get particular department by id
http://localhost:3306/api/department/:DepartmentID

// Insert department's data
http://localhost:3306/api/department

// Updating department's data
http://localhost:3306/api/department/update/:DepartmentID

// Deleting department's data
http://localhost:3306/api/department/delete/:DepartmentID


tb_designation's Api

// Get all designations
http://localhost:3306/api/designation

// Get particular designation by id
http://localhost:3306/api/designation/:DesignationID

// Insert designation's data
http://localhost:3306/api/designation

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

// Get all tasks with work group details  
http://localhost:3306/api/workGroup/task

// Add a new work group (multiple)
http://localhost:3306/api/workGroup/multiple

// Update work group's data
http://localhost:3306/api/workGroup/update/:WorkGroupID

// Deleting a work group
http://localhost:3306/api/workGroup/delete/:WorkGroupID


tb_assignment's Api

// get all Assignment
http://localhost:3306/api/assignmentDetails

// get particular Assignment by id
http://localhost:3306/api/assignmentDetails/:AssignmentID

// Post or add Assignment with auto generated id
http://localhost:3306/api/assignmentDetails/withID

// update assignment
http://localhost:3306/api/assignmentDetails/update/:AssignmentID

// update assignment status from pending to progress
http://localhost:3306/api/assignmentDetails/:AssignmentID/progress

// update assignment status from progress to completed
http://localhost:3306/api/assignmentDetails/:AssignmentID/completed

// number of pending progress and completed assignments of a particular employee
http://localhost:3306/api/assignmentDetails/:EmployeeID_AssignTo/assignmentCounts

// delete assignment
http://localhost:3306/api/assignmentDetails/delete/:AssignmentID


tb_task's Api

// get all task details
http://localhost:3306/api/taskDetails

// get particular task details by id
http://localhost:3306/api/taskDetails/:TaskID

// add task with auto generated id
http://localhost:3306/api/taskDetails/withID

// update task details
http://localhost:3306/api/taskDetails/update/:TaskID

// update assignment status from pending to progress
http://localhost:3306/api/taskDetails/:TaskID/progress

// update assignment status from progress to completed
http://localhost:3306/api/taskDetails/:TaskID/completed

// number of pending progress and completed tasks of a particular employee
http://localhost:3306/api/taskDetails/:EmployeeID/taskCounts

// delete task details
http://localhost:3306/api/taskDetails/delete/:TaskID