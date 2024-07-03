const express = require("express");
const passport = require("passport");

const UserController = require("../controllers/user.controller.js");

const router = express.Router();
const user = new UserController();

router.post("/register", user.register);
router.post("/login", user.login);
router.get("/profile", passport.authenticate("jwt", { session: false }), user.profile);
router.post("/logout", user.logout.bind(user));
router.get("/admin", passport.authenticate("jwt", { session: false }), user.admin);

module.exports = router;

