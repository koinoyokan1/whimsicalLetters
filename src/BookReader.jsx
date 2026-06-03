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
      className="flex flex-col h-screen overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(15,14,12,0.75), rgba(15,14,12,0.75)),
          url(${import.meta.env.BASE_URL}background.png)
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
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

        <main
          className="flex-1 relative flex items-center justify-center overflow-hidden"
          style={{ background: "transparent" }}
        >
          <div className="w-full h-full flex items-center justify-center px-1">
            <div className="relative inline-block">
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
    </div>
  );
}
