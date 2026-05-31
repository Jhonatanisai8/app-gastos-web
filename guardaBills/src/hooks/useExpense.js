import { useState } from "react";
import { RegistroExpenseService } from "../services/expenseService";

export const useExpense = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const registroExpense = async (expenseData, token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await RegistroExpenseService(expenseData, token);
      setData(response);
      return response;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    registroExpense,
  };
};
