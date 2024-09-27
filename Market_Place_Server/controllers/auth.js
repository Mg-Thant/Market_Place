const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.register = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      isSuccess: false,
      message: errors.array()[0],
    });
  }

  const { name, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Error("User already exists");
      }
      return User.findOne({ username: name });
    })
    .then((user) => {
      if (user) {
        throw new Error("Username already exists");
      }
      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => {
      return User.create({
        username: name,
        email,
        password: hashedPassword,
      });
    })
    .then(() => {
      return res.status(201).json({
        isSuccess: true,
        message: "User has created!!!",
      });
    })
    .catch((err) => {
      if (err.message === "User already exists") {
        return res.status(409).json({
          isSuccess: false,
          message: err.message,
        });
      } else {
        return res.status(500).json({
          isSuccess: false,
          message: "Internal server error",
        });
      }
    });
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    return res.status(400).json({
      isSuccess: false,
      message: errors.array()[0],
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email doesn't exits!!!");
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw new Error("Invalid user credentials!!!");
    }
    
    if(user.status === "ban") {
      throw new Error("User has banned!!!");
    }

    const jwt_token = jwt.sign({ userID: user._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      isSuccess: true,
      message: "Login success",
      token: jwt_token,
    });
  } catch (err) {
    return res.status(401).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.checkUserToken = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select(
      "username email role"
    );
    if (!user) {
      throw new Error("Unauthorized error");
    }
    return res.status(200).json({
      isSuccess: true,
      message: "User is authorized",
      userDoc: user,
    });
  } catch (err) {
    return res.status(401).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
