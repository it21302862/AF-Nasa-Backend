const jwt = require("jsonwebtoken");

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
  // Extracting token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // Checking if token exists
  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  // Verifying the token using the secret key
  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
