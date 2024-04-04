const { queryAsync } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../midderware/auth");
const { sendEmailForPasswordChange , sendEmailForUserCredentials } = require("../utils/emailServices");
// const nodemailer = require("nodemailer");

// inserting user details

// exports.addUserDetails = async (req, res) => {
//   const { EmployeeID, Role, Username, Password, confirm_password } = req.body;

//   if (Password !== confirm_password) {
//     return res.status(400).json({ error: "Passwords do not match" });
//   }

//   try {
//     const hashedPassword = await bcrypt.hash(Password, 10);
//     const query =
//       "INSERT INTO tb_userdetails (EmployeeID, Role, Username, Password) VALUES (?, ?, ?, ?)";
//     const results = await queryAsync(query, [
//       EmployeeID,
//       Role,
//       Username,
//       hashedPassword,
//     ]);

//     console.log("User registered successfully");
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error hashing password:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

exports.addUserDetails = async (req, res) => {
  const { EmployeeID, Role, Username, Password, confirm_password } = req.body;

  if (Password !== confirm_password) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    const query =
      "INSERT INTO tb_userdetails (EmployeeID, Role, Username, Password) VALUES (?, ?, ?, ?)";
    const results = await queryAsync(query, [
      EmployeeID,
      Role,
      Username,
      hashedPassword,
    ]);

    await sendEmailForUserCredentials(Username,EmployeeID,Password);

    console.log("User registered successfully");
    res.status(201).json({ message: "User registered successfully" });

    // Sending email to the user email to his EmployeeID and Password
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "miteshpradhan97@gmail.com",
    //     pass: "yliu enkl droc zmdz",
    //   },
    // });

    // const mailOptions = {
    //   from: "miteshpradhan97@gmail.com",
    //   to: Username,
    //   subject: "Registration Successful",
    //   text: `Dear ${Username},\n\nThank you for registering with us.\n\nYour Employee ID: ${EmployeeID}\nYour Password: ${Password}\n\nBest regards,\nYour OWM Logistics`,
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.error("Error sending email:", error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });

  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// getting all user details

exports.getAllUserDetails = async (req, res) => {
  try {
    const query = "SELECT * FROM tb_userdetails";
    const results = await queryAsync(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// updating user details

exports.updateUserDetails = async (req, res) => {
  const employeeId = req.params.EmployeeID;
  const updatedUserDetails = req.body;

  // Hash the password if it is provided in the request body
  if (updatedUserDetails.Password) {
    updatedUserDetails.Password = await bcrypt.hash(
      updatedUserDetails.Password,
      10
    );
  }

  const updateQuery = "UPDATE tb_userdetails SET ? WHERE EmployeeID = ?";

  try {
    const results = await queryAsync(updateQuery, [
      updatedUserDetails,
      employeeId,
    ]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Employee not found" });
    } else if (results.affectedRows > 0 && results.changedRows === 0) {
      res
        .status(200)
        .json({ message: "Employee's Data is up to date already" });
    } else {
      res
        .status(200)
        .json({ message: "Employee details updated successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Deleting user details

exports.deleteUserDetails = async (req, res) => {
  const employeeId = req.params.EmployeeID;
  const deleteQuery = "DELETE FROM tb_userdetails WHERE EmployeeID = ?";

  try {
    const results = await queryAsync(deleteQuery, [employeeId]);

    if (results.affectedRows === 0) {
      res.status(404).json({ error: "Employee details not found" });
    } else {
      res
        .status(200)
        .json({ message: "Selected employee details deleted successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// login user

exports.loginUser = async (req, res) => {
  const { EmployeeID, Password } = req.body;

  const query =
    "SELECT tb_userdetails.*, tb_employee.FirstName, tb_employee.LastName, tb_employee.Employee_Profile FROM tb_userdetails INNER JOIN tb_employee ON tb_userdetails.EmployeeID = tb_employee.EmployeeID WHERE tb_userdetails.EmployeeID = ?";

  try {
    const results = await queryAsync(query, [EmployeeID]);

    if (results.length > 0) {
      const user = results[0];

      // Compare the provided password with the hashed password from the database
      const passwordMatch = await bcrypt.compare(Password, user.Password);

      if (passwordMatch) {
        // Passwords match, generate JWT token
        const token = jwt.sign(
          {
            Username: user.Username,
            EmployeeID: user.EmployeeID,
            Role: user.Role,
          },
          process.env.SECRET_KEY || SECRET_KEY,
          { expiresIn: "1h" }
        );
        res.cookie("token", token, { httpOnly: true });

        // Avoid logging sensitive information
        console.log("User authenticated successfully");

        res.json({
          message: "Login successful",
          user: {
            EmployeeID: user.EmployeeID,
            Username: user.Username,
            Role: user.Role,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Employee_Profile: user.Employee_Profile,
          },
          token,
        });
      } else {
        // Passwords do not match
        console.log("Invalid password");
        res.status(401).json({ error: "Invalid password" });
      }
    } else {
      // User not found
      console.log("Employee not found");
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// logout user

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// forget password

exports.forgetPassword = async (req, res) => {
  const userName = req.body.Username;

  const checkEmailQuery =
    "SELECT Username, Password_resetUsed FROM tb_userdetails WHERE Username = ?;";

  try {
    const results = await queryAsync(checkEmailQuery, [userName]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Username not found" });
    }

    const Password_resetUsed = results[0].Password_resetUsed;
    const token = generateToken(userName, Password_resetUsed);

    sendEmailForPasswordChange(userName, token)
      .then(() => res.json({ message: "Token sent to email" }))
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Error sending email" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// reset password

exports.resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    console.log(token);
    const newPassword = req.body.newPassword;
    console.log(newPassword);

    // Hash the new password
    const updatedPassword = await bcrypt.hash(newPassword, 10);

    // Verify the user using the token
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyUser);

    const checkEmailQuery =
      "SELECT Username, Password_resetUsed FROM tb_userdetails WHERE Username = ?;";

    const results = await queryAsync(checkEmailQuery, [verifyUser.userName]);
    console.log(results);

    // Check if the token has a valid version
    if (verifyUser.Password_resetUsed !== results[0].Password_resetUsed) {
      return res
        .status(401)
        .json({ message: "Token is invalid due to password change" });
    }

    const updatePasswordQuery =
      "UPDATE tb_userdetails SET Password = ?,Password_resetUsed = Password_resetUsed + 1 WHERE Username = ?";

    const updateResults = await queryAsync(updatePasswordQuery, [
      updatedPassword,
      verifyUser.userName,
    ]);


    console.log(updateResults);

    res.status(200).json({message: "Password reset successfully" });
  } catch (error) {
    console.error(error);

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};
