import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  HelpCircle,
  GraduationCap,
  ArrowRight,
  User,
} from "lucide-react";
import { useMemo } from "react";

export default function Sidebar({
  isOpen,
  currentPage,
  totalPages,
  goToPage,
  slides = null,
  completedPages = [],
  visible = false,
  onClose,
  onAbout,
  grouped = false,
}) {
  // Helper to categorize slides when slide data is provided
  const getChapterCategory = (slide) => {
    if (!slide || !slide.chapter) return "End Matter";
    const chap = String(slide.chapter).toLowerCase();
    if (chap === "cover" || chap === "title page" || chap === "preface") return "Book Intros";
    if (chap === "index" || chap === "table of contents") return "Book Index & Outline";
    if (chap === "introduction" || chap === "structure") return "Fundamentals";
    if (chap.includes("letters")) return "Meet the Letters";
    if (chap.includes("revision") || chap.includes("overview")) return "Revision Panels";
    if (chap.includes("checkup") || chap.includes("quiz")) return "Quiz Challenges";
    if (chap.includes("matras")) return "The Magic Accessories (Matras)";
    if (chap.includes("vocabulary") || chap.includes("examples")) return "Word Practices";
    return "End Matter";
  };

  const categories = useMemo(() => {
    if (!slides) return [];
    const cats = [];
    slides.forEach((s) => {
      const c = getChapterCategory(s);
      if (!cats.includes(c)) cats.push(c);
    });
    return cats;
  }, [slides]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Book Intros":
      case "Book Index & Outline":
        return <BookOpen className="h-4 w-4 text-slate-400" />;
      case "Fundamentals":
        return <GraduationCap className="h-4 w-4 text-amber-400" />;
      case "Meet the Letters":
        return <ChevronRight className="h-4 w-4 text-indigo-400" />;
      case "Revision Panels":
        return <CheckCircle className="h-4 w-4 text-purple-400" />;
      case "Quiz Challenges":
        return <HelpCircle className="h-4 w-4 text-rose-400" />;
      case "The Magic Accessories (Matras)":
        return <ArrowRight className="h-4 w-4 text-sky-400" />;
      case "Word Practices":
        return <GraduationCap className="h-4 w-4 text-purple-400" />;
      default:
        return <User className="h-4 w-4 text-slate-400" />;
    }
  };

  const pages = useMemo(() => {
    if (slides && slides.length) return slides;
    // fallback slide representation when no slides provided
    return Array.from({ length: totalPages }, (_, i) => ({ pageNumber: i + 1, title: `Page ${i + 1}`, chapter: "" }));
  }, [slides, totalPages]);

  const readCount = completedPages?.length || 0;
  const progress = pages.length ? Math.round((readCount / pages.length) * 100) : 0;

  return (
    <div
      id="sidebar-navigation-drawer"
      className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-[#fbf9f4] p-4 transition-all duration-300 shadow-2xl ${
        visible || isOpen ? "translate-x-0 w-80" : "-translate-x-full w-0 p-0 border-r-0 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#155e27] font-extrabold">Storybook Navigator</div>
          <div className="text-md font-bold tracking-tight text-[#2d2214] font-display">Whimsical Letters Table</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAbout && onAbout()}
            title="About the author"
            className="px-3 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200 hover:scale-95"
          >
            About
          </button>
          {onClose && (
            <button
              onClick={onClose}
              title="Close Drawer"
              className="p-1 rounded-md bg-orange-50 border border-amber-200 text-slate-600 hover:text-amber-900 transition-all active:scale-95"
            >
              <XIcon className="h-4.5 w-4.5" />
            </button>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-[#dccfa2]/60 bg-[#faf6eb] p-3 mb-4">
        <div className="flex items-center justify-between text-xs font-mono text-slate-600 mb-1.5">
          <span>Progress: {readCount} of {pages.length} read</span>
          <span className="text-[#155e27] font-semibold">{progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-[#e6ddc5] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div id="tree-container" className="flex-1 overflow-y-auto pr-1 space-y-5 select-none">
        {grouped && categories.length ? (
          categories.map((category) => {
            const catSlides = pages.filter((s) => getChapterCategory(s) === category).sort((a, b) => a.pageNumber - b.pageNumber);
            return (
              <div key={category} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 px-2 text-[10px] font-mono text-amber-800 tracking-wider uppercase font-extrabold">
                  {getCategoryIcon(category)}
                  <span>{category}</span>
                </div>
                <div className="flex flex-col gap-0.5 pl-2 border-l border-[#dfd6be]/80 ml-2">
                  {catSlides.map((slide) => {
                    const isPageActive = slide.pageNumber === currentPage;
                    const isPageCompleted = completedPages.includes(slide.pageNumber);
                    return (
                      <button
                        key={slide.pageNumber}
                        onClick={() => { goToPage(slide.pageNumber); if (onClose) onClose(); }}
                        className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-all min-h-[38px] ${
                          isPageActive ? "bg-emerald-600/10 text-emerald-800 font-semibold border-l-2 border-emerald-600 pl-2" : "text-slate-600 hover:bg-[#e3dacc]/30 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="shrink-0 rounded bg-[#e3dacc]/50 border border-[#c29f60]/30 px-1 text-[9px] font-mono text-slate-600 w-6 text-center">
                            {slide.pageNumber}
                          </span>
                          <span className="truncate">{slide.title}</span>
                        </div>
                        <div className="flex items-center gap-1.5 pl-2 shrink-0">
                          {slide.malayalamLetter && (
                            <span className="rounded bg-emerald-500/10 text-[10px] font-bold text-emerald-700 border border-emerald-500/20 px-1">
                              {slide.malayalamLetter}
                            </span>
                          )}
                          {isPageCompleted && <CheckCircle className="h-3 w-3 text-emerald-600" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          // flat sorted list by pageNumber
          pages
            .slice()
            .sort((a, b) => a.pageNumber - b.pageNumber)
            .map((p) => (
              <button
                key={p.pageNumber}
                onClick={() => {
                  goToPage(p.pageNumber);
                  if (onClose) onClose();
                }}
                className={`w-full text-left px-3 py-2 mb-1 text-sm flex items-center gap-3 rounded-md ${currentPage === p.pageNumber ? "bg-amber-50 text-amber-800" : "text-slate-600 hover:bg-[#e3dacc]/30"}`}
              >
                <BookOpen size={14} className={`${currentPage === p.pageNumber ? "text-amber-600" : "text-slate-500"}`} />
                <span className="truncate">{p.title}</span>
                {completedPages.includes(p.pageNumber) && <CheckCircle className="ml-auto h-4 w-4 text-emerald-600" />}
              </button>
            ))
        )}
      </div>

      <div className="hidden xl:block pt-3 border-t border-[#dfd6be]/80 text-slate-500 font-mono text-[9px] text-center">
        Press <kbd className="rounded border border-[#dfd6be] bg-[#faf6eb] px-1 font-sans text-[10px] text-slate-500 font-bold">←</kbd> and <kbd className="rounded border border-[#dfd6be] bg-[#faf6eb] px-1 font-sans text-[10px] text-slate-500 font-bold">→</kbd> to flip pages.
      </div>
    </div>
  );
}

function XIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
