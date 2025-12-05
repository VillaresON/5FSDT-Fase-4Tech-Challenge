const { sequelize, Teacher } = require('../models');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const admin = await Teacher.findOne({ where: { email: 'admin@admin.com' } });
    if (!admin) {
      const hashed = bcrypt.hashSync('admin123', 10);
      await Teacher.create({ name: 'Admin', email: 'admin@admin.com', password: hashed, isAdmin: true });
      console.log('Admin created: admin@admin.com / admin123');
    } else {
      console.log('Admin already exists');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
