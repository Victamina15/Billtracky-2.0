const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const getServicios = async (categoria = 'todos') => {
  try {
    const url = categoria === 'todos'
      ? `${API_URL}/api/servicios?activo=true`
      : `${API_URL}/api/servicios?categoria=${categoria}&activo=true`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Error al obtener servicios');
    }

    return result.data;
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    throw error;
  }
};

export const getServicioById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/servicios/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Error al obtener servicio');
    }

    return result.data;
  } catch (error) {
    console.error('Error al obtener servicio:', error);
    throw error;
  }
};
