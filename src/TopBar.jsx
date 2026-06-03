import { Menu, X, Coffee, Sparkles } from "lucide-react";
export default function TopBar({ isSidebarOpen, onToggleSidebar, currentPage, totalPages, onAbout }) {
  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex flex-wrap items-center justify-between gap-3">
      <button
        onClick={onToggleSidebar}
        type="button"
        className="rounded-2xl border border-white/10 bg-[#1d1b14]/95 px-3 py-2 text-[#ffd765] backdrop-blur-md shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:bg-[#26221b]/95 hover:text-[#fff] focus:outline-none focus:ring-2 focus:ring-[#ffd765]/30 cursor-pointer"
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          onClick={onAbout}
          type="button"
          className="flex items-center gap-2 rounded-full px-4 py-3 font-semibold glow-badge transition hover:shadow-xl cursor-pointer"
          style={{
            background: "linear-gradient(135deg, rgba(255,215,100,0.98), rgba(255,183,50,0.95))",
            color: "#111",
            border: "2px solid rgba(255,255,255,0.2)",
          }}
        >
          <Sparkles size={18} />
          Meet the Author
        </button>
        <a
          href="https://www.buymeacoffee.com/ajaynair"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold transition hover:shadow-xl"
          style={{
            background: "linear-gradient(135deg, #FFEA60 0%, #FFB900 100%)",
            color: "#111",
            boxShadow: "0 10px 30px rgba(255,210,0,0.38)",
            border: "2px solid rgba(255,255,255,0.25)",
          }}
        >
          <Coffee size={18} />
          BUY ME COFFEE
        </a>
        <div className="px-4 py-2 rounded-2xl border border-white/10 bg-[#1d1b14]/95 text-xs tracking-[0.18em] uppercase text-[#d4bc8f] backdrop-blur-md">
          {currentPage} / {totalPages}
        </div>
      </div>
    </div>
  );
}
