const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: String,
    },
    category: {
      required: true,
      type: String,
    },
    usedOn: {
      required: true,
      type: String,
    },
    details: {
      type: Array,
    },
    seller: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "pending",
    },
    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
