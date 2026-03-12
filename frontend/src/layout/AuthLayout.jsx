/* *
 * Outlet es un componente que carga desde
 * la pagina a visitar el primer componente y
 * cargara su contenido
 * */

import { Outlet, Navigate} from "react-router-dom"
import useAuth from "../hooks/useAuth"

const AuthLayout = () => {

  const { auth, loadign } = useAuth();

  if (loadign) return "Cargando...";

  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 gap-10 p-5">
    {auth?._id ? <Navigate to = '/admin' /> : <Outlet />}
      </main>
    </>
  )
}

export default AuthLayout
