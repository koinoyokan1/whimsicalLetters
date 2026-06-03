import { Menu, X, Coffee, Sparkles } from "lucide-react";

export default function TopBar({ isSidebarOpen, onToggleSidebar, onAbout }) {
  return (
    // Kept as a single flat row (items-center) with smaller margins and padding on mobile
    <div className="fixed top-2 left-2 right-2 md:top-4 md:left-4 md:right-4 z-50 flex items-center justify-between gap-2">
      
      {/* Sidebar Toggle Button */}
      <button
        onClick={onToggleSidebar}
        type="button"
        className="rounded-xl md:rounded-2xl border border-white/10 bg-[#1d1b14]/95 px-2.5 py-2 md:px-3 md:py-2 text-[#ffd765] backdrop-blur-md shadow-lg shadow-black/25 transition hover:-translate-y-0.5 hover:bg-[#26221b]/95 hover:text-[#fff] focus:outline-none focus:ring-2 focus:ring-[#ffd765]/30 cursor-pointer"
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Right Action Buttons: Compact on mobile, full-size on desktop */}
      <div className="flex items-center gap-2 md:gap-3">
        
        {/* Author Button */}
        <button
          onClick={onAbout}
          type="button"
          className="flex items-center justify-center gap-1.5 rounded-full px-3 py-2 md:px-4 md:py-3 font-semibold glow-badge transition hover:shadow-xl cursor-pointer whitespace-nowrap text-xs md:text-sm lg:text-base"
          style={{
            background: "linear-gradient(135deg, rgba(255,215,100,0.98), rgba(255,183,50,0.95))",
            color: "#111",
            border: "2px solid rgba(255,255,255,0.2)",
          }}
        >
          <Sparkles size={16} className="shrink-0" />
          {/* Displays 'Me' on small screens, 'Meet the Author' on medium screens and up */}
          <span className="inline md:hidden">Me</span>
          <span className="hidden md:inline">Meet the Author</span>
        </button>
        
        {/* Buy Me Coffee Button */}
        <a
          href="https://www.buymeacoffee.com/ajaynair"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 md:px-5 md:py-3 font-semibold transition hover:shadow-xl text-xs md:text-sm lg:text-base"
          style={{
            background: "linear-gradient(135deg, #FFEA60 0%, #FFB900 100%)",
            color: "#111",
            boxShadow: "0 6px 20px rgba(255,210,0,0.25)",
            border: "2px solid rgba(255,255,255,0.25)",
          }}
        >
          <Coffee size={16} className="shrink-0" />
          {/* Hides the text entirely on mobile screens, showing only the icon */}
          <span className="hidden md:inline">BUY ME COFFEE</span>
        </a>

      </div>
    </div>
  );
}