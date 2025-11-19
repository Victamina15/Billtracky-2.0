import { Receipt, Package, CreditCard, TrendingUp } from 'lucide-react'

const stats = [
  {
    name: 'Facturas del Mes',
    value: '24',
    icon: Receipt,
    change: '+12%',
    changeType: 'positive'
  },
  {
    name: 'Servicios Activos',
    value: '45',
    icon: Package,
    change: '+3',
    changeType: 'positive'
  },
  {
    name: 'Métodos de Pago',
    value: '4',
    icon: CreditCard,
    change: '0',
    changeType: 'neutral'
  },
  {
    name: 'Ingresos del Mes',
    value: '$12,450',
    icon: TrendingUp,
    change: '+18%',
    changeType: 'positive'
  }
]

export function InicioPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Bienvenido a Billtracky POS</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-2 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className="ml-4">
                  <div className="bg-gray-100 rounded-full p-3">
                    <Icon className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Accesos Rápidos</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <a
            href="/facturacion/nueva"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <Receipt className="h-5 w-5 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">Nueva Factura</p>
              <p className="text-sm text-gray-500">Crear factura rápida</p>
            </div>
          </a>
          <a
            href="/configuracion/servicios"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <Package className="h-5 w-5 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">Gestionar Servicios</p>
              <p className="text-sm text-gray-500">Ver todos los servicios</p>
            </div>
          </a>
          <a
            href="/configuracion/metodos-pago"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <CreditCard className="h-5 w-5 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">Métodos de Pago</p>
              <p className="text-sm text-gray-500">Configurar pagos</p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
              <div className="bg-gray-100 rounded-full p-2">
                <Receipt className="h-4 w-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Factura #{1000 + i} creada</p>
                <p className="text-xs text-gray-500">Hace {i} hora{i > 1 ? 's' : ''}</p>
              </div>
              <span className="text-sm font-medium text-gray-900">$450.00</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
