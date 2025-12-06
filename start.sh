#!/bin/sh

echo "🚀 Running database migrations..."
npx sequelize-cli db:migrate

echo "✅ Starting server..."
node server.js
