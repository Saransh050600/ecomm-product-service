// middlewares/auth.js
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies.accessToken; // Get token from cookies

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token
    req.user = decoded; 
    next(); 
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" }); 
  }
  next(); 
};

module.exports = { authenticate, authorizeAdmin };
