"use client"

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-[#1A1D27] border border-[#2A2D3A] rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}