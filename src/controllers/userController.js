const prisma = require('../prisma');
const bcrypt = require('bcryptjs');

module.exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hash, role }
  });

  res.status(201).json(user);
};

module.exports.listUsers = async (req, res) => {
  const { page = 1, limit = 10, q } = req.query;

  const skip = (page - 1) * limit;
  const take = Number(limit);

  const where = q ? {
    name: { contains: q, mode: "insensitive" }
  } : {};

  const [users, count] = await Promise.all([
    prisma.user.findMany({
      skip,
      take,
      where,
      orderBy: { id: "desc" },
      select: { id: true, name: true, email: true, role: true }
    }),
    prisma.user.count({ where })
  ]);

  res.json({ data: users, total: count, page, pageSize: limit });
};

module.exports.updateUser = async (req, res) => {
  const id = Number(req.params.id);

  const data = { ...req.body };
  if (data.password)
    data.password = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.update({
    where: { id },
    data
  });

  res.json(user);
};

module.exports.deleteUser = async (req, res) => {
  const id = Number(req.params.id);

  await prisma.user.delete({ where: { id } });

  res.json({ message: "Usuário apagado" });
};
