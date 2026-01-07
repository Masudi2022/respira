import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { href, NavLink } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTiktok
} from "react-icons/fa";

/* ===== LUXURY DARK GREEN PALETTE ===== */
const GREEN_DARK = "#0b2f2a";
const GREEN_DEEP = "#0f3d36";
const GREEN_ACCENT = "#1fbfae";
const GOLD_SOFT = "#d4b453";
const TEXT_LIGHT = "#e6f2f1";
const TEXT_MUTED = "#b8d1ce";

export default function RespiraFooter() {
  return (
    <footer
      style={{
        background: `linear-gradient(135deg, ${GREEN_DARK}, ${GREEN_DEEP})`,
        color: TEXT_LIGHT,
        padding: "90px 0 35px",
        marginTop: "120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top, rgba(31,191,174,0.12), transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <Container style={{ position: "relative" }}>
        <Row className="gy-5">
          {/* ===== BRAND ===== */}
          <Col lg={4} md={6}>
            <h3
              style={{
                fontWeight: 900,
                fontSize: "2.4rem",
                letterSpacing: "3px",
                // marginBottom: "1px",
              }}
            >
              <span style={{ color: GREEN_ACCENT }}>RES</span>PIRA
            </h3>
            <h4 style={{ fontWeight: 700, marginBottom: "20px", color: GOLD_SOFT }}>Zanzibar Safari & Tours</h4>
            <p
              style={{
                maxWidth: "330px",
                lineHeight: "1.9",
                fontSize: "1.05rem",
                color: TEXT_MUTED,
              }}
            >
              Your gateway to unforgettable journeys in Zanzibar — pristine
              beaches, rich culture, and once-in-a-lifetime adventures.
            </p>
          </Col>

          {/* ===== QUICK LINKS ===== */}
          <Col lg={2} md={6}>
            <h6
              style={{
                fontWeight: 700,
                letterSpacing: "1px",
                marginBottom: "25px",
                color: GOLD_SOFT,
              }}
            >
              Explore
            </h6>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {["Home", "Destinations", "Gallery", "Adventure", "About", "Contact"].map(
                (link) => (
                  <li key={link} style={{ marginBottom: "14px" }}>
                    <NavLink
                      to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                      style={{
                        color: TEXT_LIGHT,
                        textDecoration: "none",
                        fontSize: "1rem",
                        transition: "0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = GREEN_ACCENT)
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.color = TEXT_LIGHT)
                      }
                    >
                      {link}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </Col>

          {/* ===== CONTACT ===== */}
          <Col lg={3} md={6}>
            <h6
              style={{
                fontWeight: 700,
                letterSpacing: "1px",
                marginBottom: "25px",
                color: GOLD_SOFT,
              }}
            >
              Contact
            </h6>

            <div style={{ fontSize: "1rem", color: TEXT_MUTED }}>
              <div className="d-flex gap-3 mb-3">
                <FaMapMarkerAlt color={GREEN_ACCENT} size={18} />
                <span>
                  Stone Town, Zanzibar
                  <br />
                  Tanzania
                </span>
              </div>

              <div className="d-flex gap-3 mb-3">
                <FaPhone color={GREEN_ACCENT} size={18} />
                <span>+255 621 670 930</span>
              </div>

              <div className="d-flex gap-3">
                <FaEnvelope color={GREEN_ACCENT} size={18} />
                <span>respira.zanzibar.tour.safari@gmail.com</span>
              </div>
            </div>
          </Col>

          {/* ===== SOCIALS ===== */}
          <Col lg={3} md={6}>
            <h6
              style={{
                fontWeight: 700,
                letterSpacing: "1px",
                marginBottom: "25px",
                color: GOLD_SOFT,
              }}
            >
              Follow Us
            </h6>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {[
                { icon: <FaInstagram />, bg: "#E4405F", href: "https://instagram.com/respirazanzibartour", label: "Instagram" },
                 { icon: <FaTiktok size={20} />,  color: "#000000", href: "https://www.tiktok.com/@respirazanzibartour", label: "TikTok" }
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: TEXT_LIGHT,
                    fontSize: "1.3rem",
                    transition: "0.35s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = s.bg;
                    e.currentTarget.style.transform =
                      "translateY(-6px) scale(1.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.08)";
                    e.currentTarget.style.transform =
                      "translateY(0) scale(1)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </Col>
        </Row>

        {/* ===== BOTTOM ===== */}
        <hr
          style={{
            borderColor: "rgba(255,255,255,0.12)",
            margin: "60px 0 25px",
          }}
        />

        <Row>
          <Col className="text-center">
            <p style={{ fontSize: "0.9rem", color: TEXT_MUTED }}>
              © {new Date().getFullYear()} Respira Zanzibar Safari & Tours • All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
