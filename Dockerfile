# Etapa 1: Build
# Usar Debian en lugar de Alpine para evitar problemas con binarios nativos musl
FROM node:20-slim AS builder

WORKDIR /app

# Copiar packages compartidos (necesarios para los imports)
COPY packages ./packages

# Copiar dashboard
COPY apps/pos/dashboard ./dashboard

# Cambiar al directorio del dashboard
WORKDIR /app/dashboard

# FORZAR REBUILD - cambiar este número para romper cache
ARG CACHEBUST=20241122003
RUN echo "=== BUILD TIMESTAMP: $CACHEBUST ==="

# Limpiar TODO
RUN rm -rf node_modules package-lock.json .npm

# Mostrar package.json para verificar
RUN echo "=== PACKAGE.JSON ZOD VERSION ===" && cat package.json | grep -A1 '"zod"'

# Instalar dependencias
RUN npm install

# VERIFICAR versión de Zod instalada
RUN echo "=== INSTALLED ZOD VERSION ===" && npm list zod

# Instalar explícitamente Zod 3.23.8 OTRA VEZ para forzar
RUN npm install zod@3.23.8 --save-exact

# Verificar NUEVAMENTE
RUN echo "=== FINAL ZOD VERSION ===" && npm list zod

# Instalar explícitamente binario nativo de Rollup para Debian
RUN npm install @rollup/rollup-linux-x64-gnu

# Construir la aplicación
RUN npm run build

# Etapa 2: Producción con Nginx
FROM nginx:alpine

# Copiar archivos build a nginx
COPY --from=builder /app/dashboard/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
