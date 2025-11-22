# Etapa 1: Build
# Usar Debian en lugar de Alpine para evitar problemas con binarios nativos musl
FROM node:20-slim AS builder

WORKDIR /app

# Copiar package.json raíz (monorepo workspace)
COPY package*.json ./

# Copiar packages compartidos (necesarios para los imports)
COPY packages ./packages

# Copiar dashboard
COPY apps/pos/dashboard ./apps/pos/dashboard

# Cambiar al directorio del dashboard
WORKDIR /app/apps/pos/dashboard

# Instalar dependencias
RUN npm ci

# Instalar explícitamente binarios nativos para Debian (glibc/gnu)
# npm ci tiene bug con dependencias opcionales: https://github.com/npm/cli/issues/4828
RUN npm install @rollup/rollup-linux-x64-gnu lightningcss-linux-x64-gnu

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
