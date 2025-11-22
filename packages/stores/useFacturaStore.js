import { create } from 'zustand';
import { z } from 'zod';

/**
 * Schema de validación con Zod para líneas de factura
 */
const LineaFacturaSchema = z.object({
  id: z.string(),
  servicioId: z.number(),
  nombre: z.string().min(1),
  precio: z.number().positive(),
  cantidad: z.number().positive(),
  unidad: z.string(),
  subtotal: z.number().nonnegative(),
});

const ITBIS_RATE = 0.18; // 18% ITBIS en República Dominicana

/**
 * Estados de factura (como Shopify Draft Orders)
 * - draft: Orden en proceso, no guardada
 * - pending: Orden guardada, pendiente de pago/completar
 * - completed: Orden completada y cobrada
 */
export const ESTADOS_FACTURA = {
  DRAFT: 'draft',
  PENDING: 'pending',
  COMPLETED: 'completed',
};

/**
 * Store global de Facturación con Zustand
 */
export const useFacturaStore = create((set, get) => ({
  // Estado
  items: [],
  cliente: null,
  fechaEntrega: new Date(),
  metodoPago: null,
  referenciaPago: '',
  notas: '',
  estado: ESTADOS_FACTURA.DRAFT, // Estado actual de la factura
  facturaId: null, // ID cuando se guarda como pendiente

  // Getters computados
  getSubtotal: () => {
    const { items } = get();
    return items.reduce((acc, item) => acc + item.subtotal, 0);
  },

  getItbis: () => {
    const subtotal = get().getSubtotal();
    return subtotal * ITBIS_RATE;
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const itbis = get().getItbis();
    return subtotal + itbis;
  },

  getCantidadItems: () => {
    const { items } = get();
    return items.reduce((acc, item) => acc + item.cantidad, 0);
  },

  // Acciones
  agregarServicio: (servicio, cantidad = 1) => {
    const { items } = get();

    // Buscar si ya existe
    const existente = items.find((item) => item.servicioId === servicio.id);

    if (existente) {
      // Incrementar cantidad
      set({
        items: items.map((item) =>
          item.servicioId === servicio.id
            ? {
                ...item,
                cantidad: item.cantidad + cantidad,
                subtotal: item.precio * (item.cantidad + cantidad),
              }
            : item
        ),
      });
    } else {
      // Crear nueva línea
      const nuevaLinea = {
        id: `item-${Date.now()}-${Math.random()}`,
        servicioId: servicio.id,
        nombre: servicio.nombre,
        precio: servicio.precio,
        cantidad,
        unidad: servicio.unidad,
        subtotal: servicio.precio * cantidad,
      };

      // Validar con Zod
      try {
        LineaFacturaSchema.parse(nuevaLinea);
        set({ items: [...items, nuevaLinea] });
      } catch (error) {
        console.error('Error validando línea:', error);
        throw new Error('Datos inválidos en la línea de factura');
      }
    }
  },

  actualizarCantidad: (itemId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      get().eliminarItem(itemId);
      return;
    }

    set({
      items: get().items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              cantidad: nuevaCantidad,
              subtotal: item.precio * nuevaCantidad,
            }
          : item
      ),
    });
  },

  incrementarCantidad: (itemId) => {
    set({
      items: get().items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              cantidad: item.cantidad + 1,
              subtotal: item.precio * (item.cantidad + 1),
            }
          : item
      ),
    });
  },

  decrementarCantidad: (itemId) => {
    const item = get().items.find((i) => i.id === itemId);
    if (item && item.cantidad > 1) {
      set({
        items: get().items.map((i) =>
          i.id === itemId
            ? {
                ...i,
                cantidad: i.cantidad - 1,
                subtotal: i.precio * (i.cantidad - 1),
              }
            : i
        ),
      });
    } else {
      get().eliminarItem(itemId);
    }
  },

  eliminarItem: (itemId) => {
    set({ items: get().items.filter((item) => item.id !== itemId) });
  },

  limpiarFactura: () => {
    set({
      items: [],
      cliente: null,
      metodoPago: null,
      referenciaPago: '',
      notas: '',
      fechaEntrega: new Date(),
      estado: ESTADOS_FACTURA.DRAFT,
      facturaId: null,
    });
  },

  // Marcar como pendiente (Draft Order estilo Shopify)
  marcarComoPendiente: () => {
    const { items } = get();
    if (items.length === 0) {
      return false;
    }

    // Generar ID único para la factura pendiente
    const id = `PEND-${Date.now()}`;

    set({
      estado: ESTADOS_FACTURA.PENDING,
      facturaId: id,
    });

    // TODO: Guardar en base de datos o localStorage
    console.log('Factura guardada como pendiente:', id, get().getFacturaData());

    return true;
  },

  // Completar y cobrar factura
  completarFactura: () => {
    set({ estado: ESTADOS_FACTURA.COMPLETED });

    // TODO: Guardar factura completada en base de datos
    console.log('Factura completada:', get().getFacturaData());

    // Limpiar después de guardar
    setTimeout(() => {
      get().limpiarFactura();
    }, 100);
  },

  // Cancelar factura pendiente
  cancelarPendiente: () => {
    set({
      estado: ESTADOS_FACTURA.DRAFT,
      facturaId: null,
    });
  },

  setCliente: (cliente) => {
    set({ cliente });
  },

  setFechaEntrega: (fecha) => {
    set({ fechaEntrega: fecha });
  },

  setMetodoPago: (metodo) => {
    set({ metodoPago: metodo });
  },

  setReferenciaPago: (referencia) => {
    set({ referenciaPago: referencia });
  },

  setNotas: (notas) => {
    set({ notas });
  },

  // Validar si se puede completar la factura
  puedeCompletar: () => {
    const { items, metodoPago } = get();
    return items.length > 0 && metodoPago !== null;
  },

  // Obtener datos para guardar
  getFacturaData: () => {
    const state = get();
    return {
      id: state.facturaId,
      estado: state.estado,
      items: state.items,
      cliente: state.cliente,
      fechaEntrega: state.fechaEntrega,
      metodoPago: state.metodoPago,
      referenciaPago: state.referenciaPago,
      notas: state.notas,
      subtotal: state.getSubtotal(),
      itbis: state.getItbis(),
      total: state.getTotal(),
      fecha: new Date(),
    };
  },
}));
