const { Teacher } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

      const teacher = await Teacher.findOne({ where: { email } });
      if (!teacher) return res.status(404).json({ error: 'Email not found' });

      const valid = bcrypt.compareSync(password, teacher.password);
      if (!valid) return res.status(401).json({ error: 'Invalid password' });

      const token = jwt.sign({ id: teacher.id, email: teacher.email, isAdmin: teacher.isAdmin }, process.env.JWT_SECRET || 'troque_essa_senha', { expiresIn: '8h' });

      return res.json({ token, user: { id: teacher.id, name: teacher.name, email: teacher.email, isAdmin: teacher.isAdmin } });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  },

  async register(req, res) {
    try {
      const { name, email, password, isAdmin } = req.body;
      if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password required' });

      const hashed = bcrypt.hashSync(password, 10);
      const teacher = await Teacher.create({ name, email, password: hashed, isAdmin: !!isAdmin });
      return res.status(201).json({ id: teacher.id, name: teacher.name, email: teacher.email });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error' });
    }
  }
};
