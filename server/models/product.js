const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 100000,
    },
    price: {
      type: Number,
      required: true,
      maxlength: 225,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    shipping: {
      type: Boolean,
      required: true,
    },
    available: {
      required: true,
      type: Boolean,
    },
    wood: {
      type: Schema.Types.ObjectId,
      ref: "Wood",
      required: true,
    },
    frets: {
      required: true,
      type: Number,
    },
    sold: {
      type: Number,
      maxlength: 255,
      default: 0,
    },
    publish: {
      type: Boolean,
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
