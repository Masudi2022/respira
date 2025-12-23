import { useState } from "react";
import {
  ChatDotsFill,
  Whatsapp,
  EnvelopeFill,
  Facebook,
  Instagram,
  TwitterX,
} from "react-bootstrap-icons";

const PRIMARY = "#2FB6A6";

export default function ChatWithUs() {
  const [open, setOpen] = useState(false);

  const options = [
    {
      icon: <Whatsapp size={20} />,
      color: "#25D366",
      href: "https://wa.me/255700000000",
    },
    {
      icon: <EnvelopeFill size={20} />,
      color: "#EA4335",
      href: "mailto:info@respirazanzibar.com",
    },
    {
      icon: <Facebook size={20} />,
      color: "#1877F2",
      href: "https://facebook.com/respirazanzibar",
    },
    {
      icon: <Instagram size={20} />,
      color: "#E4405F",
      href: "https://instagram.com/respirazanzibar",
    },
    {
      icon: <TwitterX size={20} />,
      color: "#000000",
      href: "https://x.com/respirazanzibar",
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "100px",
        right: "28px",
        zIndex: 999,
      }}
    >
      {/* OPTIONS */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          marginBottom: "18px",
          alignItems: "center",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(15px)",
          pointerEvents: open ? "auto" : "none",
          transition: "0.35s ease",
        }}
      >
        {options.map((o, i) => (
          <a
            key={i}
            href={o.href}
            target="_blank"
            rel="noreferrer"
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              background: o.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
              transition: "0.25s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            {o.icon}
          </a>
        ))}
      </div>

      {/* MAIN BUTTON */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          width: "58px",
          height: "58px",
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${PRIMARY}, #1c7f75)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: `
            0 0 0 6px rgba(47,182,166,0.18),
            0 18px 40px rgba(47,182,166,0.45)
          `,
        }}
      >
        <ChatDotsFill size={26} color="white" />
      </div>
    </div>
  );
}
