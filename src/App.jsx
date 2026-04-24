import { Routes, Route } from 'react-router-dom'
import Login from './Login'

// Un componente rápido para la página de bienvenida
const Dashboard = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>🏠 ¡Bienvenido al Dashboard!</h1>
    <p>Solo puedes ver esto si te has logueado.</p>
  </div>
)

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
