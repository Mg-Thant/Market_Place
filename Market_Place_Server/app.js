const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParesr = require("body-parser");
const cors = require("cors");
const multer = require("multer");
dotenv.config();

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const adminRoutes = require("./routes/admin");
const publicRoutes = require("./routes/public");

const app = express();

const storageConfigure = multer.diskStorage({
  filename: (req, file, cb) => {
    const suffix = Date.now() + "-" + Math.round(Math.random() * "1e9");
    cb(null, suffix + "-" + file.originalname);
  },
});

const fileFilterConfigure = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, undefined);
  }
};

app.use(cors());
app.use(bodyParesr.json());
app.use(
  multer({ storage: storageConfigure, fileFilter: fileFilterConfigure }).array(
    "product_images"
  )
);

app.use(authRoutes);
app.use(productRoutes);
app.use("/admin", adminRoutes);
app.use("/api", publicRoutes);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  app.listen(4000);
  console.log("Database connected and server is running on port 4000");
});
