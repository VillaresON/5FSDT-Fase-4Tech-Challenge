const express = require("express");
const router = express.Router();
const { studentController } = require("../controllers/studentController"); // ✅ desestruturação correta
const auth = require("../middlewares/auth");

// Todas rotas protegidas para professor/admin
router.get("/", auth(["professor", "admin"]), studentController.list);
router.get("/:id", auth(["professor", "admin"]), studentController.get);
router.post("/", auth(["professor", "admin"]), studentController.create);
router.put("/:id", auth(["professor", "admin"]), studentController.update);
router.delete("/:id", auth(["professor", "admin"]), studentController.remove);

module.exports = router;
