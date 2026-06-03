import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NavButton({ direction, onClick, disabled }) {
  const isLeft = direction === "prev";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 hover:scale-110"
      style={{
        [isLeft ? "left" : "right"]: "-28px",
        width: "52px",
        height: "80px",
        background: disabled
          ? "rgba(30,27,20,0.3)"
          : "linear-gradient(135deg, rgba(255,215,100,0.95), rgba(201,169,110,0.95))",
        color: disabled ? "#3a3228" : "#111",
        borderRadius: "12px",
        border: "1px solid rgba(201,169,110,0.25)",
        boxShadow: "0 0 15px rgba(255,215,100,0.4), 0 0 35px rgba(255,215,100,0.25)",
        zIndex: 20,
      }}
    >
      {isLeft ? <ChevronLeft size={28} /> : <ChevronRight size={28} />}
    </button>
  );
}
