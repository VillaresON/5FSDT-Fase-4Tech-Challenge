const express = require("express");
const router = express.Router();
const controller = require("../controllers/postController");
const auth = require("../middlewares/auth");

// Específicas primeiro:
router.get("/admin/all", auth(["professor", "admin"]), controller.adminList);

// Público (lista e busca)
router.get("/", controller.list);

// Detalhe (sempre por último!)
router.get("/:id", controller.get);

// Professores:
router.post("/", auth(["professor"]), controller.create);
router.put("/:id", auth(["professor"]), controller.update);
router.delete("/:id", auth(["professor"]), controller.remove);

module.exports = router;
