import { BookOpen } from "lucide-react";

export default function Sidebar({ isOpen, currentPage, totalPages, goToPage }) {
  return (
    <aside
      className="shrink-0 flex flex-col overflow-hidden transition-all duration-300 sidebar-panel"
      style={{ width: isOpen ? "220px" : "0px" }}
    >
      <div
        className="overflow-y-auto flex-1 py-4"
        style={{ width: "220px", scrollbarWidth: "thin", scrollbarColor: "#3a3228 #18160f" }}
      >
        <div className="px-5 pb-3">
          <p className="sidebar-label text-xs font-semibold">Contents</p>
          <div className="mt-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#f2e9d7] shadow-sm shadow-black/10">
            Choose a page to jump into the next chapter of the adventure.
          </div>
        </div>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`w-full text-left px-5 py-3 mb-1 text-sm flex items-center gap-3 page-pill ${currentPage === p ? "page-pill-active" : ""}`}
            style={{
              color: currentPage === p ? "#ffd965" : "#c5b69a",
              fontFamily: "'Spectral', serif",
            }}
          >
            <BookOpen size={12} style={{ opacity: currentPage === p ? 0.95 : 0.55, flexShrink: 0 }} />
            Page {p}
          </button>
        ))}
      </div>
    </aside>
  );
}
