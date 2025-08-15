import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout' // Pagina maestra donde se registraran todos los cambios
import Login from './pages/Login'
import Register from './pages/Register'
import CheckCount from './pages/CheckCount'
import ForwadPassword from './pages/ForwadPassword'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='check-count' element={<CheckCount />} />
          <Route path='forwad-password' element={<ForwadPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
