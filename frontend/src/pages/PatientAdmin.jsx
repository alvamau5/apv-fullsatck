import { useState } from "react";
import Form from "../components/Form";
import ListPatients from "../components/ListPatients";

const PatientAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        className="bg-indigo-600 text-white w-full p-3 rounded-md
        font-bold hover:bg-indigo-800 cursor-pointer
        text-center transition colors mb-10 md:hidden"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Ocultar Formulario" : "Agregar Nuevo Paciente"}
      </button>
      <div
        className={`${showForm ? "block" : "hidden"}
          md:block md:w-1/2 lg:w-2/5
          `}
      >
        <Form />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ListPatients />
      </div>
    </div>
  );
};

export default PatientAdmin;
