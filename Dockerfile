# Etapa 1: Build
# Usar Debian en lugar de Alpine para evitar problemas con binarios nativos musl
FROM node:20-slim AS builder

WORKDIR /app

# Copiar estructura de monorepo
COPY packages ./packages
COPY apps/pos/dashboard ./apps/pos/dashboard

# Cambiar al directorio del dashboard
WORKDIR /app/apps/pos/dashboard

# FORZAR REBUILD
ARG CACHEBUST=20241122005
RUN echo "=== BUILD: $CACHEBUST ==="

# Limpiar
RUN rm -rf node_modules package-lock.json

# Instalar dependencias (Zod 3.23.8 con overrides)
RUN npm install

# Instalar binarios nativos
RUN npm install @rollup/rollup-linux-x64-gnu zod@3.23.8 --save-exact

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
