import { createContext, useState, useEffect } from "react";
import clientAxios from "../config/axios";

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});

  useEffect(() => {
    const getPatients = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return; // No hay token, no autenticado

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clientAxios("/patients", config);
        setPatients(data);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    getPatients();
  }, []);

  const savePatients = async (patient) => {
    const token = localStorage.getItem("token");

    if (!token) return; // No hay token, no autenticado

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (patient.id) {
      // console.log("Editando...");

      try {
        // ---------------- MODO EDICIÓN (PUT) ----------------

        const { data } = await clientAxios.put(
          `/patients/${patient.id}`,
          patient,
          config,
        );
        const updatedPatients = patients.map((patientState) =>
          patientState._id === data._id ? data : patientState,
        );
        setPatients(updatedPatients);
      } catch (error) {
        console.log(error);
      }
    } else {
      // console.log("Nuevo Paciente");
      try {
        // ---------------- MODO CREACION (POST) ----------------
        const { data } = await clientAxios.post("/patients", patient, config);

        const { createdAt, updatedAt, __v, ...newPatient } = data;
        setPatients([newPatient, ...patients]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const editPatient = (patient) => {
    setPatient(patient);
  };

  const deletePatient = (id) => {
    // console.log("Eliminar Paciente", id);
    const confirmDelete = window.confirm("¿Deseas eliminar este paciente?");

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) return; // No hay token, no autenticado

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      clientAxios.delete(`/patients/${id}`, config);
      const updatedPatients = patients.filter((patientsState) => patientsState._id !== id);
      setPatients(updatedPatients);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <PatientContext.Provider
      value={{
        patients,
        patient,
        editPatient,
        deletePatient,
        savePatients,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export default PatientContext;
