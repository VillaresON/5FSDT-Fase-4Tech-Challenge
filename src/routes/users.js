const express = require("express");
const router = express.Router();
const c = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.get("/", auth, role(["PROFESSOR"]), c.listUsers);
router.post("/", auth, role(["PROFESSOR"]), c.createUser);
router.put("/:id", auth, role(["PROFESSOR"]), c.updateUser);
router.delete("/:id", auth, role(["PROFESSOR"]), c.deleteUser);

module.exports = router;
