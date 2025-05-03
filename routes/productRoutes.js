const express = require("express");
const upload = require("../middlewares/upload"); 
const {
  getAllProducts,
  addProduct,
  deleteProduct,
} = require("../controllers/productController");
const { authenticate, authorizeAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", getAllProducts);
router.post(
  "/",
  authenticate,
  authorizeAdmin,
  upload.single("image"),
  addProduct
);
router.delete("/:id", authenticate, authorizeAdmin, deleteProduct);

module.exports = router;