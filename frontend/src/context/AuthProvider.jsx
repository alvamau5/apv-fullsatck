import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const authenticatedUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false); // No hay token, no autenticado
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        // setLoading(true)
        const { data } = await clientAxios("/veterinarians/profile", config);
        setAuth(data);
        // navigate('/admin')
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }

      setLoading(false);
    };
    authenticatedUser();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  const updateProfile = async profileData => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false)
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }

    try {
      const url = `/veterinarians/profile/${profileData._id}`
      const { data } = await clientAxios.put(url, profileData, config)
      setAuth(data); // Update status with the updated data
      return {
        msg: 'Almacenado Correctamente'
      }
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true
      }
    }
  }

  const savePassword = async (pwdData) => {
    // console.g(pwdData)
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false)
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }

    try {
      const url = '/veterinarians/validate-password'
      const { data } = await clientAxios.put(url, pwdData, config)
      // console.log(data)

      return {
        msg: data.msg
      }
    } catch (error) {
      // console.log(error.response.data.msg)
      return {
        msg: error.response?.data?.msg || 'Hubo un error',
        error: true
      }

    }
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        logout,
        updateProfile,
        savePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
