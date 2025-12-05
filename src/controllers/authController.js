// controllers/authController.js
const jwt = require("jsonwebtoken");
const prisma = require("../prisma");
const bcrypt = require("bcryptjs");

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: "Credenciais inválidas" });

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h"
      });

      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: "Erro no login", detail: err.message });
    }
  }
};

module.exports.authController = authController;
