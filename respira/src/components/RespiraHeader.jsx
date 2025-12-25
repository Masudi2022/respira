import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const TEAL_DARK = "#002d2d";
const TEAL_LIGHT = "#00e6e6";
const GOLD_SOFT = "#d4b453";
const CORAL_WHITE = "#ffffff";
const TEAL_MEDIUM = "#006666";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/destinations", label: "Destinations" },
    { to: "/gallery", label: "Gallery" },
    { to: "/adventure", label: "Adventure" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Spacer div to push content down */}
      <div style={{ height: scrolled ? "70px" : "85px" }} className="d-lg-none" />
      <div style={{ height: scrolled ? "90px" : "100px" }} className="d-none d-lg-block" />
      
      <Navbar
        expand="lg"
        fixed="top"
        expanded={expanded}
        onToggle={(val) => setExpanded(val)}
        style={{
          background: scrolled
            ? "linear-gradient(135deg, rgba(0,45,45,0.98), rgba(0,35,35,0.98))"
            : "linear-gradient(135deg, rgba(0,95,95,0.97), rgba(0,70,70,0.97))",
          backdropFilter: scrolled ? "blur(20px)" : "blur(15px)",
          padding: scrolled ? "0.4rem 0" : "1rem 0",
          minHeight: scrolled ? "70px" : "85px",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          borderBottom: scrolled 
            ? `2px solid rgba(212, 180, 83, 0.15)` 
            : `2px solid rgba(212, 180, 83, 0.2)`,
          boxShadow: scrolled 
            ? "0 10px 40px rgba(0, 30, 30, 0.25), 0 2px 10px rgba(0, 0, 0, 0.1)" 
            : "0 5px 25px rgba(0, 40, 40, 0.2), 0 1px 5px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Container fluid className="px-lg-5 px-md-4 px-3" style={{ maxWidth: "1920px" }}>

          {/* ===== MOBILE HEADER ===== */}
          <div className="d-flex d-lg-none align-items-center w-100 position-relative" style={{ minHeight: "65px" }}>
            {/* Animated Hamburger Button */}
            <Navbar.Toggle
              aria-controls="respira-nav"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"}
              style={{ 
                border: "none",
                padding: "10px",
                width: "50px",
                height: "50px",
                borderRadius: "14px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease",
                position: "absolute",
                left: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1001,
              }}
              className="custom-toggler"
            >
              <div style={{
                width: "26px",
                height: "26px",
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
                  transform: expanded ? "rotate(45deg) translate(6px, 6px)" : "none",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }} />
                <span style={{
                  width: "100%",
                  height: "3px",
                  backgroundColor: CORAL_WHITE,
                  borderRadius: "3px",
                  transition: "all 0.3s ease",
                  opacity: expanded ? "0" : "1",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }} />
                <span style={{
                  width: "100%",
                  height: "3px",
                  backgroundColor: CORAL_WHITE,
                  borderRadius: "3px",
                  transition: "all 0.3s ease",
                  transform: expanded ? "rotate(-45deg) translate(6px, -6px)" : "none",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }} />
              </div>
            </Navbar.Toggle>

            {/* Mobile Brand - Centered */}
            <Navbar.Brand
              as={NavLink}
              to="/"
              onClick={() => setExpanded(false)}
              style={{
                fontWeight: 900,
                fontSize: "1.7rem",
                color: CORAL_WHITE,
                letterSpacing: "0.8px",
                textAlign: "center",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                padding: "0.8rem 1rem",
                borderRadius: "12px",
                transition: "all 0.3s ease",
                width: "auto",
                minWidth: "180px",
                zIndex: 1000,
              }}
              className="brand-glow"
            >
              <div style={{ lineHeight: "1", position: "relative", zIndex: 2 }}>
                <span style={{ 
                  color: TEAL_LIGHT,
                  textShadow: "0 0 15px rgba(0, 230, 230, 0.5)"
                }}>RES</span>PIRA
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: GOLD_SOFT,
                  letterSpacing: "2px",
                  lineHeight: "1.2",
                  marginTop: "4px",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                ZANZIBAR TOURS
              </div>
              {/* Animated Background */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(45deg, transparent, rgba(0, 230, 230, 0.05), transparent)",
                borderRadius: "12px",
                opacity: 0,
                transition: "opacity 0.3s ease",
              }} className="brand-bg" />
            </Navbar.Brand>
          </div>

          {/* ===== DESKTOP BRAND ===== */}
          <Navbar.Brand
            as={NavLink}
            to="/"
            onClick={() => setExpanded(false)}
            className="d-none d-lg-flex align-items-center"
            style={{
              fontWeight: 900,
              fontSize: scrolled ? "2.1rem" : "2.5rem",
              color: CORAL_WHITE,
              letterSpacing: "1.2px",
              lineHeight: "1",
              marginRight: "4rem",
              padding: "0.8rem 1.5rem",
              borderRadius: "20px",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.querySelector('.brand-hover-bg').style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.querySelector('.brand-hover-bg').style.opacity = "0";
            }}
          >
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ lineHeight: "1" }}>
                <span style={{ 
                  color: TEAL_LIGHT,
                  textShadow: scrolled ? "0 0 20px rgba(0, 230, 230, 0.4)" : "0 0 25px rgba(0, 230, 230, 0.6)"
                }}>RES</span>PIRA
              </div>
              <div
                style={{
                  fontSize: scrolled ? "0.75rem" : "0.85rem",
                  fontWeight: 700,
                  color: GOLD_SOFT,
                  letterSpacing: "3px",
                  lineHeight: "1.3",
                  marginTop: "5px",
                  textAlign: "left",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                ZANZIBAR TOURS & SAFARIS
              </div>
            </div>
            {/* Hover Background Effect */}
            <div className="brand-hover-bg" style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(135deg, rgba(0, 230, 230, 0.1), rgba(212, 180, 83, 0.05))",
              opacity: 0,
              transition: "opacity 0.4s ease",
            }} />
            {/* Animated Border */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "20px",
              padding: "2px",
              background: "linear-gradient(135deg, rgba(0, 230, 230, 0.3), rgba(212, 180, 83, 0.2))",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              opacity: scrolled ? 0.7 : 0.8,
              transition: "opacity 0.4s ease",
            }} />
          </Navbar.Brand>

          {/* ===== DESKTOP NAVIGATION ===== */}
          <Navbar.Collapse id="respira-nav" className="justify-content-center mx-4">
            <Nav className="align-items-center position-relative" style={{ gap: "0.3rem" }}>
              {/* Animated Background for Hover */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  width: "100%",
                  height: "70%",
                  background: "linear-gradient(90deg, rgba(0, 230, 230, 0.1), rgba(212, 180, 83, 0.05))",
                  borderRadius: "16px",
                  transform: "translateY(-50%)",
                  opacity: 0.3,
                  zIndex: 0,
                }}
              />
              
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.to;
                const isHovered = hoveredLink === link.to;
                
                return (
                  <div key={link.to} className="position-relative" style={{ zIndex: 1 }}>
                    <Nav.Link
                      as={NavLink}
                      to={link.to}
                      onClick={() => setExpanded(false)}
                      onMouseEnter={() => setHoveredLink(link.to)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className="position-relative"
                      style={{
                        color: isActive ? TEAL_LIGHT : CORAL_WHITE,
                        fontWeight: isActive ? 800 : 600,
                        fontSize: "1.05rem",
                        padding: "0.8rem 1rem",
                        borderRadius: "12px",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        backgroundColor: isActive 
                          ? "rgba(0, 230, 230, 0.15)" 
                          : isHovered 
                          ? "rgba(255, 255, 255, 0.08)" 
                          : "transparent",
                        border: isActive 
                          ? `2px solid rgba(0, 230, 230, 0.3)` 
                          : isHovered
                          ? `2px solid rgba(255, 255, 255, 0.1)`
                          : "2px solid transparent",
                        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                        boxShadow: isActive 
                          ? "0 8px 20px rgba(0, 230, 230, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)" 
                          : isHovered
                          ? "0 10px 25px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
                          : "0 4px 12px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      <span style={{ position: "relative", zIndex: 2 }}>
                        {link.label}
                      </span>
                      
                      {/* Animated Underline for Active/Hover */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "5px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: isActive || isHovered ? "60%" : "0%",
                          height: "3px",
                          background: `linear-gradient(90deg, ${TEAL_LIGHT}, ${GOLD_SOFT})`,
                          borderRadius: "2px",
                          transition: "width 0.3s ease",
                        }}
                      />
                      
                      {/* Glow Effect */}
                      {(isActive || isHovered) && (
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "100%",
                            height: "100%",
                            background: isActive
                              ? "radial-gradient(circle at center, rgba(0, 230, 230, 0.1) 0%, transparent 70%)"
                              : "radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, transparent 70%)",
                            borderRadius: "12px",
                            zIndex: 1,
                          }}
                        />
                      )}
                    </Nav.Link>
                    
                    {/* Floating Dot Indicator for Active Page */}
                    {isActive && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
                          width: "16px",
                          height: "16px",
                          background: `linear-gradient(135deg, ${TEAL_LIGHT}, ${GOLD_SOFT})`,
                          borderRadius: "50%",
                          border: "2px solid rgba(0, 45, 45, 0.8)",
                          boxShadow: "0 0 15px rgba(0, 230, 230, 0.7)",
                          zIndex: 3,
                          animation: "float 3s ease-in-out infinite",
                        }}
                      >
                        <div style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "4px",
                          height: "4px",
                          backgroundColor: CORAL_WHITE,
                          borderRadius: "50%",
                        }} />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mobile Book Now Button in Menu */}
              <div className="d-lg-none mt-4">
                <Button
                  as={NavLink}
                  to="/contact"
                  onClick={() => setExpanded(false)}
                  style={{
                    background: `linear-gradient(135deg, ${GOLD_SOFT}, #e8c86c, ${GOLD_SOFT})`,
                    backgroundSize: "200% 200%",
                    border: "none",
                    borderRadius: "16px",
                    padding: "1.2rem",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    color: TEAL_DARK,
                    width: "100%",
                    boxShadow: "0 8px 25px rgba(212, 180, 83, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    letterSpacing: "0.5px",
                  }}
                  className="animated-gradient"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(212, 180, 83, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(212, 180, 83, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)";
                  }}
                >
                  <span style={{ position: "relative", zIndex: 2 }}>Book Now</span>
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                      transition: "left 0.8s ease",
                    }}
                    className="button-shine"
                  />
                  {/* Animated Border */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: "16px",
                    padding: "2px",
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(212, 180, 83, 0.5))",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }} className="button-border" />
                </Button>
              </div>
            </Nav>
          </Navbar.Collapse>

          {/* ===== DESKTOP BOOK NOW BUTTON ===== */}
          <div className="d-none d-lg-flex align-items-center" style={{ marginLeft: "auto", paddingLeft: "2rem" }}>
            <Button
              as={NavLink}
              to="/contact"
              onClick={() => setExpanded(false)}
              style={{
                background: `linear-gradient(135deg, ${GOLD_SOFT}, #e8c86c, ${GOLD_SOFT})`,
                backgroundSize: "200% 200%",
                border: "none",
                borderRadius: "50px",
                padding: "0.85rem 2rem",
                fontWeight: 800,
                fontSize: "1rem",
                color: TEAL_DARK,
                boxShadow: "0 8px 30px rgba(212, 180, 83, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                letterSpacing: "0.5px",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              className="animated-gradient"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
                e.currentTarget.style.boxShadow = "0 12px 35px rgba(212, 180, 83, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(212, 180, 83, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)";
              }}
            >
              <span style={{ position: "relative", zIndex: 2 }}>Book Now</span>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                  transition: "left 0.8s ease",
                }}
                className="button-shine"
              />
              {/* Animated Border */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "50px",
                padding: "2px",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(212, 180, 83, 0.5))",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                opacity: 0,
                transition: "opacity 0.3s ease",
              }} className="button-border" />
            </Button>
          </div>
        </Container>

        {/* Custom CSS with Enhanced Animations */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(180deg); }
          }

          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(0, 230, 230, 0.4); }
            50% { box-shadow: 0 0 30px rgba(0, 230, 230, 0.7); }
          }

          .animated-gradient {
            animation: gradientMove 3s ease infinite;
          }

          .brand-glow:hover {
            animation: pulseGlow 2s ease infinite;
          }

          .brand-glow:hover .brand-bg {
            opacity: 1;
          }

          .nav-link:hover .button-shine {
            left: 100%;
          }

          .btn:hover .button-border {
            opacity: 1;
          }

          .btn:hover .button-shine {
            left: 100%;
          }

          /* Enhanced Mobile Menu */
          @media (max-width: 991.98px) {
            .navbar {
              min-height: 80px !important;
            }
            
            .navbar-collapse {
              background: linear-gradient(135deg, rgba(0,45,45,0.99), rgba(0,30,30,0.99));
              backdrop-filter: blur(25px);
              padding: 30px 25px !important; /* Increased mobile padding */
              border-radius: 0 0 25px 25px;
              margin-top: 15px;
              border-top: 2px solid rgba(212, 180, 83, 0.2);
              box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
            }
            
            .nav-link {
              padding: 1.4rem 1.8rem !important; /* Increased mobile nav link padding */
              border-radius: 16px !important;
              margin: 8px 0 !important; /* Increased margin */
              border: 2px solid transparent !important;
              transition: all 0.3s ease !important;
              position: relative;
              overflow: hidden;
            }
            
            .nav-link.active {
              background: linear-gradient(135deg, rgba(0, 230, 230, 0.15), rgba(0, 230, 230, 0.05)) !important;
              border: 2px solid rgba(0, 230, 230, 0.3) !important;
              box-shadow: 0 8px 25px rgba(0, 230, 230, 0.15) !important;
            }
            
            .nav-link:hover {
              background: rgba(255, 255, 255, 0.08) !important;
              border: 2px solid rgba(255, 255, 255, 0.15) !important;
            }
            
            /* Mobile Book Now Button */
            .navbar-collapse .btn {
              width: 100%;
              margin-top: 2rem !important; /* Increased margin */
              padding: 1.4rem !important; /* Increased padding */
              border-radius: 16px !important;
              font-size: 1.1rem !important;
              font-weight: 800 !important;
              background: linear-gradient(135deg, ${GOLD_SOFT}, #e8c86c, ${GOLD_SOFT}) !important;
              background-size: 200% 200% !important;
              color: ${TEAL_DARK} !important;
              box-shadow: 0 8px 25px rgba(212, 180, 83, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
            }

            /* Mobile active indicator */
            .nav-link.active::after {
              content: '';
              position: absolute;
              top: 50%;
              right: 20px;
              transform: translateY(-50%);
              width: 10px;
              height: 10px;
              background: linear-gradient(135deg, ${TEAL_LIGHT}, ${GOLD_SOFT});
              border-radius: 50%;
              box-shadow: 0 0 10px ${TEAL_LIGHT};
            }

            /* Center brand on mobile */
            .navbar-brand {
              position: absolute !important;
              left: 50% !important;
              top: 50% !important;
              transform: translate(-50%, -50%) !important;
              width: auto !important;
              min-width: 180px !important;
              text-align: center !important;
              margin: 0 !important;
              padding: 0.8rem 1rem !important;
            }

            /* Adjust toggle button position */
            .navbar-toggler {
              position: absolute !important;
              left: 15px !important;
              top: 50% !important;
              transform: translateY(-50%) !important;
              z-index: 1001 !important;
            }

            /* Ensure mobile header has proper height */
            .d-flex.d-lg-none {
              min-height: 65px !important;
              height: 65px !important;
            }
          }

          /* Desktop Enhancements */
          @media (min-width: 992px) {
            .navbar {
              min-height: 100px !important; /* Increased desktop height */
            }
            
            .nav-link {
              position: relative;
              z-index: 1;
            }
            
            .nav-link::before {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) scale(0);
              width: 100%;
              height: 100%;
              background: radial-gradient(circle at center, rgba(0, 230, 230, 0.1) 0%, transparent 70%);
              border-radius: 12px;
              transition: transform 0.3s ease;
              z-index: -1;
            }
            
            .nav-link:hover::before {
              transform: translate(-50%, -50%) scale(1);
            }
            
            .nav-link.active:hover {
              background: rgba(0, 230, 230, 0.2) !important;
              transform: translateY(-3px) scale(1.05);
            }

            /* Ensure proper spacing for desktop */
            .navbar-collapse {
              margin: 0 2rem;
            }
          }

          /* Smooth scroll behavior */
          html {
            scroll-behavior: smooth;
          }

          /* Remove default Bootstrap styles */
          .navbar-toggler {
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
          }
          
          .navbar-toggler:focus {
            box-shadow: none !important;
          }
          
          .nav-link.active {
            background: none !important;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 10px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(0, 45, 45, 0.1);
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, ${TEAL_LIGHT}, ${GOLD_SOFT});
            border-radius: 5px;
          }

          /* Responsive adjustments for very small screens */
          @media (max-width: 350px) {
            .navbar-brand {
              min-width: 150px !important;
            }
            
            .navbar-brand div:first-child {
              font-size: 1.4rem !important;
            }
            
            .navbar-brand div:last-child {
              font-size: 0.55rem !important;
              letterSpacing: 1px !important;
            }
            
            /* Adjust mobile menu padding for very small screens */
            .navbar-collapse {
              padding: 25px 20px !important;
            }
            
            .nav-link {
              padding: 1.2rem 1.5rem !important;
              margin: 6px 0 !important;
            }
          }

          /* Ensure proper container spacing */
          .container-fluid {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          
          @media (min-width: 1200px) {
            .container-fluid {
              padding-left: 3rem !important;
              padding-right: 3rem !important;
            }
          }
        `}</style>
      </Navbar>
    </>
  );
}