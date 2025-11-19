# Guía Rápida - Docker Local

Esta guía te permite probar toda la aplicación Billtracky 2.0 localmente con Docker antes de desplegar a producción.

## Pre-requisitos

- Docker instalado
- Docker Compose instalado
- Puertos 3000-3003 y 5432 disponibles

## Iniciar Todos los Servicios

```bash
# Construir e iniciar todos los servicios
docker-compose up --build

# O en segundo plano
docker-compose up --build -d
```

Esto iniciará:
1. **PostgreSQL** (puerto 5432) - Base de datos
2. **Backend API** (puerto 3001) - API REST
3. **Dashboard** (puerto 3000) - Hub principal
4. **Facturación** (puerto 3002) - Módulo de facturas
5. **Configuración** (puerto 3003) - Módulo de configuración

## URLs de Acceso

Una vez iniciados los servicios:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| Dashboard | http://localhost:3000 | Hub principal con menú de módulos |
| Facturación | http://localhost:3002 | Módulo de facturación |
| Configuración | http://localhost:3003 | Módulo de configuración |
| API | http://localhost:3001 | Backend API REST |
| PostgreSQL | localhost:5432 | Base de datos |

## Verificar Estado de los Servicios

```bash
# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f dashboard
docker-compose logs -f api
docker-compose logs -f postgres

# Ver estado de los contenedores
docker-compose ps
```

## Probar el API

```bash
# Health check
curl http://localhost:3001/health

# Obtener servicios
curl http://localhost:3001/api/servicios

# Obtener categorías
curl http://localhost:3001/api/categorias
```

## Detener los Servicios

```bash
# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (limpia la base de datos)
docker-compose down -v
```

## Construir Servicios Individuales

Si solo quieres construir un servicio específico:

```bash
# Dashboard
docker-compose build dashboard

# Facturación
docker-compose build facturacion

# Configuración
docker-compose build configuracion

# Backend API
docker-compose build api
```

## Reiniciar un Servicio

```bash
# Reiniciar un servicio específico
docker-compose restart dashboard
docker-compose restart api
```

## Troubleshooting

### Puertos en uso

Si algún puerto está en uso, puedes modificar `docker-compose.yml`:

```yaml
ports:
  - "NUEVO_PUERTO:80"  # Para frontends
  - "NUEVO_PUERTO:3001" # Para backend
```

### Limpiar todo y empezar de nuevo

```bash
# Detener y eliminar todo
docker-compose down -v

# Eliminar imágenes construidas
docker-compose down --rmi all -v

# Reconstruir desde cero
docker-compose up --build
```

### Ver logs detallados durante el build

```bash
docker-compose build --no-cache --progress=plain
```

### Acceder a la base de datos

```bash
# Conectar a PostgreSQL
docker exec -it billtracky-postgres psql -U postgres -d app-pos-2

# Verificar tablas
\dt

# Ver servicios
SELECT * FROM servicios;

# Ver categorías
SELECT * FROM categorias;

# Salir
\q
```

## Flujo de Prueba Completo

1. **Iniciar servicios:**
   ```bash
   docker-compose up --build -d
   ```

2. **Verificar que todo está corriendo:**
   ```bash
   docker-compose ps
   ```
   Todos deberían mostrar estado "Up" y "healthy"

3. **Abrir Dashboard:**
   - Navegar a http://localhost:3000
   - Deberías ver el menú con los módulos

4. **Probar Configuración:**
   - Abrir http://localhost:3003
   - Ir a "Servicios" y crear un servicio nuevo
   - Verificar que se guarda en la base de datos

5. **Probar Facturación:**
   - Abrir http://localhost:3002
   - Seleccionar servicios del catálogo
   - Crear una factura de prueba

6. **Ver logs:**
   ```bash
   docker-compose logs -f
   ```

## Notas Importantes

- La base de datos se inicializa automáticamente con el schema.sql
- Los datos se persisten en un volumen Docker
- CORS está configurado para permitir localhost:3000-3003
- El API está configurado para no reinicializar la DB en cada inicio

## Preparación para Producción

Una vez que todo funciona localmente:

1. Los mismos Dockerfiles se usan en producción
2. Solo cambiar variables de entorno en EasyPanel:
   - `VITE_API_URL` → URL de tu API en producción
   - `DATABASE_URL` → URL de PostgreSQL en producción
   - `CORS_ORIGIN` → Dominios de producción

3. Seguir la guía en `DEPLOYMENT.md` para desplegar en EasyPanel
