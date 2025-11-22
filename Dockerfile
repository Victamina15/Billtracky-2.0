# Etapa 1: Build
FROM node:20-alpine AS builder

# Instalar dependencias de build necesarias para binarios nativos
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copiar package.json raíz (monorepo workspace)
COPY package*.json ./

# Copiar packages compartidos (necesarios para los imports)
COPY packages ./packages

# Copiar dashboard
COPY apps/pos/dashboard ./apps/pos/dashboard

# Cambiar al directorio del dashboard
WORKDIR /app/apps/pos/dashboard

# Limpiar completamente antes de instalar (package-lock.json y node_modules)
# https://github.com/npm/cli/issues/4828
RUN rm -rf package-lock.json node_modules

# Instalar dependencias con variables de entorno para forzar binarios nativos Alpine
ENV npm_config_arch=x64
ENV npm_config_platform=linux
ENV npm_config_libc=musl

# Instalar dependencias
RUN npm install

# Forzar instalación/reinstalación de binarios nativos críticos para Alpine
RUN npm install --force @rollup/rollup-linux-x64-musl lightningcss-linux-x64-musl

# Construir la aplicación
RUN npm run build

# Etapa 2: Producción con Nginx
FROM nginx:alpine

# Copiar archivos build a nginx (desde el nuevo path)
COPY --from=builder /app/apps/pos/dashboard/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
