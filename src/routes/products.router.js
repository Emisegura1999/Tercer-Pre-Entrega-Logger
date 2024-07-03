const express = require("express");
const checkUserRole = require("../middleware/checkrole.js");
const ProductController = require("../controllers/product.controller.js");

const router = express.Router();
const product = new ProductController(); 

router.get("/", checkUserRole(['usuario']), product.getProducts);
router.post("/", checkUserRole(['admin']), product.addProduct);
router.put("/:pid", checkUserRole(['admin']), product.updateProduct);
router.delete("/:pid", checkUserRole(['admin']), product.deleteProduct);

module.exports = router;