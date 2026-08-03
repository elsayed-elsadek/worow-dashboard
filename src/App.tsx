
import { Navigate, Route, Routes } from 'react-router-dom'
import Admin from './pages/administration/Admin'
import Emergency from './pages/emergency/Emergency'
import Insurance from './pages/insurance/Insurance'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/insurance" replace />} />
      <Route path="/insurance" element={<Insurance />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/emergency" element={<Emergency />} />
      <Route path="*" element={<Navigate to="/insurance" replace />} />
    </Routes>
  )
}

export default App

