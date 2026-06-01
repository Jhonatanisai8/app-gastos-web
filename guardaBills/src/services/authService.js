import apiClient from "../api/apiClient";

export const loginService = async (email, password) => {
  try {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
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

export const registerService = async (email, password, name) => {
  try {
    const response = await apiClient.post("/auth/register", {
      name,
      email,
      password,
      currency: "PEN",
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
