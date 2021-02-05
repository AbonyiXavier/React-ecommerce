const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log("my err", err);
    } else {
      console.log("Connected to the database");
    }
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const userRoutes = require("./routes/user");
const brandRoutes = require("./routes/brand");
const woodRoutes = require("./routes/wood");
const productRoutes = require("./routes/product");

app.use("/api", userRoutes);
app.use("/api", brandRoutes);
app.use("/api", woodRoutes);
app.use("/api", productRoutes);

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
