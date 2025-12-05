# Backend - Node.js + Express + Sequelize + SQLite

## Overview
Backend API for posts, teachers and students with authentication (JWT). Uses Sequelize + SQLite for simplicity (great for school projects).

## Quick start

1. Copy `.env.example` to `.env` and set `JWT_SECRET`.
2. Install deps:
   ```bash
   npm install
   ```
3. Create admin seed:
   ```bash
   npm run seed
   ```
   Admin: `admin@admin.com` / `admin123`
4. Run:
   ```bash
   npm run dev
   ```

## Docker
Build image:
```bash
docker build -t youruser/backend-sequelize .
docker run -p 3000:3000 --env-file .env youruser/backend-sequelize
```

## Notes
- For development we use `sequelize.sync({ alter: true })` to auto-create tables. For production switch to migrations.
- Endpoints:
  - `POST /auth/login` - login
  - `POST /auth/register` - register teacher (admin only recommended)
  - `GET /posts` - list posts (query: page,limit,search)
  - `GET /posts/:id` - get post
  - `POST /posts` - create (auth)
  - `PUT /posts/:id` - update (auth, author/admin)
  - `DELETE /posts/:id` - delete (auth, author/admin)
  - Teachers and Students have full CRUD under `/teachers` and `/students` (auth)
  - Comments under `/posts/:postId/comments`
