import HTMLFlipBook from "react-pageflip";
import { forwardRef, useRef, useEffect, useState } from "react";
// Imported Chevron icons to act as visual cues
import { ChevronLeft, ChevronRight, MoveHorizontal } from "lucide-react";

const BookPage = forwardRef(({ pageNumber, blobUrl }, ref) => {
  return (
    <div ref={ref} className="w-full h-full bg-white">
      <img
        src={blobUrl || `${import.meta.env.BASE_URL}pages/${pageNumber}.jpg`}
        alt={`Page ${pageNumber}`}
        className="w-full h-full object-contain select-none"
        draggable={false}
      />
    </div>
  );
});

BookPage.displayName = "BookPage";

export default function PageImage({ totalPages, onPageTurned }) {
  const bookRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // New State: Tracks if the user has interacted yet to show/hide hints
  const [hasInteracted, setHasInteracted] = useState(false);

  // Prefetch cache: store object URLs for each page so flipping doesn't refetch
  const blobCacheRef = useRef({});
  const [, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const controllers = [];
    const base = import.meta.env.BASE_URL;

    (async () => {
      const cache = blobCacheRef.current || {};
      for (let p = 1; p <= totalPages; p++) {
        if (cache[p]) continue;
        try {
          const controller = new AbortController();
          controllers.push(controller);
          const res = await fetch(`${base}pages/${p}.jpg`, { signal: controller.signal, cache: 'force-cache' });
          if (!res.ok) continue;
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          cache[p] = url;
          if (cancelled) { URL.revokeObjectURL(url); break; }
          blobCacheRef.current = cache;
          setTick((t) => t + 1);
        } catch (e) {
          // ignore fetch errors per-page
        }
      }
    })();

    return () => {
      cancelled = true;
      controllers.forEach((c) => c.abort());
      const cache = blobCacheRef.current || {};
      Object.values(cache).forEach((u) => {
        try { URL.revokeObjectURL(u); } catch (e) {}
      });
      blobCacheRef.current = {};
    };
  }, [totalPages]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (!bookRef.current) return;
      const flip = bookRef.current.pageFlip();
      if (e.key === "ArrowRight") {
        flip.flipNext();
        setHasInteracted(true);
      }
      if (e.key === "ArrowLeft") {
        flip.flipPrev();
        setHasInteracted(true);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handlePageFlip = (e) => {
    setHasInteracted(true); // Dismisses onboarding hints on drag/click flip
    onPageTurned?.(e.data + 1);
  };

  const totalBookWidth = isMobile ? 550 : 1100;

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
      
      {/* 1. INITIAL ONBOARDING OVERLAY
          This displays a floating, pulsing instruction box right over the center of the book.
          It fades out automatically once they click or drag anywhere. */}
      {!hasInteracted && (
        <div 
          onClick={() => setHasInteracted(true)}
          className="absolute z-40 bg-black/70 backdrop-blur-sm text-white px-4 py-3 rounded-full flex items-center gap-2 pointer-events-auto cursor-pointer select-none animate-bounce shadow-2xl border border-white/20 text-sm tracking-wide font-medium"
          style={{ top: "60%" }}
        >
          <MoveHorizontal size={16} className="text-[#ffd765]" />
          <span>Click corners or drag to flip pages</span>
        </div>
      )}

      {/* 2. SIDE NAV HINT ARROWS
          Subtle click zones on the left/right screen edges that highlight to reveal functionality. */}
      <button 
        onClick={() => { bookRef.current?.pageFlip().flipPrev(); setHasInteracted(true); }}
        className="absolute left-4 z-30 p-2 rounded-full bg-black/20 hover:bg-black/60 text-white/40 hover:text-white transition-all duration-200 focus:outline-none hidden sm:flex items-center justify-center cursor-pointer"
        aria-label="Previous page"
      >
        <ChevronLeft size={32} />
      </button>

      <button 
        onClick={() => { bookRef.current?.pageFlip().flipNext(); setHasInteracted(true); }}
        className="absolute right-4 z-30 p-2 rounded-full bg-black/20 hover:bg-black/60 text-white/40 hover:text-white transition-all duration-200 focus:outline-none hidden sm:flex items-center justify-center cursor-pointer"
        aria-label="Next page"
      >
        <ChevronRight size={32} />
      </button>

      {/* Book Workspace Container */}
      <div 
        className="flex items-center justify-center origin-center transition-transform duration-150"
        style={{
          "--book-width": `${totalBookWidth}px`,
          "--book-height": "750px",
          "--height-buffer": isMobile ? "160px" : "120px", 
          transform: "scale(min(calc(92vw / var(--book-width)), calc((100vh - var(--height-buffer)) / var(--book-height))))"
        }}
      >
        <HTMLFlipBook
          key={isMobile ? "book-mobile" : "book-desktop"}
          ref={bookRef}
          width={550}
          height={750}
          size="fixed"
          usePortrait={isMobile} 
          showCover={true}
          mobileScrollSupport={true}
          useMouseEvents={true}
          drawShadow={true}
          flippingTime={1100}
          swipeDistance={30}
          maxShadowOpacity={0.5}
          startZIndex={0}
          onFlip={handlePageFlip} // Triggers the dismiss handle
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <BookPage
              key={i + 1}
              pageNumber={i + 1}
              blobUrl={blobCacheRef.current?.[i + 1]}
            />
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  );
}