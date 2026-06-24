"use client";

import { motion } from "framer-motion";
import { Account } from "../../lib/types";
import Card from "../../components/ui/Card";
import { CreditCard, Trash2 } from "lucide-react";

interface AccountCardProps {
  account: Account;
  selected: boolean;
  onClick: () => void;
  onDelete: (accountId: number) => void;
}

export default function AccountCard({ account, selected, onClick, onDelete }: AccountCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Delete account ${account.accountNumber}? This cannot be undone.`)) {
      onDelete(account.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`cursor-pointer transition-all duration-200 ${
          selected
            ? "border-[#00BFA6] bg-[#00BFA6]/10"
            : "hover:border-[#00BFA6]/50"
        }`}
      >
        <div className="flex items-start justify-between">
          <button onClick={onClick} className="text-left flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#00BFA6]/20 rounded-lg flex items-center justify-center">
                <CreditCard size={20} className="text-[#00BFA6]" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Bank Account</p>
                <p className="text-gray-500 text-xs">{account.accountNumber}</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-white">
              €{Number(account.balance).toLocaleString("sk-SK", { minimumFractionDigits: 2 })}
            </p>
          </button>
          <button
            onClick={handleDelete}
            className="text-gray-600 hover:text-red-400 transition-colors p-1 ml-2"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </Card>
    </motion.div>
  );
}