# Billtracky-2.0 - Arquitectura Consolidada

> **NOTA IMPORTANTE**: Este es el proyecto principal activo de desarrollo.
>
> **Estructura de Proyectos**:
> - `~/Desktop/billtracky-2` (este proyecto) → **PROYECTO PRINCIPAL ACTIVO**
>   - Repositorio: https://github.com/Victamina15/billtracky-2.git
>   - Todo el desarrollo nuevo se realiza aquí
>   - Arquitectura limpia de monorepo con packages compartidos
>   - Contiene: Dashboard integrado, API Backend, Packages reutilizables
>
> - `~/Desktop/BillTracky-1` → **SOLO LECTURA** (referencia del sistema anterior)
>   - Repositorio: https://github.com/Victamina15/Billtracky-1.git
>   - Se usa únicamente como referencia del código viejo
>   - NO modificar ni hacer commits aquí

---

## 🎯 Cambios Recientes (2025-11-21)

### ✅ Consolidación Completada

**~7,400 líneas de código duplicado eliminadas:**
- ❌ Eliminado módulo standalone `apps/pos/facturacion/` (1,233 líneas)
- ❌ Eliminado módulo standalone `apps/pos/configuracion/` (2,260 líneas)
- ❌ Eliminado código duplicado en `dashboard/components/` (2,448 líneas)
- ❌ Eliminado hooks, utils y api duplicados (1,458 líneas)

**✅ Nueva arquitectura de packages compartidos:**
- ✅ `packages/components/` - 19 componentes reutilizables
- ✅ `packages/stores/` - 5 Zustand stores unificados
- ✅ `packages/utils/` - 3 utilidades compartidas
- ✅ `packages/api-client/` - 4 clientes de API
- ✅ Backend API completo (controllers para categorías y métodos de pago)
- ✅ Build exitoso (629 KB bundle, 181 KB gzip)

---

## Estructura del Monorepo Billtracky-2.0

### Arquitectura Consolidada

```
billtracky-2/
├── apps/
│   ├── pos/
│   │   └── dashboard/          → APLICACIÓN PRINCIPAL (Frontend)
│   │       ├── src/
│   │       │   ├── pages/
│   │       │   ├── layout/
│   │       │   ├── components/ui/
│   │       │   ├── data/
│   │       │   ├── lib/
│   │       │   ├── App.jsx
│   │       │   └── main.jsx
│   │       ├── vite.config.js  (con alias a packages/)
│   │       └── package.json
│   │
│   └── api/                    → BACKEND (Node.js + PostgreSQL)
│       ├── src/
│       │   ├── controllers/
│       │   │   ├── servicios.controller.js
│       │   │   ├── categorias.controller.js ✅ NUEVO
│       │   │   └── metodosPago.controller.js ✅ NUEVO
│       │   ├── routes/
│       │   │   ├── servicios.js
│       │   │   ├── categorias.js ✅ COMPLETADO
│       │   │   ├── metodosPago.js ✅ COMPLETADO
│       │   │   └── facturas.js
│       │   ├── config/database.js
│       │   ├── db/schema.sql
│       │   └── index.js
│       └── package.json
│
├── packages/                   → CÓDIGO COMPARTIDO ✅ NUEVO
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── ClienteSelector.jsx
│   │   │   └── FechaEntregaSelector.jsx
│   │   ├── servicios/
│   │   │   ├── Categorias.jsx
│   │   │   ├── ServicioCard.jsx
│   │   │   └── ListaServicios.jsx
│   │   ├── factura/
│   │   │   ├── LineaFactura.jsx
│   │   │   ├── PanelFactura.jsx
│   │   │   ├── Totales.jsx
│   │   │   └── MetodosPago.jsx
│   │   └── configuracion/
│   │       ├── servicios/ (3 componentes)
│   │       ├── categorias/ (3 componentes)
│   │       └── metodosPago/ (3 componentes)
│   │
│   ├── stores/
│   │   ├── useFacturaStore.js (versión mejorada)
│   │   ├── useClientesStore.js
│   │   ├── useServiciosStore.js
│   │   ├── useCategoriasStore.js
│   │   └── useMetodosPagoStore.js
│   │
│   ├── utils/
│   │   ├── formatCurrency.js
│   │   ├── formatDate.js
│   │   └── validations.js
│   │
│   └── api-client/
│       ├── servicios.js (versión completa con JSDoc)
│       ├── categorias.js
│       ├── metodosPago.js
│       └── facturas.js
│
├── package.json                → Monorepo workspace config
├── DIAGNOSTICO-CODIGO.md       → Informe de análisis y limpieza
├── ARCHITECTURE.md             → Este archivo
└── DEPLOYMENT.md               → Guía de deployment
```

---

## Aplicaciones

### 1. apps/pos/dashboard/ → **APLICACIÓN PRINCIPAL**

Dashboard integrado con todas las funcionalidades:
- **Facturación POS**: Sistema completo de punto de venta
- **Configuración**: CRUD de servicios, categorías y métodos de pago
- **Clientes**: Gestión de clientes (en desarrollo)
- **Reportes**: Dashboard con métricas (futuro)

**Tecnologías**:
- React 19, Vite 7
- Zustand 5.0 (state management)
- TailwindCSS 4.1 (estilos)
- React Query 5 (data fetching)
- React Router 7 (navegación)

**Imports desde packages**:
```javascript
// Componentes
import { Header } from '@billtracky/components/layout/Header';
import { ServicioCard } from '@billtracky/components/servicios/ServicioCard';

// Stores
import { useFacturaStore } from '@billtracky/stores/useFacturaStore';
import { useServiciosStore } from '@billtracky/stores/useServiciosStore';

// Utils
import { formatCurrency } from '@billtracky/utils/formatCurrency';

// API
import { getServicios } from '@billtracky/api-client/servicios';
```

---

### 2. apps/api/ → **BACKEND API**

API REST completa con PostgreSQL:
- **✅ CRUD Servicios**: Completo con validación Zod
- **✅ CRUD Categorías**: Completo con validación Zod ✅ NUEVO
- **✅ CRUD Métodos de Pago**: Completo con validación Zod ✅ NUEVO
- **Facturas**: En desarrollo

**Endpoints disponibles**:
```
GET    /api/servicios
POST   /api/servicios
PUT    /api/servicios/:id
DELETE /api/servicios/:id
PATCH  /api/servicios/:id/toggle

GET    /api/categorias           ✅ NUEVO
POST   /api/categorias           ✅ NUEVO
PUT    /api/categorias/:id       ✅ NUEVO
DELETE /api/categorias/:id       ✅ NUEVO
PATCH  /api/categorias/:id/toggle ✅ NUEVO

GET    /api/metodos-pago         ✅ NUEVO
POST   /api/metodos-pago         ✅ NUEVO
PUT    /api/metodos-pago/:id     ✅ NUEVO
DELETE /api/metodos-pago/:id     ✅ NUEVO
PATCH  /api/metodos-pago/:id/toggle ✅ NUEVO
```

**Tecnologías**:
- Express 5.1
- PostgreSQL 17 (via pg 8.16)
- Zod 4.1 (validación)
- CORS, dotenv

---

## Paquetes Compartidos (packages/)

### packages/components/
**19 componentes React reutilizables:**
- Layout: Header, ClienteSelector, FechaEntregaSelector
- Servicios: Categorias, ServicioCard, ListaServicios
- Factura: LineaFactura, PanelFactura, Totales, MetodosPago
- Configuración: 9 componentes (servicios, categorías, métodos de pago)

### packages/stores/
**5 Zustand stores:**
- `useFacturaStore` - Gestión de factura (versión mejorada con estados)
- `useClientesStore` - Gestión de clientes
- `useServiciosStore` - Gestión de servicios
- `useCategoriasStore` - Gestión de categorías
- `useMetodosPagoStore` - Gestión de métodos de pago

### packages/utils/
**3 utilidades:**
- `formatCurrency.js` - Formato de moneda DOP
- `formatDate.js` - Formato de fechas
- `validations.js` - Schemas Zod compartidos

### packages/api-client/
**4 clientes API:**
- `servicios.js` - Cliente completo con JSDoc
- `categorias.js` - Cliente de categorías
- `metodosPago.js` - Cliente de métodos de pago
- `facturas.js` - Cliente de facturas

---

## Configuración de Despliegue

- **Dockerfile**: Multi-stage (Node + Nginx)
- **nginx.conf**: Servidor optimizado para SPA
- **package.json raíz**: Workspace configuration
- **DEPLOYMENT.md**: Guía completa de deployment en EasyPanel
- **ENVIRONMENT.md**: Variables de entorno

## Infraestructura en EasyPanel (Producción)

### Servicios Desplegados
1. **PostgreSQL 17** - Base de datos principal
   - Host: `app-pos-2_postgres-db:5432`
   - Database: `app-pos-2`

2. **Metabase v0.55.8.6** - Análisis de datos
   - URL interna: `http://app-pos-2_metabase:80`

3. **Billtracky-2** - Frontend POS
   - Puerto: 80
   - Build: Vite + React + TailwindCSS
   - Servidor: Nginx Alpine

### Variables de Entorno Configuradas
```
DATABASE_URL=postgresql://postgres:1976@app-pos-2_postgres-db:5432/app-pos-2
NODE_ENV=production
METABASE_URL=http://app-pos-2_metabase:80
```

Ver `ENVIRONMENT.md` para detalles completos.

## 🔗 Integración de Módulos

### Arquitectura de Integración

```
┌────────────────────────────────────────┐
│     MÓDULO CONFIGURACIÓN               │
│  (Datos Maestros - Backoffice)         │
│                                        │
│  • useServiciosStore (Zustand)         │
│  • useCategoriasStore (Zustand)        │
│  • useMetodosPagoStore (Zustand)       │
│                                        │
│  API Pública:                          │
│  └─→ src/api/servicios.js              │
│  └─→ src/api/categorias.js             │
│  └─→ src/api/metodosPago.js            │
└────────────────┬───────────────────────┘
                 │ @configuracion alias
                 │ (Vite resolve.alias)
                 ▼
┌────────────────────────────────────────┐
│     MÓDULO FACTURACIÓN                 │
│  (Punto de Venta - Cajeros)            │
│                                        │
│  Importa desde @configuracion:         │
│  • getServicios()                      │
│  • getCategorias()                     │
│  • getMetodosPago()                    │
│                                        │
│  useFacturaStore (Zustand local)       │
│  └─→ Gestiona carrito y factura       │
└────────────────────────────────────────┘
```

### Beneficios de la Integración

1. **Fuente Única de Verdad**: Los datos maestros se definen solo en CONFIGURACIÓN
2. **Validación Centralizada**: Zod valida en CONFIGURACIÓN
3. **Sin Duplicación**: FACTURACIÓN consume, no replica
4. **Sincronización**: React Query cachea y actualiza automáticamente
5. **Escalable**: Nuevos módulos pueden consumir la misma API

Ver `INTEGRACION.md` para documentación completa de la integración.