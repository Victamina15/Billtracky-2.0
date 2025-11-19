# 🚀 Despliegue Inmediato - EasyPanel

## Acceso a EasyPanel
1. Abre: https://panel.billtracky.com
2. Login con: robinsonsilverio1844@gmail.com

---

## 🔴 PASO 1: Backend API (5 minutos)

### 1.1 Crear App
1. Click en **"+ New"** (botón verde arriba a la derecha)
2. Selecciona **"App"**
3. **App Name**: `api`
4. Click **"Create"**

### 1.2 Configurar Source
1. En la app recién creada, ve a **"Source"**
2. **Provider**: GitHub
3. **Repository**: `Victamina15/billtracky-2`
4. **Branch**: `main`
5. **Build Path**: `apps/api`
6. Click **"Save"**

### 1.3 Variables de Entorno
1. Ve a **"Environment"**
2. Click **"Add Variable"** para cada una:

```
PORT = 3001
NODE_ENV = production
DATABASE_URL = postgresql://postgres:tu_password_postgres@postgres:5432/app-pos-2
INIT_DB = false
```

**IMPORTANTE:** Reemplaza `tu_password_postgres` con la contraseña real de tu PostgreSQL en EasyPanel.

Para CORS, por ahora usa:
```
CORS_ORIGIN = *
```
(Lo actualizaremos después con las URLs reales)

3. Click **"Save"**

### 1.4 Configurar Puerto
1. Ve a **"Domains"**
2. **Port**: `3001`
3. Click en **"Generate Domain"** para obtener una URL automática
4. **COPIA Y GUARDA ESTA URL** - la necesitarás para los frontends

Ejemplo: `https://api-xxxxx.billtracky.com`

### 1.5 Deploy
1. Click en **"Deploy"** (botón azul arriba)
2. Espera 3-5 minutos
3. Verifica en **"Logs"** que veas: `📡 API disponible en: http://localhost:3001`

✅ **API desplegado!**

---

## 🟢 PASO 2: Dashboard (3 minutos)

### 2.1 Crear App
1. Click en **"+ New"**
2. Selecciona **"App"**
3. **App Name**: `dashboard`
4. Click **"Create"**

### 2.2 Configurar Source
1. En **"Source"**:
   - **Provider**: GitHub
   - **Repository**: `Victamina15/billtracky-2`
   - **Branch**: `main`
   - **Build Path**: `apps/pos/dashboard`
2. Click **"Save"**

### 2.3 Variables de Entorno
1. En **"Environment"**, agregar:

```
VITE_API_URL = https://api-xxxxx.billtracky.com
```

Usa la URL del API que guardaste en el Paso 1.4

2. Click **"Save"**

### 2.4 Configurar Puerto
1. En **"Domains"**:
   - **Port**: `80`
   - Click **"Generate Domain"**
2. **GUARDA ESTA URL**

### 2.5 Deploy
1. Click **"Deploy"**
2. Espera 3-5 minutos
3. Abre la URL cuando termine

✅ **Dashboard desplegado!**

---

## 🟡 PASO 3: Facturación (3 minutos)

### 3.1 Crear App
1. **+ New** → **App**
2. **App Name**: `facturacion`
3. **Create**

### 3.2 Configurar Source
1. **Source**:
   - GitHub
   - `Victamina15/billtracky-2`
   - Branch: `main`
   - **Build Path**: `apps/pos/facturacion`
2. **Save**

### 3.3 Variables de Entorno
```
VITE_API_URL = https://api-xxxxx.billtracky.com
```

### 3.4 Puerto y Dominio
- **Port**: `80`
- **Generate Domain**
- **GUARDA LA URL**

### 3.5 Deploy
- Click **"Deploy"**
- Espera el build

✅ **Facturación desplegado!**

---

## 🔵 PASO 4: Configuración (3 minutos)

### 4.1 Crear App
1. **+ New** → **App**
2. **App Name**: `configuracion`
3. **Create**

### 4.2 Configurar Source
1. **Source**:
   - GitHub
   - `Victamina15/billtracky-2`
   - Branch: `main`
   - **Build Path**: `apps/pos/configuracion`
2. **Save**

### 4.3 Variables de Entorno
```
VITE_API_URL = https://api-xxxxx.billtracky.com
```

### 4.4 Puerto y Dominio
- **Port**: `80`
- **Generate Domain**
- **GUARDA LA URL**

### 4.5 Deploy
- Click **"Deploy"**

✅ **Configuración desplegado!**

---

## ⚙️ PASO 5: Actualizar CORS (2 minutos)

Ahora que tienes todas las URLs, actualiza el backend:

1. Ve a la app **"api"**
2. En **"Environment"**, edita `CORS_ORIGIN`:

```
CORS_ORIGIN = https://dashboard-xxxxx.billtracky.com,https://facturacion-xxxxx.billtracky.com,https://configuracion-xxxxx.billtracky.com
```

Reemplaza `xxxxx` con tus URLs reales (sin espacios, separadas por comas)

3. **Save**
4. Click **"Redeploy"**

---

## ✅ VERIFICACIÓN FINAL

### Probar API
Abre en tu navegador:
```
https://api-xxxxx.billtracky.com/health
```

Deberías ver:
```json
{"success":true,"message":"API funcionando correctamente"}
```

### Probar Dashboard
1. Abre: `https://dashboard-xxxxx.billtracky.com`
2. Deberías ver el menú principal con tarjetas de módulos

### Probar Configuración
1. Abre: `https://configuracion-xxxxx.billtracky.com`
2. Ve a **"Servicios"**
3. Crea un servicio de prueba
4. Debería guardarse en PostgreSQL

### Probar Facturación
1. Abre: `https://facturacion-xxxxx.billtracky.com`
2. Deberías ver el servicio que creaste
3. Agrégalo al carrito

---

## 🎯 URLs Finales

Una vez completado, tendrás:

```
Dashboard:      https://dashboard-xxxxx.billtracky.com
Facturación:    https://facturacion-xxxxx.billtracky.com
Configuración:  https://configuracion-xxxxx.billtracky.com
API:            https://api-xxxxx.billtracky.com
```

---

## 🆘 Problemas Comunes

### Build Failed
- Verifica que el **Build Path** sea exacto
- En **Logs**, busca el error específico
- Puede tardar 5-10 minutos en la primera build

### CORS Error
- Verifica que `CORS_ORIGIN` tenga TODAS las URLs frontend
- Sin espacios, separadas por comas
- Con `https://` incluido
- Redeploy el API después de cambiar

### Can't Connect to API
- Verifica que `VITE_API_URL` en cada frontend apunte al API correcto
- Verifica que el API esté corriendo (check logs)
- Prueba el endpoint `/health` directamente

---

## ⏱️ Tiempo Total Estimado
- Paso 1 (API): 5 minutos
- Paso 2 (Dashboard): 3 minutos
- Paso 3 (Facturación): 3 minutos
- Paso 4 (Configuración): 3 minutos
- Paso 5 (CORS): 2 minutos

**Total: ~15-20 minutos**

---

## 📝 Notas

- Los builds pueden tomar hasta 5 minutos cada uno
- EasyPanel cachea los builds, los siguientes serán más rápidos
- Si algo falla, revisa los **Logs** de cada app
- Todos los archivos Dockerfile y configuraciones ya están en GitHub

**¡Listo para desplegar! Empieza con el Paso 1.** 🚀
