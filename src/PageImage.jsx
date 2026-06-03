import HTMLFlipBook from "react-pageflip";
import { forwardRef, useRef, useEffect, useState } from "react";

const BookPage = forwardRef(({ pageNumber }, ref) => {
  return (
    <div ref={ref} className="w-full h-full bg-white">
      <img
        src={`${import.meta.env.BASE_URL}pages/${pageNumber}.jpg`}
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

  // 1. Monitor window resizing to flip between desktop and mobile layout properties
  useEffect(() => {
    const checkMobile = () => {
      // 768px is the standard tablet/mobile breakpoint
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (!bookRef.current) return;
      const flip = bookRef.current.pageFlip();
      if (e.key === "ArrowRight") flip.flipNext();
      if (e.key === "ArrowLeft") flip.flipPrev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div 
        className="flex items-center justify-center origin-center transition-transform duration-150"
        style={{
          // 2. Adjust base canvas calculations depending on layout mode
          // On Mobile: Canvas is 550px wide (1 Page)
          // On Desktop: Canvas is 1100px wide (2 Page Spread)
          "--book-width": isMobile ? "550px" : "1100px",
          "--book-height": "750px",
          "--height-buffer": isMobile ? "160px" : "120px", 
          
          // 3. Absolute Scaling Matrix: Shrinks the element as soon as it hits EITHER a width limit or height limit
          transform: "scale(min(calc(92vw / var(--book-width)), calc((100vh - var(--height-buffer)) / var(--book-height))))"
        }}
      >
        <HTMLFlipBook
          ref={bookRef}
          width={550}
          height={750}
          size="fixed"
          usePortrait={isMobile} // Active on mobile (1 page), Inactive on desktop (2 pages)
          showCover={true}
          mobileScrollSupport={true}
          useMouseEvents={true}
          drawShadow={true}
          flippingTime={1100}
          swipeDistance={30}
          maxShadowOpacity={0.5}
          startZIndex={0}
          onFlip={(e) => onPageTurned?.(e.data + 1)}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <BookPage key={i + 1} pageNumber={i + 1} />
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  );
}