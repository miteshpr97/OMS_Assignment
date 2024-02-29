const jwt = require("jsonwebtoken");
const db = require("../db");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    try {
      // Verify the JWT token
      const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

      // Query to check if the user exists in the database
      const query = "SELECT * FROM tb_employee WHERE EmployeeID = ?";

      // Assuming db.query returns a Promise
      db.query(query, [verifyUser.EmployeeID], (err, results) => {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        // If the user is not found, return Unauthorized
        if (results.length === 0) {
          res.status(401).json({ error: "Unauthorized" });
          return;
        }
        // You might want to store the user information in the request object
        req.authenticatedUser = results[0];
        console.log(req.authenticatedUser);
      });
    } catch (verificationError) {
      // Token verification failed, return Unauthorized
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    next();
  } catch (error) {
    // Internal Server Error
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function generateToken(email, Password_resetUsed) {
  return jwt.sign({ email, Password_resetUsed }, process.env.SECRET_KEY, {
    expiresIn: "15h",
  });
}

module.exports = { generateToken, authenticateUser };
