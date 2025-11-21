# 🔧 Refactorización Pendiente - Código Duplicado

## ⚠️ Problema Principal

El proyecto tiene aproximadamente **~3000 líneas de código duplicado** entre las apps de `configuracion`, `facturacion` y `dashboard`. Esto genera:

- **Mantenimiento doble/triple**: Cada bug fix debe aplicarse en múltiples lugares
- **Inconsistencias**: Cambios en un lugar no se reflejan en otros
- **Tamaño de bundle aumentado**: Código repetido innecesariamente

---

## 📂 Archivos Duplicados Identificados

### **APIs (562 líneas totales)**

Ubicaciones duplicadas:
- `apps/pos/configuracion/src/api/`
- `apps/pos/dashboard/src/api/`

Archivos:
1. **servicios.js** (226 líneas) - API para servicios
2. **categorias.js** (156 líneas) - API para categorías
3. **metodosPago.js** (180 líneas) - API para métodos de pago

### **Hooks de Zustand (343 líneas totales)**

Ubicaciones duplicadas:
- `apps/pos/configuracion/src/hooks/`
- `apps/pos/dashboard/src/hooks/`

Archivos:
1. **useServiciosStore.js** (118 líneas)
2. **useCategoriasStore.js** (99 líneas)
3. **useMetodosPagoStore.js** (126 líneas)

### **Componentes de Facturación (~2000 líneas)**

Ubicaciones duplicadas:
- `apps/pos/facturacion/src/components/`
- `apps/pos/dashboard/src/components/facturacion/`

Componentes duplicados:
1. **factura/PanelFactura.jsx**
2. **factura/Header.jsx**
3. **factura/MetodosPago.jsx**
4. **factura/LineaFactura.jsx**
5. **factura/Totales.jsx**
6. **factura/ClienteSelector.jsx**
7. **factura/FechaEntregaSelector.jsx**
8. **servicios/Categorias.jsx**
9. **servicios/ListaServicios.jsx**
10. **servicios/ServicioCard.jsx**

Páginas duplicadas:
- **NuevaFacturaPage.jsx**

---

## 🎯 Solución Recomendada

### **Opción 1: Crear carpeta `/apps/shared/` (Recomendado)**

```
/apps
  /shared
    /api          <- Mover aquí servicios.js, categorias.js, metodosPago.js
    /hooks        <- Mover aquí los 3 hooks de zustand
    /components   <- Mover aquí componentes de facturacion compartidos
  /pos
    /configuracion
    /facturacion
    /dashboard
```

**Ventajas:**
- Centraliza todo el código compartido
- Fácil de mantener
- Imports claros desde `@shared`

**Implementación:**
1. Crear carpeta `/apps/shared/`
2. Mover archivos duplicados a shared
3. Configurar alias de Vite en todos los `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../../shared/src'),
    },
  },
  server: {
    port: 5176, // o el que corresponda
    host: true,
  },
})
```

4. Actualizar imports en todos los archivos que usan estos recursos:

```javascript
// Antes
import { useServiciosStore } from '../hooks/useServiciosStore'

// Después
import { useServiciosStore } from '@shared/hooks/useServiciosStore'
```

---

### **Opción 2: Usar Monorepo Packages**

Convertir el proyecto en un monorepo real con pnpm workspaces o npm workspaces:

```
/packages
  /shared-api
  /shared-hooks
  /shared-components
/apps
  /pos
    /configuracion
    /facturacion
    /dashboard
```

**Ventajas:**
- Más profesional
- Versionado independiente
- Mejor para escalabilidad

**Desventajas:**
- Requiere más configuración inicial
- Más complejo de gestionar

---

## 📋 Plan de Acción Sugerido

### **Fase 1: Preparación**
1. ✅ Crear rama de refactoring
2. ✅ Hacer backup del proyecto
3. ✅ Crear carpeta `/apps/shared/src/`

### **Fase 2: Migración de APIs**
1. Mover `servicios.js`, `categorias.js`, `metodosPago.js` a `/apps/shared/src/api/`
2. Eliminar duplicados de `configuracion` y `dashboard`
3. Actualizar imports en archivos que los usan
4. Probar que funcionan correctamente

### **Fase 3: Migración de Hooks**
1. Mover los 3 hooks a `/apps/shared/src/hooks/`
2. Eliminar duplicados
3. Actualizar imports
4. Probar stores

### **Fase 4: Migración de Componentes**
1. Mover componentes de facturación a `/apps/shared/src/components/facturacion/`
2. Eliminar duplicados en dashboard
3. Actualizar imports en facturacion y dashboard
4. Verificar que ambas apps funcionan correctamente

### **Fase 5: Configuración de Vite**
1. Agregar alias `@shared` en todos los `vite.config.js`
2. Probar hot reload y desarrollo
3. Probar builds de producción

### **Fase 6: Testing**
1. Probar todas las apps individualmente
2. Probar integración
3. Verificar que no hay imports rotos
4. Verificar que builds funcionan

---

## 🚨 Notas Importantes

- **NO hacer esta refactorización sin tests**: Agregar tests básicos primero
- **Hacer en rama separada**: No romper main/master
- **Commits atómicos**: Un commit por cada tipo de archivo migrado
- **Probar después de cada paso**: No avanzar si algo se rompe
- **Comunicar con el equipo**: Esta refactorización afecta toda la base de código

---

## 📊 Impacto Estimado

- **Tiempo estimado**: 6-8 horas de desarrollo
- **Líneas de código eliminadas**: ~3000
- **Archivos afectados**: ~40-50
- **Riesgo**: Medio (con tests y plan adecuado)
- **Beneficio**: Alto (mantenibilidad a largo plazo)

---

## 🔗 Referencias

- Ver `ARCHITECTURE.md` para la arquitectura propuesta (ya menciona aliases pero no están implementados)
- Documentación de Vite aliases: https://vitejs.dev/config/shared-options.html#resolve-alias
- Guía de monorepos: https://pnpm.io/workspaces
