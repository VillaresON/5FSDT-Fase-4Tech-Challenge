const prisma = require("../prisma");

function createPostController() {
  return {
    // Lista pública
    list: async (req, res) => {
      try {
        const posts = await prisma.post.findMany();
        res.json(posts);
      } catch (err) {
        console.error("postController.list:", err);
        res.status(500).json({ error: "Erro ao listar posts", detail: err.message });
      }
    },

    get: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const post = await prisma.post.findUnique({ where: { id } });
        if (!post) return res.status(404).json({ error: "Post não encontrado" });
        res.json(post);
      } catch (err) {
        console.error("postController.get:", err);
        res.status(500).json({ error: "Erro ao obter post", detail: err.message });
      }
    },

    create: async (req, res) => {
      try {
        const { title, content } = req.body;
        if (!title || !content) return res.status(400).json({ error: "Campos obrigatórios: title, content" });

        const post = await prisma.post.create({ data: { title, content } });
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

    remove: async (req, res) => {
      try {
        const id = Number(req.params.id);
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
        const posts = await prisma.post.findMany(); // Aqui você pode aplicar filtros se quiser
        res.json(posts);
      } catch (err) {
        console.error("postController.adminList:", err);
        res.status(500).json({ error: "Erro ao listar posts admin", detail: err.message });
      }
    }
  };
}

module.exports.postController = createPostController();
