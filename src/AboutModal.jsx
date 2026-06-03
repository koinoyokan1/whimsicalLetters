import { X, Sparkles } from "lucide-react";

export default function AboutModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.84)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-panel"
        style={{
          width: "90%",
          maxWidth: "920px",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "rgba(24,20,14,0.96)",
          boxShadow: "0 0 70px rgba(0,0,0,0.45)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "rgba(255,255,255,0.08)",
            border: "none",
            color: "#ffd765",
            borderRadius: "50%",
            width: "42px",
            height: "42px",
            cursor: "pointer",
            zIndex: 5,
          }}
          aria-label="Close about modal"
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: "center", padding: "28px 24px 0" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              color: "#ffd765",
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            <Sparkles size={28} />
            About Ajay
          </div>
          <p style={{ marginTop: "10px", color: "#d8d0c4", fontSize: "16px" }}>
            A curious creator who loves turning learning into a little celebration.
          </p>
        </div>

        <div
          style={{
            padding: "24px 32px 32px",
            color: "#e3dacd",
            lineHeight: "1.85",
            fontSize: "16px",
          }}
        >
          <h2
            style={{
              color: "#ffd765",
              fontSize: "32px",
              fontWeight: "700",
              marginBottom: "18px",
              textAlign: "center",
            }}
          >
            Hey there, I'm Ajay Nair 👋
          </h2>

          <p style={{ marginBottom: "20px" }}>
            <strong>Teacher by heart. Student for life. Fun fanatic always.</strong>
          </p>

          <p style={{ marginBottom: "20px" }}>
            If you've ever yawned your way through a lesson or wondered why learning feels like a chore, we already have something in common. I'm Ajay, a curiosity machine that runs on stories, surprises, and a little bit of chaos.
          </p>

          <p style={{ marginBottom: "20px" }}>
            🎓 <strong>I love to learn.</strong>
            <br />
            From physics to productivity hacks, if it's interesting, I'm diving in. My bookshelf is a jungle gym of ideas, and my YouTube history is a treasure chest of tutorials, memes, and occasional cooking fails.
          </p>

          <p style={{ marginBottom: "20px" }}>
            🎤 <strong>I love to teach.</strong>
            <br />
            Not the kind of teaching that makes you count minutes until the bell rings. I teach like I wish I was taught: with stories, games, memes, and those "wait, what just happened?" moments that make learning feel alive.
          </p>

          <div
            style={{
              marginBottom: "24px",
              padding: "18px",
              border: "1px solid rgba(255, 215, 100, 0.24)",
              borderRadius: "16px",
              background: "rgba(255, 215, 100, 0.08)",
            }}
          >
            ☕ <strong>Motivation Quest:</strong>
            <br />
            This book took many late nights, countless edits, and an unhealthy amount of coffee to create. If 100 readers buy me a coffee or send a quick note saying they loved this book, I'll take that as a green light to start Part 2.
          </div>

          <p style={{ marginBottom: "20px" }}>
            <strong>Contact Me</strong>
            <br />
            ajaynair59 at gmail dot com
          </p>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <span style={{ color: "#ffd765", fontWeight: "700" }}>
              Thanks for reading — let's make learning feel like an adventure.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
