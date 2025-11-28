import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ childern }) => {
  const [auth, setAuth] = useState({});
  return <AuthContext.Provider>{childern}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;
