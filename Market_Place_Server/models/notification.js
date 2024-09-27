const { Schema, model } = require("mongoose");

const notificationSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    comment: {
      required: true,
      type: String,
    },
    product_id: {
      required: true,
      type: String,
    },
    owner_id: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    phone_number: {
      required: true,
      type: String,
    },
    isRead: {
      default: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = model("Notification", notificationSchema);
