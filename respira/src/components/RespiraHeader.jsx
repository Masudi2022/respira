import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// ===== LUXURY TEAL THEME =====
const TEAL_DARK = "#002d2d";
const TEAL_DEEP = "#005f5f";
const TEAL_LIGHT = "#00e6e6";
const GOLD_SOFT = "#d4b453";
const CORAL_WHITE = "#ffffff";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 70);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/destinations", label: "Destinations" },
    { to: "/gallery", label: "Gallery" },
    { to: "/adventure", label: "Adventure" },
    { to: "/about", label: "About" },
  ];

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
      style={{
        background: scrolled
          ? "rgba(0,45,45,0.92)"
          : "rgba(0,95,95,0.85)",
        backdropFilter: "blur(14px)",
        padding: scrolled ? "0.6rem 0" : "1.3rem 0",
        transition: "all 0.4s ease",
        boxShadow: scrolled
          ? "0 10px 30px rgba(0,0,0,0.45)"
          : "0 4px 16px rgba(0,0,0,0.2)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Container fluid className="position-relative">

        {/* ================= MOBILE ================= */}
        <div className="d-flex d-lg-none align-items-center justify-content-between">
          <Navbar.Toggle
            aria-controls="respira-nav"
            style={{ border: "none", color: CORAL_WHITE }}
          />

          <Navbar.Brand
            as={NavLink}
            to="/"
            onClick={() => setExpanded(false)}
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              fontWeight: 900,
              fontSize: "2.2rem",
              color: CORAL_WHITE,
              letterSpacing: "3px",
            }}
          >
            <span style={{ color: TEAL_LIGHT }}>RES</span>PIRA
            <div
              style={{
                fontSize: "0.75rem",
                marginTop: "-6px",
                fontWeight: 700,
                color: GOLD_SOFT,
                letterSpacing: "4px",
                textAlign: "center",
              }}
            >
              ZANZIBAR
            </div>
          </Navbar.Brand>

          <div style={{ width: "40px" }} />
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="d-none d-lg-flex align-items-center">

          {/* BRAND (LEFT) */}
          <Navbar.Brand
            as={NavLink}
            to="/"
            onClick={() => setExpanded(false)}
            style={{
              marginLeft: "3rem",
              fontWeight: 900,
              fontSize: scrolled ? "2.1rem" : "2.6rem",
              color: CORAL_WHITE,
              letterSpacing: "3px",
              zIndex: 2,
            }}
          >
            <span style={{ color: TEAL_LIGHT }}>RES</span>PIRA
            <div
              style={{
                fontSize: "0.85rem",
                marginTop: "-6px",
                fontWeight: 700,
                color: GOLD_SOFT,
                letterSpacing: "4px",
              }}
            >
              ZANZIBAR
            </div>
          </Navbar.Brand>

          {/* ===== CENTERED NAV ===== */}
          <Navbar.Collapse
            id="respira-nav"
            className="position-absolute start-50 translate-middle-x"
          >
            <Nav className="align-items-center" style={{ gap: "1.8rem" }}>
              {navLinks.map((link) => (
                <Nav.Link
                  key={link.to}
                  as={NavLink}
                  to={link.to}
                  onClick={() => setExpanded(false)}
                  style={({ isActive }) => ({
                    color: isActive ? TEAL_LIGHT : CORAL_WHITE,
                    fontWeight: 600,
                    fontSize: "1.05rem",
                    position: "relative",
                    textShadow: isActive
                      ? "0 0 12px rgba(0,230,230,0.8)"
                      : "none",
                  })}
                >
                  {link.label}
                </Nav.Link>
              ))}

              {/* CONTACT */}
              <Nav.Link
                as={NavLink}
                to="/contact"
                onClick={() => setExpanded(false)}
                style={{
                  color: CORAL_WHITE,
                  fontWeight: 600,
                  fontSize: "1.05rem",
                }}
              >
                Contact
              </Nav.Link>

              {/* BOOK NOW — AFTER CONTACT */}
              <Button
                as={NavLink}
                to="/contact"
                onClick={() => setExpanded(false)}
                style={{
                  background: GOLD_SOFT,
                  border: "none",
                  borderRadius: "50px",
                  padding: "0.6rem 1.8rem",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  color: TEAL_DARK,
                  boxShadow: "0 6px 18px rgba(212,180,83,0.6)",
                  marginLeft: "0.4rem",
                }}
              >
                Book Now
              </Button>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}
