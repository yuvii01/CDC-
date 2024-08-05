const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      maxLength: 50,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      maxLenght: 50,
    },
    image: {
      type:String,
      required: true,
      maxLength: 200,
      // default:null,
    },
    status: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category",categorySchema);
module.exports = Category;