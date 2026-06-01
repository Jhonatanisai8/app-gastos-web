import { useState, useCallback } from "react";
import { obtenerDashboard } from "../services/dashboardService";

export const useDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const cargarDashboard = useCallback(async (token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await obtenerDashboard(token);
      setData(response);
      return response;
    } catch (error) {
      setError(error.message || "Error al cargar dashboard");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    data,
    cargarDashboard,
  };
};
