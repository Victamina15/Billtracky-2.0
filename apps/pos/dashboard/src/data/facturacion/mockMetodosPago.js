/**
 * Métodos de pago integrados con backend API
 * Los métodos de pago se obtienen directamente del backend
 */

// Importar desde la API local
import { getMetodosPago as getMetodosPagoAPI } from '../../api/metodosPago';

/**
 * Obtener métodos de pago habilitados desde backend API
 * Adapta el formato del backend al formato esperado por facturación
 * @returns {Promise<Array>} Lista de métodos de pago
 */
export const getMetodosPago = async () => {
  const metodosPagoConfig = await getMetodosPagoAPI();

  // Adaptar formato: configuración usa "activo", facturación usa "habilitado"
  return metodosPagoConfig.map((metodo) => ({
    id: metodo.id,
    nombre: metodo.nombre,
    icono: metodo.icono,
    habilitado: metodo.activo, // Mapear activo -> habilitado
    requiereReferencia: metodo.requiereReferencia,
    tipo: metodo.tipo, // Información adicional disponible
    comision: metodo.comision, // Información adicional disponible
  }));
};
