import useBookReader from "./useBookReader";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import PageImage from "./PageImage";
import NavButton from "./NavButton";
import { useState } from "react";
import AboutModal from "./AboutModal";

const TOTAL_PAGES = 24;

export default function BookReader() {
  const { currentPage, isSidebarOpen, isChanging, goToPage, toggleSidebar } =
    useBookReader(TOTAL_PAGES);
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-12 top-28 w-60 h-60 rounded-full bg-[#ffd965]/15 blur-3xl" />
        <div className="absolute right-10 top-36 w-72 h-72 rounded-full bg-[#8ddbf3]/15 blur-3xl" />
        <div className="absolute left-1/2 top-1/4 w-52 h-52 rounded-full bg-[#ff8dd7]/15 blur-3xl -translate-x-1/2" />
      </div>

      <TopBar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onAbout={() => setShowAbout(true)}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          isOpen={isSidebarOpen}
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          goToPage={goToPage}
        />

        <main className="flex-1 relative flex items-center justify-center overflow-hidden px-2 pb-6 sm:pb-0">
          <div className="w-full h-full flex items-center justify-center">
            <div className={`relative inline-block page-card ${isChanging ? "page-card-changing" : ""}`}>
              <PageImage currentPage={currentPage} isChanging={isChanging} />

              <NavButton
                direction="prev"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
              />
              <NavButton
                direction="next"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= TOTAL_PAGES}
              />
            </div>
          </div>
        </main>
      </div>

      <AboutModal open={showAbout} onClose={() => setShowAbout(false)} />

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#090806] to-transparent pointer-events-none" />
    </div>
  );
}
