# Módulo de Facturación - Billtracky 2.0

## 🎯 Descripción

Módulo profesional de facturación POS diseñado para lavanderías. Interfaz moderna estilo Shopify POS que permite crear facturas de forma rápida e intuitiva.

## 🚀 Características

### Implementadas
- ✅ Interfaz de dos columnas (servicios + resumen)
- ✅ Gestión de estado con Zustand
- ✅ Grid de servicios con búsqueda
- ✅ Carrito de facturación interactivo
- ✅ Cálculo automático de totales e ITBIS (18%)
- ✅ Selector de métodos de pago
- ✅ Gestión de cantidades (incrementar/decrementar)
- ✅ Diseño responsive y profesional
- ✅ Iconos modernos con Lucide React
- ✅ Utilidades de fechas con date-fns

### Por Implementar
- ⏳ Conexión con módulo de CONFIGURACIÓN
- ⏳ Conexión con base de datos PostgreSQL
- ⏳ Generación de PDF de facturas
- ⏳ Impresión de tickets
- ⏳ Búsqueda de clientes
- ⏳ Histórico de facturas
- ⏳ Validaciones avanzadas

## 📁 Estructura del Proyecto

```
facturacion/
├── src/
│   ├── pages/
│   │   └── NuevaFacturaPage.jsx    # Página principal
│   ├── components/
│   │   ├── HeaderFacturacion.jsx   # Encabezado con fecha y cajero
│   │   ├── ServiciosGrid.jsx       # Grid de servicios disponibles
│   │   ├── ServicioCard.jsx        # Tarjeta individual de servicio
│   │   ├── ResumenFactura.jsx      # Panel de resumen lateral
│   │   ├── LineaFactura.jsx        # Línea de item en factura
│   │   ├── TotalesFactura.jsx      # Cálculo de totales
│   │   └── MetodoPagoSelector.jsx  # Selector de método de pago
│   ├── hooks/
│   │   └── useFactura.js           # Estado global con Zustand
│   ├── data/
│   │   └── mockServicios.js        # Datos mock de servicios
│   └── utils/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🛠️ Tecnologías Modernas

### Core
- **React 19** - Framework UI
- **Vite 7** - Build tool ultrarrápido
- **TailwindCSS 3.4** - Estilos utility-first

### Librerías Profesionales
- **Zustand 5.0** - Estado global ligero y moderno
- **Lucide React** - Iconos SVG profesionales
- **clsx** - Manejo de clases CSS dinámicas
- **date-fns** - Manipulación de fechas

## 🎨 Diseño

### Colores Oficiales
- Fondo: `#F4F4F5` (Gris claro)
- Contenedores: `#FFFFFF` (Blanco)
- Primario: Azul (`blue-500`, `blue-600`)
- Acentos: Gradientes de azul

### Tipografía
- Sistema: `system-ui, -apple-system, sans-serif`
- Pesos: Regular (400), Semibold (600), Bold (700)

## 🔄 Flujo de Trabajo

### 1. Selección de Servicios
```
Usuario → ServiciosGrid → Click en ServicioCard → agregarServicio()
```

### 2. Gestión del Carrito
```
ResumenFactura → LineaFactura → incrementar/decrementar/eliminar
```

### 3. Cálculo Automático
```
useFactura → getSubtotal() → getItbis() → getTotal()
```

### 4. Finalización
```
Seleccionar método de pago → Completar factura → Alert (temporal)
```

## 🔌 Preparado para Integración

### Módulo CONFIGURACIÓN (Futuro)
El módulo está preparado para recibir datos del módulo de configuración:

```javascript
// Placeholders en mockServicios.js
export const getServiciosConfigurados = async () => {
  // TODO: Conectar con módulo de configuración
  // return await api.getServicios();
};

export const getMetodosPagoConfigurados = async () => {
  // TODO: Conectar con módulo de configuración
  // return await api.getMetodosPago();
};
```

### Base de Datos
Preparado para conectar con PostgreSQL a través de variables de entorno:

```env
DATABASE_URL=postgresql://postgres:1976@app-pos-2_postgres-db:5432/app-pos-2
```

## 📊 Lógica de Negocio

### Cálculo de ITBIS
- Tasa fija: 18%
- Se aplica al subtotal
- Se muestra desglosado en el resumen

### Gestión de Items
- Cada servicio puede tener múltiples unidades
- Precio unitario fijo por servicio
- Subtotal calculado automáticamente

### Validaciones
- No se puede completar sin items
- No se puede completar sin método de pago
- Cantidad mínima: 1

## 🚀 Comandos

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 🔜 Próximos Pasos

1. **Integración con Backend**
   - Guardar facturas en PostgreSQL
   - Autenticación de cajeros
   - Búsqueda de clientes

2. **Generación de Documentos**
   - PDF de facturas
   - Tickets de impresión térmica
   - Envío por email/WhatsApp

3. **Módulo CONFIGURACIÓN**
   - Gestión de servicios
   - Configuración de precios
   - Métodos de pago habilitados
   - Personalización de ITBIS

4. **Reportes y Análisis**
   - Dashboard de ventas
   - Integración con Metabase
   - Estadísticas en tiempo real

## 📝 Notas Importantes

- ⚠️ Datos actuales son **MOCK** - Todo es temporal
- ⚠️ La función "Completar Factura" solo muestra un alert
- ⚠️ No hay persistencia de datos aún
- ✅ El código está listo para conectarse a backend
- ✅ Usa las mejores prácticas de React moderno
- ✅ Sin dependencias obsoletas

## 🏗️ Arquitectura

```
Usuario
  ↓
NuevaFacturaPage (Layout)
  ↓
  ├─→ ServiciosGrid → ServicioCard → useFactura.agregarServicio()
  └─→ ResumenFactura
        ├─→ LineaFactura → useFactura (incrementar/decrementar/eliminar)
        ├─→ TotalesFactura → useFactura (getSubtotal/getItbis/getTotal)
        └─→ MetodoPagoSelector → useFactura.setMetodoPago()
```

---

**Desarrollado con Claude Code** 🤖
