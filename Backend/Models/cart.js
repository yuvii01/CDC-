 const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user_id:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    pId:{
        type: mongoose.Schema.ObjectId,
        ref: "Product",
    },
    qty:{
        type: Number,
        default: 1,
    }
  },
  {
    timestamps: true,
  }
);

const cart = mongoose.model("cart", cartSchema);
module.exports = cart;
