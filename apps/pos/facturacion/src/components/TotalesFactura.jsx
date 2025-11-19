import { useFactura } from '../hooks/useFactura';

export default function TotalesFactura() {
  const getSubtotal = useFactura((state) => state.getSubtotal);
  const getItbis = useFactura((state) => state.getItbis);
  const getTotal = useFactura((state) => state.getTotal);

  const subtotal = getSubtotal();
  const itbis = getItbis();
  const total = getTotal();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-gray-700">
        <span>Subtotal</span>
        <span className="font-semibold">${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex items-center justify-between text-gray-700">
        <span>ITBIS (18%)</span>
        <span className="font-semibold">${itbis.toFixed(2)}</span>
      </div>

      <div className="h-px bg-gray-300" />

      <div className="flex items-center justify-between text-xl font-bold text-gray-900">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
