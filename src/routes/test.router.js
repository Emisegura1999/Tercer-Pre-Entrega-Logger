const express = require("express");
const TestManager = require("../controllers/test.controller.js");

const test = new TestManager();
const router = express.Router();

router.get("/", test.getTest);
router.post("/", test.createError);

module.exports = router;