import React from "react";

export default function GTranslateWidget() {
  return (
    <div
      className="gtranslate_wrapper"
      style={{
        minWidth: "130px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.12)",
        padding: "6px 12px",
        borderRadius: "50px",
        cursor: "pointer",
        backdropFilter: "blur(6px)",
        border: "1px solid rgba(255,255,255,0.3)",
        transition: "0.3s ease",
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
      onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
    ></div>
  );
}
