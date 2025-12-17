import React, { useState } from "react";
import { Navbar, Nav, Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

/* =========================
   MODERN HEADER (NAVBAR)
========================= */
export function RespiraHeader() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`transition-all ${scrolled ? "navbar-scrolled" : ""}`}
      style={{
        background: scrolled 
          ? "rgba(15, 47, 45, 0.95)" 
          : "linear-gradient(180deg, rgba(15,47,45,0.9), rgba(15,47,45,0.4))",
        backdropFilter: "blur(15px)",
        boxShadow: scrolled 
          ? "0 5px 30px rgba(0,0,0,0.15)" 
          : "none",
        transition: "all 0.3s ease",
        padding: "1.2rem 0",
      }}
    >
      <Container className="px-4 px-lg-5">
        {/* ENHANCED BRAND */}
        <Navbar.Brand
          className="d-flex align-items-center"
          href="#"
          style={{
            color: "#ffffff",
            fontWeight: 900,
            letterSpacing: "4px",
            fontSize: "1.8rem",
            position: "relative",
            paddingLeft: "1rem",
          }}
        >
          <div style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "6px",
            height: "24px",
            background: "#2FB6A6",
            borderRadius: "3px",
          }} />
          RESPIRA
        </Navbar.Brand>

        <Navbar.Toggle 
          aria-controls="respira-nav" 
          className="border-0"
          style={{
            color: "#fff",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
          }}
        />
        
        <Navbar.Collapse id="respira-nav" className="justify-content-end">
          <Nav style={{ gap: "2.5rem", alignItems: "center" }}>
            {/* MODERN NAV LINKS WITH HOVER EFFECTS */}
            {["nav.home", "nav.destinations", "nav.experiences", "nav.about"].map((key) => (
              <Nav.Link 
                key={key}
                className="position-relative"
                style={{
                  color: "#ffffff",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  letterSpacing: "0.5px",
                  padding: "0.5rem 0",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#2FB6A6"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#ffffff"}
              >
                <span>{t(key)}</span>
                <span style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "0%",
                  height: "2px",
                  background: "#2FB6A6",
                  transition: "width 0.3s ease",
                }} className="nav-underline" />
              </Nav.Link>
            ))}

            {/* 🌍 ENHANCED LANGUAGE SWITCH */}
            <div style={{ 
              display: "flex", 
              gap: "0.5rem",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "50px",
              padding: "0.25rem",
              backdropFilter: "blur(10px)"
            }}>
              {["en", "it"].map((lang) => (
                <Button
                  key={lang}
                  size="sm"
                  variant="ghost"
                  onClick={() => changeLang(lang)}
                  style={{
                    backgroundColor: i18n.language === lang 
                      ? "#2FB6A6" 
                      : "transparent",
                    color: i18n.language === lang 
                      ? "#fff" 
                      : "rgba(255,255,255,0.8)",
                    border: "none",
                    borderRadius: "50px",
                    padding: "0.375rem 1rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    transition: "all 0.2s ease",
                    minWidth: "60px",
                  }}
                >
                  {lang.toUpperCase()}
                </Button>
              ))}
            </div>

            {/* MODERN CTA BUTTON */}
            <Button
              className="position-relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #2FB6A6 0%, #249b8c 100%)",
                border: "none",
                padding: "0.75rem 2rem",
                borderRadius: "50px",
                fontWeight: 600,
                boxShadow: "0 10px 25px rgba(47, 182, 166, 0.3)",
                transition: "all 0.3s ease",
                letterSpacing: "0.5px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(47, 182, 166, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(47, 182, 166, 0.3)";
              }}
            >
              {t("nav.contact", "Contact")}
              <div style={{
                position: "absolute",
                top: "50%",
                right: "1.5rem",
                transform: "translateY(-50%)",
                fontSize: "1.2rem",
                opacity: 0.8,
              }}>→</div>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

/* =========================
   MODERN FOOTER
========================= */
export function RespiraFooter() {
  const { t } = useTranslation();

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #0A2422 0%, #071A19 100%)",
        color: "#ffffff",
        padding: "100px 0 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* DECORATIVE ELEMENTS */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent, #2FB6A6, transparent)",
      }} />
      
      <Container className="position-relative">
        <Row className="mb-5 pb-4">
          {/* ENHANCED BRAND SECTION */}
          <Col lg={4} md={6} className="mb-5 mb-lg-0">
            <div className="d-flex align-items-center mb-4">
              <div style={{
                width: "8px",
                height: "32px",
                background: "#2FB6A6",
                borderRadius: "4px",
                marginRight: "12px",
              }} />
              <h3 style={{ 
                fontWeight: 900, 
                letterSpacing: "4px",
                fontSize: "2rem",
                margin: 0,
              }}>RESPIRA</h3>
            </div>
            <p style={{ 
              opacity: 0.85, 
              maxWidth: 320, 
              lineHeight: 1.8,
              fontSize: "1.05rem",
              marginBottom: "2rem",
            }}>
              {t(
                "footer.description",
                "Breathe in the beauty of Zanzibar. Calm beaches, rich culture, and unforgettable island experiences."
              )}
            </p>
            
            {/* SOCIAL LINKS */}
            <div style={{ display: "flex", gap: "1rem" }}>
              {["Instagram", "Facebook", "Twitter"].map((social) => (
                <div
                  key={social}
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#2FB6A6";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {social.charAt(0)}
                </div>
              ))}
            </div>
          </Col>

          {/* ENHANCED LINKS */}
          <Col lg={2} md={6} className="mb-5 mb-md-0">
            <h6 style={{ 
              fontWeight: 700, 
              marginBottom: "1.75rem",
              fontSize: "1.1rem",
              letterSpacing: "1px",
              color: "#2FB6A6",
            }}>
              {t("footer.explore", "Explore")}
            </h6>
            {[
              t("footer.zanzibar", "Zanzibar"),
              t("footer.stoneTown", "Stone Town"),
              t("footer.beaches", "Beaches"),
              t("footer.spiceTours", "Spice Tours"),
            ].map((item, index) => (
              <div
                key={item}
                style={{
                  marginBottom: "1rem",
                  opacity: 0.85,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: "0.5rem 0",
                  position: "relative",
                  paddingLeft: "1.5rem",
                  fontSize: "1rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.paddingLeft = "2rem";
                  e.currentTarget.style.color = "#2FB6A6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.85";
                  e.currentTarget.style.paddingLeft = "1.5rem";
                  e.currentTarget.style.color = "#ffffff";
                }}
              >
                <div style={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "6px",
                  height: "6px",
                  background: "#2FB6A6",
                  borderRadius: "50%",
                  opacity: 0.6,
                }} />
                {item}
              </div>
            ))}
          </Col>

          {/* ENHANCED CONTACT */}
          <Col lg={3} md={6} className="mb-5 mb-md-0">
            <h6 style={{ 
              fontWeight: 700, 
              marginBottom: "1.75rem",
              fontSize: "1.1rem",
              letterSpacing: "1px",
              color: "#2FB6A6",
            }}>
              {t("footer.contact", "Contact")}
            </h6>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "1.25rem",
              fontSize: "1rem",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ opacity: 0.6 }}>📍</div>
                <div style={{ opacity: 0.85 }}>{t("footer.location", "Zanzibar, Tanzania")}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ opacity: 0.6 }}>✉️</div>
                <div style={{ opacity: 0.85 }}>info@respira.tz</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ opacity: 0.6 }}>📞</div>
                <div style={{ opacity: 0.85 }}>+255 000 000 000</div>
              </div>
            </div>
          </Col>

          {/* NEWSLETTER SIGNUP */}
          <Col lg={3} md={6}>
            <h6 style={{ 
              fontWeight: 700, 
              marginBottom: "1.75rem",
              fontSize: "1.1rem",
              letterSpacing: "1px",
              color: "#2FB6A6",
            }}>
              {t("footer.newsletter", "Stay Updated")}
            </h6>
            <p style={{ opacity: 0.85, marginBottom: "1.5rem", lineHeight: 1.6 }}>
              {t("footer.newsletterDesc", "Get exclusive travel tips and offers.")}
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder", "Your email")}
                style={{
                  flex: 1,
                  padding: "0.75rem 1rem",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "50px",
                  color: "#fff",
                  fontSize: "0.95rem",
                }}
              />
              <Button
                style={{
                  background: "#2FB6A6",
                  border: "none",
                  borderRadius: "50px",
                  padding: "0.75rem 1.5rem",
                  fontWeight: 600,
                  minWidth: "120px",
                }}
              >
                {t("footer.subscribe", "Subscribe")}
              </Button>
            </div>
          </Col>
        </Row>

        {/* ENHANCED COPYRIGHT */}
        <Row>
          <Col
            style={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "2rem",
              fontSize: "0.95rem",
              opacity: 0.75,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              © {new Date().getFullYear()} Respira Zanzibar · {t("footer.crafted", "Crafted with calm")} 🌿
            </div>
            <div style={{ display: "flex", gap: "2rem" }}>
              <div style={{ cursor: "pointer", opacity: 0.85 }}>{t("footer.privacy", "Privacy Policy")}</div>
              <div style={{ cursor: "pointer", opacity: 0.85 }}>{t("footer.terms", "Terms of Service")}</div>
              <div style={{ cursor: "pointer", opacity: 0.85 }}>{t("footer.cookies", "Cookies")}</div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}