const { Teacher } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  async list(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const teachers = await Teacher.findAndCountAll({ limit: Number(limit), offset: Number(offset), attributes: ['id', 'name', 'email', 'isAdmin'] });
      return res.json({ data: teachers.rows, total: teachers.count, page: Number(page), limit: Number(limit) });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  async get(req, res) {
    try {
      const t = await Teacher.findByPk(req.params.id, { attributes: ['id', 'name', 'email', 'isAdmin'] });
      if (!t) return res.status(404).json({ error: 'Not found' });
      return res.json(t);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  async create(req, res) {
    try {
      // only admin can create teachers
      if (!req.user.isAdmin) return res.status(403).json({ error: 'Only admin can create teachers' });

      const { name, email, password, isAdmin } = req.body;
      if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password required' });

      const hashed = bcrypt.hashSync(password, 10);
      const teacher = await Teacher.create({ name, email, password: hashed, isAdmin: !!isAdmin });
      return res.status(201).json({ id: teacher.id, name: teacher.name, email: teacher.email });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  async update(req, res) {
    try {
      const t = await Teacher.findByPk(req.params.id);
      if (!t) return res.status(404).json({ error: 'Not found' });

      // only admin or the teacher himself can update
      if (req.user.id !== t.id && !req.user.isAdmin) return res.status(403).json({ error: 'Not authorized' });

      const updates = req.body;
      if (updates.password) updates.password = bcrypt.hashSync(updates.password, 10);
      await t.update(updates);
      return res.json({ id: t.id, name: t.name, email: t.email, isAdmin: t.isAdmin });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  async remove(req, res) {
    try {
      const teacher = await Teacher.findByPk(req.params.id);

      if (!teacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }

      await teacher.destroy();
      return res.json({ message: "Teacher deleted successfully" });
    } catch (err) {
      console.error("Erro ao excluir professor:", err);
      return res.status(500).json({ error: "Server error" });
    }
  }
};
