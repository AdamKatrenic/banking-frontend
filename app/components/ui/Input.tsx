interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  registration: object;
}

export default function Input({
  label,
  type = "text",
  placeholder,
  error,
  registration,
}: InputProps) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input
        {...registration}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-[#1A1D27] border border-[#2A2D3A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00BFA6] transition-colors"
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}