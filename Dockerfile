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

# Instalar dependencias directamente en el dashboard
# npm ci es más confiable para builds de producción
RUN npm ci

# Instalar explícitamente los binarios nativos necesarios para Alpine Linux (musl)
RUN npm install --save-optional @rollup/rollup-linux-x64-musl
RUN npm install --save-optional lightningcss-linux-x64-musl

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
