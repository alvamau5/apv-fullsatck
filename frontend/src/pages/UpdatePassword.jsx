import { useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alert from "../components/Alert";

const UpdatePassword = () => {

  const { auth } = useAuth();
  const [alert, setAlert] = useState({})
  const [password, setPassword] = useState({
    pwd_current: "",
    pwd_new: "",
  })

  const { savePassword } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault()

    // Validar que el password actual exista
    if (password.pwd_current === '') {
      setAlert({
        msg: 'El password actual es obligatorio',
        error: true
      });
      return;
    }

    // Validar que no haya campos vacios en el objeto
    const emptyFields = Object.values(password).some(field => field === '');
    if (emptyFields) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }

    // Validar la longuitud minima del password
    if (password.pwd_new.length < 6) {
      setAlert({
        msg: 'El password debe tener al menos 6 caracteres',
        error: true
      });
      return;
    }

    // Validar que el nuevo password no sea igual al actual
    if (password.pwd_current === password.pwd_new) {
      setAlert({
        msg: 'El nuevo password debe ser diferente al actual',
        error: true
      });
      return;
    }

    const response = await savePassword(password)

    setAlert(response)
  }


  const handleChange = e => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value
    })
  }

  const { msg } = alert

  return (
    <>
      <AdminNav />
      <h1 className="text-3xl font-black text-center mt-10">
        Cambiar Password
      </h1>
      <p className="mt-5 text-xl mb-10 text-center">
        Modifica tu <span className="text-indigo-600">password aquí</span>
      </p>


      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">

          {msg && <Alert alert={alert} />}

          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <label className="text-gray-600 uppercase font-bold">
                Password Actual
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_current"
                placeholder="Escribe tu password actual"
                onChange={handleChange}
              />
            </div>
            <div className="my-4">
              <label className="text-gray-600 uppercase font-bold">
                Password nuevo
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="pwd_new"
                placeholder="Escribe tu password nuevo"
                onChange={handleChange}
              />
              <input
                type="submit"
                value="Actualizar password"
                className="bg-indigo-700 px-10 py-3 font-bold text-white
              rounded-lg uppercase w-full mt-5 hover:cursor-pointer
              hover:bg-indigo-800 transition-colors"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
