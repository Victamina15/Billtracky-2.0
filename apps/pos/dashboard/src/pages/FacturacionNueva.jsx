import { Receipt, Plus, ShoppingCart } from 'lucide-react'

export function FacturacionNuevaPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nueva Factura</h1>
          <p className="text-gray-500 mt-1">Crear una nueva factura de venta</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
          <Receipt className="h-4 w-4" />
          Guardar Factura
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Services selection */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Seleccionar Servicios</h2>
            <div className="text-center py-12 text-gray-500">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>Aquí irá el catálogo de servicios</p>
              <p className="text-sm mt-1">Componente de Facturación se integrará aquí</p>
            </div>
          </div>
        </div>

        {/* Cart / Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">$0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">ITBIS (18%)</span>
                <span className="font-medium text-gray-900">$0.00</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">$0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
