interface BadgeProps {
  type: "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";
}

export default function Badge({ type }: BadgeProps) {
  const styles = {
    DEPOSIT: "bg-green-900/30 text-green-400 border-green-800",
    WITHDRAWAL: "bg-red-900/30 text-red-400 border-red-800",
    TRANSFER: "bg-blue-900/30 text-blue-400 border-blue-800",
  };

  const labels = {
    DEPOSIT: "↑ Deposit",
    WITHDRAWAL: "↓ Withdraw",
    TRANSFER: "→ Transfer",
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-md border font-medium ${styles[type]}`}>
      {labels[type]}
    </span>
  );
}