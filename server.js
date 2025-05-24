const Product = require("./models/products3.js");

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
const cors = require("cors");
app.use(cors());

// Routes go here

// CREATE - POST - /products3
app.post("/products3", async (req, res) => {
  const createdProduct = await Product.create(req.body);
  res.json(createdProduct);
});

// READ - GET - /products3
app.get("/products3", async (req, res) => {
  // test
  const foundProduct = await Product.find();
  res.json(foundProduct);
});

//DELETE -/products3

app.delete("/products3/:productId", async (req, res) => {
  // test
  const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
  res.json(deletedProduct);
});

// UPDATE - PUT - /products3/:productId
app.put("/products3/:productId", async (req, res) => {
  // testing new route
  res.json({ message: `Update route with the param ${req.params.productId}` });
});

//UPDATING NEW PRODUCT

// UPDATE - PUT - /products3/:productId
app.put("/:productId", async (req, res) => {
  // Add query to update a single product
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body
  );
  res.json(updatedProduct);
});

app.listen(3000, () => {
  console.log("The express app is ready!");
});
