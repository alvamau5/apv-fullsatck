/* *
 * Outlet es un componente que carga desde
 * la pagina a visitar el primer componente y
 * cargara su contenido
 * */

import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 gap-10 p-5">
        <Outlet />
      </main>
    </>
  )
}

export default AuthLayout
