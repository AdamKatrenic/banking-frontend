"use client";

import { logout } from "../../lib/auth";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-[#2A2D3A] bg-[#1A1D27]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-lg">BankingApp</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/profile"
            className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <User size={18} />
            <span className="text-sm hidden sm:block">Profile</span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-1 sm:gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}