## Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps (including dev deps for build)
COPY package.json package-lock.json* ./

# Copy Prisma schema early so `prisma generate` (postinstall) can run during npm install
COPY prisma ./prisma

# Install deps (including dev dependencies needed for the TypeScript build)
RUN npm install --include=dev

# Copy rest of the project (source, tsconfig, etc.)
COPY . .
RUN npm run build
RUN npx prisma generate

## Production stage
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy package.json and node_modules from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 4000
CMD ["node", "dist/index.js"]
