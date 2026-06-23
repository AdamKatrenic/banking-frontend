"use client";

import { useState } from "react";
import { Transaction } from "../../lib/types";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import TransactionFilter from "./TransactionFilter";
import api from "../../lib/api";
import toast from "react-hot-toast";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";

interface RecentTransactionsProps {
  transactions: Transaction[];
  loading: boolean;
  accountNumber?: string;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export default function RecentTransactions({
  transactions,
  loading,
  accountNumber,
  totalPages = 0,
  currentPage = 0,
  onPageChange,
}: RecentTransactionsProps) {
  const [filter, setFilter] = useState("ALL");

  const filtered = filter === "ALL"
    ? transactions
    : transactions.filter((tx) => tx.type === filter);

  const handleExport = async () => {
    if (!accountNumber) return;
    try {
      const response = await api.get(`/api/export/transactions/${accountNumber}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `transactions_${accountNumber}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Exported successfully!");
    } catch {
      toast.error("Export failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <Card>
        <h2 className="text-white font-semibold mb-4">Recent Transactions</h2>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-[#2A2D3A] animate-pulse">
            <div className="h-4 bg-[#2A2D3A] rounded w-1/4" />
            <div className="h-4 bg-[#2A2D3A] rounded w-1/4 ml-auto" />
          </div>
        ))}
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold">Recent Transactions</h2>
        <button
          onClick={handleExport}
          disabled={transactions.length === 0 || !accountNumber}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#00BFA6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Download size={16} />
          <span>Export CSV</span>
        </button>
      </div>

      <TransactionFilter selected={filter} onChange={setFilter} />

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No transactions found</p>
      ) : (
        <div className="space-y-1">
          {filtered.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between py-3 border-b border-[#2A2D3A] last:border-0"
            >
              <div className="flex items-center gap-3">
                <Badge type={tx.type} />
                <span className="text-gray-400 text-sm">
                  {new Date(tx.createdAt).toLocaleDateString("sk-SK", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <span className={`font-semibold ${
                tx.type === "DEPOSIT"
                  ? "text-green-400"
                  : tx.type === "WITHDRAWAL"
                  ? "text-red-400"
                  : "text-blue-400"
              }`}>
                {tx.type === "DEPOSIT" ? "+" : "-"}€{Number(tx.amount).toLocaleString("sk-SK", { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2A2D3A]">
          <button
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 0}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#00BFA6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <span className="text-gray-500 text-sm">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#00BFA6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </Card>
  );
}