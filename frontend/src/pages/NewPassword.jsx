import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert } from "../components/Alert";
import clientAxios from "../config/axios";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});
  const [validToken, setValidToken] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await clientAxios.get(`/veterinarians/forget-password/${token}`);
        setAlert({
          msg: "Coloca tu nuevo password",
        });
        setValidToken(true);
      } catch (error) {
        console.log(error);
        setAlert({
          msg: "Hubo un error con el enlace",
          error: true,
        });
      }
    };
    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: "El nuevo password no puede ser menor a 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/veterinarians/forget-passowrd/${token}`;
      const { data } = await clientAxios.post(url, { password });
      console.log(data);
      setAlert({
        msg: data.msg,
      });
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu password y no Pierdas
          <span className="text-black"> tus pacientes</span>
        </h1>
      </div>

      <div
        className="mt-20 md:mt-5 shadow-lg px-5 py-10
        rounded-xl"
      >
        {msg && <Alert alert={alert} />}

        {validToken && (
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label
                className="uppercase text-gray-600 block text-xl
                font-bold"
              >
                Nuevo Password
              </label>
              <input
                type="password"
                placeholder="Tu Password"
                className="border w-full p-3 mt-3 bg-gray-50
                rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="submit"
                value="Guardar Nuevo Password"
                className="bg-indigo-700 w-full py-3 px-10
                rounded-xl text-white uppercase font-bold mt-5
                hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />
            </div>
          </form>
        )}
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            Ya tienes cuenta? Inicia Sesion
          </Link>
        </nav>
      </div>
    </>
  );
};

export default NewPassword;
