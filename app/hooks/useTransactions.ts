import { useState, useCallback } from "react";
import api from "../lib/api";
import { Transaction } from "../lib/types";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTransactions = useCallback(async (accountNumber: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get(`/api/transactions/history/${accountNumber}`);
      setTransactions(response.data);
    } catch {
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }, []);

  return { transactions, loading, error, fetchTransactions };
};