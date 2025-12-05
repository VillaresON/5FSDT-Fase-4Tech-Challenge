const express = require("express");
const router = express.Router();
const { authController } = require("../controllers/authController"); // ✅ desestruturação consistente

// Login
router.post("/login", authController.login);

module.exports = router;
