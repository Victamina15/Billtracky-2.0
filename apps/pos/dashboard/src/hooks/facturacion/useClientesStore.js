import { create } from 'zustand';

/**
 * Store para gestión de clientes en facturación
 * Maneja búsqueda, creación y selección de clientes
 */
export const useClientesStore = create((set, get) => ({
  // Estado
  clientes: [
    {
      id: 1,
      nombre: 'Juan Pérez',
      telefono: '809-555-1234',
      email: 'juan.perez@email.com',
      direccion: 'Calle Principal #123',
      notas: 'Cliente frecuente',
    },
    {
      id: 2,
      nombre: 'María García',
      telefono: '829-555-5678',
      email: 'maria.garcia@email.com',
      direccion: 'Av. Independencia #456',
      notas: '',
    },
    {
      id: 3,
      nombre: 'Carlos Rodríguez',
      telefono: '849-555-9012',
      email: 'carlos.rodriguez@email.com',
      direccion: 'Calle Duarte #789',
      notas: 'Prefiere entrega a domicilio',
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      telefono: '809-555-3456',
      email: 'ana.martinez@email.com',
      direccion: 'Calle Mella #321',
      notas: '',
    },
    {
      id: 5,
      nombre: 'Pedro Sánchez',
      telefono: '829-555-7890',
      email: 'pedro.sanchez@email.com',
      direccion: 'Av. 27 de Febrero #654',
      notas: 'VIP - Descuento 10%',
    },
  ],
  busqueda: '',
  clienteSeleccionado: null,

  // Acciones
  setBusqueda: (busqueda) => {
    set({ busqueda });
  },

  buscarClientes: (query) => {
    const { clientes } = get();

    if (!query || query.trim() === '') {
      return clientes;
    }

    const lowerQuery = query.toLowerCase();

    return clientes.filter((cliente) =>
      cliente.nombre.toLowerCase().includes(lowerQuery) ||
      cliente.telefono.replace(/\D/g, '').includes(lowerQuery.replace(/\D/g, '')) ||
      cliente.email.toLowerCase().includes(lowerQuery)
    );
  },

  getClienteById: (id) => {
    const { clientes } = get();
    return clientes.find((c) => c.id === id);
  },

  agregarCliente: (nuevoCliente) => {
    const { clientes } = get();

    // Generar ID único
    const nuevoId = clientes.length > 0
      ? Math.max(...clientes.map(c => c.id)) + 1
      : 1;

    const clienteConId = {
      ...nuevoCliente,
      id: nuevoId,
    };

    set({
      clientes: [...clientes, clienteConId],
    });

    return clienteConId;
  },

  actualizarCliente: (id, datosActualizados) => {
    set({
      clientes: get().clientes.map((cliente) =>
        cliente.id === id
          ? { ...cliente, ...datosActualizados }
          : cliente
      ),
    });
  },

  eliminarCliente: (id) => {
    set({
      clientes: get().clientes.filter((cliente) => cliente.id !== id),
    });
  },

  seleccionarCliente: (cliente) => {
    set({ clienteSeleccionado: cliente });
  },

  limpiarSeleccion: () => {
    set({ clienteSeleccionado: null });
  },
}));
