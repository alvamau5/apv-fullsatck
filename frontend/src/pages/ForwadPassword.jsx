import { Link } from "react-router-dom"

const ForwadPassword = () => {


  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu Acceso y no Pierdas
          <span className="text-black"> tus pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10
        rounded-xl">
        <form>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl
              font-bold"
            >
              Email
            </label>
            <input type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-50
              rounded-xl"
            />
          </div>
          <input
            type="submit"
            value="Enviar Instrucciones"
            className="bg-indigo-700 w-full py-3 px-10
              rounded-xl text-white uppercase font-bold mt-5
              hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>
      </div>
      <nav className="mt-10 lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-gray-500"
          to="/login">
          Ya tienes cuenta? Inicia Sesion
        </Link>
        <Link
          className="block text-center my-5 text-gray-500"
          to="/register">
          No tienes una cuenta? Registrate
        </Link>
      </nav>
    </>
  )
}

export default ForwadPassword
