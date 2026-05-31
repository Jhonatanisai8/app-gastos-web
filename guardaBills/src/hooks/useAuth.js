import { useCallback, useState } from "react";
import { loginService } from "../services/authService";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authData, setAuthData] = useState(null);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginService(email, password);
      if (response.status === 200) {
        setAuthData(response.data);
        return response.data;
      } else {
        throw new Error(response.message || "Error al procesar la petición");
      }
    } catch (er) {
      const errorMessage = er.message || "Ocurrio un error en el login.";
      setError(errorMessage);
      throw er;
    } finally {
      setLoading(false);
    }
  }, []);
  return {
    login,
    loading,
    error,
    authData,
  };
};
