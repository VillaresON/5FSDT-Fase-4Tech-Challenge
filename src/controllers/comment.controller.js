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
      const postId = req.params.postId;
      const { author, content } = req.body;
      if (!content) return res.status(400).json({ error: 'Content required' });
      // ensure post exists
      const post = await Post.findByPk(postId);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      const comment = await Comment.create({ author: author || 'Anonymous', content, postId });
      return res.status(201).json(comment);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  }
};
