import { useState } from "react"
import { Link } from "react-router-dom"


const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu cuenta y administra tus
          <span className="text-black"> pacientes </span>
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
              Name
            </label>
            <input type="text"
              placeholder="Tu nombre"
              className="border w-full p-3 mt-3 bg-gray-50
              rounded-xl"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
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
          <div>
            <label
              className="uppercase text-gray-600 block text-xl
              font-bold"
            >
              Password
            </label>
            <input type="password"
              placeholder="Tu Password"
              className="border w-full p-3 mt-3 bg-gray-50
              rounded-xl"
            />
            <label
              className="uppercase text-gray-600 block text-xl
              font-bold"
            >
              Confirma tu Password
            </label>
            <input type="password"
              placeholder="Confirma Password"
              className="border w-full p-3 mt-3 bg-gray-50
              rounded-xl"
            />
            <input
              type="submit"
              value="Crear cuenta"
              className="bg-indigo-700 w-full py-3 px-10
              rounded-xl text-white uppercase font-bold mt-5
              hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />
          </div>
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500"
            to="/register">
            Ya tienes cuenta? Inicia Sesion
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/forwad-password">
            Olvide mi password
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Register
