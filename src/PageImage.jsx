export default function PageImage({ currentPage, isChanging }) {
  return (
    <div className="relative inline-block">
      <img
        src={`${import.meta.env.BASE_URL}pages/${currentPage}.jpg`}
        alt={`Page ${currentPage}`}
        className="rounded-lg"
        style={{
          maxHeight: "100vh",
          maxWidth: "100%",
          boxShadow: "0 8px 48px rgba(0,0,0,0.7)",
          filter: "brightness(0.9) sepia(0.05)",
          opacity: isChanging ? 0.7 : 1,
          transition: "opacity 120ms ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,240,220,0.08)",
          pointerEvents: "none",
          borderRadius: "8px",
        }}
      />
    </div>
  );
}
