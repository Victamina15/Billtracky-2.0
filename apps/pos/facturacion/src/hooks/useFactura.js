import { create } from 'zustand';

/**
 * Hook de estado para manejar la factura actual
 * Usa Zustand para un estado global moderno y performante
 */

const ITBIS_RATE = 0.18; // 18% ITBIS en República Dominicana

export const useFactura = create((set, get) => ({
  // Estado
  itemsFactura: [],
  metodoPago: null,
  clienteInfo: null,

  // Agregar servicio a la factura
  agregarServicio: (servicio, cantidad = 1) => {
    const items = get().itemsFactura;
    const existente = items.find((item) => item.servicio.id === servicio.id);

    if (existente) {
      // Si ya existe, incrementar cantidad
      set({
        itemsFactura: items.map((item) =>
          item.servicio.id === servicio.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        ),
      });
    } else {
      // Agregar nuevo item
      set({
        itemsFactura: [
          ...items,
          {
            id: `item-${Date.now()}-${Math.random()}`,
            servicio,
            cantidad,
            precioUnitario: servicio.precio,
            subtotal: servicio.precio * cantidad,
          },
        ],
      });
    }
  },

  // Incrementar cantidad de un item
  incrementarCantidad: (itemId) => {
    set({
      itemsFactura: get().itemsFactura.map((item) =>
        item.id === itemId
          ? {
              ...item,
              cantidad: item.cantidad + 1,
              subtotal: item.precioUnitario * (item.cantidad + 1),
            }
          : item
      ),
    });
  },

  // Decrementar cantidad de un item
  decrementarCantidad: (itemId) => {
    set({
      itemsFactura: get().itemsFactura.map((item) =>
        item.id === itemId && item.cantidad > 1
          ? {
              ...item,
              cantidad: item.cantidad - 1,
              subtotal: item.precioUnitario * (item.cantidad - 1),
            }
          : item
      ),
    });
  },

  // Eliminar línea de la factura
  eliminarLinea: (itemId) => {
    set({
      itemsFactura: get().itemsFactura.filter((item) => item.id !== itemId),
    });
  },

  // Limpiar factura completa
  limpiarFactura: () => {
    set({
      itemsFactura: [],
      metodoPago: null,
      clienteInfo: null,
    });
  },

  // Establecer método de pago
  setMetodoPago: (metodo) => {
    set({ metodoPago: metodo });
  },

  // Establecer información del cliente
  setClienteInfo: (info) => {
    set({ clienteInfo: info });
  },

  // Getters computados
  getSubtotal: () => {
    return get().itemsFactura.reduce((acc, item) => acc + item.subtotal, 0);
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
    return get().itemsFactura.reduce((acc, item) => acc + item.cantidad, 0);
  },
}));
