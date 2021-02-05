const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    cart: {
      type: Array,
      default: [],
    },
    history: {
      type: Array,
      default: [],
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: Number,
      //   enum: ["Admin", "User"],
      default: 0,
    },
    token: {
      type: String,
      required: false,
    },

    resetPasswordExpires: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

UserSchema.methods.generatePasswordReset = function () {
  let payload = {
    id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    password: this.password,
    role: this.role,
  };
  this.resetPasswordToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: 3600, // 1 hour
  });
  // this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

module.exports = mongoose.model("User", UserSchema);
