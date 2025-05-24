const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  item: Number,
  price: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
