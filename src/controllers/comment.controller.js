const { Comment, Post } = require('../models');

module.exports = {
  async list(req, res) {
    try {
      const postId = req.params.postId;
      const comments = await Comment.findAll({ where: { postId } });
      return res.json(comments);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  async create(req, res) {
    try {
      const { content } = req.body;
      const { postId } = req.params;
      const authorId = req.user.id;

      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      const comment = await Comment.create({
        content,
        postId,
        authorId,
      });

      return res.status(201).json(comment);
    } catch (err) {
      console.error("Erro ao criar comentário:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }


};
