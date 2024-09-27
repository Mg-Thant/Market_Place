const Product = require("../models/product");
const User = require("../models/user");

exports.getProducts = async (req, res, next) => {
  const page = +req.query.page || 1;
  const perPage = 10;
  try {
    const products = await Product.find()
      .populate("seller", "username")
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    if (!products) {
      throw new Error("Product not found");
    }
    const totalProducts = await Product.countDocuments();
    const pendingProducts = await Product.find({
      status: "pending",
    }).countDocuments();
    const totalPages = Math.ceil(totalProducts / perPage);

    return res.status(200).json({
      isSuccess: true,
      message: "Product Found!!!",
      products,
      currentPage: page,
      totalPages,
      totalProducts,
      pendingProducts,
    });
  } catch (err) {
    return res.status(404).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.handleProduct = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found!!!");
    }
    if (status == "approve") {
      product.status = "approve";
    } else if (status == "reject") {
      product.status = "reject";
    } else if (status == "pending") {
      product.status = "pending";
    }
    await product.save();

    return res.status(200).json({
      isSuccess: true,
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select("username email role createdAt status")
      .sort({ createdAt: -1 });
    if (!users) {
      throw new Error("Users not found!!!");
    }
    return res.status(200).json({
      isSuccess: true,
      users,
    });
  } catch (err) {
    return res.status(404).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.handleUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blockStatus = req.body.status;

    let user = await User.findById(id);
    if (!user) {
      throw new Error("User not found!!!");
    }
    if (blockStatus === "ban") {
      user.status = "ban";
    } else if (blockStatus === "unban") {
      user.status = "active";
    }
    await user.save();

    return res.status(200).json({
      isSuccess: true,
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
