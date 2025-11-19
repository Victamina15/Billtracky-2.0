import { Plus } from 'lucide-react';
import clsx from 'clsx';

export default function ServicioCard({ servicio, onAgregar }) {
  return (
    <button
      onClick={() => onAgregar(servicio)}
      className={clsx(
        'bg-white rounded-lg p-4 shadow-sm border-2 border-transparent',
        'hover:border-blue-500 hover:shadow-md transition-all duration-200',
        'text-left w-full group'
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: servicio.color }}
        />
        <div className="bg-blue-50 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Plus className="w-4 h-4 text-blue-600" />
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 mb-1">
        {servicio.nombre}
      </h3>

      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
        {servicio.descripcion}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900">
          ${servicio.precio.toFixed(2)}
        </span>
        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
          por {servicio.unidad}
        </span>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-500 capitalize">
          {servicio.categoria}
        </span>
      </div>
    </button>
  );
}
