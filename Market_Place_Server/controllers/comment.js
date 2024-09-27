const { validationResult } = require("express-validator");

const Comment = require("../models/comment");

exports.savedNewComment = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      isSuccess: false,
      message: "Validation Failed!!!",
    });
  }

  try {
    const { comment, phone, product_id, seller_id, bider_id } = req.body;

    if(seller_id === bider_id) {
      throw new Error("Authorization Failed!!!")
    }

    await Comment.create({
      product_id,
      seller_id,
      bider_id,
      comment,
      phone_number: phone,
    });

    return res.status(201).json({
      isSuccess: true,
      message: "Your comment has placed!!!",
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};

exports.getAllComment = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const comments = await Comment.find({ product_id: productId })
      .populate("bider_id", "username")
      .select("comment phone_number createdAt")
      .sort({ createdAt: -1 });

    if (comments.length === 0) {
      throw new Error("No comment found for this product!!!");
    }

    return res.status(200).json({
      isSuccess: true,
      comments,
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
    });
  }
};
