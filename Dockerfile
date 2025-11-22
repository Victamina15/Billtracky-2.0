# Etapa 1: Build
# Usar Debian en lugar de Alpine para evitar problemas con binarios nativos musl
FROM node:20-slim AS builder

WORKDIR /app

# Copiar package.json raíz y estructura completa del monorepo
COPY package.json package-lock.json* ./
COPY packages ./packages
COPY apps ./apps

# FORZAR REBUILD
ARG CACHEBUST=20241122006
RUN echo "=== BUILD: $CACHEBUST ==="

# Limpiar
RUN rm -rf node_modules apps/*/node_modules apps/*/*/node_modules package-lock.json

# Instalar desde la raíz (workspace) para que todos los packages tengan acceso a las deps
RUN npm install

# Instalar binarios nativos específicos
WORKDIR /app/apps/pos/dashboard
RUN npm install @rollup/rollup-linux-x64-gnu --save-exact

# Construir la aplicación
RUN npm run build

# Etapa 2: Producción con Nginx
FROM nginx:alpine

# Copiar archivos build a nginx
COPY --from=builder /app/apps/pos/dashboard/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
