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

# Romper cache de Docker con timestamp
ARG CACHEBUST=2024
RUN echo "Build timestamp: $CACHEBUST"

# Limpiar completamente
RUN rm -rf node_modules package-lock.json

# Instalar dependencias (package.json tiene overrides para forzar Zod 3.23.8)
RUN npm install

# Instalar explícitamente binario nativo de Rollup para Debian
# npm tiene bug con dependencias opcionales: https://github.com/npm/cli/issues/4828
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
