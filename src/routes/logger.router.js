const express = require("express");
const LoggerManager = require("../controllers/logger.controller");

const logger = new LoggerManager();
const router = express.Router();

router.get("/", logger.getLogs);

module.exports = router;