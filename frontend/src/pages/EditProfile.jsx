import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";

const EditProfile = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile(auth);
  }, [auth]);

  return (
    <>
      <AdminNav />
      <h1 className="text-3xl font-black text-center mt-10">Editar Perfil</h1>
      <p className="mt-5 text-xl mb-10 text-center">
        Modifica tu <span className="text-indigo-600">informacion aquí</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          <form>
            <div className="my-4">
              <label className="text-gray-600" uppercase font-bold>
                Nombre
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="name"
              />
            </div>
            <div className="my-4">
              <label className="text-gray-600" uppercase font-bold>
                Sitio Web
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="web"
              />
            </div>
            <div className="my-4">
              <label className="text-gray-600" uppercase font-bold>
                Telefono
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="phone"
              />
            </div>
            <div className="my-4">
              <label className="text-gray-600" uppercase font-bold>
                Email
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
              />
            </div>
            <input
              type="submit"
              value="Guardar Cambios"
              className="bg-indigo-700 px-10 py-3 font-bold text-white
              rounded-lg uppercase w-full mt-5 hover:cursor-pointer
              hover:bg-indigo-800 transition-colors"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
