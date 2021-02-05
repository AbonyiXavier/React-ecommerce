const router = require("express").Router();
const Wood = require("../models/wood");
const verifyToken = require("../middlewares/verify-token");
const isAdmin = require("../middlewares/isAdmin");

router.post("/product/wood", [verifyToken], async (req, res) => {
  try {
    let wood = new Wood();
    wood.name = req.body.name;

    await wood.save();
    res.json({
      wood,
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

router.get("/product/woods", async (req, res) => {
  try {
    let wood = await Wood.find({});
    if (!wood) {
      return res.status(400).json({
        status: false,
        message: "wood not found",
      });
    }
    res.status(200).json({
      status: true,
      wood,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
