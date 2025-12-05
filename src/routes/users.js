const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const auth = require("../middlewares/auth");

// CRUD de usuários apenas para professor
router.get("/", auth(["professor"]), controller.listUsers);
router.post("/", auth(["professor"]), controller.createUser);
router.put("/:id", auth(["professor"]), controller.updateUser);
router.delete("/:id", auth(["professor"]), controller.deleteUser);

module.exports = router;
