// Import required modules
const jwt = require("jsonwebtoken");
const { queryAsync } = require("../db");

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }
  // Extract token from cookies
  const token = cookies.split("=")[1];

  // Check if token is missing
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const query = `
      SELECT e.*, u.Role
      FROM tb_employee e
      JOIN tb_userdetails u ON e.EmployeeID = u.EmployeeID
      WHERE e.EmployeeID = ?
    `;
    const results = await queryAsync(query, [verifyUser.EmployeeID]);

    if (results.length === 0) {
      return res.status(401).json({ error: "Unauthorized - User does not exist" });
    }

    req.authenticatedUser = results[0];
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      console.error("JWT Error:", error);
      return res.status(403).json({ error: "Forbidden - Invalid token" });
    }
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Middleware for user authorization
const authorizeUser = (req, res, next) => {
  const isAdmin = req.authenticatedUser && req.authenticatedUser.Role === 'Admin';

  if (isAdmin) {
    // User is authorized, proceed to the next middleware or route handler
    next();
  } else {
    res.status(403).json({ error: "You are not authorized to access this route" });
  }
};

module.exports = { verifyToken, authenticateUser, authorizeUser };
