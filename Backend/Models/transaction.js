const mongoose = require("mongoose");

// Define Transaction Schema
const transactionSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", // Reference to Order model
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: Number,
      enum: [1, 2], // Enum - 1 or 2
      required: true,
    },
    paymentStatus: {
      type: Boolean,
      required: true,
    },
    razorpayResponse: {
      type: Object,
      default: null,
    },
  },
  {
    timeseries: true,
  }
);

// Create Transaction Model
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
  