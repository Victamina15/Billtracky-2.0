import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFacturaStore } from '@billtracky/stores/useFacturaStore';

// Registrar locale español
registerLocale('es', es);

const opcionesFechas = [
  { dias: 0, label: 'Hoy' },
  { dias: 1, label: 'Mañana' },
  { dias: 2, label: '2 días' },
  { dias: 3, label: '3 días' },
  { dias: 7, label: '1 semana' },
];

export default function FechaEntregaSelector() {
  const fechaEntrega = useFacturaStore((state) => state.fechaEntrega);
  const setFechaEntrega = useFacturaStore((state) => state.setFechaEntrega);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const handleSeleccionarFecha = (dias) => {
    const nuevaFecha = addDays(new Date(), dias);
    setFechaEntrega(nuevaFecha);
    setMostrarCalendario(false);
  };

  const handleFechaCalendario = (fecha) => {
    setFechaEntrega(fecha);
    setMostrarCalendario(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Fecha de Entrega
      </label>

      {/* Opciones rápidas */}
      <div className="grid grid-cols-5 gap-2 mb-3">
        {opcionesFechas.map((opcion) => {
          const fecha = addDays(new Date(), opcion.dias);
          const seleccionada =
            format(fechaEntrega, 'yyyy-MM-dd') === format(fecha, 'yyyy-MM-dd');

          return (
            <button
              key={opcion.dias}
              onClick={() => handleSeleccionarFecha(opcion.dias)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                seleccionada
                  ? 'bg-blue-500 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              {opcion.label}
            </button>
          );
        })}
      </div>

      {/* Fecha seleccionada con calendario desplegable */}
      <div className="relative">
        <button
          onClick={() => setMostrarCalendario(!mostrarCalendario)}
          className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200 hover:border-blue-400 transition-all group"
        >
          <CalendarIcon className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
          <div className="flex-1 text-left">
            <p className="text-xs text-blue-600 font-medium">Entrega programada</p>
            <p className="font-bold text-gray-900">
              {format(fechaEntrega, "EEEE, d 'de' MMMM yyyy", { locale: es })}
            </p>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-blue-600 transition-transform ${
              mostrarCalendario ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Calendario desplegable */}
        {mostrarCalendario && (
          <>
            {/* Backdrop para cerrar al hacer clic fuera */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setMostrarCalendario(false)}
            />

            {/* Calendario */}
            <div className="absolute z-20 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 p-4">
              <DatePicker
                selected={fechaEntrega}
                onChange={handleFechaCalendario}
                inline
                locale="es"
                minDate={new Date()}
                calendarClassName="custom-calendar"
                dateFormat="EEEE, d 'de' MMMM yyyy"
              />
            </div>
          </>
        )}
      </div>

      {/* Estilos personalizados para el calendario */}
      <style jsx>{`
        :global(.react-datepicker) {
          font-family: inherit;
          border: none;
        }

        :global(.react-datepicker__header) {
          background-color: #3b82f6;
          border-bottom: none;
          padding-top: 12px;
        }

        :global(.react-datepicker__current-month) {
          color: white;
          font-weight: 600;
          font-size: 16px;
        }

        :global(.react-datepicker__day-name) {
          color: white;
          font-weight: 600;
        }

        :global(.react-datepicker__day) {
          margin: 4px;
          border-radius: 8px;
          transition: all 0.2s;
        }

        :global(.react-datepicker__day:hover) {
          background-color: #dbeafe;
          transform: scale(1.1);
        }

        :global(.react-datepicker__day--selected) {
          background-color: #3b82f6 !important;
          color: white !important;
          font-weight: 700;
        }

        :global(.react-datepicker__day--keyboard-selected) {
          background-color: #93c5fd;
        }

        :global(.react-datepicker__day--today) {
          font-weight: 700;
          color: #3b82f6;
          border: 2px solid #3b82f6;
        }

        :global(.react-datepicker__day--disabled) {
          color: #d1d5db;
          cursor: not-allowed;
        }

        :global(.react-datepicker__navigation-icon::before) {
          border-color: white;
        }

        :global(.react-datepicker__navigation:hover *::before) {
          border-color: #dbeafe;
        }
      `}</style>
    </div>
  );
}
