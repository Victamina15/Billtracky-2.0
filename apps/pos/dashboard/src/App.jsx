import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { MainLayout } from './layout/MainLayout'
import { InicioPage } from './pages/Inicio'
import { FacturacionNuevaPage } from './pages/FacturacionNueva'
import { ConfiguracionServiciosPage } from './pages/ConfiguracionServicios'
import { ConfiguracionMetodosPagoPage } from './pages/ConfiguracionMetodosPago'

// Crear instancia de QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Redirect root to inicio */}
            <Route index element={<Navigate to="/inicio" replace />} />

            {/* Main routes */}
            <Route path="inicio" element={<InicioPage />} />
            <Route path="facturacion/nueva" element={<FacturacionNuevaPage />} />
            <Route path="configuracion/servicios" element={<ConfiguracionServiciosPage />} />
            <Route path="configuracion/metodos-pago" element={<ConfiguracionMetodosPagoPage />} />

            {/* 404 fallback */}
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Route>
        </Routes>
      </Router>

      {/* Toaster for notifications */}
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  )
}

export default App
