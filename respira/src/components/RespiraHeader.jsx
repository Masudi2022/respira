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
          {/* White Hamburger Button */}
          <Navbar.Toggle
            aria-controls="respira-nav"
            style={{ 
              border: "none",
              padding: "8px",
              marginLeft: "15px"
            }}
            className="custom-toggler"
          >
            <div style={{
              width: "30px",
              height: "24px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span style={{
                width: "100%",
                height: "3px",
                backgroundColor: CORAL_WHITE,
                borderRadius: "3px",
                transition: "all 0.3s ease",
                transform: expanded ? "rotate(45deg) translate(6px, 6px)" : "none"
              }} />
              <span style={{
                width: "100%",
                height: "3px",
                backgroundColor: CORAL_WHITE,
                borderRadius: "3px",
                transition: "all 0.3s ease",
                opacity: expanded ? "0" : "1"
              }} />
              <span style={{
                width: "100%",
                height: "3px",
                backgroundColor: CORAL_WHITE,
                borderRadius: "3px",
                transition: "all 0.3s ease",
                transform: expanded ? "rotate(-45deg) translate(6px, -6px)" : "none"
              }} />
            </div>
          </Navbar.Toggle>

          <Navbar.Brand
            as={NavLink}
            to="/"
            onClick={() => setExpanded(false)}
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              fontWeight: 900,
              fontSize: "1.8rem",
              color: CORAL_WHITE,
              letterSpacing: "1px",
              textAlign: "center",
              width: "100%",
              maxWidth: "200px"
            }}
          >
            <div style={{ lineHeight: "1" }}>
              <span style={{ color: TEAL_LIGHT }}>RES</span>PIRA
            </div>
            <div
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                color: GOLD_SOFT,
                letterSpacing: "2px",
                textAlign: "center",
                lineHeight: "1.2",
                marginTop: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px"
              }}
            >
              ZANZIBAR TOURS
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 900,
                  opacity: 0.85
                }}
              >
                &amp;
              </span>
              SAFARIS
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
            letterSpacing: "1px",
            lineHeight: "1"
          }}
        >
          <div style={{ lineHeight: "1" }}>
            <span style={{ color: TEAL_LIGHT }}>RES</span>PIRA
          </div>
          <div
            style={{
              fontSize: scrolled ? "0.75rem" : "0.85rem",
              fontWeight: 700,
              color: GOLD_SOFT,
              letterSpacing: "3px",
              lineHeight: "1.2",
              marginTop: "3px"
            }}
          >
            ZANZIBAR TOURS & SAFARIS
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
      
      {/* Custom CSS for hamburger menu */}
      <style>{`
        /* Remove default Bootstrap hamburger icon */
        .navbar-toggler-icon {
          background-image: none !important;
        }
        
        /* Ensure the button has no background */
        .custom-toggler {
          background: transparent !important;
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
        }
        
        .custom-toggler:focus {
          box-shadow: none !important;
        }
        
        /* Mobile menu background */
        @media (max-width: 991.98px) {
          .navbar-collapse {
            background: rgba(0,45,45,0.95);
            backdrop-filter: blur(14px);
            padding: 20px;
            border-radius: 0 0 15px 15px;
            margin-top: 10px;
          }
          
          .nav-link {
            padding: 12px 0 !important;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            width: 100%;
          }
          
          .nav-link:last-child {
            border-bottom: none;
          }
          
          .btn {
            width: 100%;
            margin-top: 20px !important;
          }
        }
        
        /* Adjust mobile brand for longer text */
        @media (max-width: 350px) {
          .navbar-brand {
            font-size: 1.6rem !important;
          }
          
          .navbar-brand div {
            font-size: 0.6rem !important;
            letter-spacing: 1px !important;
          }
        }
      `}</style>
    </Navbar>
  );
}