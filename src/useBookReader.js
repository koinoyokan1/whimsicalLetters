import { useState, useEffect } from "react";

export default function useBookReader(totalPages) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setIsChanging(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsChanging(false);
    }, 120);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setCurrentPage((p) => Math.min(totalPages, p + 1));
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setCurrentPage((p) => Math.max(1, p - 1));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [totalPages]);

  // Prefetch adjacent pages
  useEffect(() => {
    for (let p = currentPage - 2; p <= currentPage + 2; p++) {
      if (p >= 1 && p <= totalPages && p !== currentPage) {
        const img = new Image();
        img.src = `${import.meta.env.BASE_URL}pages/${p}.jpg`;
      }
    }
  }, [currentPage, totalPages]);

  return {
    currentPage,
    isSidebarOpen,
    isChanging,
    goToPage,
    toggleSidebar: () => setIsSidebarOpen((v) => !v),
  };
}
