import { useState, useEffect } from "react";

export default function useBookReader(totalPages) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const pageTurned = (page) => {
    setCurrentPage(page);
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setIsChanging(true);
    setCurrentPage(page);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((v) => !v);
  };

  return {
    currentPage,
    isSidebarOpen,
    isChanging,
    goToPage,
    pageTurned,
    toggleSidebar,
  };
}