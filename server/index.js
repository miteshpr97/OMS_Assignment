const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userDetailsController = require("./controllers/userDetailsController");
const employeeDetails = require("./routes/employeeDetailsRoutes");
const workGroup = require("./routes/workGroupRoutes");
const designationDetails = require("./routes/designationRoutes");
const departmentDetails = require("./routes/departmentRoutes");
const userDetails = require("./routes/userDetailsRoutes");
const assignmentDetails = require("./routes/assignmentRoutes");
const taskDetails = require("./routes/taskRoutes");
const alertDetails = require("./routes/alertRoutes");
const complaintDetails = require("./routes/complaintRoutes");
const { scheduleReminders } = require("./utils/reminderServices");
const { scheduleDueUpdation } = require("./utils/dueUpdation");

// const { verifyToken } = require("./midderware/auth");

const app = express();
const port = process.env.PORT || 3306;

scheduleReminders();
scheduleDueUpdation();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/userDetails/login", userDetailsController.loginUser);

// Global authentication middleware
// (Commented because of issue from frontend)
 //app.use(verifyToken);

app.use("/api/employee", employeeDetails);
app.use("/api/workGroup", workGroup);
app.use("/api/designation", designationDetails);
app.use("/api/department", departmentDetails);
app.use("/api/userDetails", userDetails);
app.use("/api/assignmentDetails", assignmentDetails);
app.use("/api/taskDetails", taskDetails);
app.use("/api/alertDetails",alertDetails);
app.use("/api/complaintDetails",complaintDetails);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});