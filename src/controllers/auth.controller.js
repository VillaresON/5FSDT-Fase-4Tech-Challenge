const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Teacher, Student } = require("../models");

module.exports = {

  async login(req, res) {
    try {
      const { email, password, type } = req.body;

      if (!email || !type) {
        return res
          .status(400)
          .json({ error: "Email e tipo de usuário são obrigatórios." });
      }

      let user = null;

      if (type === "teacher") {
        user = await Teacher.findOne({ where: { email } });
      } else if (type === "student") {
        user = await Student.findOne({ where: { email } });
      } else {
        return res.status(400).json({ error: "Tipo de usuário inválido." });
      }

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      // professor/admin tem senha
      if (type === "teacher") {
        if (!password) {
          return res.status(400).json({ error: "Senha obrigatória." });
        }

        if (!user.password) {
          return res
            .status(400)
            .json({ error: "Usuário não possui senha cadastrada." });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          return res.status(401).json({ error: "Senha inválida." });
        }
      }

      const payload = {
        id: user.id,
        type, 
        isAdmin: !!user.isAdmin,
      };

      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET || "troque_essa_senha",
        { expiresIn: "7d" }
      );

      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          type,
          isAdmin: !!user.isAdmin,
        },
      });
    } catch (err) {
      console.error("Erro no login:", err);
      return res.status(500).json({ error: "Erro ao fazer login." });
    }
  },

  // REGISTER (Teacher/Admin)
  async register(req, res) {
    try {
      const { name, email, password, isAdmin } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ error: "Nome, email e senha são obrigatórios." });
      }

      const exists = await Teacher.findOne({ where: { email } });
      if (exists) {
        return res.status(400).json({ error: "E-mail já cadastrado." });
      }

      const hash = await bcrypt.hash(password, 10);

      const teacher = await Teacher.create({
        name,
        email,
        password: hash,
        isAdmin: !!isAdmin,
      });

      return res.status(201).json({
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
        isAdmin: teacher.isAdmin,
      });
    } catch (err) {
      console.error("Erro no register:", err);
      return res.status(500).json({ error: "Erro ao registrar usuário." });
    }
  },
};
