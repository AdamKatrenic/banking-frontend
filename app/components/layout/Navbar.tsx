"use client";

import { logout } from "../../lib/auth";
import { LogOut, User, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="border-b border-[#2A2D3A] bg-[#1A1D27] dark:bg-[#1A1D27] light:bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-lg">BankingApp</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
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