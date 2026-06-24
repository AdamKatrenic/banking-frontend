"use client";

import { motion } from "framer-motion";

interface WelcomeBannerProps {
  name: string;
  totalBalance: number;
}

export default function WelcomeBanner({ name, totalBalance }: WelcomeBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-r from-[#00BFA6]/20 to-[#1A1D27] border border-[#00BFA6]/30 rounded-2xl p-6 mb-6"
    >
      <p className="text-gray-400 text-sm mb-1">Welcome back</p>
      <h1 className="text-2xl font-bold text-white mb-4 break-all">{name}</h1>
      <div>
        <p className="text-gray-400 text-sm">Total Balance</p>
        <motion.p
          key={totalBalance}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-4xl font-bold text-[#00BFA6]"
        >
          €{totalBalance.toLocaleString("sk-SK", { minimumFractionDigits: 2 })}
        </motion.p>
      </div>
    </motion.div>
  );
}