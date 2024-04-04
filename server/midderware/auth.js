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
  try {
    const token = req.cookies.token;
    console.log(token);

    // Verify the JWT token
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);

    // Query to check if the user exists in the database
    const query = `
      SELECT e.*, u.Role
      FROM tb_employee e
      JOIN tb_userdetails u ON e.EmployeeID = u.EmployeeID
      WHERE e.EmployeeID = ?
    `;

    // Use queryAsync function to handle the database query asynchronously
    const results = await queryAsync(query, [verifyUser.EmployeeID]);

<<<<<<< HEAD
    // If the user is not found, return Unauthorized
    if (results.length === 0) {
=======
        // If the user is not found, return Unauthorized
        if (results.length === 0) {
          console.log("User not found");
          return res.status(401).json({ error: "Unauthorized" });
        }

        // You might want to store the user information in the request object
        req.authenticatedUser = results[0];
        // console.log("Authenticated User:", req.authenticatedUser);
        next();
      } catch (queryError) {
        console.error("Error executing query:", queryError);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } catch (verificationError) {
      console.error("Token Verification Error:", verificationError);
>>>>>>> c6dfd59a9659ba4e2c5dca5b7336dfcbc46865e7
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Attach user information to the request object
    req.authenticatedUser = results[0];
    next();
  } catch (error) {
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
