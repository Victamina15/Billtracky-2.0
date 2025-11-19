import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import ServicioCard from './ServicioCard';
import { getServiciosConfigurados } from '../data/mockServicios';
import { useFactura } from '../hooks/useFactura';

export default function ServiciosGrid() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const agregarServicio = useFactura((state) => state.agregarServicio);

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    setLoading(true);
    try {
      const data = await getServiciosConfigurados();
      setServicios(data);
    } catch (error) {
      console.error('Error cargando servicios:', error);
    } finally {
      setLoading(false);
    }
  };

  const serviciosFiltrados = servicios.filter((servicio) =>
    servicio.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Servicios Disponibles
        </h2>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar servicio..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-h-[calc(100vh-320px)] overflow-y-auto pr-2">
          {serviciosFiltrados.map((servicio) => (
            <ServicioCard
              key={servicio.id}
              servicio={servicio}
              onAgregar={agregarServicio}
            />
          ))}

          {serviciosFiltrados.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">
                No se encontraron servicios
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
