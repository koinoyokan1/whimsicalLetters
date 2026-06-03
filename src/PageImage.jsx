export default function PageImage({ currentPage, isChanging }) {
  return (
    <div className="relative inline-block page-image-wrapper">
      <img
        src={`${import.meta.env.BASE_URL}pages/${currentPage}.jpg`}
        alt={`Page ${currentPage}`}
        className={`rounded-[1.5rem] page-image-transition ${isChanging ? "changing" : ""}`}
        style={{
          maxHeight: "92vh",
          maxWidth: "100%",
          filter: "brightness(0.95) contrast(1.02) saturate(1.05)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.18) 100%)",
          pointerEvents: "none",
          borderRadius: "24px",
        }}
      />
      <div className="decorative-star" style={{ top: "14%", left: "18%", width: "10px", height: "10px" }} />
      <div className="decorative-star" style={{ top: "72%", right: "16%", width: "8px", height: "8px", animationDuration: "5.1s" }} />
      <div className="decorative-star" style={{ top: "40%", left: "78%", width: "7px", height: "7px", animationDuration: "6.4s" }} />
    </div>
  );
}
