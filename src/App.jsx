import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/admin/AdminDashboard'
import AlumnoProfile from './pages/alumno/AlumnoProfile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* Rutas de Administrador */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/alumnos" element={<div>Lista de Alumnos</div>} />
      
      {/* Rutas de Alumno */}
      <Route path="/alumno/perfil" element={<AlumnoProfile />} />
      <Route path="/alumno/pagos" element={<div>Mis Pagos</div>} />
    </Routes>
  )
}

export default App
