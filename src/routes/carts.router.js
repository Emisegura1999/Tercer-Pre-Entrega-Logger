const express = require("express");
const checkUserRole = require("../middleware/checkrole.js");
const CartController = require("../controllers/cart.controller.js");

const router = express.Router();
const cart = new CartController();

router.post("/", cart.createCart);
router.get("/:cid", checkUserRole(['usuario']), cart.getProductsToCart);
router.post("/:cid/product/:pid", checkUserRole(['usuario']), cart.addProductsToCart);
router.delete('/:cid/product/:pid', checkUserRole(['usuario']), cart.deleteProductToCart);
router.put('/:cid', checkUserRole(['usuario']), cart.updateProductsToCart);
router.put('/:cid/product/:pid', checkUserRole(['usuario']), cart.updateQuantity);
router.delete('/:cid', checkUserRole(['usuario']), cart.emptyCart);
router.post('/:cid/purchase', checkUserRole(['usuario']), cart.finishPurchase);

module.exports = router;
