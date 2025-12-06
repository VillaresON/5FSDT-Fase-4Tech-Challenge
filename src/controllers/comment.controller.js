const { Comment, Post, Teacher, Student } = require("../models");

module.exports = {
  async list(req, res) {
    try {
      const { postId } = req.params;

      const comments = await Comment.findAll({
        where: { postId },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Teacher,
            as: "Teacher",
            attributes: ["id", "name"],
          },
          {
            model: Student,
            as: "Student",
            attributes: ["id", "name"],
          },
        ],
      });

      return res.json(comments);
    } catch (err) {
      console.error("Erro ao listar comentários:", err);
      return res.status(500).json({ error: "Server error" });
    }
  },

  async create(req, res) {
    try {
      const { postId } = req.params;
      const { content } = req.body;

      if (!content?.trim()) {
        return res.status(400).json({ error: "Conteúdo obrigatório." });
      }

      if (!req.user?.id || !req.user?.type) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }

      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ error: "Post não encontrado." });
      }

      const data = {
        content,
        postId,
      };


      if (req.user.type === "teacher") {
        data.teacherId = req.user.id;
      }


      if (req.user.type === "student") {
        data.studentId = req.user.id;
      }

      const comment = await Comment.create(data);

  
      const fullComment = await Comment.findByPk(comment.id, {
        include: [
          { model: Teacher, as: "Teacher", attributes: ["id", "name"] },
          { model: Student, as: "Student", attributes: ["id", "name"] },
        ],
      });

      return res.status(201).json(fullComment);
    } catch (err) {
      console.error("Erro ao criar comentário:", err);
      return res.status(500).json({ error: "Erro ao criar comentário." });
    }
  },
};
