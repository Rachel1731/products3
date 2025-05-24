//CREATE products3 tests

pm.test("Response status code is 404", function () {
  pm.response.to.have.status(404);
});

// Updated response time to be less than 500ms
pm.test("Response time is less than 500ms", function () {
  pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test(
  "Response has the required fields - name, item, and price",
  function () {
    const responseData = pm.response.text();

    pm.expect(responseData).to.include("name");
    pm.expect(responseData).to.include("item");
    pm.expect(responseData).to.include("price");
  }
);

pm.test("Name, item, and price are non-empty strings", function () {
  const responseData = pm.response.text();

  pm.expect(responseData)
    .to.be.a("string")
    .and.to.have.lengthOf.at.least(
      1,
      "Name, item, and price should not be empty"
    );
});

pm.test("Content-Type header is text/html", function () {
  pm.expect(pm.response.headers.get("Content-Type")).to.include("text/html");
});

//CREATE products3 data

//: has been changed to ; in tests to prevent errors

{
  ("productName");
  "Wireless Headphones", "description";
  "Noise-cancelling wireless headphones with Bluetooth 5.0.", "price";
  199.99, "category";
  "Electronics", "stock";
  50;
}

//INDEX products3

app.get("/products3", async (req, res) => {
  try {
    const foundProducts = await Product.find();

    if (!foundProducts || foundProducts.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json(foundProducts);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Error retrieving products" });
  }
});

//GET products3 data

{
  ("status");
  "success", "message";
  "Products retrieved successfully", "data";
  {
    ("products");
    [
      {
        id: "68320d9e328130afca6b57cc",
        name: "Wireless Mouse",
        price: 29.99,
        category: "Electronics",
        description: "Ergonomic wireless mouse with USB receiver.",
      },
      {
        id: "68320d9e328130afca6b57cc",
        name: "Bluetooth Headphones",
        price: 89.99,
        category: "Audio",
        description: "Over-ear headphones with noise cancellation.",
      },
    ],
      "pagination";
    {
      ("total");
      100, "limit";
      10, "skip";
      0;
    }
  }
}

//DELETE products3

app.delete("/products3/:productId", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.productId
    );

    if (!deletedProduct) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while deleting the product",
    });
  }
});

//DELETE data

//At first I kept getting these

//{
//"status": "error",
//"message": "An error occurred while deleting the product. Please try again later."
//}

//{
//"status": "error",
//"message": "Product not found"
//}

{
  ("status");
  "success", "message";
  "Product deleted successfully", "data";
  {
    ("id");
    "68320d9e328130afca6b57cc", "name";
    "Wireless Mouse", "price";
    29.99, "category";
    "Electronics", "description";
    ("Ergonomic wireless mouse with USB receiver.");
  }
}

//UPDATE products3

//app.put('/products3/:productId', async (req, res) => {
//try {
const updatedProduct = await Product.findByIdAndUpdate(
  req.params.productId,
  req.body,
  { new: true }
);

if (!updatedProduct) {
  return res.status(404).json({
    status: "error",
    message: "Product not found",
  });
}

res.status(200).json({
  status: "success",
  message: "Product updated successfully",
  data: updatedProduct,
});
//} catch (error) {
//console.error('Error updating product:', error);
//res.status(500).json({
//status: 'error',
// message: 'An error occurred while updating the product'
//});
//}
//});
