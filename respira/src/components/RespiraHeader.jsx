import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const TEAL_DARK = "#002d2d";
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
      onToggle={(val) => setExpanded(val)}
      style={{
        background: scrolled
          ? "rgba(0,45,45,0.92)"
          : "rgba(0,95,95,0.85)",
        backdropFilter: "blur(14px)",
        padding: scrolled ? "0.6rem 0" : "1.2rem 0",
        transition: "all 0.3s ease",
      }}
    >
      <Container fluid>

        {/* ===== MOBILE HEADER ===== */}
        <div className="d-flex d-lg-none align-items-center w-100 position-relative">
          <Navbar.Toggle
            aria-controls="respira-nav"
            style={{ border: "none" }}
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
              fontSize: "2rem",
              color: CORAL_WHITE,
              letterSpacing: "3px",
            }}
          >
            <span style={{ color: TEAL_LIGHT }}>RES</span>PIRA
            <div
              style={{
                fontSize: "0.7rem",
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
        </div>

        {/* ===== DESKTOP BRAND ===== */}
        <Navbar.Brand
          as={NavLink}
          to="/"
          onClick={() => setExpanded(false)}
          className="d-none d-lg-block"
          style={{
            marginLeft: "3rem",
            fontWeight: 900,
            fontSize: scrolled ? "2.1rem" : "2.6rem",
            color: CORAL_WHITE,
            letterSpacing: "3px",
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

        {/* ===== COLLAPSE ===== */}
        <Navbar.Collapse id="respira-nav">

          {/* MOBILE: LEFT MENU | DESKTOP: CENTER */}
          <Nav
            className="
              ms-lg-auto
              me-lg-auto
              mt-4 mt-lg-0
              flex-column flex-lg-row
              align-items-start align-items-lg-center
            "
            style={{ gap: "1.2rem" }}
          >
            {navLinks.map((link) => (
              <Nav.Link
                key={link.to}
                as={NavLink}
                to={link.to}
                onClick={() => setExpanded(false)}
                style={({ isActive }) => ({
                  color: isActive ? TEAL_LIGHT : CORAL_WHITE,
                  fontWeight: 600,
                  fontSize: "1.1rem",
                })}
              >
                {link.label}
              </Nav.Link>
            ))}

            <Nav.Link
              as={NavLink}
              to="/contact"
              onClick={() => setExpanded(false)}
              style={{
                color: CORAL_WHITE,
                fontWeight: 600,
                fontSize: "1.1rem",
              }}
            >
              Contact
            </Nav.Link>

            <Button
              as={NavLink}
              to="/contact"
              onClick={() => setExpanded(false)}
              className="mt-2 mt-lg-0"
              style={{
                background: GOLD_SOFT,
                border: "none",
                borderRadius: "50px",
                padding: "0.6rem 1.6rem",
                fontWeight: 800,
                fontSize: "0.95rem",
                color: TEAL_DARK,
              }}
            >
              Book Now
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
