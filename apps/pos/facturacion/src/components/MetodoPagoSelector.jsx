import { useState, useEffect } from 'react';
import { Banknote, CreditCard, ArrowLeftRight } from 'lucide-react';
import clsx from 'clsx';
import { getMetodosPagoConfigurados } from '../data/mockServicios';
import { useFactura } from '../hooks/useFactura';

const ICONOS = {
  Banknote,
  CreditCard,
  ArrowLeftRight,
};

export default function MetodoPagoSelector() {
  const [metodos, setMetodos] = useState([]);
  const metodoPago = useFactura((state) => state.metodoPago);
  const setMetodoPago = useFactura((state) => state.setMetodoPago);

  useEffect(() => {
    cargarMetodos();
  }, []);

  const cargarMetodos = async () => {
    const data = await getMetodosPagoConfigurados();
    setMetodos(data.filter((m) => m.habilitado));
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Método de Pago
      </h3>

      <div className="grid grid-cols-3 gap-2">
        {metodos.map((metodo) => {
          const Icono = ICONOS[metodo.icono] || Banknote;
          const seleccionado = metodoPago?.id === metodo.id;

          return (
            <button
              key={metodo.id}
              onClick={() => setMetodoPago(metodo)}
              className={clsx(
                'flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all',
                seleccionado
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              )}
            >
              <Icono
                className={clsx(
                  'w-6 h-6',
                  seleccionado ? 'text-blue-600' : 'text-gray-600'
                )}
              />
              <span
                className={clsx(
                  'text-xs font-medium',
                  seleccionado ? 'text-blue-700' : 'text-gray-700'
                )}
              >
                {metodo.nombre}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
