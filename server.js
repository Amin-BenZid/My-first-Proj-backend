const express = require("express");
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
// dotenv
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const URL = DB_URL + DB_NAME;
const SR_PORT = process.env.SR_PORT || 5000;

// connecting to database
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS, POST, PUT, PATCH , DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// home page
app.get("/api/", (req, res) => {
  res.send({ welcome: "welcome" });
});

// register
const newUserRoute = require("./Routes/newUserRoute");
app.use("/api/register", newUserRoute);

//Login
const findUserRoute = require("./Routes/loginUserRoute");
app.use("/api/login", findUserRoute);

//Shop
const shop = require("./Routes/productsRoute");
app.use("/api/products", shop);

// Orders
const orders = require("./Routes/ordersRoute");
app.use("/api/orders", orders);

// Admin
const admin = require("./Routes/adminRoute");
app.use("/api/admin", admin);

// connecting to server
app.listen(SR_PORT, () => {
  console.log("Connected ! PORT =", SR_PORT);
});
