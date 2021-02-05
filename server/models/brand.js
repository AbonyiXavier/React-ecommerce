const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      maxlength: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", BrandSchema);
