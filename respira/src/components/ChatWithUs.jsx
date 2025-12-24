import { useState } from "react";
import {
  ChatDotsFill,
  Whatsapp,
  EnvelopeFill,
  Facebook,
  Instagram,
  Tiktok,
} from "react-bootstrap-icons";

const PRIMARY = "#2FB6A6";

export default function ChatWithUs() {
  const [open, setOpen] = useState(false);

  const options = [
    {
      icon: <Whatsapp size={20} />,
      color: "#25D366",
      href: "https://wa.me/255700000000",
      label: "WhatsApp"
    },
    {
      icon: <EnvelopeFill size={20} />,
      color: "#EA4335",
      href: "mailto:info@respirazanzibar.com",
      label: "Email"
    },
    {
      icon: <Facebook size={20} />,
      color: "#1877F2",
      href: "https://facebook.com/respirazanzibar",
      label: "Facebook"
    },
    {
      icon: <Instagram size={20} />,
      color: "#E4405F",
      href: "https://instagram.com/respirazanzibartoursafari",
      label: "Instagram"
    },
    {
      icon: <Tiktok size={20} />,
      color: "#000000",
      href: "https://www.tiktok.com/@respirazanzibartour",
      label: "TikTok"
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
            rel="noopener noreferrer"
            aria-label={`Contact via ${o.label}`}
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
              transition: "all 0.25s ease",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.15)";
              e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";
            }}
          >
            {o.icon}
            {/* Tooltip on hover */}
            <div style={{
              position: "absolute",
              bottom: "calc(100% + 10px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.8)",
              color: "white",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "0.8rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              opacity: 0,
              pointerEvents: "none",
              transition: "opacity 0.2s ease",
            }}>
              {o.label}
            </div>
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
          transition: "all 0.3s ease",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = `
            0 0 0 8px rgba(47,182,166,0.25),
            0 22px 50px rgba(47,182,166,0.55)
          `;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = `
            0 0 0 6px rgba(47,182,166,0.18),
            0 18px 40px rgba(47,182,166,0.45)
          `;
        }}
      >
        <ChatDotsFill size={26} color="white" />
        
        {/* Tooltip for main button */}
        <div style={{
          position: "absolute",
          bottom: "calc(100% + 10px)",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.8)",
          color: "white",
          padding: "8px 16px",
          borderRadius: "8px",
          fontSize: "0.85rem",
          fontWeight: 600,
          whiteSpace: "nowrap",
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.2s ease",
        }}>
          {open ? "Close Options" : "Chat with Us"}
        </div>
      </div>
      
      {/* CSS for tooltips */}
      <style>{`
        a:hover > div {
          opacity: 1 !important;
        }
        
        div[style*="width: 58px"]:hover > div {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}