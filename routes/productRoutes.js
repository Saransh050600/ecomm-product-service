const express = require("express");
const upload = require("../middlewares/upload"); 
const {
  getAllProducts,
  addProduct,
  deleteProduct,
  getProductById, 
} = require("../controllers/productController");
const { authenticate, authorizeAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  authenticate,
  authorizeAdmin,
  upload.single("image"),
  addProduct
);
router.delete("/:id", authenticate, authorizeAdmin, deleteProduct);

module.exports = router;