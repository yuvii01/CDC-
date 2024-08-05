const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    shipping_details: {
      type: Object,
      required: true,
    },
    product_details: [
      {
        type: Object,
        required: true,
      },
    ],
    order_total: {
      type: Number,
      required: true,
    },
    payment_mode: {
      type: Number,
      enum: [1, 2],
      required: true,
    },
    order_status: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7], 
      default: 1,
    },
    transaction_id: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
  },
  { timestamps: true }
);

// Create the Order model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
