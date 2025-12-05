const prisma = require("../prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: "Senha inválida" });

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.json({
        message: "Login bem-sucedido",
        token,
        user: { id: user.id, name: user.name, role: user.role }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro no login", detail: err.message });
    }
  }
};
