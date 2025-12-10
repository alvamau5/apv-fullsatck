import { Outlet } from "react-router-dom";

const PatientAdmin = () => {
  return (
    <>
      <div>
        <h1>Administra tus Pacientes</h1>
      </div>
      <Outlet />
    </>
  );
};

export default PatientAdmin;
