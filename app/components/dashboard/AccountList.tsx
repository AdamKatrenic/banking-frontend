"use client";

import { Account } from "../../lib/types";
import AccountCard from "./AccountCard";
import Button from "../../components/ui/Button";
import { Plus } from "lucide-react";

interface AccountListProps {
  accounts: Account[];
  selectedAccount: Account | null;
  onSelect: (account: Account) => void;
  onCreateAccount: () => void;
  onDelete: (accountId: number) => void;
  loading: boolean;
}

export default function AccountList({
  accounts,
  selectedAccount,
  onSelect,
  onCreateAccount,
  onDelete,
  loading,
}: AccountListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-[#1A1D27] border border-[#2A2D3A] rounded-2xl p-6 animate-pulse"
          >
            <div className="h-4 bg-[#2A2D3A] rounded mb-3 w-3/4" />
            <div className="h-8 bg-[#2A2D3A] rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          selected={selectedAccount?.id === account.id}
          onClick={() => onSelect(account)}
          onDelete={onDelete}
        />
      ))}
      <div className="bg-[#1A1D27] border border-dashed border-[#2A2D3A] rounded-2xl p-6 flex items-center justify-center hover:border-[#00BFA6]/50 transition-colors">
        <Button onClick={onCreateAccount} variant="secondary">
          <div className="flex items-center gap-2">
            <Plus size={18} />
            <span>New Account</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
