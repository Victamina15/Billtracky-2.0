/**
 * Servicios con fallback cuando el backend no está disponible
 */

// Importar desde las APIs locales
import { getServicios as getServiciosAPI } from '@billtracky/api-client/servicios';
import { getCategorias as getCategoriasAPI } from '@billtracky/api-client/categorias';

// Datos de respaldo para cuando el backend no está disponible
const CATEGORIAS_FALLBACK = [
  { id: 'todos', nombre: 'Todos', color: '#6B7280', activo: true },
  { id: 'lavado', nombre: 'Lavado', color: '#3B82F6', activo: true },
  { id: 'planchado', nombre: 'Planchado', color: '#8B5CF6', activo: true },
  { id: 'tintoreria', nombre: 'Tintorería', color: '#10B981', activo: true },
];

const SERVICIOS_FALLBACK = [
  { id: 1, nombre: 'Camisa', categoria: 'lavado', precio: 50, unidad: 'unidad', activo: true },
  { id: 2, nombre: 'Pantalón', categoria: 'lavado', precio: 60, unidad: 'unidad', activo: true },
  { id: 3, nombre: 'Vestido', categoria: 'tintoreria', precio: 150, unidad: 'unidad', activo: true },
  { id: 4, nombre: 'Saco', categoria: 'tintoreria', precio: 120, unidad: 'unidad', activo: true },
  { id: 5, nombre: 'Camisa Planchado', categoria: 'planchado', precio: 35, unidad: 'unidad', activo: true },
];

/**
 * Obtener categorías con fallback
 */
export const getCategorias = async () => {
  try {
    return await getCategoriasAPI();
  } catch (error) {
    console.warn('Backend no disponible, usando datos de respaldo para categorías');
    return CATEGORIAS_FALLBACK;
  }
};

/**
 * Obtener servicios con fallback
 * @param {string} categoria - ID de la categoría o 'todos'
 * @returns {Promise<Array>} Lista de servicios
 */
export const getServicios = async (categoria = 'todos') => {
  try {
    return await getServiciosAPI(categoria);
  } catch (error) {
    console.warn('Backend no disponible, usando datos de respaldo para servicios');

    // Filtrar por categoría si no es 'todos'
    if (categoria === 'todos') {
      return SERVICIOS_FALLBACK;
    }

    return SERVICIOS_FALLBACK.filter(s => s.categoria === categoria);
  }
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

// Re-exportar CATEGORIAS para compatibilidad
export let CATEGORIAS = CATEGORIAS_FALLBACK;

// Intentar cargar categorías del backend
getCategorias().then((cats) => {
  CATEGORIAS = cats;
}).catch(() => {
  // Usar fallback si falla
  CATEGORIAS = CATEGORIAS_FALLBACK;
});
