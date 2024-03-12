const jwt = require("jsonwebtoken");
const { queryAsync } = require("../db");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    try {
      // Verify the JWT token
      const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

      // Query to check if the user exists in the database
      const query = `
        SELECT e.*, u.Role
        FROM tb_employee e
        JOIN tb_userdetails u ON e.EmployeeID = u.EmployeeID
        WHERE e.EmployeeID = ?
      `;

      try {
        // Use queryAsync function to handle the database query asynchronously
        const results = await queryAsync(query, [verifyUser.EmployeeID]);

        // If the user is not found, return Unauthorized
        if (results.length === 0) {
          console.log("User not found");
          return res.status(401).json({ error: "Unauthorized" });
        }

        // You might want to store the user information in the request object
        req.authenticatedUser = results[0];
        console.log("Authenticated User:", req.authenticatedUser);
        next();
      } catch (queryError) {
        console.error("Error executing query:", queryError);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } catch (verificationError) {
      console.error("Token Verification Error:", verificationError);
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Authorization middleware
const authorizeUser = (req, res, next) => {

  const isAdmin = req.authenticatedUser && req.authenticatedUser.Role === 'Admin';
  console.log(req.authenticatedUser.Role === 'Admin');
  console.log(req.authenticatedUser.Role);

  if (isAdmin) {
    // User is authorized, proceed to the next middleware or route handler
    next();
  } else {
    res.status(403).json({ error: "You are not authorized to access this route" });
  }
};

function generateToken(email, Password_resetUsed) {
  return jwt.sign({ email, Password_resetUsed }, process.env.SECRET_KEY, {
    expiresIn: "15h",
  });
}

module.exports = { generateToken, authenticateUser, authorizeUser };
