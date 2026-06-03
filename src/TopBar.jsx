import { Menu, X, Coffee, Sparkles } from "lucide-react";
export default function TopBar({ isSidebarOpen, onToggleSidebar, currentPage, totalPages, onAbout }) {
  return (
    <>
      <button
        onClick={onToggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg"
        style={{
          background: "rgba(24,22,15,0.9)",
          color: "#c9a96e",
          backdropFilter: "blur(8px)",
        }}
      >
        {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
<button
  onClick={onAbout}
  className="fixed top-4 right-72 z-50 flex items-center gap-2 px-4 py-3 rounded-full font-bold animate-pulse"
  style={{
    background:
      "linear-gradient(135deg, rgba(201,169,110,1), rgba(255,215,100,1))",
    color: "#111",
    boxShadow:
      "0 0 20px rgba(255,215,100,0.6), 0 0 40px rgba(255,215,100,0.25)",
    border: "2px solid rgba(255,255,255,0.2)",
  }}
>
  <Sparkles size={18} />
  Meet The Author
</button>
      <div
        className="fixed top-4 right-20 z-50 px-3 py-2 rounded-lg"
        style={{
          background: "rgba(24,22,15,0.85)",
          color: "#c9a96e",
          backdropFilter: "blur(8px)",
          fontSize: "12px",
          letterSpacing: "0.15em",
        }}
      >
        {currentPage} / {totalPages}
      </div>

      <a
        href="https://www.buymeacoffee.com/ajaynair"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-full font-bold"
        style={{
          background: "linear-gradient(135deg, #FFDD00 0%, #FFC107 100%)",
          color: "#111",
          boxShadow: "0 6px 25px rgba(255,210,0,0.6)",
          fontSize: "14px",
          letterSpacing: "0.08em",
          border: "2px solid rgba(255,255,255,0.25)",
        }}
      >
        <Coffee size={18} />
        BUY ME COFFEE ☕
      </a>
    </>
  );
}
