"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Zap, BarChart3, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure",
    description: "JWT authentication, BCrypt encryption and rate limiting protect your account.",
  },
  {
    icon: Zap,
    title: "Fast",
    description: "Instant deposits, withdrawals and transfers between accounts.",
  },
  {
    icon: BarChart3,
    title: "Insightful",
    description: "Visual charts and CSV export to track your financial activity.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F1117]">
      {/* Navbar */}
      <nav className="border-b border-[#2A2D3A] bg-[#1A1D27]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-white font-bold text-xl">AdamBankingApp</span>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-[#00BFA6] hover:bg-[#00A896] text-white rounded-lg transition-colors text-sm"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#00BFA6] text-sm font-medium bg-[#00BFA6]/10 px-3 py-1 rounded-full border border-[#00BFA6]/30">
            Secure Banking Platform
          </span>
          <h1 className="text-5xl font-bold text-white mt-6 mb-6 leading-tight">
            Banking made
            <span className="text-[#00BFA6]"> simple </span>
            and secure
          </h1>
          <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
            Manage your accounts, track transactions and transfer funds — all in one place.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="flex items-center gap-2 px-8 py-4 bg-[#00BFA6] hover:bg-[#00A896] text-white rounded-lg transition-colors font-medium"
            >
              Get started free
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-[#1A1D27] border border-[#2A2D3A] text-white rounded-lg hover:border-[#00BFA6] transition-colors font-medium"
            >
              Sign in
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#1A1D27] border border-[#2A2D3A] rounded-2xl p-6 hover:border-[#00BFA6]/50 transition-colors"
            >
              <div className="w-10 h-10 bg-[#00BFA6]/20 rounded-lg flex items-center justify-center mb-4">
                <feature.icon size={20} className="text-[#00BFA6]" />
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2A2D3A] py-6">
        <p className="text-center text-gray-500 text-sm">
          Built with Spring Boot + Next.js by Adam Katrenič
        </p>
      </footer>
    </main>
  );
}