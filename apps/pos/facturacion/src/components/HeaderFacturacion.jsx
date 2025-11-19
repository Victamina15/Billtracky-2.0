import { FileText, User, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function HeaderFacturacion() {
  const fechaActual = format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", {
    locale: es,
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Nueva Factura
            </h1>
            <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4" />
              {fechaActual}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm text-gray-600">Atendido por</p>
            <p className="text-base font-semibold text-gray-900">
              Cajero Principal
            </p>
          </div>
          <div className="bg-blue-100 p-2 rounded-full">
            <User className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
