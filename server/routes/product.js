const router = require("express").Router();
const Product = require("../models/product");
const verifyToken = require("../middlewares/verify-token");
const isAdmin = require("../middlewares/isAdmin");
const mongoose = require("mongoose");

router.post("/product/article", [verifyToken], async (req, res) => {
  try {
    let product = new Product(req.body);
    await product.save();
    res.json({
      product,
      status: true,
      message: "Successfully saved",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/product/articles_by_id", async (req, res) => {
  try {
    let type = req.query.type;
    let items = req.query.id;

    if (type === "array") {
      let ids = req.query.id.split(",");
      items = [];
      items = ids.map((item) => {
        return mongoose.Types.ObjectId(item);
      });
    }
    const docs = await Product.find({ _id: { $in: items } })
      .populate("brand wood")
      // .populate("wood")
      .exec();
    return res.status(200).send(docs);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//BY ARRIVAL
// articles?sortBy=createdAt&order=desc&limit=2

//BY SELL
// articles?sortBy=sold&order=desc&limit=100
router.get("/product/articles", async (req, res) => {
  try {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    let product = await Product.find({})
      .populate("brand wood")
      // .populate("wood")
      .sort([[sortBy, order]])
      .limit(limit)
      .exec();
    if (!product) {
      return res.status(400).json({
        status: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
