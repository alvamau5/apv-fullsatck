import AdminNav from "../components/AdminNav";

const UpdatePassword = () => {
  return (
    <>
      <AdminNav />
      <h1 className="text-3xl font-black text-center mt-10">
        Cambiar Password
      </h1>
      <p className="mt-5 text-xl mb-10 text-center">
        Modifica tu <span className="text-indigo-600">password aquí</span>
      </p>
    </>
  );
};

export default UpdatePassword;
