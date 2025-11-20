/**
 * Métodos de pago con fallback cuando el backend no está disponible
 */

// Importar desde la API local
import { getMetodosPago as getMetodosPagoAPI } from '../../api/metodosPago';

// Datos de respaldo para cuando el backend no está disponible
const METODOS_PAGO_FALLBACK = [
  {
    id: 'efectivo',
    nombre: 'Efectivo',
    icono: 'Banknote',
    habilitado: true,
    requiereReferencia: false,
    tipo: 'efectivo',
    comision: 0,
  },
  {
    id: 'tarjeta',
    nombre: 'Tarjeta',
    icono: 'CreditCard',
    habilitado: true,
    requiereReferencia: true,
    tipo: 'tarjeta',
    comision: 2.5,
  },
  {
    id: 'transferencia',
    nombre: 'Transferencia',
    icono: 'ArrowRightLeft',
    habilitado: true,
    requiereReferencia: true,
    tipo: 'transferencia',
    comision: 0,
  },
];

/**
 * Obtener métodos de pago con fallback
 * @returns {Promise<Array>} Lista de métodos de pago
 */
export const getMetodosPago = async () => {
  try {
    const metodosPagoConfig = await getMetodosPagoAPI();

    // Adaptar formato: configuración usa "activo", facturación usa "habilitado"
    return metodosPagoConfig.map((metodo) => ({
      id: metodo.id,
      nombre: metodo.nombre,
      icono: metodo.icono,
      habilitado: metodo.activo, // Mapear activo -> habilitado
      requiereReferencia: metodo.requiereReferencia,
      tipo: metodo.tipo,
      comision: metodo.comision,
    }));
  } catch (error) {
    console.warn('Backend no disponible, usando datos de respaldo para métodos de pago');
    return METODOS_PAGO_FALLBACK;
  }
};
