import { useState, useCallback } from "react";
import api from "../lib/api";
import { Account } from "../lib/types";

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/api/accounts");
      setAccounts(response.data);
    } catch {
      setError("Failed to load accounts");
    } finally {
      setLoading(false);
    }
  }, []);

  return { accounts, loading, error, fetchAccounts };
};