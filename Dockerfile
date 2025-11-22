# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json raíz (monorepo workspace)
COPY package*.json ./

# Copiar packages compartidos
COPY packages ./packages

# Copiar dashboard
COPY apps/pos/dashboard ./apps/pos/dashboard

# Instalar todas las dependencias del workspace
RUN npm install

# Cambiar al directorio del dashboard para hacer build
WORKDIR /app/apps/pos/dashboard

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
