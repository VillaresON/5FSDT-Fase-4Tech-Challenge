const prisma = require("../prisma");

function createPostController() {
  return {
    // Lista pública de posts
    list: async (req, res) => {
      try {
        const posts = await prisma.post.findMany({
          include: {
            author: { select: { id: true, name: true, email: true } }
          },
          orderBy: { id: "desc" }
        });
        res.json(posts);
      } catch (err) {
        console.error("postController.list:", err);
        res.status(500).json({ error: "Erro ao listar posts", detail: err.message });
      }
    },

    // Obter post pelo ID
    get: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const post = await prisma.post.findUnique({
          where: { id },
          include: { author: { select: { id: true, name: true, email: true } } }
        });
        if (!post) return res.status(404).json({ error: "Post não encontrado" });
        res.json(post);
      } catch (err) {
        console.error("postController.get:", err);
        res.status(500).json({ error: "Erro ao obter post", detail: err.message });
      }
    },

    // Criar novo post (somente usuário logado)
    create: async (req, res) => {
      try {
        const { title, content } = req.body;
        if (!title || !content)
          return res.status(400).json({ error: "Campos obrigatórios: title, content" });

        const post = await prisma.post.create({
          data: {
            title,
            content,
            author: { connect: { id: req.user.id } } // ⬅️ autor logado
          }
        });

        res.status(201).json({ message: "Post criado", post });
      } catch (err) {
        console.error("postController.create:", err);
        res.status(500).json({ error: "Erro ao criar post", detail: err.message });
      }
    },

    // Atualizar post (somente professor que criou)
    update: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const { title, content } = req.body;

        // Verificar se o post existe e pertence ao usuário
        const existing = await prisma.post.findUnique({ where: { id } });
        if (!existing) return res.status(404).json({ error: "Post não encontrado" });
        if (req.user.role !== "professor" && req.user.id !== existing.authorId)
          return res.status(403).json({ error: "Acesso negado" });

        const data = {};
        if (title) data.title = title;
        if (content) data.content = content;

        const post = await prisma.post.update({ where: { id }, data });
        res.json({ message: "Post atualizado", post });
      } catch (err) {
        console.error("postController.update:", err);
        res.status(500).json({ error: "Erro ao atualizar post", detail: err.message });
      }
    },

    // Deletar post (somente professor que criou ou admin)
    remove: async (req, res) => {
      try {
        const id = Number(req.params.id);

        const existing = await prisma.post.findUnique({ where: { id } });
        if (!existing) return res.status(404).json({ error: "Post não encontrado" });
        if (req.user.role !== "professor" && req.user.role !== "admin" && req.user.id !== existing.authorId)
          return res.status(403).json({ error: "Acesso negado" });

        await prisma.post.delete({ where: { id } });
        res.json({ message: "Post deletado" });
      } catch (err) {
        console.error("postController.remove:", err);
        res.status(500).json({ error: "Erro ao deletar post", detail: err.message });
      }
    },

    // Lista admin (professor e admin)
    adminList: async (req, res) => {
      try {
        const posts = await prisma.post.findMany({
          include: { author: { select: { id: true, name: true, email: true } } },
          orderBy: { id: "desc" }
        });
        res.json(posts);
      } catch (err) {
        console.error("postController.adminList:", err);
        res.status(500).json({ error: "Erro ao listar posts admin", detail: err.message });
      }
    }
  };
}

module.exports.postController = createPostController();
