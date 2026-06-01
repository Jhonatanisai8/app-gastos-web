import { useCallback, useState } from "react";
import { loginService, registerService } from "../services/authService";

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

  const register = useCallback(async (email, password, name) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerService(email, password, name);
      if (response.status === 201) {
        setAuthData(response.data);
        return response.data;
      } else {
        throw new Error(response.message || "Error al procesar el registro");
      }
    } catch (er) {
      const errorMessage = er.message || "Ocurrio un error en el registro.";
      setError(errorMessage);
      throw er;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    login,
    register,
    loading,
    error,
    authData,
  };
};
