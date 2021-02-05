const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verify-token");

const dotenv = require("dotenv");
dotenv.config();

router.post("/users/register", async (req, res) => {
  try {
    const { email } = req.body;
    // const Email = email.toLowerCase();
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).send({
        message: "Email already exists",
      });
    }

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new User
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });
    const newUser = await user.save();
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
      expiresIn: 604800, // 1 week
    });
    // await sendVerificationEmail(Email);
    res.cookie("auth_token", token);
    res.json({
      status: true,
      message: "User successfully registered",
      newUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// LOGIN
router.post("/users/login", async (req, res) => {
  try {
    // Checking if the email exist
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: "Email is not found",
      });
    }
    // Check if Password is correct or not
    const match = await bcrypt.compare(password, user.password);

    // Create and assign token
    if (match) {
      const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          cart: user.cart,
          history: user.history,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: 604800, // 1 week
        }
      );
      res.cookie("auth_token", token);
      res.header("authorization", token).status(201).json({
        status: true,
        token,
        message: "logged in!",
        user,
      });
    }
    if (!match) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Auth routes
router.get("/users/auth", verifyToken, async (req, res) => {
  res.status(200).json({
    isAdmin: req.decoded.role === 0 ? false : true,
    email: req.decoded.email,
    firstName: req.decoded.firstName,
    lastName: req.decoded.lastName,
    lastName: req.decoded.lastName,
    cart: req.decoded.cart,
    history: req.decoded.history,
    token: req.decoded.token,
  });
});
router.get("/users/logout", verifyToken, async (req, res) => {
  await User.findOneAndUpdate(
    { id: req.decoded._id }
    // { token: "" }
  );
  res.clearCookie("auth_token");
  res.status(200).json({
    status: true,
    message: "log out successfully",
  });
});

module.exports = router;
