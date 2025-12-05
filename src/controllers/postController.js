const prisma = require("../prisma");

module.exports = {
  list: async (req, res) => { /* igual */ },
  get: async (req, res) => { /* igual */ },

  create: async (req, res) => {
    try {
      if (!req.user?.id) return res.status(401).json({ error: "Usuário não autenticado" });

      const { title, content } = req.body;
      if (!title || !content) return res.status(400).json({ error: "Campos obrigatórios" });

      const post = await prisma.post.create({
        data: { title: title.trim(), content: content.trim(), authorId: req.user.id },
        include: { author: true }
      });

      res.status(201).json({ message: "Post criado", post });
    } catch (err) {
      console.error("postController.create:", err);
      res.status(500).json({ error: "Erro ao criar post", detail: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { title, content } = req.body;
      if (!title || !content) return res.status(400).json({ error: "Campos obrigatórios" });

      // só autor pode atualizar
      const existing = await prisma.post.findUnique({ where: { id } });
      if (!existing) return res.status(404).json({ error: "Post não encontrado" });
      if (existing.authorId !== req.user.id) return res.status(403).json({ error: "Não autorizado" });

      const post = await prisma.post.update({
        where: { id },
        data: { title: title.trim(), content: content.trim() },
        include: { author: true }
      });

      res.json({ message: "Post atualizado", post });
    } catch (err) {
      console.error("postController.update:", err);
      res.status(500).json({ error: "Erro ao atualizar post", detail: err.message });
    }
  },

  remove: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const existing = await prisma.post.findUnique({ where: { id } });
      if (!existing) return res.status(404).json({ error: "Post não encontrado" });
      if (existing.authorId !== req.user.id) return res.status(403).json({ error: "Não autorizado" });

      await prisma.post.delete({ where: { id } });
      res.json({ message: "Post deletado" });
    } catch (err) {
      console.error("postController.remove:", err);
      res.status(500).json({ error: "Erro ao deletar post", detail: err.message });
    }
  },

  adminList: async (req, res) => { /* igual */ }
};
