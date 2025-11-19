import { ShoppingCart, Trash2, CheckCircle } from 'lucide-react';
import { useFactura } from '../hooks/useFactura';
import LineaFactura from './LineaFactura';
import TotalesFactura from './TotalesFactura';
import MetodoPagoSelector from './MetodoPagoSelector';

export default function ResumenFactura() {
  const itemsFactura = useFactura((state) => state.itemsFactura);
  const limpiarFactura = useFactura((state) => state.limpiarFactura);
  const metodoPago = useFactura((state) => state.metodoPago);
  const getTotal = useFactura((state) => state.getTotal);
  const getCantidadItems = useFactura((state) => state.getCantidadItems);

  const cantidadItems = getCantidadItems();
  const total = getTotal();
  const puedeCompletarFactura = itemsFactura.length > 0 && metodoPago;

  const handleCompletarFactura = () => {
    if (!puedeCompletarFactura) return;

    // TODO: Conectar con backend para guardar factura
    alert(`Factura completada!\nTotal: $${total.toFixed(2)}\nMétodo: ${metodoPago.nombre}`);
    limpiarFactura();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-gray-700" />
          <h2 className="text-lg font-bold text-gray-900">
            Resumen de Factura
          </h2>
          {cantidadItems > 0 && (
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
              {cantidadItems} {cantidadItems === 1 ? 'item' : 'items'}
            </span>
          )}
        </div>

        {itemsFactura.length > 0 && (
          <button
            onClick={limpiarFactura}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
            title="Limpiar factura"
          >
            <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
          </button>
        )}
      </div>

      {/* Líneas de factura */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-2">
        {itemsFactura.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">
              No hay servicios agregados
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Selecciona servicios para comenzar
            </p>
          </div>
        ) : (
          itemsFactura.map((item) => (
            <LineaFactura key={item.id} item={item} />
          ))
        )}
      </div>

      {/* Totales */}
      {itemsFactura.length > 0 && (
        <div className="border-t border-gray-200 pt-4 mb-6">
          <TotalesFactura />
        </div>
      )}

      {/* Método de pago */}
      {itemsFactura.length > 0 && (
        <div className="mb-6">
          <MetodoPagoSelector />
        </div>
      )}

      {/* Botón completar */}
      <button
        onClick={handleCompletarFactura}
        disabled={!puedeCompletarFactura}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all shadow-lg disabled:shadow-none"
      >
        <CheckCircle className="w-5 h-5" />
        Completar Factura
        {total > 0 && (
          <span className="ml-2 bg-white/20 px-3 py-1 rounded-full">
            ${total.toFixed(2)}
          </span>
        )}
      </button>
    </div>
  );
}
