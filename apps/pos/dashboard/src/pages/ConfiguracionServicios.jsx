import ListaServicios from '@billtracky/components/configuracion/servicios/ListaServicios'

export function ConfiguracionServiciosPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Servicios</h1>
        <p className="text-gray-500 mt-1">Gestiona el catálogo de servicios</p>
      </div>

      {/* Lista de servicios */}
      <ListaServicios />
    </div>
  )
}
