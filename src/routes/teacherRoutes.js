const express = require("express");
const router = express.Router();
const { teacherController } = require("../controllers/teacherController"); // ✅ desestruturação correta
const auth = require("../middlewares/auth");

// Todas rotas protegidas para professor/admin
router.get("/", auth(["professor", "admin"]), teacherController.list);
router.get("/:id", auth(["professor", "admin"]), teacherController.get);
router.post("/", auth(["professor", "admin"]), teacherController.create);
router.put("/:id", auth(["professor", "admin"]), teacherController.update);
router.delete("/:id", auth(["professor", "admin"]), teacherController.remove);

module.exports = router;
