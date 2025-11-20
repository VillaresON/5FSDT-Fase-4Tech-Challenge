require('dotenv').config();
const bcrypt = require('bcryptjs');
const { PrismaClient, Role } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@escola.local';

  const exists = await prisma.user.findUnique({
    where: { email }
  });

  if (exists) {
    console.log("Admin já existe");
    return;
  }

  const hashed = await bcrypt.hash("123456", 10);

  const user = await prisma.user.create({
    data: {
      name: "Admin",
      email,
      password: hashed,
      role: Role.professor   // ✔ CORRETO
    }
  });

  console.log("Admin criado:", user.id);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
