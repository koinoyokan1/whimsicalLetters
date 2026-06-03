import useBookReader from "./useBookReader";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import PageImage from "./PageImage";
import { useState } from "react";
import AboutModal from "./AboutModal";

const TOTAL_PAGES = 24;

export default function BookReader() {
  const {
    currentPage,
    isSidebarOpen,
    goToPage,
    pageTurned,
    toggleSidebar,
  } = useBookReader(TOTAL_PAGES);

  const [showAbout, setShowAbout] = useState(false);

  return (
    <div
      className="relative flex flex-col h-screen overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(15,14,12,0.82), rgba(10,9,7,0.95)), url(${import.meta.env.BASE_URL}background.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-12 top-28 w-60 h-60 rounded-full bg-[#ffd965]/15 blur-3xl" />
        <div className="absolute right-10 top-36 w-72 h-72 rounded-full bg-[#8ddbf3]/15 blur-3xl" />
        <div className="absolute left-1/2 top-1/4 w-52 h-52 rounded-full bg-[#ff8dd7]/15 blur-3xl -translate-x-1/2" />
      </div>

      {/* Top bar */}
      <TopBar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onAbout={() => setShowAbout(true)}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          goToPage={goToPage}
        />

        {/* Main content */}
        {/* FIX 1: We added max-h-full so the main tag cannot extend beyond the remaining flex space */}
        <main className="flex-1 relative flex items-center justify-center overflow-hidden px-4 max-h-full">
          
          {/* FIX 2: Constrained the inner wrapper to h-full (which is the main height minus padding) */}
          <div className="w-full h-full max-h-[calc(100vh-80px)] flex items-center justify-center p-4">
            
            {/* FIX 3: Replaced inline-block with flex layout rules so .page-card scales cleanly */}
            <div className="relative flex items-center justify-center page-card max-h-full max-w-full">
              <PageImage
                totalPages={TOTAL_PAGES}
                onPageTurned={pageTurned}
              />
            </div>

          </div>
        </main>
      </div>

      {/* About modal */}
      <AboutModal
        open={showAbout}
        onClose={() => setShowAbout(false)}
      />

      {/* bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#090806] to-transparent pointer-events-none" />
    </div>
  );
}