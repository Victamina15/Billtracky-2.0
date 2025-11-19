# Guía de Despliegue en EasyPanel - Paso a Paso

Esta guía te llevará paso a paso para desplegar Billtracky 2.0 en EasyPanel.

## Vista General

Vamos a desplegar 5 servicios:
1. ✅ PostgreSQL (Base de datos) - Ya desplegado
2. 🔄 Backend API (Puerto 3001)
3. 🔄 Dashboard (Puerto 80)
4. 🔄 Facturación (Puerto 80)
5. 🔄 Configuración (Puerto 80)

## Paso 1: Desplegar Backend API

### 1.1 Crear Nueva Aplicación

1. En EasyPanel, click en **"Create"** → **"App"**
2. Nombre: `billtracky-api`
3. Source: **GitHub**
4. Repository: `Victamina15/billtracky-2`
5. Branch: `main`

### 1.2 Configurar Build

1. **Build Method**: Dockerfile
2. **Build Path**: `apps/api`
3. **Dockerfile Path**: `Dockerfile`

### 1.3 Variables de Entorno

Click en **"Environment"** y agregar:

```
PORT=3001
NODE_ENV=production
DATABASE_URL=postgresql://postgres:TU_PASSWORD@postgres-db:5432/app-pos-2
INIT_DB=false
CORS_ORIGIN=http://tu-dominio-dashboard.com,http://tu-dominio-facturacion.com,http://tu-dominio-configuracion.com
```

**IMPORTANTE:**
- Reemplaza `TU_PASSWORD` con tu contraseña de PostgreSQL
- Reemplaza los dominios en `CORS_ORIGIN` con tus dominios reales de EasyPanel
- Si no tienes dominios, usa las URLs que EasyPanel te asigne

### 1.4 Configurar Puerto

1. Click en **"Networking"**
2. **Port**: 3001
3. **Expose**: Sí (activado)

### 1.5 Deploy

1. Click en **"Deploy"**
2. Espera a que termine el build (puede tomar 3-5 minutos)
3. Verifica los logs: deberías ver `📡 API disponible en: http://localhost:3001`

### 1.6 Obtener URL del API

Una vez desplegado, EasyPanel te dará una URL como:
```
https://billtracky-api-xxxxx.easypanel.host
```

**GUARDA ESTA URL** - la necesitarás para los módulos frontend.

## Paso 2: Desplegar Dashboard

### 2.1 Crear Nueva Aplicación

1. En EasyPanel, click en **"Create"** → **"App"**
2. Nombre: `billtracky-dashboard`
3. Source: **GitHub**
4. Repository: `Victamina15/billtracky-2`
5. Branch: `main`

### 2.2 Configurar Build

1. **Build Method**: Dockerfile
2. **Build Path**: `apps/pos/dashboard`
3. **Dockerfile Path**: `Dockerfile`

### 2.3 Variables de Entorno

```
VITE_API_URL=https://billtracky-api-xxxxx.easypanel.host
```

Usa la URL del API que guardaste en el Paso 1.6

### 2.4 Configurar Puerto

1. Click en **"Networking"**
2. **Port**: 80
3. **Expose**: Sí (activado)

### 2.5 Deploy

1. Click en **"Deploy"**
2. Espera a que termine el build
3. Abre la URL que EasyPanel te asigne

### 2.6 Probar Dashboard

Deberías ver:
- ✅ Dashboard cargando correctamente
- ✅ Logo "Billtracky"
- ✅ Tarjetas de módulos (Facturación, Configuración)
- ✅ Estadísticas

## Paso 3: Desplegar Facturación

### 3.1 Crear Nueva Aplicación

1. En EasyPanel, click en **"Create"** → **"App"**
2. Nombre: `billtracky-facturacion`
3. Source: **GitHub**
4. Repository: `Victamina15/billtracky-2`
5. Branch: `main`

### 3.2 Configurar Build

1. **Build Method**: Dockerfile
2. **Build Path**: `apps/pos/facturacion`
3. **Dockerfile Path**: `Dockerfile`

### 3.3 Variables de Entorno

```
VITE_API_URL=https://billtracky-api-xxxxx.easypanel.host
```

### 3.4 Configurar Puerto

1. Click en **"Networking"**
2. **Port**: 80
3. **Expose**: Sí (activado)

### 3.5 Deploy y Probar

1. Click en **"Deploy"**
2. Una vez desplegado, abre la URL
3. Deberías ver el módulo de facturación con el catálogo de servicios

## Paso 4: Desplegar Configuración

### 4.1 Crear Nueva Aplicación

1. En EasyPanel, click en **"Create"** → **"App"**
2. Nombre: `billtracky-configuracion`
3. Source: **GitHub**
4. Repository: `Victamina15/billtracky-2`
5. Branch: `main`

### 4.2 Configurar Build

1. **Build Method**: Dockerfile
2. **Build Path**: `apps/pos/configuracion`
3. **Dockerfile Path**: `Dockerfile`

### 4.3 Variables de Entorno

```
VITE_API_URL=https://billtracky-api-xxxxx.easypanel.host
```

### 4.4 Configurar Puerto

1. Click en **"Networking"**
2. **Port**: 80
3. **Expose**: Sí (activado)

### 4.5 Deploy y Probar

1. Click en **"Deploy"**
2. Abre la URL cuando termine
3. Deberías ver las pestañas: Servicios, Categorías, Métodos de Pago

## Paso 5: Actualizar URLs en Dashboard

Ahora que tienes todas las URLs, actualiza el Dashboard:

### 5.1 Obtener las URLs

Anota las URLs que EasyPanel te asignó:
- Dashboard: `https://billtracky-dashboard-xxxxx.easypanel.host`
- Facturación: `https://billtracky-facturacion-xxxxx.easypanel.host`
- Configuración: `https://billtracky-configuracion-xxxxx.easypanel.host`
- API: `https://billtracky-api-xxxxx.easypanel.host`

### 5.2 Actualizar CORS en Backend

1. Ve a `billtracky-api` en EasyPanel
2. Click en **"Environment"**
3. Actualiza `CORS_ORIGIN`:
```
CORS_ORIGIN=https://billtracky-dashboard-xxxxx.easypanel.host,https://billtracky-facturacion-xxxxx.easypanel.host,https://billtracky-configuracion-xxxxx.easypanel.host
```
4. Click en **"Rebuild"**

### 5.3 Actualizar Sidebar.jsx (Opcional)

Si quieres que el Dashboard abra los módulos en nueva pestaña con las URLs correctas:

1. Edita localmente `apps/pos/dashboard/src/components/Sidebar.jsx`
2. Actualiza las URLs en el array `modules`:
```javascript
const modules = [
  {
    id: 'facturacion',
    name: 'Facturación',
    icon: Receipt,
    url: 'https://billtracky-facturacion-xxxxx.easypanel.host',
    external: true
  },
  {
    id: 'configuracion',
    name: 'Configuración',
    icon: Settings,
    url: 'https://billtracky-configuracion-xxxxx.easypanel.host',
    external: true,
    // ...
  }
]
```
3. Commit y push:
```bash
git add apps/pos/dashboard/src/components/Sidebar.jsx
git commit -m "Update module URLs for production"
git push
```
4. En EasyPanel, click en **"Rebuild"** en el Dashboard

## Paso 6: Verificación Final

### 6.1 Probar Backend API

```bash
# Health check
curl https://billtracky-api-xxxxx.easypanel.host/health

# Debería devolver: {"success":true,"message":"API funcionando correctamente"}
```

### 6.2 Probar Dashboard

1. Abre: `https://billtracky-dashboard-xxxxx.easypanel.host`
2. Verifica:
   - ✅ Dashboard carga sin errores
   - ✅ Tarjetas de módulos son clicables
   - ✅ Estadísticas se muestran

### 6.3 Probar Configuración

1. Abre: `https://billtracky-configuracion-xxxxx.easypanel.host`
2. Ve a **"Servicios"**
3. Crea un nuevo servicio:
   - Nombre: "Prueba"
   - Categoría: "lavanderia"
   - Precio: 100
   - Unidad: "unidad"
4. Click en **"Crear Servicio"**
5. ✅ Debería guardarse y aparecer en la lista

### 6.4 Probar Facturación

1. Abre: `https://billtracky-facturacion-xxxxx.easypanel.host`
2. Busca el servicio "Prueba" que creaste
3. Agrégalo al carrito
4. ✅ Debería aparecer en el carrito con el precio correcto

### 6.5 Verificar Persistencia

1. Refresca la página de Configuración (F5)
2. El servicio "Prueba" debe seguir ahí
3. ✅ Esto confirma que está guardado en PostgreSQL

## Resumen de URLs

Una vez todo desplegado, tendrás:

| Servicio | URL | Uso |
|----------|-----|-----|
| Dashboard | https://billtracky-dashboard-xxxxx.easypanel.host | Hub principal |
| Facturación | https://billtracky-facturacion-xxxxx.easypanel.host | Crear facturas |
| Configuración | https://billtracky-configuracion-xxxxx.easypanel.host | Gestionar servicios |
| Backend API | https://billtracky-api-xxxxx.easypanel.host | API REST |

## Troubleshooting

### Error: CORS

Si ves errores CORS en la consola del navegador:

1. Ve a `billtracky-api` en EasyPanel
2. Verifica que `CORS_ORIGIN` incluye las URLs correctas
3. Asegúrate de usar `https://` no `http://`
4. Click en **"Rebuild"**

### Error: Cannot connect to API

Si el frontend no puede conectar al API:

1. Verifica que `VITE_API_URL` está configurado correctamente
2. Prueba el API directamente con curl
3. Verifica que el API está corriendo en EasyPanel
4. Revisa los logs del API

### Error: Build failed

Si algún build falla:

1. Click en **"Logs"** para ver el error
2. Verifica que el **Build Path** es correcto
3. Verifica que el **Dockerfile Path** es `Dockerfile`
4. Intenta **"Clear Cache"** y rebuild

### Build muy lento

Los builds pueden tomar 3-5 minutos cada uno porque:
- Instalan todas las dependencias npm
- Compilan con Vite
- Optimizan para producción

Esto es normal. Una vez construidos, se cachean.

## Próximos Pasos

1. ✅ Configurar dominios personalizados (opcional)
2. ✅ Configurar backups automáticos de PostgreSQL
3. ✅ Agregar monitoreo de uptime
4. ✅ Implementar autenticación de usuarios

Felicidades! Tu aplicación Billtracky 2.0 está desplegada y funcionando en producción.
