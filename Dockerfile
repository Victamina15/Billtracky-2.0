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

# Eliminar package-lock.json para evitar bug de npm con dependencias opcionales
# https://github.com/npm/cli/issues/4828
RUN rm -f package-lock.json

# Instalar dependencias (npm install detecta correctamente dependencias opcionales en Alpine)
RUN npm install

# Verificar que los binarios nativos estén instalados
RUN npm install @rollup/rollup-linux-x64-musl lightningcss-linux-x64-musl

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
