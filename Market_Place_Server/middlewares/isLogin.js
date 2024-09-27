const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        isSuccess: false,
        message: "No token provided or invalid format",
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Token is missing");
    }

    const tokenIsMatched = jwt.verify(token, process.env.JWT_KEY);
    req.userId = tokenIsMatched.userID;
    next();
  } catch (err) {
    return res.status(401).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
