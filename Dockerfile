# ---------- build stage ----------
FROM node:20-alpine AS builder
WORKDIR /app

# dependências do sistema necessárias para prisma (no alpine)
RUN apk add --no-cache libc6-compat openssl

# copia package.json e package-lock / pnpm-lock etc
COPY package*.json ./

# instalar dependências (dev também para prisma)
RUN npm ci

# copia o resto do código
COPY . .

# gerar Prisma client
RUN npx prisma generate

# roda build step se existir (opcional)
# RUN npm run build

# ---------- production stage ----------
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache libc6-compat

# copiar apenas node_modules e node app do builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./ 
COPY --from=builder /app/src ./src
COPY --from=builder /app/.env ./

# Prisma client (já gerado) lives em node_modules/@prisma
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Use a non-root user (opcional, mas recomendado)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["node", "src/server.js"]
