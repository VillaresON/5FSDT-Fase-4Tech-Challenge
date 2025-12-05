const prisma = require('../prisma');
const bcrypt = require('bcryptjs');

module.exports = {
  createUser: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "Campos obrigatórios: name, email, password, role" });
      }

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) return res.status(409).json({ error: "Email já cadastrado" });

      const hash = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { name, email, password: hash, role }
      });

      res.status(201).json({ message: "Usuário criado", user: { id: user.id, name, email, role } });
    } catch (err) {
      console.error("userController.createUser:", err);
      res.status(500).json({ error: "Erro ao criar usuário", detail: err.message });
    }
  },

  listUsers: async (req, res) => {
    try {
      const { page = 1, limit = 10, q } = req.query;
      const skip = (page - 1) * limit;
      const take = Number(limit);

      const where = q
        ? { name: { contains: q, mode: "insensitive" } }
        : {};

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          skip,
          take,
          where,
          orderBy: { id: "desc" },
          select: { id: true, name: true, email: true, role: true }
        }),
        prisma.user.count({ where })
      ]);

      res.json({ data: users, total, page: Number(page), pageSize: take });
    } catch (err) {
      console.error("userController.listUsers:", err);
      res.status(500).json({ error: "Erro ao listar usuários", detail: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = { ...req.body };

      if (data.password) data.password = await bcrypt.hash(data.password, 10);

      const user = await prisma.user.update({
        where: { id },
        data,
        select: { id: true, name: true, email: true, role: true }
      });

      res.json({ message: "Usuário atualizado", user });
    } catch (err) {
      console.error("userController.updateUser:", err);
      res.status(500).json({ error: "Erro ao atualizar usuário", detail: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await prisma.user.delete({ where: { id } });
      res.json({ message: "Usuário deletado" });
    } catch (err) {
      console.error("userController.deleteUser:", err);
      res.status(500).json({ error: "Erro ao deletar usuário", detail: err.message });
    }
  }
};
