import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './layout/MainLayout'
import { InicioPage } from './pages/Inicio'
import { FacturacionNuevaPage } from './pages/FacturacionNueva'
import { ConfiguracionServiciosPage } from './pages/ConfiguracionServicios'
import { ConfiguracionMetodosPagoPage } from './pages/ConfiguracionMetodosPago'

function App() {
  return (
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
  )
}

export default App
