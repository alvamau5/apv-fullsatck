import usePatients from "../hooks/usePatients";

const Patient = ({ patient }) => {
  const { name, owner, email, date, symptom, _id } = patient;
  const { editPatient, deletePatient } = usePatients();

  const formatDate = (date) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat("es-Mx", { dateStyle: "long" }).format(
      newDate,
    );
  };
  return (
    <div className="m-5 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold mb-3 text-gray-700 uppercase">
        🐕 Nombre: {""}
        <span className="font-normal normal-case text-black">{name}</span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase">
        📅 Fecha: {""}
        <span className="font-normal normal-case text-black">
          {formatDate(date)}
        </span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase">
        🏥 Sintomas: {""}
        <span className="font-normal normal-case text-black">{symptom}</span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Propietario: {""}
        <span className="font-normal normal-case text-black">{owner}</span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Email: {""}
        <span className="font-normal normal-case text-black">{email}</span>
      </p>

      {/* Actions */}
      <div className="flex justify-between my-5">
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white
          font-bold py-2 px-5 rounded-lg uppercase"
          onClick={() => editPatient(patient)}
        >
          ✏️ Editar
        </button>
        <button
          type="button"
          className="bg-red-600 hover:bg-red-800 text-white
          font-bold py-2 px-5 rounded-lg uppercase"
          onClick={() => deletePatient(_id)}
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
};

export default Patient;
