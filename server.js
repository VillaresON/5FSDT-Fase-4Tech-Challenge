require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models');

const authRoutes = require('./src/routes/auth.routes');
const postRoutes = require('./src/routes/post.routes');
const teacherRoutes = require('./src/routes/teacher.routes');
const studentRoutes = require('./src/routes/student.routes');
const commentRoutes = require('./src/routes/comment.routes');

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/teachers', teacherRoutes);
app.use('/students', studentRoutes);
app.use('/posts/:postId/comments', commentRoutes);

// health
app.get('/', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    // sync models - safe for dev; in production prefer migrations
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start:', err);
    process.exit(1);
  }
}

start();
