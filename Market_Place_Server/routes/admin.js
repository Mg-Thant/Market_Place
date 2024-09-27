const express = require("express");
const { body } = require("express-validator");

const adminController = require("../controllers/admin");
const isAdminMiddleware = require("../middlewares/isAdmin");
const checkTokenMiddleware = require("../middlewares/isLogin");

const router = express.Router();

// GET /admin/products
router.get(
  "/products",
  checkTokenMiddleware,
  isAdminMiddleware,
  adminController.getProducts
);

// POST /admin/product-approve/:id
router.post(
  "/product-approve/:id",
  checkTokenMiddleware,
  isAdminMiddleware,
  adminController.handleProduct
);

// POST /admin/product-reject/:id
router.post(
  "/product-reject/:id",
  checkTokenMiddleware,
  isAdminMiddleware,
  adminController.handleProduct
);

// POST /admin/product-rollBack/:id
router.post(
  "/product-rollBack/:id",
  checkTokenMiddleware,
  isAdminMiddleware,
  adminController.handleProduct
);

// GET /admin/users
router.get(
  "/users",
  checkTokenMiddleware,
  isAdminMiddleware,
  adminController.getUsers
);

// POST  /admin/ban-user
router.post(
  "/ban-user/:id",
  checkTokenMiddleware,
  isAdminMiddleware,
  adminController.handleUserStatus
);

// POST /admin/unban-user/:id
router.post(
  "/unban-user/:id",
  checkTokenMiddleware,
  isAdminMiddleware,
  adminController.handleUserStatus
);

module.exports = router;
