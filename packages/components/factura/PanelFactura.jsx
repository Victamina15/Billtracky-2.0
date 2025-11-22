import { ShoppingCart, Trash2, Check, Printer, Clock, X, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useFacturaStore, ESTADOS_FACTURA } from '@billtracky/stores/useFacturaStore';
import LineaFactura from './LineaFactura';
import Totales from './Totales';
import MetodosPago from './MetodosPago';

export default function PanelFactura() {
  const items = useFacturaStore((state) => state.items);
  const estado = useFacturaStore((state) => state.estado);
  const facturaId = useFacturaStore((state) => state.facturaId);
  const limpiarFactura = useFacturaStore((state) => state.limpiarFactura);
  const marcarComoPendiente = useFacturaStore((state) => state.marcarComoPendiente);
  const completarFactura = useFacturaStore((state) => state.completarFactura);
  const cancelarPendiente = useFacturaStore((state) => state.cancelarPendiente);
  const puedeCompletar = useFacturaStore((state) => state.puedeCompletar);
  const getCantidadItems = useFacturaStore((state) => state.getCantidadItems);

  const cantidadItems = getCantidadItems();
  const esPendiente = estado === ESTADOS_FACTURA.PENDING;

  const handleCobrar = () => {
    if (!puedeCompletar()) {
      toast.error('Completa todos los campos requeridos');
      return;
    }

    completarFactura();

    toast.success('Factura completada y cobrada', {
      description: `Factura #${facturaId || 'Nueva'} procesada exitosamente`,
    });
  };

  const handlePendiente = () => {
    if (items.length === 0) {
      toast.error('Agrega servicios a la factura');
      return;
    }

    const resultado = marcarComoPendiente();

    if (resultado) {
      toast.success('Factura guardada como pendiente', {
        description: 'Puedes continuar editando o imprimir la orden',
        icon: <Clock className="w-4 h-4" />,
      });
    }
  };

  const handleCancelarPendiente = () => {
    cancelarPendiente();
    toast.info('Factura pendiente cancelada', {
      description: 'Volviendo a modo borrador',
    });
  };

  const handleImprimir = () => {
    if (items.length === 0) {
      toast.error('No hay nada que imprimir');
      return;
    }

    // TODO: Generar PDF e imprimir
    toast.info('Generando impresión...', {
      description: esPendiente ? `Imprimiendo orden ${facturaId}` : 'Generando documento',
    });
  };

  const handleNuevaFactura = () => {
    limpiarFactura();
    toast.success('Nueva factura iniciada');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col h-full relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-5 h-5 text-gray-700" />
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {esPendiente ? 'Orden Pendiente' : 'Factura Actual'}
            </h2>
            {esPendiente && facturaId && (
              <p className="text-xs text-gray-500 font-mono">{facturaId}</p>
            )}
          </div>
          {cantidadItems > 0 && (
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
              {cantidadItems}
            </span>
          )}
          {esPendiente && (
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              PENDIENTE
            </span>
          )}
        </div>

        {items.length > 0 && (
          <button
            onClick={esPendiente ? handleCancelarPendiente : limpiarFactura}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
            title={esPendiente ? "Cancelar orden pendiente" : "Limpiar factura"}
          >
            {esPendiente ? (
              <X className="w-5 h-5 text-gray-400 group-hover:text-amber-600" />
            ) : (
              <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
            )}
          </button>
        )}
      </div>

      {/* Items - Scrollable */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No hay servicios agregados</p>
            <p className="text-sm text-gray-400 mt-1">
              Selecciona servicios para comenzar
            </p>
          </div>
        ) : (
          items.map((item) => <LineaFactura key={item.id} item={item} />)
        )}
      </div>

      {/* Totales y Métodos de Pago - Scrollable */}
      {items.length > 0 && (
        <div className="px-6 pb-4 space-y-4 flex-shrink-0">
          <Totales />
          <MetodosPago />
        </div>
      )}

      {/* Botones de Acción - STICKY (siempre visibles) */}
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-6 space-y-3 shadow-lg flex-shrink-0">
        {esPendiente ? (
          <>
            {/* Modo Pendiente */}
            <button
              onClick={handleCobrar}
              disabled={!puedeCompletar()}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all shadow-lg disabled:shadow-none"
            >
              <Check className="w-6 h-6" />
              COMPLETAR Y COBRAR
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleImprimir}
                className="py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow"
              >
                <Printer className="w-5 h-5" />
                Imprimir
              </button>

              <button
                onClick={handleNuevaFactura}
                className="py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Nueva
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Modo Draft/Normal */}
            <button
              onClick={handleCobrar}
              disabled={!puedeCompletar()}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all shadow-lg disabled:shadow-none"
            >
              <Check className="w-6 h-6" />
              COBRAR
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handlePendiente}
                disabled={items.length === 0}
                className="py-3 px-4 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow"
              >
                <Clock className="w-5 h-5" />
                Pendiente
              </button>

              <button
                onClick={handleImprimir}
                disabled={items.length === 0}
                className="py-3 px-4 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow"
              >
                <Printer className="w-5 h-5" />
                Imprimir
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
