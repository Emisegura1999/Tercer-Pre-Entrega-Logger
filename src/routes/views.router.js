const express = require("express");
const passport = require("passport");

const ViewsController = require("../controllers/view.controller.js");
const checkUserRole = require("../middleware/checkrole.js");

const router = express.Router();
const views = new ViewsController();

router.get("/products", checkUserRole(['usuario']),passport.authenticate('jwt', { session: false }), views.products);
router.get("/", views.login);
router.get("/register", views.register);
router.get("/home", checkUserRole(['usuario']), views.home);
router.get("/realtimeproducts", checkUserRole(['admin']), views.realTimeProducts);
router.get("/chat", checkUserRole(['usuario']), views.chat);
router.get("/carts/:cid", checkUserRole(['usuario']), views.cart);
router.get("/404-not-found", views.notFound);
router.get("/access-denied", views.denied);
router.get("/:cid/purchase", checkUserRole(['usuario']), views.ticket);

module.exports = router;