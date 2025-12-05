# ---------- build stage ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Dependências do sistema para Prisma
RUN apk add --no-cache libc6-compat openssl

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm ci

# Copia o resto do código
COPY . .

# Gera o Prisma client
RUN npx prisma generate

# ---------- dev runner stage ----------
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache libc6-compat

# Copia node_modules e app do builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/.env ./

ENV NODE_ENV=development
ENV PORT=3000
EXPOSE 3000

# PARA DEV: roda como root para evitar problema de permissões no SQLite
# USER appuser  <- comentado para dev

CMD ["node", "src/server.js"]
