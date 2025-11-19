import ListaMetodosPago from '../components/configuracion/metodosPago/ListaMetodosPago'

export function ConfiguracionMetodosPagoPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Métodos de Pago</h1>
        <p className="text-gray-500 mt-1">Configura las formas de pago aceptadas</p>
      </div>

      {/* Lista de métodos de pago */}
      <ListaMetodosPago />
    </div>
  )
}
