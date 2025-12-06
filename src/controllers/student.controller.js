const { Student } = require('../models');
const jwt = require("jsonwebtoken");

module.exports = {

  async list(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const data = await Student.findAndCountAll({ limit: Number(limit), offset: Number(offset), attributes: ['id', 'name', 'email'] });
      return res.json({ data: data.rows, total: data.count, page: Number(page), limit: Number(limit) });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  async get(req, res) {
    try {
      const s = await Student.findByPk(req.params.id);
      if (!s) return res.status(404).json({ error: 'Not found' });
      return res.json(s);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  async create(req, res) {
    try {
      // only authenticated teachers can create students
      const { name, email } = req.body;
      if (!name || !email) return res.status(400).json({ error: 'Name and email required' });
      const st = await Student.create({ name, email });
      return res.status(201).json(st);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  async update(req, res) {
    try {
      const s = await Student.findByPk(req.params.id);
      if (!s) return res.status(404).json({ error: 'Not found' });
      await s.update(req.body);
      return res.json(s);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  async remove(req, res) {
    try {
      const s = await Student.findByPk(req.params.id);
      if (!s) return res.status(404).json({ error: 'Not found' });
      await s.destroy();
      return res.json({ message: 'Deleted' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  async login(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email obrigatório" });
      }

      const student = await Student.findOne({ where: { email } });

      if (!student) {
        return res.status(404).json({ error: "Aluno não encontrado" });
      }

      const token = jwt.sign(
        {
          id: student.id,
          role: "student",
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        token,
        user: {
          id: student.id,
          name: student.name,
          email: student.email,
          isStudent: true,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao autenticar aluno" });
    }
  }
};
