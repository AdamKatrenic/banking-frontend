"use client";

import { label } from "framer-motion/client";

interface TransactionFilterProps {
  selected: string;
  onChange: (filter: string) => void;
}

export default function TransactionFilter({
  selected,
  onChange,
}: TransactionFilterProps) {
  const filters = [
    { label: "All", value: "ALL" },
    { label: "↑ Deposits", value: "DEPOSIT" },
    { label: "↓ Withdrawals", value: "WITHDRAWAL" },
    { label: "→ Transfers", value: "TRANSFER" },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            selected === f.value
              ? "bg-[#00BFA6] text-white"
              : "bg-[#1A1D27] border border-[#2A2D3A] text-gray-400 hover:border-[#00BFA6]/50"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
