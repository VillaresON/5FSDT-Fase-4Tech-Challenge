const prisma = require("../prisma");
const bcrypt = require("bcryptjs");
const { Role } = require("@prisma/client");

function createRoleController(role) {
  return {
    list: async (req, res) => {
      try {
        const users = await prisma.user.findMany({
          where: { role },
          select: { id: true, name: true, email: true }
        });
        res.json(users);
      } catch (err) {
        console.error(`${role}Controller.list:`, err);
        res.status(500).json({ error: `Erro ao listar ${role}`, detail: err.message });
      }
    },

    get: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const user = await prisma.user.findUnique({
          where: { id },
          select: { id: true, name: true, email: true }
        });
        if (!user) return res.status(404).json({ error: `${role} não encontrado` });
        res.json(user);
      } catch (err) {
        console.error(`${role}Controller.get:`, err);
        res.status(500).json({ error: `Erro ao obter ${role}`, detail: err.message });
      }
    },

    create: async (req, res) => {
      try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
          return res.status(400).json({ error: "Campos obrigatórios: name, email, password" });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) return res.status(409).json({ error: "Email já cadastrado" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
          data: { name, email, password: hashed, role }
        });

        res.status(201).json({ message: `${role} criado`, user: { id: user.id, name, email } });
      } catch (err) {
        console.error(`${role}Controller.create:`, err);
        res.status(500).json({ error: `Erro ao criar ${role}`, detail: err.message });
      }
    },

    update: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const { name, email, password } = req.body;
        const data = {};
        if (name) data.name = name;
        if (email) data.email = email;
        if (password) data.password = await bcrypt.hash(password, 10);

        const user = await prisma.user.update({
          where: { id },
          data,
          select: { id: true, name: true, email: true }
        });

        res.json({ message: `${role} atualizado`, user });
      } catch (err) {
        console.error(`${role}Controller.update:`, err);
        res.status(500).json({ error: `Erro ao atualizar ${role}`, detail: err.message });
      }
    },

    remove: async (req, res) => {
      try {
        const id = Number(req.params.id);
        await prisma.user.delete({ where: { id } });
        res.json({ message: `${role} deletado` });
      } catch (err) {
        console.error(`${role}Controller.remove:`, err);
        res.status(500).json({ error: `Erro ao deletar ${role}`, detail: err.message });
      }
    }
  };
}

module.exports.teacherController = createRoleController(Role.professor);
module.exports.studentController = createRoleController(Role.aluno);
