import { X, Sparkles } from "lucide-react";

export default function AboutModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "90%",
          maxWidth: "900px",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#18160f",
          border: "2px solid #c9a96e",
          borderRadius: "20px",
          boxShadow: "0 0 50px rgba(201,169,110,0.35)",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: "rgba(255,255,255,0.08)",
            border: "none",
            color: "#c9a96e",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            zIndex: 5,
          }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div
          style={{
            textAlign: "center",
            padding: "24px 24px 0",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              color: "#c9a96e",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
          </div>
        </div>

        {/* About Text */}
        <div
          style={{
            padding: "24px 32px",
            color: "#d8d0c4",
            lineHeight: "1.8",
            fontSize: "16px",
          }}
        >
          <h2
            style={{
              color: "#c9a96e",
              fontSize: "30px",
              fontWeight: "bold",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            Hey there, I'm Ajay Nair 👋

          </h2>

          <p style={{ marginBottom: "20px" }}>
            <strong>
              Teacher by heart. Student for life. Fun fanatic always!
            </strong>
          </p>

          <p style={{ marginBottom: "20px" }}>
            If you've ever yawned your way through a lesson or wondered why
            learning feels like a chore, we already have something in common.
            I'm Ajay, a human-shaped curiosity machine with an allergic
            reaction to boredom.
          </p>

          <p style={{ marginBottom: "20px" }}>
            🎓 <strong>I love to learn</strong>
            <br />
            From quantum physics to why cats act like they own us, if it's
            interesting, I'm diving in. My bookshelf is a jungle gym of ideas,
            and my YouTube history? Let's just say it's a beautiful mess of
            tutorials, documentaries, and the occasional cooking fail.
          </p>

          <p style={{ marginBottom: "20px" }}>
            🎤 <strong>I love to teach</strong>
            <br />
            But not the kind of teaching that makes you count minutes until the
            bell rings. I teach like I wish I was taught: with stories, games,
            memes, and "wait, what just happened?" kind of moments. I want you
            to leave a lesson feeling something: inspired, surprised, even
            mildly shocked.
          </p>
<p
  style={{
    marginBottom: "24px",
    padding: "16px",
    border: "1px solid rgba(201,169,110,0.25)",
    borderRadius: "12px",
    background: "rgba(201,169,110,0.08)",
  }}
>
  ☕ <strong>NEED MOTIVATION!!!</strong>
  <br />
  <br />
  This book took many late nights, countless hours, and an unhealthy amount of
  coffee to put together. I already have enough ideas for a <strong>Part 2 </strong>
  floating around in my head, but unfortunately my motivation system has a
  critical design flaw: it runs entirely on positive reinforcement.
  <br />
  <br />
  Here's the deal: if <strong>100 amazing readers buy me a coffee or send me an email that they loved this book</strong>, I'll
  take that as a sign from the universe that I should stop being lazy, open my
  editor, and start writing the next volume.
  <br />
  <br />
  Think of it as a community-funded quest to rescue an author from procrastination.
  Every coffee unlocks a little more motivation. Somewhere around coffee #100,
  Part 2 should magically appear. 🚀
  <br />
  <br />
❤️
</p>

<p style={{ marginBottom: "20px" }}>
  <strong>Contact Me</strong>
  <br />
  ajaynair59 at gmail dot com
</p>
          <div
            style={{
              textAlign: "center",
              color: "#c9a96e",
              fontSize: "20px",
              marginTop: "30px",
              marginBottom: "20px",
            }}
          >
          </div>
        </div>
      </div>
    </div>
  );
}