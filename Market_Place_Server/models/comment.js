const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    product_id: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    seller_id: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    bider_id: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      required: true,
      type: String,
    },
    phone_number: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Comment", commentSchema);