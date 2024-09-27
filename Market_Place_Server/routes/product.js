const express = require("express");
const { body } = require("express-validator");

const checkTokenMiddleware = require("../middlewares/isLogin");
const productController = require("../controllers/product");
const commentController = require("../controllers/comment");
const notificationController = require("../controllers/notification");

const router = express.Router();

// POST /create-product
router.post(
  "/create-product",
  checkTokenMiddleware,
  [
    body("product_name")
      .trim()
      .notEmpty()
      .withMessage("Product name is required!!!"),
    body("product_description")
      .trim()
      .notEmpty()
      .withMessage("Product description is required!!!"),
    body("product_price")
      .trim()
      .notEmpty()
      .withMessage("Product price is required"),
    body("product_category")
      .trim()
      .notEmpty()
      .withMessage("Product category is required"),
    body("product_used_on")
      .trim()
      .notEmpty()
      .withMessage("Product usedOn is required"),
    body("product_details")
      .isArray()
      .withMessage("Product details must be array"),
  ],
  productController.createProduct
);

// GET /products
router.get("/products", checkTokenMiddleware, productController.getAllProducts);

// GET /product/:id
router.get(
  "/product/:id",
  checkTokenMiddleware,
  productController.getOldDataProduct
);

// POST /update-product
router.post(
  "/update-product",
  checkTokenMiddleware,
  [
    body("product_name")
      .trim()
      .notEmpty()
      .withMessage("Product name is required!!!"),
    body("product_description")
      .trim()
      .notEmpty()
      .withMessage("Product description is required!!!"),
    body("product_price")
      .trim()
      .notEmpty()
      .withMessage("Product price is required"),
    body("product_category")
      .trim()
      .notEmpty()
      .withMessage("Product category is required"),
    body("product_used_on")
      .trim()
      .notEmpty()
      .withMessage("Product usedOn is required"),
    body("product_details")
      .isArray()
      .withMessage("Product details must be array"),
  ],
  productController.updateProduct
);

// DELETE /product/:id
router.delete(
  "/product/:id",
  checkTokenMiddleware,
  productController.deleteProduct
);

// POST /upload-image
router.post(
  "/upload-image",
  checkTokenMiddleware,
  productController.uploadProductImages
);

// GET /product-images/:id
router.get(
  "/product-images/:id",
  checkTokenMiddleware,
  productController.getProductImage
);

// DELETE /product/images/destroy/:productId/:imgDelUrl
router.delete(
  "/product/images/destroy/:productId/:imgDelUrl",
  checkTokenMiddleware,
  productController.deleteSavedProductImages
);

// POST /saved-products/:id
router.post(
  "/saved-products/:id",
  checkTokenMiddleware,
  productController.savedProducts
);

// DELETE /unsaved-products/:id
router.delete(
  "/unsaved-products/:id",
  checkTokenMiddleware,
  productController.unSavedProducts
);

// GET /unsaved-product
router.get(
  "/saved-product",
  checkTokenMiddleware,
  productController.getSavedProducts
);

// POST /add-comment
router.post(
  "/add-comment",
  checkTokenMiddleware,
  [
    body("comment").trim().notEmpty().withMessage("Comment is required"),
    body("phone").trim().notEmpty().withMessage("Phone number is required"),
  ],
  commentController.savedNewComment
);

// GET /comments/:productId
router.get("/comments/:productId", commentController.getAllComment);

// POST /notify
router.post(
  "/notify",
  checkTokenMiddleware,
  notificationController.pushNotification
);

// GET /notifications
router.get(
  "/notifications",
  checkTokenMiddleware,
  notificationController.getAllNoti
);

// GET /notifications-read/:id
router.get(
  "/notifications-read/:id",
  checkTokenMiddleware,
  notificationController.markAsRead
);

// delete /notifications-delOne/:id
router.delete(
  "/notifications-delOne/:id",
  checkTokenMiddleware,
  notificationController.deleteNoti
);

// delete /notifications-delAll
router.delete(
  "/notifications-delAll",
  checkTokenMiddleware,
  notificationController.deleteAllNoti
);

module.exports = router;
