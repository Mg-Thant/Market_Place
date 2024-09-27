const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId).select("role");
    if(user.role !== "admin") {
        throw new Error("Unauthorized access")
    }
    req.userId = userId;
    next();
  } catch (err) {
    return res.status(401).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
