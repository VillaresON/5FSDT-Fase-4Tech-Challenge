#!/bin/sh
set -e

# run migrations (safe for production)
npx prisma migrate deploy || true

# start app
exec node src/server.js
