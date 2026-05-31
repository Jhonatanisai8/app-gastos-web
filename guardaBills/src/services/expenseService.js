import apiClient from "../api/apiClient";

export const RegistroExpenseService = async (expenseData, token) => {
  try {
    const response = await apiClient.post("/expenses", expenseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error en el servidor");
    } else if (error.request) {
      throw new Error("No se pudo establecer conexion con el servidor");
    } else {
      throw new Error("Error: " + error.message);
    }
  }
};
