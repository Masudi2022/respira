import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Card,
  Row,
  Col,
  Carousel,
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
} from "react-icons/fa";

// Your specified deep blue colors
const BLUE_COLORS = {
  primaryDark: "#0A2540",     // Deep navy blue
  secondaryDark: "#0F172A",   // Almost black navy
  accentTeal: "#2FA4A9",      // Your teal as accent
  lightTeal: "#8BD3CF",       // Light teal for highlights
  gold: "#FFD166",            // Gold for premium accents
  coral: "#FF7F50",           // Coral for sunset elements
  white: "#FFFFFF",
  lightGray: "#F8FAFC",
  mediumGray: "#E2E8F0"
};

// Header Component
const Header = () => {
  const [navScrolled, setNavScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      style={{
        background: navScrolled
          ? `rgba(10, 37, 64, 0.98)`
          : `rgba(10, 37, 64, 0.95)`,
        backdropFilter: "blur(15px)",
        transition: "all 0.3s ease",
        borderBottom: navScrolled
          ? `1px solid ${BLUE_COLORS.accentTeal}30`
          : "none",
        boxShadow: navScrolled ? `0 4px 30px rgba(10, 37, 64, 0.2)` : "none",
      }}
      className="py-3"
    >
      <Container fluid className="px-4 px-lg-5">
        <Navbar.Brand className="fw-bold fs-3 d-flex align-items-center">
          <div
            style={{
              background: `linear-gradient(135deg, ${BLUE_COLORS.white} 0%, ${BLUE_COLORS.lightTeal} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 800,
              letterSpacing: "1.5px",
            }}
          >
            RESPIRA
          </div>
          <span className="text-white ms-2" style={{ fontWeight: 300, opacity: 0.9 }}>ZANZIBAR</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbar"
          style={{ 
            borderColor: BLUE_COLORS.accentTeal,
            color: BLUE_COLORS.white 
          }}
        />

        <Navbar.Collapse id="navbar">
          <Nav className="mx-auto gap-4 fw-medium">
            {["Home", "About", "Experiences", "Destinations", "Gallery", "Contact"].map(
              (item) => (
                <Nav.Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white position-relative px-0"
                  style={{
                    fontSize: "1rem",
                    transition: "all 0.3s ease",
                    fontWeight: 500,
                    opacity: 0.9,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = "1";
                    e.target.querySelector('.nav-underline').style.width = "100%";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = "0.9";
                    e.target.querySelector('.nav-underline').style.width = "0%";
                  }}
                >
                  {item}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-5px",
                      left: "0",
                      width: "0%",
                      height: "2px",
                      background: BLUE_COLORS.accentTeal,
                      transition: "width 0.3s ease",
                    }}
                    className="nav-underline"
                  />
                </Nav.Link>
              )
            )}
          </Nav>

          <Button
            className="rounded-pill px-4 fw-semibold d-flex align-items-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${BLUE_COLORS.accentTeal} 0%, ${BLUE_COLORS.lightTeal} 100%)`,
              border: "none",
              color: BLUE_COLORS.white,
              fontWeight: 600,
              boxShadow: `0 4px 15px ${BLUE_COLORS.accentTeal}40`,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = `0 6px 20px ${BLUE_COLORS.accentTeal}60`;
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = `0 4px 15px ${BLUE_COLORS.accentTeal}40`;
            }}
          >
            <FaCompass style={{ fontSize: "1.1rem" }} /> Start Journey
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer
      className="py-5"
      style={{
        background: BLUE_COLORS.secondaryDark,
        borderTop: `1px solid ${BLUE_COLORS.primaryDark}`,
      }}
    >
      <Container>
        <Row className="g-5">
          <Col lg={4}>
            <div className="mb-4">
              <h3
                className="fw-bold mb-3"
                style={{
                  background: `linear-gradient(135deg, ${BLUE_COLORS.white} 0%, ${BLUE_COLORS.lightTeal} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 800,
                  letterSpacing: "1.5px",
                }}
              >
                RESPIRA ZANZIBAR
              </h3>
              <p className="text-white mb-4" style={{ opacity: 0.9, lineHeight: "1.8" }}>
                Crafting unforgettable Zanzibar experiences through authentic
                cultural immersion and sustainable luxury travel.
              </p>
              <div className="d-flex gap-3">
                {[FaInstagram, FaFacebook, FaTwitter].map((Icon, idx) => (
                  <Button
                    key={idx}
                    variant="outline-light"
                    className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderColor: BLUE_COLORS.accentTeal,
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = BLUE_COLORS.accentTeal;
                      e.target.style.borderColor = BLUE_COLORS.accentTeal;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.borderColor = BLUE_COLORS.accentTeal;
                    }}
                  >
                    <Icon style={{ color: BLUE_COLORS.white, fontSize: "1.2rem" }} />
                  </Button>
                ))}
              </div>
            </div>
          </Col>

          <Col md={6} lg={4}>
            <h6 className="text-white fw-bold mb-4" style={{ color: BLUE_COLORS.lightTeal }}>
              Quick Links
            </h6>
            <Row>
              <Col xs={6}>
                <ul className="list-unstyled">
                  {["Home", "About", "Experiences", "Destinations"].map((item) => (
                    <li key={item} className="mb-3">
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="text-white text-decoration-none d-flex align-items-center gap-2"
                        style={{ 
                          transition: "all 0.3s ease",
                          opacity: 0.9,
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.opacity = "1";
                          e.target.style.transform = "translateX(5px)";
                          e.target.style.color = BLUE_COLORS.lightTeal;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.opacity = "0.9";
                          e.target.style.transform = "translateX(0)";
                          e.target.style.color = BLUE_COLORS.white;
                        }}
                      >
                        <FaCompass size="12" /> {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </Col>
              <Col xs={6}>
                <ul className="list-unstyled">
                  {["Gallery", "Contact", "Sustainability", "Team"].map((item) => (
                    <li key={item} className="mb-3">
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="text-white text-decoration-none d-flex align-items-center gap-2"
                        style={{ 
                          transition: "all 0.3s ease",
                          opacity: 0.9,
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.opacity = "1";
                          e.target.style.transform = "translateX(5px)";
                          e.target.style.color = BLUE_COLORS.lightTeal;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.opacity = "0.9";
                          e.target.style.transform = "translateX(0)";
                          e.target.style.color = BLUE_COLORS.white;
                        }}
                      >
                        <FaCompass size="12" /> {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          </Col>

          <Col md={6} lg={4}>
            <h6 className="text-white fw-bold mb-4" style={{ color: BLUE_COLORS.lightTeal }}>
              Contact Info
            </h6>
            <div className="mb-4">
              <p className="text-white mb-3 d-flex align-items-center gap-2" style={{ opacity: 0.9 }}>
                <FaMapMarkerAlt style={{ color: BLUE_COLORS.lightTeal }} />
                Stone Town, Zanzibar Archipelago
              </p>
              <p className="text-white mb-3" style={{ opacity: 0.9 }}>
                <FaHeart className="me-2" style={{ color: BLUE_COLORS.lightTeal }} />
                info@respira-zanzibar.com
              </p>
              <p className="text-white" style={{ opacity: 0.9 }}>
                <FaHeart className="me-2" style={{ color: BLUE_COLORS.lightTeal }} />
                +255 777 888 999
              </p>
            </div>
          </Col>
        </Row>

        <hr
          className="my-5"
          style={{ borderColor: BLUE_COLORS.primaryDark }}
        />

        <Row className="align-items-center">
          <Col md={6}>
            <p className="text-white mb-3 mb-md-0" style={{ opacity: 0.9 }}>
              © {new Date().getFullYear()} Respira Zanzibar. All rights reserved.
            </p>
          </Col>
          <Col md={6}>
            <div className="d-flex flex-wrap justify-content-md-end gap-3">
              {["Privacy Policy", "Terms of Service", "Sustainability Pledge"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, '')}`}
                  className="text-white text-decoration-none"
                  style={{ 
                    opacity: 0.9,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = "1";
                    e.target.style.color = BLUE_COLORS.lightTeal;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = "0.9";
                    e.target.style.color = BLUE_COLORS.white;
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

// Main App Component
export default function App() {
  const heroImages = [
    "https://images.unsplash.com/photo-1544550581-1bcabf842b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1516496636080-14fb876e029d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  ];

  const experiences = [
    {
      id: 1,
      title: "Sunset Dhow Sailing",
      description: "Traditional sailing experience with spectacular Indian Ocean sunset views aboard a classic wooden dhow.",
      location: "Nungwi Coast",
      duration: "Evening Experience",
      image: "https://images.unsplash.com/photo-1536152471326-642d74f4d474?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: FaShip,
      color: BLUE_COLORS.gold
    },
    {
      id: 2,
      title: "Stone Town Heritage Walk",
      description: "Immerse yourself in the rich history of this UNESCO World Heritage site with its ancient architecture.",
      location: "Stone Town",
      duration: "Cultural Journey",
      image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: FaCity,
      color: BLUE_COLORS.accentTeal
    },
    {
      id: 3,
      title: "Mnemba Marine Discovery",
      description: "Crystal clear waters reveal vibrant coral gardens and diverse marine ecosystems waiting to be explored.",
      location: "Mnemba Atoll",
      duration: "Full Day Adventure",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: FaFish,
      color: BLUE_COLORS.lightTeal
    },
    {
      id: 4,
      title: "Spice Garden Sensory Tour",
      description: "Discover Zanzibar's spice heritage through guided tours of aromatic plantations and gardens.",
      location: "Central Plantations",
      duration: "Sensory Experience",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: FaLeaf,
      color: BLUE_COLORS.accentTeal
    },
    {
      id: 5,
      title: "Jozani Forest Sanctuary",
      description: "Encounter rare red colobus monkeys in their natural habitat within this protected forest reserve.",
      location: "Jozani Chwaka Bay",
      duration: "Wildlife Encounter",
      image: "https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: FaTree,
      color: BLUE_COLORS.lightTeal
    },
    {
      id: 6,
      title: "Pristine Beach Retreat",
      description: "Relax on untouched white sand beaches with turquoise waters and swaying palm trees.",
      location: "Paje Beach",
      duration: "Day Retreat",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: FaUmbrellaBeach,
      color: BLUE_COLORS.gold
    },
  ];

  const highlights = [
    {
      title: "Luxury Experiences",
      description: "Curated premium travel experiences",
      count: "50+",
      suffix: "Destinations",
      icon: FaCompass,
      color: BLUE_COLORS.accentTeal
    },
    {
      title: "Cultural Immersion",
      description: "Authentic local experiences",
      count: "100+",
      suffix: "Activities",
      icon: FaHeart,
      color: BLUE_COLORS.lightTeal
    },
    {
      title: "Premium Stays",
      description: "Luxury accommodations",
      count: "30+",
      suffix: "Properties",
      icon: FaSun,
      color: BLUE_COLORS.gold
    },
    {
      title: "Satisfied Travelers",
      description: "Memorable journeys crafted",
      count: "2000+",
      suffix: "Travelers",
      icon: FaStar,
      color: BLUE_COLORS.accentTeal
    }
  ];

  const destinations = [
    {
      name: "Stone Town",
      description: "Historic UNESCO site",
      image: "https://images.unsplash.com/photo-1516496636080-14fb876e029d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: BLUE_COLORS.accentTeal
    },
    {
      name: "Nungwi Beach",
      description: "Pristine white sands",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: BLUE_COLORS.lightTeal
    },
    {
      name: "Mnemba Island",
      description: "Coral paradise",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: BLUE_COLORS.gold
    },
    {
      name: "Jozani Forest",
      description: "Wildlife sanctuary",
      image: "https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: BLUE_COLORS.accentTeal
    }
  ];

  const testimonials = [
    {
      name: "Sophia & James",
      text: "Respira crafted the most magical honeymoon experience. Every detail was perfect, from the private beach dinners to the cultural insights.",
      origin: "London, UK",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 5
    },
    {
      name: "The Chen Family",
      text: "Our family adventure with Respira was beyond expectations. The kids loved the marine life, and we appreciated the sustainable approach.",
      origin: "Singapore",
      image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 5
    },
    {
      name: "Maya Rodriguez",
      text: "As a solo traveler, I felt completely safe and cared for. The local guides shared incredible stories that brought Zanzibar to life.",
      origin: "Barcelona, Spain",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 5
    }
  ];

  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "2"
  });

  return (
    <div
      style={{
        backgroundColor: BLUE_COLORS.lightGray,
        minHeight: "100vh",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <Header />

      {/* Hero Section */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          paddingTop: "80px",
        }}
      >
        <Carousel
          fade
          controls={false}
          indicators={false}
          interval={4000}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
          }}
        >
          {heroImages.map((img, idx) => (
            <Carousel.Item key={idx} style={{ height: "100vh" }}>
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(10, 37, 64, 0.85), rgba(15, 23, 42, 0.8)), url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100%",
                  width: "100%",
                  transform: "scale(1.1)",
                  transition: "transform 10s ease",
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <Container
          className="px-4 px-lg-5 text-white d-flex align-items-center"
          style={{
            height: "100vh",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Row className="align-items-center">
            <Col lg={7} className="mb-5 mb-lg-0">
              <div className="mb-4">
                <h6
                  className="text-uppercase letter-spacing d-inline-block px-3 py-2 rounded-pill mb-4"
                  style={{
                    background: "rgba(47, 164, 169, 0.2)",
                    color: BLUE_COLORS.lightTeal,
                    fontSize: "0.875rem",
                    letterSpacing: "2px",
                    fontWeight: 600,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  Welcome to Paradise
                </h6>
                <h1
                  className="display-2 fw-bold mb-4"
                  style={{
                    lineHeight: "1.1",
                    color: BLUE_COLORS.white,
                  }}
                >
                  Discover the Magic
                  <br />
                  of <span style={{ color: BLUE_COLORS.lightTeal }}>Zanzibar</span>
                </h1>
                <p
                  className="fs-5 mb-5"
                  style={{
                    maxWidth: "600px",
                    lineHeight: "1.8",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontWeight: 300,
                  }}
                >
                  Where turquoise waters meet ancient traditions. Experience the
                  magic of the Spice Islands through curated journeys that
                  connect you with authentic culture and breathtaking nature.
                </p>
                <div className="d-flex flex-wrap gap-3 mt-4">
                  <Button
                    href="#experiences"
                    className="rounded-pill px-5 py-3 fw-semibold d-flex align-items-center gap-2"
                    style={{
                      background: `linear-gradient(135deg, ${BLUE_COLORS.accentTeal} 0%, ${BLUE_COLORS.lightTeal} 100%)`,
                      border: "none",
                      color: BLUE_COLORS.white,
                      fontSize: "1.1rem",
                      boxShadow: `0 4px 20px ${BLUE_COLORS.accentTeal}40`,
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-3px)";
                      e.target.style.boxShadow = `0 8px 25px ${BLUE_COLORS.accentTeal}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = `0 4px 20px ${BLUE_COLORS.accentTeal}40`;
                    }}
                  >
                    <FaCompass /> Explore Experiences
                  </Button>
                  <Button
                    href="#destinations"
                    variant="outline-light"
                    className="rounded-pill px-5 py-3 fw-semibold"
                    style={{
                      borderColor: BLUE_COLORS.lightTeal,
                      color: BLUE_COLORS.lightTeal,
                      fontSize: "1.1rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "rgba(139, 211, 207, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                    }}
                  >
                    View Destinations
                  </Button>
                </div>
              </div>
            </Col>

            {/* Search Card */}
            <Col lg={5}>
            </Col>
          </Row>
        </Container>

        {/* Floating Highlights */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "0",
            right: "0",
            zIndex: 3,
          }}
        >
          <Container>
            <Row className="g-4">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Col lg={3} md={6} key={idx}>
                    <div
                      className="text-center p-4 rounded-4 d-flex flex-column align-items-center justify-content-center"
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${item.color}30`,
                        minHeight: "160px",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                        e.currentTarget.style.borderColor = `${item.color}50`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.borderColor = `${item.color}30`;
                      }}
                    >
                      <Icon 
                        size={28} 
                        color={item.color}
                        className="mb-3"
                      />
                      <h3
                        className="fw-bold mb-2"
                        style={{
                          color: item.color,
                          fontSize: "2rem",
                        }}
                      >
                        {item.count}
                      </h3>
                      <h6 className="text-white mb-2" style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.title}</h6>
                      <small className="text-white" style={{ opacity: 0.9, fontSize: "0.8rem" }}>{item.description}</small>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="py-5 my-5" style={{ backgroundColor: BLUE_COLORS.white }}>
        <Container fluid className="px-4 px-lg-5">
          <div className="text-center mb-5">
            <h6
              className="text-uppercase letter-spacing mb-3"
              style={{ 
                color: BLUE_COLORS.accentTeal, 
                letterSpacing: "3px",
                fontWeight: 600 
              }}
            >
              Premium Experiences
            </h6>
            <h2
              className="fw-bold mb-4"
              style={{
                fontSize: "3rem",
                color: BLUE_COLORS.primaryDark,
              }}
            >
              Unforgettable Journeys
            </h2>
            <p
              className="text-muted w-75 mx-auto"
              style={{ 
                fontSize: "1.1rem", 
                lineHeight: "1.8",
                color: BLUE_COLORS.secondaryDark 
              }}
            >
              Each experience is crafted to connect you with the authentic soul
              of Zanzibar, from cultural immersion to natural wonders.
            </p>
          </div>

          <Row className="g-4">
            {experiences.map((exp) => {
              const Icon = exp.icon;
              return (
                <Col xl={4} md={6} key={exp.id}>
                  <Card
                    className="border-0 rounded-4 overflow-hidden h-100 experience-card"
                    style={{
                      background: BLUE_COLORS.white,
                      border: `1px solid ${BLUE_COLORS.mediumGray}`,
                      transition: "all 0.3s ease",
                      boxShadow: "0 5px 15px rgba(10, 37, 64, 0.05)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-10px)";
                      e.currentTarget.style.boxShadow = `0 20px 40px rgba(10, 37, 64, 0.1)`;
                      e.currentTarget.style.borderColor = exp.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 5px 15px rgba(10, 37, 64, 0.05)";
                      e.currentTarget.style.borderColor = BLUE_COLORS.mediumGray;
                    }}
                  >
                    <div className="position-relative overflow-hidden">
                      <Card.Img
                        variant="top"
                        src={exp.image}
                        alt={exp.title}
                        style={{
                          height: "280px",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                        }}
                      />
                      <div
                        className="position-absolute top-0 start-0 m-4"
                        style={{
                          background: exp.color,
                          width: "50px",
                          height: "50px",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: `0 4px 15px ${exp.color}50`,
                        }}
                      >
                        <Icon size={20} color={BLUE_COLORS.white} />
                      </div>
                    </div>
                    <Card.Body className="p-4 d-flex flex-column">
                      <div className="mb-3">
                        <small
                          className="d-inline-block px-3 py-1 rounded-pill mb-2"
                          style={{
                            background: `${exp.color}15`,
                            color: exp.color,
                            fontSize: "0.75rem",
                            fontWeight: 600,
                          }}
                        >
                          {exp.duration}
                        </small>
                        <Card.Title
                          className="fw-bold mb-3"
                          style={{ 
                            color: BLUE_COLORS.primaryDark, 
                            fontSize: "1.5rem" 
                          }}
                        >
                          {exp.title}
                        </Card.Title>
                        <Card.Text
                          className="text-muted mb-4"
                          style={{ 
                            lineHeight: "1.7",
                            color: BLUE_COLORS.secondaryDark 
                          }}
                        >
                          {exp.description}
                        </Card.Text>
                      </div>
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted" style={{ color: BLUE_COLORS.secondaryDark }}>
                            <FaMapMarkerAlt className="me-2" style={{ color: exp.color }} />
                            {exp.location}
                          </small>
                          <Button
                            variant="outline-primary"
                            className="rounded-pill px-4"
                            style={{
                              borderColor: exp.color,
                              color: exp.color,
                              fontSize: "0.875rem",
                              fontWeight: 600,
                              transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = exp.color;
                              e.target.style.color = BLUE_COLORS.white;
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "transparent";
                              e.target.style.color = exp.color;
                            }}
                          >
                            Discover More
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-5" style={{ 
        background: `linear-gradient(135deg, ${BLUE_COLORS.primaryDark} 0%, ${BLUE_COLORS.secondaryDark} 100%)`,
      }}>
        <Container>
          <div className="text-center mb-5">
            <h6
              className="text-uppercase letter-spacing mb-3"
              style={{ 
                color: BLUE_COLORS.lightTeal, 
                letterSpacing: "3px",
                fontWeight: 600 
              }}
            >
              Must-Visit Places
            </h6>
            <h2
              className="fw-bold mb-4 text-white"
              style={{
                fontSize: "3rem",
              }}
            >
              Zanzibar's Hidden Gems
            </h2>
          </div>

          <Row className="g-4">
            {destinations.map((destination, idx) => (
              <Col lg={3} md={6} key={idx}>
                <div
                  className="position-relative overflow-hidden rounded-4"
                  style={{ height: "300px" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector('img').style.transform = "scale(1.1)";
                    e.currentTarget.querySelector('.destination-overlay').style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector('img').style.transform = "scale(1)";
                    e.currentTarget.querySelector('.destination-overlay').style.opacity = "0.8";
                  }}
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-100 h-100"
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                  />
                  <div
                    className="destination-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-4"
                    style={{
                      background: `linear-gradient(to top, ${BLUE_COLORS.primaryDark}E6, transparent)`,
                      opacity: 0.8,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <h5 className="text-white fw-bold mb-1">{destination.name}</h5>
                    <p className="text-white mb-0" style={{ opacity: 0.9 }}>{destination.description}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 my-5" style={{ backgroundColor: BLUE_COLORS.white }}>
        <Container>
          <div className="text-center mb-5">
            <h6
              className="text-uppercase letter-spacing mb-3"
              style={{ 
                color: BLUE_COLORS.accentTeal, 
                letterSpacing: "3px",
                fontWeight: 600 
              }}
            >
              Traveler Stories
            </h6>
            <h2
              className="fw-bold mb-4"
              style={{
                fontSize: "3rem",
                color: BLUE_COLORS.primaryDark,
              }}
            >
              Memories Created
            </h2>
          </div>

          <Row className="g-4">
            {testimonials.map((testimonial, idx) => (
              <Col lg={4} key={idx}>
                <Card
                  className="border-0 rounded-4 h-100"
                  style={{
                    background: BLUE_COLORS.white,
                    border: `1px solid ${BLUE_COLORS.accentTeal}20`,
                    transition: "all 0.3s ease",
                    boxShadow: "0 5px 15px rgba(10, 37, 64, 0.05)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = `0 15px 30px rgba(47, 164, 169, 0.1)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 5px 15px rgba(10, 37, 64, 0.05)";
                  }}
                >
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="rounded-circle me-3"
                        style={{ 
                          width: "60px", 
                          height: "60px", 
                          objectFit: "cover",
                          border: `2px solid ${BLUE_COLORS.accentTeal}` 
                        }}
                      />
                      <div>
                        <h6 className="mb-1" style={{ color: BLUE_COLORS.primaryDark }}>
                          {testimonial.name}
                        </h6>
                        <small className="text-muted" style={{ color: BLUE_COLORS.secondaryDark }}>
                          {testimonial.origin}
                        </small>
                      </div>
                    </div>
                    <div className="d-flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar
                          key={i}
                          style={{
                            color: BLUE_COLORS.gold,
                            marginRight: "2px",
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-muted mb-0" style={{ 
                      lineHeight: "1.7",
                      color: BLUE_COLORS.secondaryDark 
                    }}>
                      "{testimonial.text}"
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{ 
        background: `linear-gradient(135deg, ${BLUE_COLORS.accentTeal} 0%, ${BLUE_COLORS.lightTeal} 100%)`,
      }}>
        <Container>
          <Row className="align-items-center text-center">
            <Col lg={8} className="mx-auto">
              <h2 className="text-white fw-bold mb-4">
                Ready to Experience Zanzibar?
              </h2>
              <p className="text-white mb-4" style={{ opacity: 0.9, fontSize: "1.1rem" }}>
                Let us craft your perfect Zanzibar adventure. Contact us today to start planning your journey.
              </p>
              <Button
                variant="light"
                className="rounded-pill px-5 py-3 fw-semibold d-inline-flex align-items-center gap-2"
                style={{
                  background: BLUE_COLORS.white,
                  border: "none",
                  color: BLUE_COLORS.primaryDark,
                  fontSize: "1.1rem",
                  boxShadow: `0 4px 20px rgba(0, 0, 0, 0.2)`,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow = `0 8px 25px rgba(0, 0, 0, 0.25)`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = `0 4px 20px rgba(0, 0, 0, 0.2)`;
                }}
              >
                <FaCompass /> Start Your Journey Today
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
}