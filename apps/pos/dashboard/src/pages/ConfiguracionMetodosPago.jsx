import { CreditCard, Plus, Wallet } from 'lucide-react'

export function ConfiguracionMetodosPagoPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Métodos de Pago</h1>
          <p className="text-gray-500 mt-1">Configura las formas de pago aceptadas</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
          <Plus className="h-4 w-4" />
          Nuevo Método
        </button>
      </div>

      {/* Payment methods grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder cards */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gray-100 rounded-full p-3">
              <CreditCard className="h-6 w-6 text-gray-600" />
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              Activo
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Efectivo</h3>
          <p className="text-sm text-gray-500 mt-1">Pago en efectivo</p>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="text-sm text-gray-600 hover:text-gray-900">
              Editar →
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gray-100 rounded-full p-3">
              <Wallet className="h-6 w-6 text-gray-600" />
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              Activo
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Transferencia</h3>
          <p className="text-sm text-gray-500 mt-1">Transferencia bancaria</p>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="text-sm text-gray-600 hover:text-gray-900">
              Editar →
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 border-dashed">
          <div className="text-center py-8">
            <Plus className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500">Agregar nuevo método de pago</p>
          </div>
        </div>
      </div>

      {/* Info section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-start gap-3">
          <CreditCard className="h-5 w-5 text-gray-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">Gestión de Métodos de Pago</h3>
            <p className="text-sm text-gray-500 mt-1">
              Los métodos de pago configurados aparecerán como opciones al crear facturas.
              Puedes activar o desactivar métodos según las necesidades del negocio.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
