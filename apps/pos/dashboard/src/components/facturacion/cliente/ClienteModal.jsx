import { useState, useEffect } from 'react';
import { X, Search, User, Phone, Mail, MapPin, FileText, Plus, Check } from 'lucide-react';
import { useClientesStore } from '../../../hooks/facturacion/useClientesStore';
import { toast } from 'sonner';

/**
 * Modal profesional para búsqueda y creación de clientes
 * Estilo Shopify POS
 */
export default function ClienteModal({ isOpen, onClose, onSelectCliente }) {
  const [vista, setVista] = useState('buscar'); // 'buscar' | 'crear'
  const [busqueda, setBusqueda] = useState('');

  // Store de clientes
  const buscarClientes = useClientesStore((state) => state.buscarClientes);
  const agregarCliente = useClientesStore((state) => state.agregarCliente);
  const seleccionarCliente = useClientesStore((state) => state.seleccionarCliente);

  // Form data para nuevo cliente
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
    notas: '',
  });

  // Resultados de búsqueda
  const [resultados, setResultados] = useState([]);

  // Resetear al abrir
  useEffect(() => {
    if (isOpen) {
      setVista('buscar');
      setBusqueda('');
      setFormData({
        nombre: '',
        telefono: '',
        email: '',
        direccion: '',
        notas: '',
      });
      setResultados(buscarClientes(''));
    }
  }, [isOpen]);

  // Actualizar resultados cuando cambia la búsqueda
  useEffect(() => {
    setResultados(buscarClientes(busqueda));
  }, [busqueda]);

  const handleSelectCliente = (cliente) => {
    seleccionarCliente(cliente);
    onSelectCliente(cliente);
    toast.success(`Cliente "${cliente.nombre}" seleccionado`);
    onClose();
  };

  const handleCrearCliente = (e) => {
    e.preventDefault();

    // Validar campos requeridos
    if (!formData.nombre.trim()) {
      toast.error('El nombre es requerido');
      return;
    }

    if (!formData.telefono.trim()) {
      toast.error('El teléfono es requerido');
      return;
    }

    // Crear cliente
    const nuevoCliente = agregarCliente(formData);

    // Seleccionar automáticamente
    seleccionarCliente(nuevoCliente);
    onSelectCliente(nuevoCliente);

    toast.success(`Cliente "${nuevoCliente.nombre}" creado y seleccionado`);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {vista === 'buscar' ? 'Buscar Cliente' : 'Nuevo Cliente'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setVista('buscar')}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                vista === 'buscar'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Search className="w-4 h-4 inline mr-2" />
              Buscar
            </button>
            <button
              onClick={() => setVista('crear')}
              className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                vista === 'crear'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Crear Nuevo
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {vista === 'buscar' ? (
              <div className="space-y-4">
                {/* Barra de búsqueda */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre, teléfono o email..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    autoFocus
                  />
                </div>

                {/* Resultados */}
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {resultados.length > 0 ? (
                    resultados.map((cliente) => (
                      <button
                        key={cliente.id}
                        onClick={() => handleSelectCliente(cliente)}
                        className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-100 p-2 rounded-full group-hover:bg-blue-200 transition-colors">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{cliente.nombre}</p>
                              <div className="mt-1 space-y-1">
                                {cliente.telefono && (
                                  <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    {cliente.telefono}
                                  </p>
                                )}
                                {cliente.email && (
                                  <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    {cliente.email}
                                  </p>
                                )}
                                {cliente.direccion && (
                                  <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {cliente.direccion}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <Check className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No se encontraron clientes</p>
                      <button
                        onClick={() => setVista('crear')}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Crear nuevo cliente
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleCrearCliente} className="space-y-4">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Ej: Juan Pérez"
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      placeholder="809-555-1234"
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ejemplo@email.com"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* Dirección */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      placeholder="Calle, número, ciudad"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* Notas */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notas
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="notas"
                      value={formData.notas}
                      onChange={handleInputChange}
                      placeholder="Información adicional del cliente"
                      rows={3}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Crear y Seleccionar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
