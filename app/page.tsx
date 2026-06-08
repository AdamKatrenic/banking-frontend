import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0F1117]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Adam Banking App</h1>
        <p className="text-gray-400 mb-8">Your secure banking platform</p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-[#1A1D27] border border-[#2A2D3A] text-white rounded-lg hover:border-[#00BFA6] transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 bg-[#00BFA6] hover:bg-[#00A896] text-white rounded-lg transition-colors"
          >
            Get started
          </Link>
        </div>
      </div>
    </main>
  );
}