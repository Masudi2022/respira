import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Card,
  Row,
  Col,
  Carousel,
  Form,
  Badge,
  Tab,
  Tabs,
  Modal,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaMapMarkerAlt,
  FaStar,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaHeart,
  FaUmbrellaBeach,
  FaWater,
  FaTree,
  FaMountain,
  FaCity,
  FaShip,
  FaCompass,
  FaSun,
  FaFish,
  FaLeaf,
  FaAnchor,
  FaSearch,
  FaCalendar,
  FaUsers,
  FaChevronDown,
  FaPlay,
  FaGlobeAmericas,
  FaShieldAlt,
  FaHandsHelping,
  FaUserFriends,
  FaAward,
  FaClock,
  FaCheckCircle,
  FaQuoteLeft,
  FaLeaf as FaLeafIcon,
  FaSeedling,
  FaRecycle,
  FaPhone,
  FaEnvelope,
  FaMap,
  FaUtensils,
  FaMusic,
  FaCamera,
  FaSwimmer,
  FaSpa,
  FaGift,
  FaConciergeBell,
  FaGlobe,
  FaWhatsapp,
  FaInfoCircle,
  FaThumbsUp,
  FaShield,
  FaUsersCog,
  FaCrown,
  FaMeteor,
  FaPalette,
  FaWaveSquare,
  FaMagic,
  FaDove,
} from "react-icons/fa";

// Your specified deep blue colors
const BLUE_COLORS = {
  primaryDark: "#2FA4A9",     
  secondaryDark: "#2FA4A9",   
  accentTeal: "#2FA4A9",      
  lightTeal: "#8BD3CF",       
  gold: "#FFD166",            
  coral: "#FF7F50",           
  white: "#FFFFFF",
  lightGray: "#F8FAFC",
  mediumGray: "#E2E8F0",
  gradientTeal: "linear-gradient(135deg, #2FA4A9 0%, #8BD3CF 100%)",
  gradientCoral: "linear-gradient(135deg, #FF7F50 0%, #FFD166 100%)",
};

// Language Configuration with 10+ languages
const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', icon: '🇺🇸' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili', icon: '🇹🇿' },
  { code: 'fr', name: 'French', native: 'Français', icon: '🇫🇷' },
  { code: 'es', name: 'Spanish', native: 'Español', icon: '🇪🇸' },
  { code: 'de', name: 'German', native: 'Deutsch', icon: '🇩🇪' },
  { code: 'it', name: 'Italian', native: 'Italiano', icon: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', native: 'Português', icon: '🇵🇹' },
  { code: 'ru', name: 'Russian', native: 'Русский', icon: '🇷🇺' },
  { code: 'ar', name: 'Arabic', native: 'العربية', icon: '🇸🇦' },
  { code: 'zh', name: 'Chinese', native: '中文', icon: '🇨🇳' },
  { code: 'ja', name: 'Japanese', native: '日本語', icon: '🇯🇵' },
  { code: 'ko', name: 'Korean', native: '한국어', icon: '🇰🇷' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', icon: '🇮🇳' },
];

// Translation Cache
const TRANSLATION_CACHE = {};

// Translation function using LibreTranslate
async function translateText(text, targetLang) {
  if (targetLang === "en") return text;

  const cacheKey = `${targetLang}:${text}`;
  if (TRANSLATION_CACHE[cacheKey]) {
    return TRANSLATION_CACHE[cacheKey];
  }

  try {
    const res = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: targetLang,
        format: "text",
      }),
    });

    const data = await res.json();
    TRANSLATION_CACHE[cacheKey] = data.translatedText;
    return data.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Return original text if translation fails
  }
}

// Custom hook for auto-translation
function useAutoTranslate(language) {
  const [translated, setTranslated] = useState({});

  const t = (text) => {
    if (!text) return "";
    if (language === "en") return text;
    return translated[text] || text;
  };

  useEffect(() => {
    let mounted = true;

    async function translateAllTexts() {
      if (language === "en") {
        setTranslated({});
        return;
      }

      // Get all unique text elements from the page
      const textElements = document.querySelectorAll('[data-translate]');
      const uniqueTexts = new Set();
      
      textElements.forEach(el => {
        const text = el.getAttribute('data-translate');
        if (text && !translated[text]) {
          uniqueTexts.add(text);
        }
      });

      const newTranslations = {};
      
      for (const text of uniqueTexts) {
        if (!mounted) break;
        
        try {
          const result = await translateText(text, language);
          if (mounted) {
            newTranslations[text] = result;
            // Update state in batches
            setTranslated(prev => ({ ...prev, [text]: result }));
          }
        } catch (error) {
          console.error(`Failed to translate: ${text}`, error);
        }
      }
    }

    translateAllTexts();
    return () => {
      mounted = false;
    };
  }, [language]);

  return t;
}

// Header Component with Translation Support
const Header = ({ currentLanguage, onLanguageChange, t }) => {
  const [navScrolled, setNavScrolled] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", icon: FaCompass },
    { name: "Experiences", icon: FaUmbrellaBeach },
    { name: "Destinations", icon: FaMapMarkerAlt },
    { name: "Gallery", icon: FaCamera },
    { name: "About", icon: FaHeart },
    { name: "Contact", icon: FaPhone },
  ];

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        style={{
          background: navScrolled
            ? "rgba(47, 164, 169, 0.95)"
            : "rgba(47, 164, 169, 0.85)",
          backdropFilter: "blur(15px)",
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          borderBottom: navScrolled
            ? "1px solid rgba(255, 255, 255, 0.3)"
            : "none",
          boxShadow: navScrolled
            ? "0 6px 30px rgba(0, 0, 0, 0.25)"
            : "0 4px 20px rgba(0, 0, 0, 0.15)",
          zIndex: 1000,
        }}
        className="py-2"
      >
        <Container fluid className="px-3 px-lg-5">
          <Navbar.Brand className="fw-bold fs-3 d-flex align-items-center">
            <div
              style={{
                background: `linear-gradient(135deg, ${BLUE_COLORS.white} 0%, ${BLUE_COLORS.lightTeal} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 800,
                letterSpacing: "1.5px",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              RESPIRA
            </div>
            <span className="text-white ms-2" style={{ fontWeight: 300, opacity: 0.9 }}>ZANZIBAR</span>
          </Navbar.Brand>

          <div className="d-none d-md-flex align-items-center gap-2">
            <FaPhone style={{ color: BLUE_COLORS.white, opacity: 0.8, fontSize: "0.9rem" }} />
            <span className="text-white" style={{ fontSize: "0.9rem" }}>+255 777 888 999</span>
          </div>

          <Navbar.Toggle
            aria-controls="navbar"
            style={{ 
              borderColor: BLUE_COLORS.lightTeal,
              color: BLUE_COLORS.white 
            }}
          />

          <Navbar.Collapse id="navbar">
            <Nav className="mx-auto gap-3 gap-lg-4 fw-medium">
              {navItems.map((item) => (
                <Nav.Link
                  key={item.name}
                  href={`#${item.name.toLowerCase()}`}
                  className="text-white position-relative px-0 d-flex align-items-center gap-2"
                  style={{
                    fontSize: "0.95rem",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    fontWeight: 500,
                    opacity: 0.9,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = "1";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = "0.9";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  <item.icon size={14} />
                  <span data-translate={item.name}>{t(item.name)}</span>
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-5px",
                      left: "0",
                      width: "0%",
                      height: "2px",
                      background: BLUE_COLORS.gold,
                      transition: "width 0.3s ease",
                    }}
                    className="nav-underline"
                  />
                </Nav.Link>
              ))}
            </Nav>

            <div className="d-flex gap-2 mt-3 mt-lg-0">
              <Dropdown show={showLanguageDropdown} onToggle={setShowLanguageDropdown}>
                <Dropdown.Toggle
                  variant="outline-light"
                  className="rounded-pill px-3 fw-semibold d-flex align-items-center gap-2"
                  style={{
                    borderColor: BLUE_COLORS.lightTeal,
                    color: BLUE_COLORS.lightTeal,
                    fontWeight: 600,
                    transition: "all 0.3s ease",
                  }}
                >
                  <FaGlobe /> {currentLanguage.toUpperCase()}
                </Dropdown.Toggle>

                <Dropdown.Menu className="rounded-3 shadow-lg" style={{ 
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${BLUE_COLORS.lightTeal}`,
                  maxHeight: "400px",
                  overflowY: "auto",
                }}>
                  <div className="p-2">
                    {LANGUAGES.map((lang) => (
                      <Dropdown.Item
                        key={lang.code}
                        className="rounded-2 mb-1 d-flex align-items-center gap-3 p-3"
                        style={{
                          background: currentLanguage === lang.code 
                            ? `${BLUE_COLORS.accentTeal}15`
                            : "transparent",
                          transition: "all 0.3s ease",
                        }}
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setShowLanguageDropdown(false);
                        }}
                        onMouseEnter={(e) => {
                          if (currentLanguage !== lang.code) {
                            e.target.style.background = `${BLUE_COLORS.accentTeal}10`;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentLanguage !== lang.code) {
                            e.target.style.background = "transparent";
                          }
                        }}
                      >
                        <span style={{ fontSize: "1.5rem" }}>{lang.icon}</span>
                        <div className="flex-grow-1">
                          <div className="fw-bold" style={{ color: BLUE_COLORS.dark }}>
                            {lang.name}
                          </div>
                          <small className="text-muted">{lang.native}</small>
                        </div>
                        {currentLanguage === lang.code && (
                          <FaCheckCircle style={{ color: BLUE_COLORS.accentTeal }} />
                        )}
                      </Dropdown.Item>
                    ))}
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              <Button
                className="rounded-pill px-4 fw-semibold d-flex align-items-center gap-2"
                style={{
                  background: BLUE_COLORS.gradientCoral,
                  border: "none",
                  color: BLUE_COLORS.white,
                  fontWeight: 700,
                  boxShadow: `0 4px 15px rgba(255, 107, 53, 0.4)`,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = `0 6px 20px rgba(255, 107, 53, 0.6)`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = `0 4px 15px rgba(255, 107, 53, 0.4)`;
                }}
              >
                <FaCompass style={{ fontSize: "1.1rem" }} /> 
                <span data-translate="Book Now">{t("Book Now")}</span>
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contact Modal */}
      <Modal 
        show={showContactModal} 
        onHide={() => setShowContactModal(false)} 
        centered
        className="modal-scale"
      >
        <Modal.Header closeButton style={{ borderBottom: `2px solid ${BLUE_COLORS.lightTeal}` }}>
          <Modal.Title style={{ color: BLUE_COLORS.primaryDark }}>
            <FaPhone className="me-2" /> 
            <span data-translate="Let's Plan Your Dream Vacation!">
              {t("Let's Plan Your Dream Vacation!")}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-4" style={{ color: BLUE_COLORS.secondaryDark }}>
            <span data-translate="Our travel experts are ready to help you create unforgettable memories in Zanzibar.">
              {t("Our travel experts are ready to help you create unforgettable memories in Zanzibar.")}
            </span>
          </p>
          <div className="mb-4">
            {[
              { icon: FaPhone, title: t("Call Us"), text: "+255 777 888 999" },
              { icon: FaEnvelope, title: t("Email Us"), text: "hello@respirazanzibar.com" },
              { icon: FaClock, title: t("Available"), text: t("24/7 - We're always here for you") },
            ].map((item, idx) => (
              <div className="d-flex align-items-center gap-3 mb-3" key={idx}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: `${BLUE_COLORS.lightTeal}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}>
                  <item.icon style={{ color: BLUE_COLORS.accentTeal }} />
                </div>
                <div>
                  <h6 className="mb-1 fw-bold" style={{ color: BLUE_COLORS.primaryDark }}>
                    {item.title}
                  </h6>
                  <p className="mb-0" style={{ color: BLUE_COLORS.secondaryDark }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control 
                type="text" 
                placeholder={t("Your Name")} 
                className="py-2" 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control 
                type="email" 
                placeholder={t("Your Email")} 
                className="py-2" 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder={t("Tell us about your dream vacation...")} 
              />
            </Form.Group>
            <Button className="w-100" style={{
              background: BLUE_COLORS.gradientTeal,
              border: "none",
            }}>
              <span data-translate="Send Message">{t("Send Message")}</span>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

// Enhanced Hero Section
const HeroSection = ({ t }) => {
  const heroImages = [
    "https://images.unsplash.com/photo-1544550581-1bcabf842b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1516496636080-14fb876e029d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  ];

  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "2"
  });

  const [activeTab, setActiveTab] = useState("experiences");

  const scrollToContent = () => {
    const element = document.getElementById('experiences');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const highlights = [
    { icon: FaStar, label: t("4.9/5 Rating"), value: t("Excellence") },
    { icon: FaUsers, label: t("2K+ Happy Travelers"), value: t("Trusted") },
    { icon: FaMapMarkerAlt, label: t("50+ Destinations"), value: t("Variety") },
    { icon: FaClock, label: t("24/7 Support"), value: t("Always Here") },
  ];

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* Animated Background */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}>
        <Carousel
          fade
          controls={false}
          indicators={false}
          interval={5000}
          style={{ height: "100%" }}
        >
          {heroImages.map((img, idx) => (
            <Carousel.Item key={idx} style={{ height: "100vh" }}>
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(45, 48, 71, 0.85), rgba(47, 164, 169, 0.1)), url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100vh",
                  width: "100%",
                  animation: "kenburns 20s infinite",
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Hero Content */}
      <div className="h-100 d-flex align-items-center" style={{ position: "relative", zIndex: 2 }}>
        <Container fluid className="px-0 px-lg-5">
          <Row className="align-items-center mx-0">
            <Col lg={7} className="mb-5 mb-lg-0 ps-lg-5">
              <div className="text-white ps-lg-5">
                <Badge
                  pill
                  className="mb-4 px-3 py-2 d-inline-flex align-items-center gap-2"
                  style={{
                    background: "rgba(255, 209, 102, 0.2)",
                    border: "1px solid rgba(255, 209, 102, 0.3)",
                    fontSize: "0.9rem",
                    animation: "pulse 2s infinite",
                  }}
                >
                  <FaCompass /> 
                  <span data-translate="Welcome to Paradise Island">
                    {t("Welcome to Paradise Island")}
                  </span>
                </Badge>

                <h1 className="display-2 fw-bold mb-4" style={{ lineHeight: "1.1" }}>
                  <span data-translate="Where Turquoise Dreams Meet White Sandy Beaches">
                    {t("Where Turquoise Dreams Meet White Sandy Beaches")}
                  </span>
                </h1>

                <p className="fs-5 mb-4" style={{ opacity: 0.9, maxWidth: "600px" }}>
                  <span data-translate="Escape to Zanzibar - where crystal-clear waters, ancient spice trails, and vibrant culture create the perfect backdrop for your dream vacation. Let us craft your unforgettable island adventure.">
                    {t("Escape to Zanzibar - where crystal-clear waters, ancient spice trails, and vibrant culture create the perfect backdrop for your dream vacation. Let us craft your unforgettable island adventure.")}
                  </span>
                </p>

                <div className="d-flex flex-wrap gap-3 mb-5">
                  <Button
                    href="#experiences"
                    className="rounded-pill px-5 py-3 fw-bold d-flex align-items-center gap-2"
                    style={{
                      background: BLUE_COLORS.gradientCoral,
                      border: "none",
                      color: BLUE_COLORS.white,
                      fontSize: "1.1rem",
                      boxShadow: `0 4px 20px rgba(255, 107, 53, 0.4)`,
                    }}
                  >
                    <FaCompass /> 
                    <span data-translate="Explore Experiences">
                      {t("Explore Experiences")}
                    </span>
                  </Button>
                  
                  <Button
                    variant="outline-light"
                    className="rounded-pill px-5 py-3 fw-bold d-flex align-items-center gap-2"
                    style={{
                      borderWidth: "2px",
                      fontSize: "1.1rem",
                    }}
                  >
                    <FaPlay className="me-2" /> 
                    <span data-translate="Watch Our Story">
                      {t("Watch Our Story")}
                    </span>
                  </Button>
                </div>

                {/* Highlights */}
                <div className="row g-3">
                  {highlights.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div className="col-md-3 col-6" key={idx}>
                        <div className="d-flex align-items-center gap-2">
                          <div style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "10px",
                            background: "rgba(255, 209, 102, 0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.3s ease",
                          }}>
                            <Icon size={18} color={BLUE_COLORS.light} />
                          </div>
                          <div>
                            <div className="text-white fw-bold">{item.label}</div>
                            <small className="text-light" style={{ opacity: 0.8 }}>{item.value}</small>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>

            <Col lg={5} className="pe-lg-5">
              <Card
                className="border-0 rounded-4 shadow-lg"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(20px)",
                  animation: "slideInRight 1s ease",
                }}
              >
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <h4 className="fw-bold" style={{ color: BLUE_COLORS.dark }}>
                      <FaSearch className="me-2" />
                      <span data-translate="Find Your Perfect Escape">
                        {t("Find Your Perfect Escape")}
                      </span>
                    </h4>
                    <p className="text-muted">
                      <span data-translate="Let's plan your dream Zanzibar vacation">
                        {t("Let's plan your dream Zanzibar vacation")}
                      </span>
                    </p>
                  </div>

                  <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="mb-4 border-0"
                  >
                    <Tab eventKey="experiences" title={t("Experiences")} />
                    <Tab eventKey="stays" title={t("Luxury Stays")} />
                  </Tabs>

                  <Form>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold" style={{ color: BLUE_COLORS.dark }}>
                        <FaMapMarkerAlt className="me-2" />
                        <span data-translate="Where would you like to go?">
                          {t("Where would you like to go?")}
                        </span>
                      </Form.Label>
                      <Form.Select className="py-3 rounded-3">
                        <option>{t("All of Zanzibar")}</option>
                        <option>{t("Stone Town & Historic Sites")}</option>
                        <option>{t("Nungwi & Northern Beaches")}</option>
                        <option>{t("Paje & East Coast")}</option>
                        <option>{t("Jozani Forest & Wildlife")}</option>
                        <option>{t("Mnemba Island & Marine Reserve")}</option>
                      </Form.Select>
                    </Form.Group>

                    <Row className="g-3 mb-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold" style={{ color: BLUE_COLORS.dark }}>
                            <FaCalendar className="me-2" />
                            {t("Check-in")}
                          </Form.Label>
                          <Form.Control type="date" className="py-3 rounded-3" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold" style={{ color: BLUE_COLORS.dark }}>
                            <FaCalendar className="me-2" />
                            {t("Check-out")}
                          </Form.Label>
                          <Form.Control type="date" className="py-3 rounded-3" />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold" style={{ color: BLUE_COLORS.dark }}>
                        <FaUsers className="me-2" />
                        {t("Travelers")}
                      </Form.Label>
                      <div className="d-flex align-items-center gap-3">
                        <Button variant="outline-secondary" className="rounded-circle">
                          -
                        </Button>
                        <div className="fw-bold fs-5">{t("2 Adults")}</div>
                        <Button variant="outline-secondary" className="rounded-circle">
                          +
                        </Button>
                      </div>
                    </Form.Group>

                    <Button
                      className="w-100 rounded-pill py-3 fw-bold"
                      style={{
                        background: BLUE_COLORS.gradientTeal,
                        border: "none",
                        fontSize: "1.1rem",
                      }}
                    >
                      <FaSearch className="me-2" />
                      <span data-translate="Discover Your Adventure">
                        {t("Discover Your Adventure")}
                      </span>
                    </Button>
                  </Form>

                  <div className="text-center mt-4">
                    <small className="text-muted">
                      <FaCheckCircle className="me-2" style={{ color: BLUE_COLORS.accentTeal }} />
                      <span data-translate="Best Price Guarantee · Free Cancellation · 24/7 Support">
                        {t("Best Price Guarantee · Free Cancellation · 24/7 Support")}
                      </span>
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Scroll Down Indicator */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4" style={{ zIndex: 3 }}>
          <Button
            variant="link"
            onClick={scrollToContent}
            className="text-decoration-none d-flex flex-column align-items-center"
            style={{ color: BLUE_COLORS.light }}
          >
            <span className="mb-2" data-translate="Discover More">{t("Discover More")}</span>
            <FaChevronDown className="animate-bounce" />
          </Button>
        </div>
      </div>
    </section>
  );
};

// Enhanced Experiences Section
const ExperiencesSection = ({ t }) => {
  const experiences = [
    {
      id: 1,
      title: t("Sunset Dhow Cruise & Dinner"),
      description: t("Sail into the golden hour on a traditional dhow while enjoying fresh seafood and local delicacies. Perfect for romance or family fun!"),
      location: t("Nungwi Coast"),
      duration: t("4 Hours"),
      image: "https://images.unsplash.com/photo-1575992042651-e35f5a391252?auto=format&fit=crop&w=1200&q=80",
      icon: FaShip,
      color: BLUE_COLORS.gold,
      rating: 4.9,
      reviews: 128,
      highlights: [t("Romantic Setting"), t("Local Cuisine"), t("Traditional Music")],
      price: "$89"
    },
    {
      id: 2,
      title: t("Stone Town Cultural Walk"),
      description: t("Wander through winding alleys, visit historic palaces, and taste exotic spices with our knowledgeable local guides."),
      location: t("Stone Town"),
      duration: t("3 Hours"),
      image: "https://images.unsplash.com/photo-1667650708785-2179a8eb2b70?auto=format&fit=crop&w=1200&q=80",
      icon: FaCity,
      color: BLUE_COLORS.accentTeal,
      rating: 4.8,
      reviews: 94,
      highlights: [t("UNESCO Site"), t("Spice Market"), t("Historic Architecture")],
      price: "$65"
    },
    {
      id: 3,
      title: t("Mnemba Island Snorkeling Adventure"),
      description: t("Swim with dolphins, turtles, and colorful fish in one of Africa's most beautiful coral reefs. Suitable for all skill levels!"),
      location: t("Mnemba Atoll"),
      duration: t("Full Day"),
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: FaFish,
      color: BLUE_COLORS.lightTeal,
      rating: 5.0,
      reviews: 156,
      highlights: [t("Dolphin Spotting"), t("Vibrant Coral"), t("Beginner Friendly")],
      price: "$115"
    },
  ];

  const categories = [
    { name: t("All Adventures"), icon: FaCompass, count: 24 },
    { name: t("Water Fun"), icon: FaSwimmer, count: 8 },
    { name: t("Culture & History"), icon: FaCity, count: 6 },
    { name: t("Nature & Wildlife"), icon: FaTree, count: 5 },
    { name: t("Food & Spice"), icon: FaUtensils, count: 3 },
    { name: t("Relaxation"), icon: FaSpa, count: 2 },
  ];

  const [activeCategory, setActiveCategory] = useState(t("All Adventures"));

  return (
    <section id="experiences" className="py-5" style={{ backgroundColor: BLUE_COLORS.white }}>
      <Container fluid className="px-0 px-lg-5">
        <div className="text-center mb-5">
          <Badge
            pill
            className="mb-3 px-3 py-2"
            style={{
              background: `${BLUE_COLORS.lightTeal}20`,
              color: BLUE_COLORS.accentTeal,
              fontSize: "0.9rem",
              animation: "pulse 2s infinite",
            }}
          >
            <FaUmbrellaBeach className="me-2" />
            <span data-translate="Unforgettable Memories Await">
              {t("Unforgettable Memories Await")}
            </span>
          </Badge>
          
          <h2 className="fw-bold mb-3" style={{ color: BLUE_COLORS.primaryDark, fontSize: "3rem" }}>
            <span data-translate="Experiences You'll Love">
              {t("Experiences You'll Love")}
            </span>
          </h2>
          
          <p className="fs-5 text-muted w-75 mx-auto">
            <span data-translate="From thrilling adventures to relaxing retreats, we've got something special for every traveler. Our local experts have handcrafted these experiences just for you!">
              {t("From thrilling adventures to relaxing retreats, we've got something special for every traveler. Our local experts have handcrafted these experiences just for you!")}
            </span>
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-5">
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {categories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <Button
                  key={idx}
                  variant={activeCategory === category.name ? "primary" : "outline-primary"}
                  className="rounded-pill px-4 py-2 d-flex align-items-center gap-2"
                  onClick={() => setActiveCategory(category.name)}
                  style={{
                    background: activeCategory === category.name 
                      ? BLUE_COLORS.gradientTeal
                      : "transparent",
                    borderColor: BLUE_COLORS.lightTeal,
                    color: activeCategory === category.name ? BLUE_COLORS.white : BLUE_COLORS.accentTeal,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== category.name) {
                      e.target.style.transform = "scale(1.05)";
                      e.target.style.boxShadow = `0 4px 15px ${BLUE_COLORS.accentTeal}40`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== category.name) {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "none";
                    }
                  }}
                >
                  <Icon />
                  {category.name}
                  <Badge pill className="ms-1" style={{ 
                    background: activeCategory === category.name ? BLUE_COLORS.white : BLUE_COLORS.accentTeal,
                    color: activeCategory === category.name ? BLUE_COLORS.accentTeal : BLUE_COLORS.white 
                  }}>
                    {category.count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Experiences Grid */}
        <Row className="g-4 mx-0 px-lg-5">
          {experiences.map((exp) => {
            const Icon = exp.icon;
            return (
              <Col lg={4} md={6} key={exp.id}>
                <Card
                  className="border-0 rounded-4 overflow-hidden h-100 shadow-sm hover-shadow"
                  style={{
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                    e.currentTarget.style.boxShadow = `0 20px 40px ${exp.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "0 5px 15px rgba(10, 37, 64, 0.05)";
                  }}
                >
                  <div className="position-relative overflow-hidden">
                    <Card.Img
                      variant="top"
                      src={exp.image}
                      alt={exp.title}
                      style={{ 
                        height: "250px", 
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                      className="card-image-hover"
                    />
                    <div
                      className="position-absolute top-0 start-0 m-3 rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "50px",
                        height: "50px",
                        background: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(10px)",
                        animation: "fadeIn 0.5s ease",
                      }}
                    >
                      <Icon size={24} style={{ color: exp.color }} />
                    </div>
                    <div className="position-absolute bottom-0 end-0 m-3">
                      <Badge pill className="px-3 py-2 fw-bold" style={{ 
                        background: exp.color,
                        animation: "pulse 2s infinite",
                      }}>
                        {exp.price} <small style={{ opacity: 0.8 }}>{t("/person")}</small>
                      </Badge>
                    </div>
                  </div>
                  
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <Badge pill className="mb-2 px-3 py-1" style={{ 
                          background: `${exp.color}15`, 
                          color: exp.color,
                          fontSize: "0.75rem"
                        }}>
                          <FaClock className="me-1" /> {exp.duration}
                        </Badge>
                        <Card.Title className="fw-bold mb-2" style={{ color: BLUE_COLORS.primaryDark }}>
                          {exp.title}
                        </Card.Title>
                      </div>
                      <div className="text-end">
                        <div className="d-flex align-items-center gap-1">
                          <FaStar style={{ color: BLUE_COLORS.gold }} />
                          <span className="fw-bold">{exp.rating}</span>
                          <small className="text-muted">({exp.reviews})</small>
                        </div>
                      </div>
                    </div>
                    
                    <Card.Text className="text-muted mb-4">
                      {exp.description}
                    </Card.Text>
                    
                    <div className="mb-3">
                      <small className="fw-semibold d-block mb-2" style={{ color: BLUE_COLORS.primaryDark }}>
                        <FaMapMarkerAlt className="me-2" />
                        {exp.location}
                      </small>
                      <div className="d-flex flex-wrap gap-2">
                        {exp.highlights.map((highlight, idx) => (
                          <Badge
                            key={idx}
                            pill
                            className="px-2 py-1"
                            style={{ 
                              background: `${BLUE_COLORS.accentTeal}15`,
                              color: BLUE_COLORS.dark,
                              fontSize: "0.75rem"
                            }}
                          >
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button
                      className="w-100 rounded-pill py-2 fw-bold"
                      style={{
                        background: BLUE_COLORS.gradientTeal,
                        border: "none",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.02)";
                        e.target.style.boxShadow = `0 8px 25px ${BLUE_COLORS.primaryDark}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      <span data-translate="Book This Experience">
                        {t("Book This Experience")}
                      </span>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        <div className="text-center mt-5">
          <Button
            variant="outline-primary"
            className="rounded-pill px-5 py-3 fw-bold d-inline-flex align-items-center gap-2"
            style={{
              borderColor: BLUE_COLORS.accentTeal,
              color: BLUE_COLORS.accentTeal,
              borderWidth: "2px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = `0 4px 15px ${BLUE_COLORS.accentTeal}40`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "none";
            }}
          >
            <span data-translate="View All 24 Experiences">
              {t("View All 24 Experiences")}
            </span>
            <FaChevronDown />
          </Button>
        </div>
      </Container>
    </section>
  );
};

// NEW: Premium Features Section
const PremiumFeaturesSection = ({ t }) => {
  const features = [
    {
      icon: FaCrown,
      title: t("Exclusive Access"),
      description: t("Private beach access, VIP events, and members-only experiences"),
      color: BLUE_COLORS.gold,
    },
    {
      icon: FaShield,
      title: t("Safety First"),
      description: t("24/7 medical support, travel insurance, and COVID-safe protocols"),
      color: BLUE_COLORS.accentTeal,
    },
    {
      icon: FaUsersCog,
      title: t("Personal Concierge"),
      description: t("Dedicated travel expert for customized itinerary planning"),
      color: BLUE_COLORS.accentTeal,
    },
    {
      icon: FaMagic,
      title: t("Magic Moments"),
      description: t("Surprise upgrades, special celebrations, and personalized touches"),
      color: BLUE_COLORS.primaryDark,
    },
    {
      icon: FaDove,
      title: t("Sustainable Travel"),
      description: t("Eco-friendly practices and community support initiatives"),
      color: BLUE_COLORS.lightTeal,
    },
    {
      icon: FaMeteor,
      title: t("Adventure Guarantee"),
      description: t("Weather-proof plans and alternative experiences always ready"),
      color: BLUE_COLORS.coral,
    },
  ];

  return (
    <section className="py-5" style={{ 
      background: `linear-gradient(135deg, ${BLUE_COLORS.primaryDark} 0%, ${BLUE_COLORS.secondaryDark} 100%)`,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Animated Background Elements */}
      <div className="position-absolute top-0 left-0 w-100 h-100"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(47, 164, 169, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 211, 207, 0.1) 0%, transparent 50%)",
        }}
      />
      
      <Container fluid className="px-0 px-lg-5 position-relative">
        <div className="text-center mb-5">
          <Badge
            pill
            className="mb-3 px-3 py-2"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              color: BLUE_COLORS.light,
              fontSize: "0.9rem",
              backdropFilter: "blur(10px)",
            }}
          >
            <FaCrown className="me-2" />
            <span data-translate="Premium Experience">
              {t("Premium Experience")}
            </span>
          </Badge>
          
          <h2 className="fw-bold mb-3 text-white" style={{ fontSize: "3rem" }}>
            <span data-translate="Why Choose Respira?">
              {t("Why Choose Respira?")}
            </span>
          </h2>
          
          <p className="fs-5 text-white-50 w-75 mx-auto">
            <span data-translate="We go beyond ordinary travel to deliver extraordinary experiences with our exclusive features">
              {t("We go beyond ordinary travel to deliver extraordinary experiences with our exclusive features")}
            </span>
          </p>
        </div>

        <Row className="g-4 mx-0 px-lg-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Col lg={4} md={6} key={idx}>
                <div 
                  className="p-4 rounded-4 h-100"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    animation: `slideUp 0.6s ease ${idx * 0.1}s both`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.borderColor = feature.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  }}
                >
                  <div className="mb-4">
                    <div 
                      className="rounded-3 d-inline-flex align-items-center justify-content-center p-3"
                      style={{
                        background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}80 100%)`,
                        boxShadow: `0 10px 20px ${feature.color}30`,
                      }}
                    >
                      <Icon size={32} color={BLUE_COLORS.white} />
                    </div>
                  </div>
                  
                  <h4 className="fw-bold mb-3 text-white">{feature.title}</h4>
                  <p className="text-white-50 mb-0">{feature.description}</p>
                </div>
              </Col>
            );
          })}
        </Row>

        <div className="text-center mt-5 pt-3">
          <div className="d-inline-flex flex-wrap justify-content-center gap-4">
            <div className="text-center">
              <h3 className="fw-bold mb-0 text-white" style={{ fontSize: "2.5rem" }}>100%</h3>
              <small className="text-white-50">{t("Satisfaction Rate")}</small>
            </div>
            <div className="text-center">
              <h3 className="fw-bold mb-0 text-white" style={{ fontSize: "2.5rem" }}>24/7</h3>
              <small className="text-white-50">{t("Support Available")}</small>
            </div>
            <div className="text-center">
              <h3 className="fw-bold mb-0 text-white" style={{ fontSize: "2.5rem" }}>5⭐</h3>
              <small className="text-white-50">{t("Average Rating")}</small>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

// NEW: Gallery Section
const GallerySection = ({ t }) => {
  const galleryImages = [
    "https://images.unsplash.com/photo-1544550581-1bcabf842b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516496636080-14fb876e029d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <section className="py-5" style={{ backgroundColor: BLUE_COLORS.white }}>
      <Container fluid className="px-0 px-lg-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3" style={{ color: BLUE_COLORS.primaryDark, fontSize: "3rem" }}>
            <span data-translate="Discover Paradise">
              {t("Discover Paradise")}
            </span>
          </h2>
          <p className="fs-5 text-muted w-75 mx-auto">
            <span data-translate="Glimpses of the breathtaking beauty that awaits you in Zanzibar">
              {t("Glimpses of the breathtaking beauty that awaits you in Zanzibar")}
            </span>
          </p>
        </div>

        <Row className="g-3 mx-0 px-lg-5">
          {galleryImages.map((img, idx) => (
            <Col lg={4} md={6} key={idx}>
              <div 
                className="rounded-4 overflow-hidden position-relative"
                style={{
                  height: "300px",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  animation: `fadeIn 0.6s ease ${idx * 0.1}s both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <img
                  src={img}
                  alt={`${t("Gallery")} ${idx + 1}`}
                  className="w-100 h-100 object-fit-cover"
                  style={{
                    transition: "transform 0.5s ease",
                  }}
                />
                <div 
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                  style={{
                    background: "rgba(47, 164, 169, 0.3)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <FaCamera size={48} color={BLUE_COLORS.white} />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

// Enhanced Footer
const Footer = ({ t }) => {
  const quickLinks = [
    { name: t("About Us"), link: "#" },
    { name: t("Experiences"), link: "#experiences" },
    { name: t("Destinations"), link: "#" },
    { name: t("Gallery"), link: "#" },
    { name: t("Contact"), link: "#" },
  ];

  const experiencesLinks = [
    { name: t("Water Sports"), link: "#" },
    { name: t("Cultural Tours"), link: "#" },
    { name: t("Wildlife Safaris"), link: "#" },
    { name: t("Food Experiences"), link: "#" },
    { name: t("Wellness Retreats"), link: "#" },
    { name: t("Adventure Activities"), link: "#" },
  ];

  return (
    <footer style={{ 
      background: `linear-gradient(135deg, ${BLUE_COLORS.primaryDark} 0%, ${BLUE_COLORS.secondaryDark} 100%)`,
      color: BLUE_COLORS.white
    }}>
      <Container fluid className="py-5 px-lg-5">
        <Row className="g-4">
          <Col lg={4}>
            <div className="mb-4">
              <h3 className="fw-bold d-flex align-items-center gap-2">
                <div
                  style={{
                    background: BLUE_COLORS.gradientTeal,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 800,
                  }}
                >
                  RESPIRA
                </div>
                <span style={{ fontWeight: 300 }}>ZANZIBAR</span>
              </h3>
              <p className="mt-3" style={{ opacity: 0.9 }}>
                <span data-translate="Creating unforgettable memories in paradise. We believe in sustainable tourism that benefits both travelers and local communities.">
                  {t("Creating unforgettable memories in paradise. We believe in sustainable tourism that benefits both travelers and local communities.")}
                </span>
              </p>
            </div>
            
            <div className="d-flex gap-3">
              {[FaFacebook, FaInstagram, FaTwitter, FaEnvelope].map((Icon, idx) => (
                <Button 
                  key={idx}
                  variant="outline-light" 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    width: "40px", 
                    height: "40px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1)";
                    e.target.style.background = BLUE_COLORS.primaryDark;
                    e.target.style.borderColor = BLUE_COLORS.primaryDark;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.background = "transparent";
                    e.target.style.borderColor = BLUE_COLORS.white;
                  }}
                >
                  <Icon />
                </Button>
              ))}
            </div>
          </Col>
          
          <Col lg={2} md={4} sm={6}>
            <h6 className="fw-bold mb-3">{t("Quick Links")}</h6>
            <ul className="list-unstyled">
              {quickLinks.map((link, idx) => (
                <li key={idx} className="mb-2">
                  <a 
                    href={link.link} 
                    className="text-white-50 text-decoration-none"
                    style={{ 
                      transition: "all 0.3s ease",
                      display: "inline-block",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = BLUE_COLORS.light;
                      e.target.style.transform = "translateX(5px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "rgba(255,255,255,0.5)";
                      e.target.style.transform = "translateX(0)";
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
          
          <Col lg={2} md={4} sm={6}>
            <h6 className="fw-bold mb-3">{t("Experiences")}</h6>
            <ul className="list-unstyled">
              {experiencesLinks.map((link, idx) => (
                <li key={idx} className="mb-2">
                  <a 
                    href={link.link} 
                    className="text-white-50 text-decoration-none"
                    style={{ 
                      transition: "all 0.3s ease",
                      display: "inline-block",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = BLUE_COLORS.light;
                      e.target.style.transform = "translateX(5px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "rgba(255,255,255,0.5)";
                      e.target.style.transform = "translateX(0)";
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
          
          <Col lg={4} md={4}>
            <h6 className="fw-bold mb-3">{t("Stay Connected")}</h6>
            <p className="text-white-50 mb-4">
              <span data-translate="Subscribe to our newsletter for exclusive offers and travel tips!">
                {t("Subscribe to our newsletter for exclusive offers and travel tips!")}
              </span>
            </p>
            <Form>
              <div className="input-group mb-3">
                <Form.Control 
                  type="email" 
                  placeholder={t("Your email address")}
                  className="py-3"
                  style={{ borderRight: "none" }}
                />
                <Button 
                  style={{ 
                    background: BLUE_COLORS.gradientTeal,
                    borderColor: BLUE_COLORS.primaryDark
                  }}
                >
                  {t("Subscribe")}
                </Button>
              </div>
            </Form>
            
            <div className="mt-4">
              <h6 className="fw-bold mb-3">{t("Contact Info")}</h6>
              {[
                { icon: FaPhone, text: "+255 777 888 999" },
                { icon: FaEnvelope, text: "hello@respirazanzibar.com" },
                { icon: FaMap, text: t("Stone Town, Zanzibar") },
              ].map((item, idx) => (
                <div key={idx} className="d-flex align-items-center gap-2 mb-2">
                  <item.icon style={{ color: BLUE_COLORS.lightTeal }} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </Col>
        </Row>
        
        <hr className="my-5" style={{ borderColor: "rgba(255,255,255,0.1)" }} />
        
        <div className="text-center">
          <p className="mb-0 text-white-50">
            © {new Date().getFullYear()} Respira Zanzibar. {t("All rights reserved.")} | 
            {t("Sustainable Tourism Certified")} | {t("Member of Zanzibar Tourism Board")}
          </p>
        </div>
      </Container>
    </footer>
  );
};

// Floating WhatsApp Button
const FloatingWhatsAppButton = ({ t }) => (
  <OverlayTrigger
    placement="left"
    overlay={<Tooltip>{t("Chat with us on WhatsApp")}</Tooltip>}
  >
    <Button
      className="position-fixed rounded-circle shadow-lg d-flex align-items-center justify-content-center"
      style={{
        bottom: "30px",
        right: "30px",
        width: "60px",
        height: "60px",
        background: "#25D366",
        border: "none",
        zIndex: 1000,
        animation: "pulse 2s infinite",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "scale(1)";
      }}
    >
      <FaWhatsapp size={24} color="#FFFFFF" />
    </Button>
  </OverlayTrigger>
);

// Main App Component
export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const t = useAutoTranslate(currentLanguage);

  return (
    <div
      style={{
        backgroundColor: BLUE_COLORS.lightGray,
        minHeight: "100vh",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        overflowX: "hidden",
      }}
    >
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} t={t} />
      <HeroSection t={t} />
      <ExperiencesSection t={t} />
      <PremiumFeaturesSection t={t} />
      <GallerySection t={t} />
      
      {/* Final CTA Section */}
      <section className="py-5" style={{ 
        background: BLUE_COLORS.gradientTeal,
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1544550581-1bcabf842b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1
          }}
        />
        <Container fluid className="position-relative py-5 px-lg-5">
          <Row className="align-items-center text-center">
            <Col lg={8} className="mx-auto">
              <h2 className="text-white fw-bold mb-4 display-5">
                <span data-translate="Ready for Your Zanzibar Adventure?">
                  {t("Ready for Your Zanzibar Adventure?")}
                </span>
              </h2>
              <p className="text-white mb-4 fs-5" style={{ opacity: 0.9 }}>
                <span data-translate="What are you waiting for? Let's start planning your perfect escape today. Our team is excited to help you create memories that will last a lifetime.">
                  {t("What are you waiting for? Let's start planning your perfect escape today. Our team is excited to help you create memories that will last a lifetime.")}
                </span>
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Button
                  variant="light"
                  className="rounded-pill px-5 py-3 fw-bold d-flex align-items-center gap-2"
                  style={{
                    background: BLUE_COLORS.white,
                    border: "none",
                    color: BLUE_COLORS.primaryDark,
                    fontSize: "1.1rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.05)";
                    e.target.style.boxShadow = "0 8px 25px rgba(255, 255, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <FaPhone /> 
                  <span data-translate="Book Your Consultation">
                    {t("Book Your Consultation")}
                  </span>
                </Button>
                <Button
                  variant="outline-light"
                  className="rounded-pill px-5 py-3 fw-bold"
                  style={{
                    borderWidth: "2px",
                    fontSize: "1.1rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.05)";
                    e.target.style.background = "rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.background = "transparent";
                  }}
                >
                  <span data-translate="Get Free Quote">
                    {t("Get Free Quote")}
                  </span>
                </Button>
              </div>
              <p className="text-white mt-4 mb-0" style={{ opacity: 0.8, fontSize: "0.9rem" }}>
                <FaCheckCircle className="me-2" />
                <span data-translate="No booking fees · Best price guarantee · 24/7 support">
                  {t("No booking fees · Best price guarantee · 24/7 support")}
                </span>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      
      <Footer t={t} />
      
      <FloatingWhatsAppButton t={t} />
    </div>
  );
}

// Enhanced CSS animations and styles
const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(47, 164, 169, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(47, 164, 169, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(47, 164, 169, 0);
    }
  }
  
  @keyframes kenburns {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
  
  .animate-bounce {
    animation: bounce 2s infinite;
  }
  
  .modal-scale {
    animation: scaleIn 0.3s ease;
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .hover-shadow {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .hover-shadow:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(47, 164, 169, 0.15) !important;
  }
  
  .card-image-hover:hover {
    transform: scale(1.1);
  }
  
  .object-fit-cover {
    object-fit: cover;
  }
  
  .nav-underline {
    transition: width 0.3s ease;
  }
  
  .nav-link:hover .nav-underline {
    width: 100%;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${BLUE_COLORS.lightGray};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${BLUE_COLORS.gradientTeal};
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${BLUE_COLORS.gradientCoral};
  }
  
  /* Full width containers */
  .container-fluid {
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
  }
  
  @media (min-width: 992px) {
    .container-fluid {
      padding-left: 5%;
      padding-right: 5%;
    }
  }
  
  @media (min-width: 1200px) {
    .container-fluid {
      padding-left: 8%;
      padding-right: 8%;
    }
  }
  
  @media (min-width: 1400px) {
    .container-fluid {
      padding-left: 10%;
      padding-right: 10%;
    }
  }
`;

// Add styles to document head
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);