const prisma = require("../prisma");
const bcrypt = require("bcryptjs");
const { Role } = require("@prisma/client");

module.exports = {
  list: async (req, res) => {
    const students = await prisma.user.findMany({
      where: { role: Role.aluno },
      select: { id: true, name: true, email: true }
    });
    res.json(students);
  },

  get: async (req, res) => {
    const id = Number(req.params.id);
    const student = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true }
    });
    res.json(student);
  },

  create: async (req, res) => {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const student = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: Role.aluno
      }
    });

    res.json(student);
  },

  update: async (req, res) => {
    const { name, email } = req.body;
    const id = Number(req.params.id);

    const student = await prisma.user.update({
      where: { id },
      data: { name, email }
    });

    res.json(student);
  },

  remove: async (req, res) => {
    const id = Number(req.params.id);
    await prisma.user.delete({ where: { id } });
    res.json({ message: "Aluno deletado" });
  }
};
