"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "../../lib/api";

const schema = z.object({
  toAccountNumber: z.string().min(1, "Target account number is required"),
  amount: z.coerce.number().positive("Amount must be greater than zero"),
});

type FormData = { toAccountNumber: string; amount: number };

interface TransferModalProps {
  accountNumber: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TransferModal({
  accountNumber,
  onClose,
  onSuccess,
}: TransferModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    try {
      await api.post("/api/transactions/transfer", {
        accountNumber,
        toAccountNumber: data.toAccountNumber,
        amount: data.amount,
      });
      onSuccess();
      onClose();
    } catch {
      setError("Transfer failed. Check account number or balance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1A1D27] border border-[#2A2D3A] rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-xl">Transfer Funds</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          From: <span className="text-[#00BFA6]">{accountNumber}</span>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="To Account Number"
            type="text"
            placeholder="SK..."
            error={errors.toAccountNumber?.message}
            registration={{ ...register("toAccountNumber") }}
          />
          <Input
            label="Amount (€)"
            type="number"
            placeholder="0.00"
            error={errors.amount?.message}
            registration={{ ...register("amount") }}
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={onClose} fullWidth>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} fullWidth>
              {loading ? "Processing..." : "Transfer"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
