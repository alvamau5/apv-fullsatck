import { useState, useEffect } from "react";
import { Alert } from "../components/Alert";
import usePatients from "../hooks/usePatients";

function Form() {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [symptom, setSymptom] = useState("");
  const [id, setId] = useState(null);

  const [alert, setAlert] = useState({});

  const { savePatients, patient } = usePatients();

  useEffect(() => {
    if (patient?.name) {
      setName(patient.name);
      setOwner(patient.owner);
      setEmail(patient.email);
      setDate(new Date(patient.date).toISOString());
      setSymptom(patient.symptom);
      setId(patient._id);
    }
  }, [patient]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if ([name, owner, email, date, symptom].includes("")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    savePatients({ name, owner, email, date, symptom, id });
    setAlert({
      msg: "Guardado Correctamente",
    });

    // Reset form
    setName("");
    setOwner("");
    setEmail("");
    setDate("");
    setSymptom("");
    setId("");
  };

  const { msg } = alert;

  return (
    <>
      <h2
        className="font-black
            text-2xl
            text-center"
      >
        Administrador de Pacientes
      </h2>
      <p className="font-black text-center text-2xl">
        Agrega tus Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-md py-10 px-5
        mb-10 lg:mb-0"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="pet-name" className="text-gray-700 font-bold">
            Nombre Mascota
          </label>
          <input
            id="pet-name"
            name="name"
            type="text"
            placeholder="Nombre de la Mascota"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 w-full p-2 mt-2
            placeholder-gray-400 rounded-md"
          />

          <div className="mb-5">
            <label htmlFor="owner-name" className="text-gray-700 font-bold">
              Nombre Propietario
            </label>
            <input
              id="owner-name"
              name="owner"
              type="text"
              placeholder="Nombre del Propietario"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="border-2 w-full p-2 mt-2
            placeholder-gray-400 rounded-md"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="text-gray-700 font-bold">
              Email del Propietario
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email del Propietario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 w-full p-2 mt-2
            placeholder-gray-400 rounded-md"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="date" className="text-gray-700 font-bold">
              Fecha de Alta
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-2 w-full p-2 mt-2
            placeholder-gray-400 rounded-md"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="symptom" className="text-gray-700 font-bold">
              Sintomas
            </label>
            <textarea
              id="symptom"
              name="symptom"
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              placeholder="Describe los Sintomas"
              className="border-2 w-full p-2 mt-2
            placeholder-gray-400 rounded-md"
            />
          </div>

          <input
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white
            font-bold hover:bg-indigo-800 cursor-pointer
            rounded-md transition-colors"
            value={id ? "Guardar Paciente" : "Agregar Paciente"}
          />
        </div>
      </form>

      {msg && <Alert alert={alert} />}
    </>
  );
}

export default Form;
