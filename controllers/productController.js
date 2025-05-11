// productController.js
const Product = require("../models/Product");
const { publishProductEvent } = require("../rabbitmq/publisher");

exports.getAllProducts = async (req, res) => {
  try {
    const { category, page = 1, limit = 10, search } = req.query;

    // Validate pagination
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    if (isNaN(pageNumber) || pageNumber <= 0) {
      return res.status(400).json({ error: "Invalid page number." });
    }
    if (isNaN(limitNumber) || limitNumber <= 0) {
      return res.status(400).json({ error: "Invalid limit number." });
    }

    // Filter query
    const query = {};
    if (category && category !== "All") query.category = category;
    if (search) query.name = { $regex: search, $options: "i" };

    const products = await Product.find(query)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);
    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    if (!name || !description || !price || !category || !stock || !req.file) {
      return res.status(400).json({ error: "All fields are required, including the image." });
    }

    const imagePath = req.file.path.replace(/\\+/g, '/');
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      image: imagePath, 
    });

    await product.save();
    await publishProductEvent({ type: "PRODUCT_CREATED", product });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product." });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    await publishProductEvent({ type: "PRODUCT_DELETED", id });
    res.json({ message: "Product deleted successfully", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(prod);
  } catch (err) {
    console.error("getProductById error:", err);
    res.status(500).json({ message: "Server error fetching product" });
  }
};

