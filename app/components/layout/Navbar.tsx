"use client";

import { logout } from "../../lib/auth";
import { LogOut } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-[#2A2D3A] bg-[#1A1D27]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[#00BFA6] text-2xl font-bold">🏦</span>
          <span className="text-white font-bold text-xl">BankingApp</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </nav>
  );
}