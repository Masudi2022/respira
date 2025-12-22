import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const TEAL_DARK = "#004d4d";       // Deep fade teal
const TEAL_MED = "#008080";        // Main teal
const TEAL_LIGHT = "#00a8a8";      // Light teal for hover
const TEAL_FADE_START = "#e6f5f5"; // Very soft fade teal (light)
const TEAL_FADE_END = "#b3e0e0";   // Soft mid-fade teal
const GRAY_TEXT = "#444444";       // Softer dark gray for text
const GOLD_ACCENT = "#d4b453";     // Soft gold for highlights

export function RespiraFooter() {
  return (
    <footer
      style={{
        background: `linear-gradient(135deg, ${TEAL_FADE_START} 0%, ${TEAL_FADE_END} 50%, ${TEAL_FADE_START} 100%)`,
        color: GRAY_TEXT,
        padding: "80px 0 40px",
        borderTop: `5px solid ${TEAL_MED}`,
        marginTop: "100px",
        fontFamily: "'Roboto', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle overlay for depth */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at center, rgba(0,128,128,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container className="position-relative">
        <Row className="gy-5">
          {/* About / Brand Section */}
          <Col lg={4} md={6}>
            <h4
              style={{
                fontWeight: 900,
                fontSize: "2.2rem",
                color: TEAL_DARK,
                marginBottom: "25px",
                letterSpacing: "2px",
              }}
            >
              <span style={{ color: TEAL_MED }}>RES</span>PIRA
            </h4>
            <p style={{ lineHeight: "1.8", fontSize: "1.05rem", maxWidth: "320px", opacity: 0.9 }}>
              Your gateway to unforgettable experiences in Zanzibar. Discover pristine beaches, vibrant culture, and adventure like never before.
            </p>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6}>
            <h6
              style={{
                fontWeight: 700,
                color: TEAL_DARK,
                marginBottom: "25px",
                fontSize: "1.2rem",
              }}
            >
              Quick Links
            </h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["Home", "Destinations", "Gallery", "Adventure", "About", "Contact"].map((link) => (
                <li key={link} style={{ marginBottom: "14px" }}>
                  <NavLink
                    to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    style={{
                      color: GRAY_TEXT,
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                      fontSize: "1rem",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = TEAL_LIGHT)}
                    onMouseLeave={(e) => (e.target.style.color = GRAY_TEXT)}
                  >
                    {link}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact Information */}
          <Col lg={3} md={6}>
            <h6
              style={{
                fontWeight: 700,
                color: TEAL_DARK,
                marginBottom: "25px",
                fontSize: "1.2rem",
              }}
            >
              Contact Us
            </h6>
            <div style={{ fontSize: "1rem", lineHeight: "2.2" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <FaMapMarkerAlt color={TEAL_MED} size={20} />
                <span>
                  Stone Town, Zanzibar<br />
                  Tanzania
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <FaPhone color={TEAL_MED} size={20} />
                <span>+255 777 123 456</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <FaEnvelope color={TEAL_MED} size={20} />
                <span>info@respira.zanzibar</span>
              </div>
            </div>
          </Col>

          {/* Social Media */}
          <Col lg={3} md={6}>
            <h6
              style={{
                fontWeight: 700,
                color: TEAL_DARK,
                marginBottom: "25px",
                fontSize: "1.2rem",
              }}
            >
              Follow Us
            </h6>
            <div style={{ display: "flex", gap: "18px" }}>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "50px",
                  height: "50px",
                  background: "rgba(0,128,128,0.1)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: TEAL_MED,
                  transition: "all 0.4s ease",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#E4405F";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.transform = "translateY(-6px) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,128,128,0.1)";
                  e.currentTarget.style.color = TEAL_MED;
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
              >
                <FaInstagram size={24} />
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "50px",
                  height: "50px",
                  background: "rgba(0,128,128,0.1)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: TEAL_MED,
                  transition: "all 0.4s ease",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1877F2";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.transform = "translateY(-6px) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,128,128,0.1)";
                  e.currentTarget.style.color = TEAL_MED;
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
              >
                <FaFacebookF size={24} />
              </a>

              {/* X (text) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "50px",
                  height: "50px",
                  background: "rgba(0,128,128,0.1)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: TEAL_MED,
                  fontWeight: "bold",
                  fontSize: "1.6rem",
                  transition: "all 0.4s ease",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#000000";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.transform = "translateY(-6px) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,128,128,0.1)";
                  e.currentTarget.style.color = TEAL_MED;
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
              >
                X
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/255777123456"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "50px",
                  height: "50px",
                  background: "rgba(0,128,128,0.1)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: TEAL_MED,
                  transition: "all 0.4s ease",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#25D366";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.transform = "translateY(-6px) scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,128,128,0.1)";
                  e.currentTarget.style.color = TEAL_MED;
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </Col>
        </Row>

        {/* Divider & Copyright */}
        <hr style={{ borderColor: "rgba(0,128,128,0.2)", margin: "60px 0 30px" }} />
        <Row>
          <Col className="text-center">
            <p style={{ fontSize: "0.95rem", color: "#777" }}>
              © {new Date().getFullYear()} Respira Zanzibar. All rights reserved. | Made with ❤️ in paradise
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}