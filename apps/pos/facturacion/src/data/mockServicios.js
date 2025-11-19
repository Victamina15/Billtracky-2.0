/**
 * Servicios integrados con backend API
 * Los servicios se obtienen directamente del backend
 */

// Importar desde las APIs locales
import { getServicios as getServiciosAPI } from '../api/servicios';
import { getCategorias as getCategoriasAPI } from '../api/categorias';

/**
 * Exportar categorías desde backend API
 * Ahora las categorías vienen del backend
 */
export const getCategorias = async () => {
  return await getCategoriasAPI();
};

/**
 * Obtener servicios desde el backend API
 * @param {string} categoria - ID de la categoría o 'todos'
 * @returns {Promise<Array>} Lista de servicios
 */
export const getServicios = async (categoria = 'todos') => {
  return await getServiciosAPI(categoria);
};

/**
 * Buscar servicios por nombre
 * @param {string} query - Texto de búsqueda
 * @param {Array} servicios - Lista de servicios (opcional)
 * @returns {Array} Servicios filtrados
 */
export const searchServicios = (query, servicios = []) => {
  if (!query) return servicios;

  const lowerQuery = query.toLowerCase();
  return servicios.filter((servicio) =>
    servicio.nombre.toLowerCase().includes(lowerQuery)
  );
};

// Re-exportar CATEGORIAS para compatibilidad con código existente
// Este array se cargará dinámicamente desde configuración
export let CATEGORIAS = [];

// Cargar categorías al iniciar
getCategorias().then((cats) => {
  CATEGORIAS = cats;
});
