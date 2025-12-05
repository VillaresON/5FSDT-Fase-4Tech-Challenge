const express = require("express");
const router = express.Router();
const controller = require("../controllers/teacherController");
const auth = require("../middlewares/auth");

// Professores/admins podem manipular
router.get("/", auth(["professor", "admin"]), controller.list);
router.get("/:id", auth(["professor", "admin"]), controller.get);
router.post("/", auth(["professor", "admin"]), controller.create);
router.put("/:id", auth(["professor", "admin"]), controller.update);
router.delete("/:id", auth(["professor", "admin"]), controller.remove);

module.exports = router;
