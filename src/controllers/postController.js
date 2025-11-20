const prisma = require("../prisma");

module.exports = {
  // LIST com busca opcional e paginação
  list: async (req, res) => {
    try {
      const rawSearch = req.query.search ?? req.query.q ?? "";
      const search = String(rawSearch).trim();

      const page = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
      const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 10;
      const skip = (page - 1) * limit;

      let where = {};

      if (search.length > 0) {
        where = {
          OR: [
            { title: { contains: search } },
            { content: { contains: search } }
          ]
        };
      }

      console.log("WHERE usado:", JSON.stringify(where, null, 2));

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
        meta: {
          total,
          page,
          pageSize: limit,
          returned: posts.length
        }
      });

    } catch (err) {
      console.error("Erro REAL ao listar posts:", err);
      return res.status(500).json({
        error: "Erro ao listar posts",
        detail: err.message, // mostra o erro real
        stack: err.stack     // ajuda mais ainda a depurar
      });
    }
  },

  get: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const post = await prisma.post.findUnique({
        where: { id },
        include: { author: true }
      });
      if (!post) return res.status(404).json({ error: "Post não encontrado" });
      res.json(post);
    } catch (err) {
      console.error("postController.get error:", err);
      res.status(500).json({ error: "Erro ao obter post" });
    }
  },

  create: async (req, res) => {
    try {
      const { title, content } = req.body;
      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId: req.user.id
        }
      });
      res.status(201).json(post);
    } catch (err) {
      console.error("postController.create error:", err);
      res.status(500).json({ error: "Erro ao criar post" });
    }
  },

  update: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { title, content } = req.body;
      const post = await prisma.post.update({
        where: { id },
        data: { title, content }
      });
      res.json(post);
    } catch (err) {
      console.error("postController.update error:", err);
      res.status(500).json({ error: "Erro ao atualizar post" });
    }
  },

  remove: async (req, res) => {
    try {
      const id = Number(req.params.id);
      await prisma.post.delete({ where: { id } });
      res.json({ message: "Post deletado" });
    } catch (err) {
      console.error("postController.remove error:", err);
      res.status(500).json({ error: "Erro ao deletar post" });
    }
  },

  adminList: async (req, res) => {
    try {
      const posts = await prisma.post.findMany({
        include: { author: true },
        orderBy: { id: "desc" }
      });
      res.json(posts);
    } catch (err) {
      console.error("postController.adminList error:", err);
      res.status(500).json({ error: "Erro ao listar posts (admin)" });
    }
  }
};
