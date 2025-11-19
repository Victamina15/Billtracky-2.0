/**
 * Mock de servicios de lavandería
 * En producción, estos datos vendrán del módulo CONFIGURACIÓN
 */

export const CATEGORIAS = {
  LAVADO: 'lavado',
  SECADO: 'secado',
  PLANCHADO: 'planchado',
  COMBO: 'combo',
  EXPRESS: 'express',
};

export const mockServicios = [
  {
    id: 'srv-001',
    nombre: 'Lavado Normal',
    categoria: CATEGORIAS.LAVADO,
    precio: 150.00,
    unidad: 'kg',
    descripcion: 'Lavado estándar de ropa',
    color: '#3B82F6', // blue
  },
  {
    id: 'srv-002',
    nombre: 'Lavado en Seco',
    categoria: CATEGORIAS.LAVADO,
    precio: 250.00,
    unidad: 'prenda',
    descripcion: 'Lavado en seco para prendas delicadas',
    color: '#8B5CF6', // purple
  },
  {
    id: 'srv-003',
    nombre: 'Planchado',
    categoria: CATEGORIAS.PLANCHADO,
    precio: 100.00,
    unidad: 'prenda',
    descripcion: 'Servicio de planchado profesional',
    color: '#F59E0B', // amber
  },
  {
    id: 'srv-004',
    nombre: 'Lavado + Planchado',
    categoria: CATEGORIAS.COMBO,
    precio: 220.00,
    unidad: 'kg',
    descripcion: 'Combo de lavado y planchado',
    color: '#10B981', // green
  },
  {
    id: 'srv-005',
    nombre: 'Express (24h)',
    categoria: CATEGORIAS.EXPRESS,
    precio: 300.00,
    unidad: 'kg',
    descripcion: 'Servicio express entrega en 24 horas',
    color: '#EF4444', // red
  },
  {
    id: 'srv-006',
    nombre: 'Secado',
    categoria: CATEGORIAS.SECADO,
    precio: 80.00,
    unidad: 'kg',
    descripcion: 'Solo servicio de secado',
    color: '#06B6D4', // cyan
  },
];

export const METODOS_PAGO = [
  {
    id: 'efectivo',
    nombre: 'Efectivo',
    icono: 'Banknote',
    habilitado: true,
  },
  {
    id: 'tarjeta',
    nombre: 'Tarjeta',
    icono: 'CreditCard',
    habilitado: true,
  },
  {
    id: 'transferencia',
    nombre: 'Transferencia',
    icono: 'ArrowLeftRight',
    habilitado: true,
  },
];

/**
 * Función placeholder para obtener servicios desde CONFIGURACIÓN
 * TODO: Conectar con módulo de configuración
 */
export const getServiciosConfigurados = async () => {
  // Simular llamada a API/configuración
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockServicios), 100);
  });
};

/**
 * Función placeholder para obtener métodos de pago desde CONFIGURACIÓN
 * TODO: Conectar con módulo de configuración
 */
export const getMetodosPagoConfigurados = async () => {
  // Simular llamada a API/configuración
  return new Promise((resolve) => {
    setTimeout(() => resolve(METODOS_PAGO), 100);
  });
};
