const prisma = require("../prisma");
const bcrypt = require("bcryptjs");
const { Role } = require("@prisma/client");

module.exports = {
  list: async (req, res) => {
    const teachers = await prisma.user.findMany({
      where: { role: Role.professor },
      select: { id: true, name: true, email: true }
    });
    res.json(teachers);
  },

  get: async (req, res) => {
    const id = Number(req.params.id);
    const teacher = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true }
    });
    res.json(teacher);
  },

  create: async (req, res) => {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const teacher = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: Role.professor
      }
    });

    res.json(teacher);
  },

  update: async (req, res) => {
    const { name, email } = req.body;
    const id = Number(req.params.id);

    const teacher = await prisma.user.update({
      where: { id },
      data: { name, email }
    });

    res.json(teacher);
  },

  remove: async (req, res) => {
    const id = Number(req.params.id);
    await prisma.user.delete({ where: { id } });
    res.json({ message: "Professor deletado" });
  }
};
