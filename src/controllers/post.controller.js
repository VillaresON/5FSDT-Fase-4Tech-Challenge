const { Post, Teacher, Comment, Student, Sequelize } = require("../models");


const Op = Sequelize.Op;

module.exports = {
  async list(req, res) {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const offset = (page - 1) * limit;

      const where = search ? {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { content: { [Op.like]: `%${search}%` } }
        ]
      } : {};

      const { rows, count } = await Post.findAndCountAll({
        where,
        include: [{ model: Teacher, attributes: ['id', 'name'] }],
        limit: Number(limit),
        offset: Number(offset),
        order: [['createdAt', 'DESC']]
      });

      return res.json({ data: rows, page: Number(page), limit: Number(limit), total: count });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  },

   async get(req, res) {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            include: [
              { model: Teacher, as: "Teacher", attributes: ["id", "name"] },
              { model: Student, as: "Student", attributes: ["id", "name"] },
            ],
            attributes: ["id", "content", "createdAt"],
          },
          {
            model: Teacher,
            attributes: ["id", "name"],
          },
        ],
      });

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      return res.json(post);
    } catch (err) {
      console.error("Erro ao buscar post:", err);
      return res.status(500).json({ error: "Server error" });
    }
  },
  async create(req, res) {
    try {
      const { title, content, excerpt } = req.body;
      if (!title || !content) return res.status(400).json({ error: 'Title and content required' });

      const authorId = req.user.id;
      const post = await Post.create({ title, content, excerpt: excerpt || content.slice(0, 150), authorId });
      return res.status(201).json(post);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  async update(req, res) {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) return res.status(404).json({ error: 'Post not found' });

      // only author or admin can update
      if (req.user.id !== post.authorId && !req.user.isAdmin) return res.status(403).json({ error: 'Not authorized' });

      await post.update(req.body);
      return res.json(post);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  async remove(req, res) {
    try {
      const post = await Post.findByPk(req.params.id);

      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      await Comment.destroy({
        where: { postId: post.id }
      });

      await post.destroy();
      return res.json({ message: "Post deleted successfully" });
    } catch (err) {
      console.error("Erro ao excluir post:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }

};
