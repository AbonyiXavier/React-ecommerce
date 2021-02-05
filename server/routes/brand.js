const router = require("express").Router();
const Brand = require("../models/brand");
const verifyToken = require("../middlewares/verify-token");
const isAdmin = require("../middlewares/isAdmin");

router.post("/product/brand", [verifyToken, isAdmin], async (req, res) => {
  try {
    let brand = new Brand();
    brand.name = req.body.name;

    await brand.save();
    res.json({
      brand,
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

router.get("/product/brands", async (req, res) => {
  try {
    let brand = await Brand.find({});
    if (!brand) {
      return res.status(400).json({
        status: false,
        message: "brand not found",
      });
    }
    res.status(200).json({
      status: true,
      brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
