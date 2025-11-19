const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const getCategorias = async () => {
  try {
    const response = await fetch(`${API_URL}/api/categorias`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Error al obtener categorías');
    }

    return result.data;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    throw error;
  }
};
