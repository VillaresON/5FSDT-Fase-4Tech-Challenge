const express = require("express");
const router = express.Router();
const { postController } = require("../controllers/postController"); // ✅ desestruturação correta
const auth = require("../middlewares/auth");

// Lista pública
router.get("/", postController.list);
router.get("/:id", postController.get);

// CRUD de posts — apenas professor pode criar/editar/deletar
router.post("/", auth(["professor"]), postController.create);
router.put("/:id", auth(["professor"]), postController.update);
router.delete("/:id", auth(["professor"]), postController.remove);

// Lista admin (professor e admin)
router.get("/admin/all", auth(["professor", "admin"]), postController.adminList);

module.exports = router;
