import { Account } from "../../lib/types";
import Card from "../../components/ui/Card";
import { CreditCard } from "lucide-react";

interface AccountCardProps {
  account: Account;
  selected: boolean;
  onClick: () => void;
}

export default function AccountCard({ account, selected, onClick }: AccountCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-200 ${
        selected
          ? "border-[#00BFA6] bg-[#00BFA6]/10"
          : "hover:border-[#00BFA6]/50"
      }`}
    >
      <button onClick={onClick} className="w-full text-left">
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
    </Card>
  );
}