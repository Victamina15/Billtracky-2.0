const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const createFactura = async (facturaData) => {
  try {
    const response = await fetch(`${API_URL}/api/facturas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(facturaData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Error al crear factura');
    }

    return result;
  } catch (error) {
    console.error('Error al crear factura:', error);
    throw error;
  }
};

export const getFacturas = async () => {
  try {
    const response = await fetch(`${API_URL}/api/facturas`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Error al obtener facturas');
    }

    return result.data;
  } catch (error) {
    console.error('Error al obtener facturas:', error);
    throw error;
  }
};
