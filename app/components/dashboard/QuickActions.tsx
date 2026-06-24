import { ArrowDownCircle, ArrowUpCircle, ArrowRightLeft } from "lucide-react";

interface QuickActionsProps {
  onDeposit: () => void;
  onWithdraw: () => void;
  onTransfer: () => void;
  disabled: boolean;
}

export default function QuickActions({
  onDeposit,
  onWithdraw,
  onTransfer,
  disabled,
}: QuickActionsProps) {
  return (
    <div className="mb-6">
      <h2 className="text-white font-semibold mb-3">Quick Actions</h2>
      {disabled && (
        <p className="text-gray-500 text-sm mb-3">
          Select an account to perform actions
        </p>
      )}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={onDeposit}
          disabled={disabled}
          className="flex flex-col items-center gap-2 p-4 sm:p-6 bg-[#1A1D27] border border-[#2A2D3A] rounded-xl hover:border-green-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ArrowDownCircle size={28} className="text-green-400" />
          <span className="text-white text-sm font-medium">Deposit</span>
        </button>
        <button
          onClick={onWithdraw}
          disabled={disabled}
          className="flex flex-col items-center gap-2 p-4 sm:p-6 bg-[#1A1D27] border border-[#2A2D3A] rounded-xl hover:border-red-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ArrowUpCircle size={28} className="text-red-400" />
          <span className="text-white text-sm font-medium">Withdraw</span>
        </button>
        <button
          onClick={onTransfer}
          disabled={disabled}
          className="flex flex-col items-center gap-2 p-4 sm:p-6 bg-[#1A1D27] border border-[#2A2D3A] rounded-xl hover:border-blue-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ArrowRightLeft size={28} className="text-blue-400" />
          <span className="text-white text-sm font-medium">Transfer</span>
        </button>
      </div>
    </div>
  );
}
