import { useState, useCallback } from "react";
import api from "../lib/api";
import { Transaction } from "../lib/types";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchTransactions = useCallback(async (accountNumber: string, page = 0) => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get(
        `/api/transactions/history/${accountNumber}?page=${page}&size=10`
      );
      setTransactions(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.number);
    } catch {
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }, []);

  return { transactions, loading, error, fetchTransactions, totalPages, currentPage };
};