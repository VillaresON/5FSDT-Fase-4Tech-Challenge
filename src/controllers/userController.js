const prisma = require("../prisma");
const bcrypt = require("bcryptjs");

module.exports = {
  createUser: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "Campos obrigatórios faltando" });
      }

      const hashed = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { name, email, password: hashed, role }
      });

      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao criar usuário", detail: err.message });
    }
  },

  listUsers: async (req, res) => {
    try {
      const { page = 1, limit = 10, q } = req.query;
      const skip = (page - 1) * limit;

      const where = q ? { name: { contains: q, mode: "insensitive" } } : {};

      const [users, count] = await Promise.all([
        prisma.user.findMany({
          skip,
          take: Number(limit),
          where,
          orderBy: { id: "desc" },
          select: { id: true, name: true, email: true, role: true }
        }),
        prisma.user.count({ where })
      ]);

      res.json({ data: users, total: count, page, pageSize: Number(limit) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao listar usuários", detail: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const data = { ...req.body };
      if (data.password) data.password = await bcrypt.hash(data.password, 10);

      const user = await prisma.user.update({ where: { id }, data });
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao atualizar usuário", detail: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await prisma.user.delete({ where: { id } });
      res.json({ message: "Usuário deletado" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao deletar usuário", detail: err.message });
    }
  }
};
