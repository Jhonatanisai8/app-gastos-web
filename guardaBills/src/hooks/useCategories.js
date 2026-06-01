import { useState, useCallback } from "react";
import { obtenerCategories } from "../services/categorieService";

export const useCategories = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const obtenerListadoCategories = useCallback(async (token, type) => {
    setLoading(true);
    setError(null);

    try {
      const response = await obtenerCategories(token, type);
      setData(response);
      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    data,
    obtenerListadoCategories,
  };
};
