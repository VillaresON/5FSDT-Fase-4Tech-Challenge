const express = require("express");
const router = express.Router();
const controller = require("../controllers/postController");
const auth = require("../middlewares/auth");

// Admin list
router.get("/admin/all", auth(["professor", "admin"]), controller.adminList);

// Lista pública
router.get("/", controller.list);

// Detalhe
router.get("/:id", controller.get);

// CRUD Professores (autenticado)
router.post("/", auth(["professor"]), controller.create);
router.put("/:id", auth(["professor"]), controller.update);
router.delete("/:id", auth(["professor"]), controller.remove);

module.exports = router;
