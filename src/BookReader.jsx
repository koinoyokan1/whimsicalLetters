import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Coffee, Menu, X, BookMarked } from "lucide-react";

const TOTAL_PAGES = 24; // Change this to match your actual page count

export default function BookReader() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [imageError, setImageError] = useState(false);
  const mainRef = useRef(null);

  const goToPage = useCallback((page) => {
    if (page < 1 || page > TOTAL_PAGES) return;
    setCurrentPage(page);
    setImageError(false);
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goToPage(currentPage + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goToPage(currentPage - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentPage, goToPage]);

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: "#0f0e0c", fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
<button
  onClick={() => setIsSidebarOpen((v) => !v)}
  className="fixed top-4 left-4 z-50 p-2 rounded-lg"
  style={{
    background: "rgba(24,22,15,0.9)",
    color: "#c9a96e",
    backdropFilter: "blur(8px)",
  }}
>
  {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
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
  {currentPage} / {TOTAL_PAGES}
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
      {/* ── BODY ── */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* ── SIDEBAR ── */}
        <aside
          className="shrink-0 flex flex-col border-r overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            width: isSidebarOpen ? "200px" : "0px",
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
            {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className="w-full text-left px-4 py-2 text-sm transition-all duration-150 flex items-center gap-2"
                style={{
                  background: currentPage === p ? "#2e2820" : "transparent",
                  color: currentPage === p ? "#c9a96e" : "#7a6e5e",
                  borderLeft: currentPage === p ? "2px solid #c9a96e" : "2px solid transparent",
                  fontFamily: "'Georgia', serif",
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== p) e.currentTarget.style.color = "#b09070";
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== p) e.currentTarget.style.color = "#7a6e5e";
                }}
              >
                <BookOpen size={11} style={{ opacity: 0.6, flexShrink: 0 }} />
                Page {p}
              </button>
            ))}
          </div>
        </aside>

        {/* ── MAIN READING AREA ── */}
        <main
          ref={mainRef}
          className="flex-1 relative flex items-center justify-center overflow-hidden"
          style={{ background: "#0f0e0c" }}
        >


          {/* Page image */}
          <div
className="relative w-full h-full flex items-center justify-center px-1"
style={{}}
          >
            {/* Image or Placeholder */}
            {imageError ? (
              /* ── PLACEHOLDER ── */
              <div
                className="w-full rounded-lg flex flex-col items-center justify-center gap-6 border"
                style={{
                  minHeight: "80vh",
                  background: "linear-gradient(160deg, #1e1b14 0%, #16140f 100%)",
                  borderColor: "#2e2820",
                  boxShadow: "0 8px 48px rgba(0,0,0,0.6)",
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "#2e2820" }}
                >
                  <BookOpen size={36} style={{ color: "#c9a96e", opacity: 0.7 }} />
                </div>
                <div className="text-center px-8">
                  <p
                    className="text-lg mb-1"
                    style={{ color: "#c9a96e", fontFamily: "'Georgia', serif" }}
                  >
                    Page {currentPage}
                  </p>
                  <p className="text-xs tracking-widest" style={{ color: "#5a4e3e" }}>
                    Place your image at{" "}
                    <code
                      className="px-1 rounded text-xs"
                      style={{ background: "#2a2218", color: "#a08050" }}
                    >
                      public/pages/{currentPage}.jpg
                    </code>
                  </p>
                </div>
                <div
                  className="w-24 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, #3a3228, transparent)" }}
                />
                <p className="text-xs" style={{ color: "#3a3228" }}>
                  Image not found
                </p>
              </div>
            ) : (
<div className="relative flex items-center justify-center">
  <img
    key={currentPage}
    src={`${import.meta.env.BASE_URL}pages/${currentPage}.jpg`}
    alt={`Page ${currentPage}`}
    className="rounded-lg mx-auto"
    style={{
      maxHeight: "98vh",
      maxWidth: "100%",
      width: "auto",
      objectFit: "contain",
      display: "block",
      boxShadow: "0 8px 48px rgba(0,0,0,0.7)",
    }}
    onError={() => setImageError(true)}
  />
</div>            )}
          </div>

        </main>

        {/* ── FLOATING PREV BUTTON ── */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            width: "40px",
            height: "64px",
            background:
              currentPage <= 1
                ? "rgba(30,27,20,0.3)"
                : "linear-gradient(135deg, rgba(201,169,110,0.18), rgba(201,169,110,0.08))",
            borderRadius: "0 8px 8px 0",
            border: "1px solid",
            borderColor: currentPage <= 1 ? "rgba(58,50,40,0.3)" : "rgba(201,169,110,0.25)",
            borderLeft: "none",
            color: currentPage <= 1 ? "#3a3228" : "#c9a96e",
            backdropFilter: "blur(4px)",
            marginLeft: isSidebarOpen ? "200px" : "0",
            transition: "all 0.3s ease",
          }}
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>

        {/* ── FLOATING NEXT BUTTON ── */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= TOTAL_PAGES}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            width: "40px",
            height: "64px",
            background:
              currentPage >= TOTAL_PAGES
                ? "rgba(30,27,20,0.3)"
                : "linear-gradient(135deg, rgba(201,169,110,0.18), rgba(201,169,110,0.08))",
            borderRadius: "8px 0 0 8px",
            border: "1px solid",
            borderColor:
              currentPage >= TOTAL_PAGES ? "rgba(58,50,40,0.3)" : "rgba(201,169,110,0.25)",
            borderRight: "none",
            color: currentPage >= TOTAL_PAGES ? "#3a3228" : "#c9a96e",
            backdropFilter: "blur(4px)",
          }}
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
