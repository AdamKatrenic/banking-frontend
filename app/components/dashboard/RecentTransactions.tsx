import { Transaction } from "../../lib/types";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";

interface RecentTransactionsProps {
  transactions: Transaction[];
  loading: boolean;
}

export default function RecentTransactions({ transactions, loading }: RecentTransactionsProps) {
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

  if (transactions.length === 0) {
    return (
      <Card>
        <h2 className="text-white font-semibold mb-4">Recent Transactions</h2>
        <p className="text-gray-500 text-center py-8">No transactions yet</p>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-white font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-1">
        {transactions.map((tx) => (
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
    </Card>
  );
}