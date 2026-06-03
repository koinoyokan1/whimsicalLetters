import { BookOpen } from "lucide-react";

export default function Sidebar({ isOpen, currentPage, totalPages, goToPage }) {
  return (
    <aside
      className="shrink-0 flex flex-col border-r overflow-hidden transition-all duration-300"
      style={{
        width: isOpen ? "200px" : "0px",
        background: "#18160f",
        borderColor: "#2e2820",
      }}
    >
      <div
        className="overflow-y-auto flex-1 py-3"
        style={{ width: "200px", scrollbarWidth: "thin", scrollbarColor: "#3a3228 #18160f" }}
      >
        <p
          className="px-4 pb-2 text-xs tracking-widest uppercase"
          style={{ color: "#5a4e3e", letterSpacing: "0.2em" }}
        >
          Contents
        </p>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className="w-full text-left px-4 py-2 text-sm flex items-center gap-2"
            style={{
              background: currentPage === p ? "#2e2820" : "transparent",
              color: currentPage === p ? "#c9a96e" : "#7a6e5e",
              borderLeft: currentPage === p ? "2px solid #c9a96e" : "2px solid transparent",
              fontFamily: "'Georgia', serif",
            }}
          >
            <BookOpen size={11} style={{ opacity: 0.6, flexShrink: 0 }} />
            Page {p}
          </button>
        ))}
      </div>
    </aside>
  );
}
