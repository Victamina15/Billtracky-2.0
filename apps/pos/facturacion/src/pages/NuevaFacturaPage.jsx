import HeaderFacturacion from '../components/HeaderFacturacion';
import ServiciosGrid from '../components/ServiciosGrid';
import ResumenFactura from '../components/ResumenFactura';

/**
 * Página principal del módulo de Facturación
 * Interfaz estilo POS para crear nuevas facturas
 */
export default function NuevaFacturaPage() {
  return (
    <div className="min-h-screen bg-[#F4F4F5] p-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <HeaderFacturacion />

        {/* Layout de 2 columnas: Servicios + Resumen */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda: Grid de servicios (2/3) */}
          <div className="lg:col-span-2">
            <ServiciosGrid />
          </div>

          {/* Columna derecha: Resumen de factura (1/3) */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <ResumenFactura />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
