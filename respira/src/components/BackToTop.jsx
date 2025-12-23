import { useEffect, useState } from "react";
import { ArrowUp } from "react-bootstrap-icons";

const PRIMARY = "#2FB6A6";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "28px",
        width: "54px",
        height: "54px",
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${PRIMARY}, #1c7f75)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: `
          0 0 0 6px rgba(47,182,166,0.18),
          0 16px 35px rgba(47,182,166,0.45)
        `,
        animation: "float 2.8s ease-in-out infinite",
        zIndex: 998,
      }}
    >
      <ArrowUp size={22} color="white" />

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
