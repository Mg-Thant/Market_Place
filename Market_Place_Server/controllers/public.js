const { default: mongoose } = require("mongoose");
const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  const page = +req.query.page || 1;
  const postPerPage = +req.query.perPage || 6;

  try {
    const products = await Product.find({ status: "approve" })
      .populate("seller", "username")
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * postPerPage)
      .limit(postPerPage);

    const totalProducts = await Product.find({
      status: "approve",
    }).countDocuments();
    const totalPages = Math.ceil(totalProducts / postPerPage);

    if (!products || products.length == 0) {
      throw new Error("Product not found!!!");
    }

    return res.status(200).json({
      isSuccess: true,
      products,
      totalProducts,
      totalPages,
      currentPage: page,
    });
  } catch (err) {
    return res.status(404).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.getProductDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ProductID!!!");
    }

    const product = await Product.findById(id).populate(
      "seller",
      "username email"
    );

    if (!product) {
      throw new Error("Product not found!!!");
    }
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

exports.getProductsByFilter = async (req, res, next) => {
  const { searchKey, category } = req.query;

  // Create a filter to match products where the name or description includes the searchKey
  const filter = {};
  if (searchKey) {
    filter.name = { $regex: searchKey, $options: "i" }; // Case-insensitive search
  }

  if (category) {
    filter.category = category;
  }

  const products = await Product.find(filter)
    .populate("seller", "username")
    .sort({ createdAt: -1 });

  if (products.length === 0) {
    return res.status(400).json({
      isSuccess: false,
      message: "Product not found",
    });
  }

  return res.status(200).json({
    isSuccess: true,
    products,
  });
};
