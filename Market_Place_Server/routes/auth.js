const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth");
const checkTokenMiddleware = require("../middlewares/isLogin");

const router = express.Router();

// POST /register
router.post(
  "/register",
  [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must have 3 characters"),
    body("email").trim().isEmail().withMessage("Email must be email format"),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Password must have 4 characters"),
  ],
  authController.register
);

// POST /login
router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Email must be email format"),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Password must have 4 characters"),
  ],
  authController.login
);

// GET check user token /check-token
router.get("/check-token", checkTokenMiddleware, authController.checkUserToken);

module.exports = router;
