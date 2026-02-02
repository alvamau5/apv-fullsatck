import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout"; // Pagina maestra donde se registraran todos los cambios
import ProtectedRoute from "./layout/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Confirm from "./pages/Confirm";
import ForgetPassword from "./pages/ForgetPassword";
import NewPassword from "./pages/NewPassword";
import PatientAdmin from "./pages/PatientAdmin";
import EditProfile from "./pages/EditProfile";
import UpdatePassword from "./pages/UpdatePassword";

import { AuthProvider } from "./context/AuthProvider";
import { PatientProvider } from "./context/PatientProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="forget-password/:token" element={<NewPassword />} />
              <Route path="confirm/:id" element={<Confirm />} />
            </Route>

            {/* Rutas Protegidas */}
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route index element={<PatientAdmin />} />
              <Route path="profile" element={<EditProfile />} />
              <Route path="update-password" element={<UpdatePassword />} />
            </Route>
          </Routes>
        </PatientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
