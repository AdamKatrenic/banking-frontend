"use client";

import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { Transaction } from "../../lib/types";
import Card from "../ui/Card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

interface TransactionChartProps {
  transactions: Transaction[];
}

export default function TransactionChart({
  transactions,
}: TransactionChartProps) {
  if (transactions.length === 0) return null;

  const totals = transactions.reduce(
    (acc, tx) => {
      if (tx.type === "DEPOSIT") acc.deposit += Number(tx.amount);
      if (tx.type === "WITHDRAWAL") acc.withdrawal += Number(tx.amount);
      if (tx.type === "TRANSFER") acc.transfer += Number(tx.amount);
      return acc;
    },
    { deposit: 0, withdrawal: 0, transfer: 0 },
  );

  // Posledných 7 transakcií pre bar chart
  const last7 = [...transactions].slice(0, 7).reverse();

  const barData = {
    labels: last7.map((tx) =>
      new Date(tx.createdAt).toLocaleDateString("sk-SK", {
        day: "2-digit",
        month: "short",
      }),
    ),
    datasets: [
      {
        label: "Amount (€)",
        data: last7.map((tx) => Number(tx.amount)),
        backgroundColor: last7.map((tx) =>
          tx.type === "DEPOSIT"
            ? "rgba(0, 191, 166, 0.7)"
            : tx.type === "WITHDRAWAL"
              ? "rgba(255, 71, 87, 0.7)"
              : "rgba(59, 130, 246, 0.7)",
        ),
        borderColor: last7.map((tx) =>
          tx.type === "DEPOSIT"
            ? "#00BFA6"
            : tx.type === "WITHDRAWAL"
              ? "#FF4757"
              : "#3B82F6",
        ),
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const doughnutData = {
    labels: ["Deposits", "Withdrawals", "Transfers"],
    datasets: [
      {
        data: [totals.deposit, totals.withdrawal, totals.transfer],
        backgroundColor: [
          "rgba(0, 191, 166, 0.7)",
          "rgba(255, 71, 87, 0.7)",
          "rgba(59, 130, 246, 0.7)",
        ],
        borderColor: ["#00BFA6", "#FF4757", "#3B82F6"],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#94A3B8",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#94A3B8" },
        grid: { color: "#2A2D3A" },
      },
      y: {
        ticks: { color: "#94A3B8" },
        grid: { color: "#2A2D3A" },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#94A3B8",
          padding: 16,
        },
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8 mb-6"
    >
      <Card>
        <h2 className="text-white font-semibold mb-4">Last 7 Transactions</h2>
        <Bar data={barData} options={chartOptions} />
      </Card>

      <Card>
        <h2 className="text-white font-semibold mb-4">Transaction Overview</h2>
        <div className="flex items-center justify-center">
          <div className="w-64">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="text-center">
            <p className="text-[#00BFA6] font-bold">
              €{totals.deposit.toLocaleString("sk-SK")}
            </p>
            <p className="text-gray-500 text-xs">Deposits</p>
          </div>
          <div className="text-center">
            <p className="text-red-400 font-bold">
              €{totals.withdrawal.toLocaleString("sk-SK")}
            </p>
            <p className="text-gray-500 text-xs">Withdrawals</p>
          </div>
          <div className="text-center">
            <p className="text-blue-400 font-bold">
              €{totals.transfer.toLocaleString("sk-SK")}
            </p>
            <p className="text-gray-500 text-xs">Transfers</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
