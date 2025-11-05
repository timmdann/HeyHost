FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (including dev for build)
COPY package.json package-lock.json* ./
RUN npm install --include=dev

# Copy source and build
COPY . .
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
