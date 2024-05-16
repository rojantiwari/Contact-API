const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, "rojan123", (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error("User is not authorized");
        }
        req.user = decoded.user;
        next();
      });

      if(!token){
        res.status(401);
        throw new Error("User is not authorized");
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error ", error: error.message });
  }
});

module.exports = {validateToken}
