import { Plus, Minus, Trash2 } from 'lucide-react';
import { useFactura } from '../hooks/useFactura';

export default function LineaFactura({ item }) {
  const incrementarCantidad = useFactura((state) => state.incrementarCantidad);
  const decrementarCantidad = useFactura((state) => state.decrementarCantidad);
  const eliminarLinea = useFactura((state) => state.eliminarLinea);

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div
        className="w-1 h-12 rounded-full flex-shrink-0"
        style={{ backgroundColor: item.servicio.color }}
      />

      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 text-sm truncate">
          {item.servicio.nombre}
        </h4>
        <p className="text-xs text-gray-600">
          ${item.precioUnitario.toFixed(2)} / {item.servicio.unidad}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => decrementarCantidad(item.id)}
          disabled={item.cantidad <= 1}
          className="p-1 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </button>

        <span className="w-8 text-center font-semibold text-gray-900">
          {item.cantidad}
        </span>

        <button
          onClick={() => incrementarCantidad(item.id)}
          className="p-1 rounded hover:bg-white transition-colors"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="text-right min-w-[80px]">
        <p className="font-bold text-gray-900">
          ${item.subtotal.toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => eliminarLinea(item.id)}
        className="p-2 rounded hover:bg-red-50 transition-colors group"
      >
        <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
      </button>
    </div>
  );
}
