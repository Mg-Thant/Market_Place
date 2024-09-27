const { Schema, model } = require("mongoose");

const savedProductSchema = new Schema(
  {
    user_id: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("SavedProduct", savedProductSchema);
