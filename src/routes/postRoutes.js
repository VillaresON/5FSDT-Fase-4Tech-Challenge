const express = require("express");
const router = express.Router();
const controller = require("../controllers/postController");
const auth = require("../middlewares/auth");

// Lista pública
router.get("/", controller.list);
router.get("/:id", controller.get);

// CRUD de posts — apenas professor pode criar/editar/deletar
router.post("/", auth(["professor"]), controller.create);
router.put("/:id", auth(["professor"]), controller.update);
router.delete("/:id", auth(["professor"]), controller.remove);

// Lista admin (professor e admin)
router.get("/admin/all", auth(["professor", "admin"]), controller.adminList);

module.exports = router;
