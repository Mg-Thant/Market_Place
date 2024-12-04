const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const Product = require("../models/product");
const SavedProduct = require("../models/savedProducts");

cloudinary.config({
  cloud_name: "dpkugl0tk",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

exports.createProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      isSuccess: false,
      message: errors.array()[0],
    });
  }
  const {
    product_name,
    product_description,
    product_price,
    product_category,
    product_used_on,
    product_details,
  } = req.body;
  try {
    const product = await Product.create({
      name: product_name,
      description: product_description,
      price: product_price,
      category: product_category,
      usedOn: product_used_on,
      details: product_details,
      seller: req.userId,
    });

    return res.status(201).json({
      isSuccess: true,
      message: "Product added to sell list",
      product,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ seller: req.userId }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      isSuccess: true,
      products,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.getOldDataProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    return res.status(200).json({
      isSuccess: true,
      product,
    });
  } catch (err) {
    return res.status(404).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      isSuccess: false,
      message: errors.array()[0],
    });
  }

  try {
    const {
      product_name,
      product_description,
      product_price,
      product_category,
      product_used_on,
      product_details,
      product_id,
      seller_id,
    } = req.body;
    if (req.userId.toString() !== seller_id) {
      throw new Error("Authorized Failed!!!");
    }
    const product = await Product.findOne({ _id: product_id });
    product.name = product_name;
    product.description = product_description;
    product.price = product_price;
    product.category = product_category;
    product.usedOn = product_used_on;
    product.details = product_details;
    product.save();

    return res.status(200).json({
      isSuccess: true,
      message: "Product updated",
      product,
    });
  } catch (err) {
    return res.status(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(404).json({
        isSuccess: false,
        message: "Product not found!!!",
      });
    }

    if (req.userId.toString() !== product.seller.toString()) {
      throw new Error("Authorization Failed");
    }

    if (product.images && Array.isArray(product.images)) {
      const deleteProductImagePromise = product.images.map((img) => {
        const public_id = img.substring(
          img.lastIndexOf("/") + 1,
          img.lastIndexOf(".")
        );
        return new Promise((resolve, reject) => {
          cloudinary.uploader.destroy(public_id, (err, result) => {
            if (err) {
              reject(new Error("Cloudinary photo destory Failed"));
            } else {
              resolve(result);
            }
          });
        });
      });
      await Promise.all(deleteProductImagePromise);
    }

    await Product.findByIdAndDelete(id);
    return res.status(202).json({
      isSuccess: true,
      message: "Product destory",
    });
  } catch (err) {
    return res.stauts(422).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.uploadProductImages = async (req, res, next) => {
  const images = req.files;
  const { product_id } = req.body;
  const secureUrlArray = [];

  const product = await Product.findOne({ _id: product_id });

  if (req.userId.toString() !== product.seller.toString()) {
    return res.status(403).json({ isSuccess: false, message: "Authorization Failed!!!" });
  }

  try {
    // Use Promise.all to upload all images concurrently
    const uploadPromises = images.map((img) =>
      cloudinary.uploader.upload(img.path).then((result) => result.secure_url)
    );

    const uploadedUrls = await Promise.all(uploadPromises);

    // Update the product with uploaded image URLs
    await Product.findByIdAndUpdate(product_id, {
      $push: { images: uploadedUrls },
    });

    return res.status(200).json({
      isSuccess: true,
      message: "Product image uploaded!!!",
      secureUrlArray: uploadedUrls,
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: "Cloud Upload Failed: " + err.message,
    });
  }
};

// exports.uploadProductImages = async (req, res, next) => {
//   const images = req.files;
//   const { product_id } = req.body;
//   let secureUrlArray = [];

//   const product = await Product.findOne({ _id: product_id });

//   if (req.userId.toString() !== product.seller.toString()) {
//     throw new Error("Authorization Failed!!!");
//   }

//   try {
//     images.forEach((img) => {
//       cloudinary.uploader.upload(img.path, async (err, result) => {
//         if (!err) {
//           const secureUrl = result.secure_url;
//           secureUrlArray.push(secureUrl);

//           if (images.length === secureUrlArray.length) {
//             await Product.findByIdAndUpdate(product_id, {
//               $push: { images: secureUrlArray },
//             });
//             return res.status(200).json({
//               isSuccess: true,
//               message: "Product image uploaded!!!",
//               secureUrlArray,
//             });
//           }
//         } else {
//           throw new Error("Cloud Upload Failed!!!");
//         }
//       });
//     });
//   } catch (err) {
//     return res.status(404).json({
//       isSuccess: false,
//       message: err.message,
//     });
//   }
// };

exports.getProductImage = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).select("images seller");

    if (req.userId.toString() !== product.seller.toString()) {
      throw new Error("Authorization Failed!!!");
    }

    if (product.images.length === 0) {
      throw new Error("This product owner has no product images!!!");
    }

    return res.status(200).json({
      isSuccess: true,
      message: "Product image found!!!",
      product,
    });
  } catch (err) {
    return res.status(404).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

// /product/images/destroy/:productId/:imgDelUrl
exports.deleteSavedProductImages = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const decodeImgDelUrl = decodeURIComponent(req.params.imgDelUrl);

    const product = await Product.findOne({ _id: productId });

    if (req.userId.toString() !== product.seller.toString()) {
      throw new Error("Authorization Failed!!!");
    }

    await Product.findByIdAndUpdate(productId, {
      $pull: { images: decodeImgDelUrl },
    });

    const public_id = decodeImgDelUrl.substring(
      decodeImgDelUrl.lastIndexOf("/") + 1,
      decodeImgDelUrl.lastIndexOf(".")
    );

    await cloudinary.uploader.destroy(public_id);

    return res.status(200).json({
      isSuccess: true,
      message: "Image Destroyed!!!",
    });
  } catch (err) {
    return res.status(404).josn({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.savedProducts = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isExistsProduct = await SavedProduct.findOne({
      $and: [{ user_id: req.userId }, { product_id: id }],
    });

    if (isExistsProduct) {
      throw new Error("Product has been saved!!!");
    }

    await SavedProduct.create({
      user_id: req.userId,
      product_id: id,
    });

    return res.status(200).json({
      isSuccess: true,
      message: "Product has saved!",
    });
  } catch (err) {
    return res.status(400).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.unSavedProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    await SavedProduct.findOneAndDelete({ product_id: id });

    return res.status(200).json({
      isSuccess: true,
      message: "Product successfully removed from the saved list!!!",
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.getSavedProducts = async (req, res, next) => {
  try {
    const savedProducts = await SavedProduct.find({ user_id: req.userId })
      .populate("product_id", "name category images description price")
      .sort({ createdAt: -1 });
    if (!savedProducts || savedProducts.lenght === 0) {
      throw new Error("Saved product not found!!!");
    }
    return res.status(200).json({
      isSuccess: true,
      savedProducts,
    });
  } catch (err) {
    return res.status(404).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
