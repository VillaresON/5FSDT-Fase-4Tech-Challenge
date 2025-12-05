const prisma = require("../prisma");

module.exports = {
  // LIST
  list: async (req, res) => {
    try {
      const search = String(req.query.search ?? req.query.q ?? "").trim();
      const page = Math.max(Number(req.query.page) || 1, 1);
      const limit = Math.max(Number(req.query.limit) || 10, 1);
      const skip = (page - 1) * limit;

      const where = search
        ? { OR: [{ title: { contains: search } }, { content: { contains: search } }] }
        : {};

      const [posts, total] = await Promise.all([
        prisma.post.findMany({
          where,
          include: { author: true },
          orderBy: { id: "desc" },
          skip,
          take: limit
        }),
        prisma.post.count({ where })
      ]);

      res.json({
        data: posts,
        meta: { total, page, pageSize: limit, returned: posts.length }
      });
    } catch (err) {
      console.error("Erro ao listar posts:", err);
      res.status(500).json({ error: "Erro ao listar posts", detail: err.message });
    }
  },

  get: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const post = await prisma.post.findUnique({ where: { id }, include: { author: true } });
      if (!post) return res.status(404).json({ error: "Post não encontrado" });
      res.json(post);
    } catch (err) {
      console.error("Erro ao obter post:", err);
      res.status(500).json({ error: "Erro ao obter post", detail: err.message });
    }
  },

  create: async (req, res) => {
    try {
      if (!req.user) return res.status(401).json({ error: "Usuário não autenticado" });

      const { title, content } = req.body;
      if (!title || !content) return res.status(400).json({ error: "Campos title e content são obrigatórios" });

      const post = await prisma.post.create({
        data: { title, content, authorId: req.user.id },
        include: { author: true }
      });

      res.status(201).json(post);
    } catch (err) {
      console.error("Erro ao criar post:", err);
      res.status(500).json({ error: "Erro ao criar post", detail: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { title, content } = req.body;
      if (!title || !content) return res.status(400).json({ error: "Campos title e content são obrigatórios" });

      const post = await prisma.post.update({
        where: { id },
        data: { title, content },
        include: { author: true }
      });

      res.json(post);
    } catch (err) {
      console.error("Erro ao atualizar post:", err);
      res.status(500).json({ error: "Erro ao atualizar post", detail: err.message });
    }
  },

  remove: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await prisma.post.delete({ where: { id } });
      res.json({ message: "Post deletado" });
    } catch (err) {
      console.error("Erro ao deletar post:", err);
      res.status(500).json({ error: "Erro ao deletar post", detail: err.message });
    }
  },

  adminList: async (req, res) => {
    try {
      const posts = await prisma.post.findMany({ include: { author: true }, orderBy: { id: "desc" } });
      res.json(posts);
    } catch (err) {
      console.error("Erro adminList:", err);
      res.status(500).json({ error: "Erro ao listar posts (admin)", detail: err.message });
    }
  }
};
