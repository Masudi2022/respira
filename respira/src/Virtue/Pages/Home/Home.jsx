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
  Form,
  Badge,
  Tab,
  Tabs,
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
          ? "rgba(47, 164, 169, 0.95)"
          : "rgba(47, 164, 169, 0.75)",
        backdropFilter: "blur(15px)",
        transition: "all 0.35s ease",
        borderBottom: navScrolled
          ? "1px solid rgba(255, 255, 255, 0.25)"
          : "none",
        boxShadow: navScrolled
          ? "0 6px 30px rgba(0, 0, 0, 0.25)"
          : "none",
        zIndex: 1000,
      }}
      className="py-3"
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
          <Nav className="mx-auto gap-3 gap-lg-4 fw-medium">
            {["Home", "About", "Experiences", "Destinations", "Gallery", "Contact"].map(
              (item) => (
                <Nav.Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white position-relative px-0"
                  style={{
                    fontSize: "0.95rem",
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
            className="rounded-pill px-4 fw-semibold d-flex align-items-center gap-2 mt-3 mt-lg-0"
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

// About Us Section Component
const AboutUsSection = () => {
  const values = [
    {
      icon: FaHeart,
      title: "Authentic Experiences",
      description: "We connect travelers with genuine local culture and traditions.",
      color: BLUE_COLORS.coral
    },
    {
      icon: FaShieldAlt,
      title: "Sustainable Tourism",
      description: "Committed to preserving Zanzibar's natural beauty for generations.",
      color: BLUE_COLORS.accentTeal
    },
    {
      icon: FaHandsHelping,
      title: "Community Focus",
      description: "Supporting local communities through responsible tourism.",
      color: BLUE_COLORS.gold
    },
    {
      icon: FaAward,
      title: "Excellence Guaranteed",
      description: "Award-winning service with attention to every detail.",
      color: BLUE_COLORS.lightTeal
    }
  ];

  const teamMembers = [
    {
      name: "Ali Hassan",
      role: "Founder & Guide",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Born and raised in Stone Town, Ali has been sharing Zanzibar's secrets for 15 years."
    },
    {
      name: "Fatima Juma",
      role: "Cultural Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Expert in Swahili culture and traditional arts, with a passion for storytelling."
    },
    {
      name: "David Mwamba",
      role: "Adventure Specialist",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bio: "Marine biologist and certified dive instructor with 10+ years experience."
    }
  ];

  const sustainabilityInitiatives = [
    {
      icon: FaLeafIcon,
      title: "Eco-Friendly Operations",
      description: "100% biodegradable materials and zero plastic policy",
      color: BLUE_COLORS.lightTeal
    },
    {
      icon: FaSeedling,
      title: "Reforestation Projects",
      description: "Planted 5,000+ native trees across Zanzibar",
      color: BLUE_COLORS.accentTeal
    },
    {
      icon: FaRecycle,
      title: "Waste Management",
      description: "Comprehensive recycling and composting systems",
      color: BLUE_COLORS.gold
    },
    {
      icon: FaHandsHelping,
      title: "Community Development",
      description: "30% of profits reinvested in local communities",
      color: BLUE_COLORS.coral
    }
  ];

  return (
    <section id="about" className="py-5" style={{ backgroundColor: BLUE_COLORS.white }}>
      <Container fluid className="px-4 px-lg-5">
        {/* Hero About Section */}
        <Row className="align-items-center mb-5">
          <Col lg={6} className="mb-5 mb-lg-0">
            <div className="position-relative">
              <div className="rounded-4 overflow-hidden">
               <div
  style={{
    position: "relative",
    overflow: "hidden",
    borderRadius: "20px",
  }}
>
  <img
    src="https://images.unsplash.com/photo-1628531895969-df353541bafe?auto=format&fit=crop&w=1200&q=80"
    alt="About Respira Zanzibar"
    loading="lazy"
    className="img-fluid w-100"
    style={{
      height: "600px",
      objectFit: "cover",
      objectPosition: "center",
      borderRadius: "20px",
      boxShadow: `0 20px 40px ${BLUE_COLORS.accentTeal}20`,
      transition: "transform 0.6s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.06)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
    }}
  />

  {/* Gradient overlay */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to top, rgba(10,37,64,0.55), rgba(10,37,64,0.15))",
      pointerEvents: "none",
      borderRadius: "20px",
    }}
  />
</div>

              </div>
              <div 
                className="position-absolute bottom-0 end-0 p-4 rounded-4"
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  maxWidth: "300px",
                  transform: "translate(-20px, -20px)",
                  border: `2px solid ${BLUE_COLORS.accentTeal}`
                }}
              >
                <h4 className="fw-bold mb-2" style={{ color: BLUE_COLORS.primaryDark }}>
                  <FaAward className="me-2" style={{ color: BLUE_COLORS.gold }} />
                  Since 2010
                </h4>
                <p className="mb-0" style={{ color: BLUE_COLORS.secondaryDark }}>
                  Creating unforgettable Zanzibar experiences
                </p>
              </div>
            </div>
          </Col>
          
          <Col lg={6}>
            <h6
              className="text-uppercase letter-spacing mb-3"
              style={{ 
                color: BLUE_COLORS.accentTeal, 
                letterSpacing: "3px",
                fontWeight: 600 
              }}
            >
              Our Story
            </h6>
            <h2
              className="fw-bold mb-4"
              style={{
                fontSize: "3rem",
                color: BLUE_COLORS.primaryDark,
              }}
            >
              Breathing Life into Zanzibar Travel
            </h2>
            <p className="fs-5 mb-4" style={{ 
              lineHeight: "1.8",
              color: BLUE_COLORS.secondaryDark 
            }}>
              Founded by locals with a deep passion for our island home, Respira Zanzibar was born from a simple belief: 
              tourism should breathe life into destinations, not suffocate them.
            </p>
            <div className="d-flex align-items-center mb-4">
              <div className="me-4">
                <FaQuoteLeft size={40} style={{ color: BLUE_COLORS.lightTeal, opacity: 0.7 }} />
              </div>
              <p className="fs-5 mb-0 fst-italic" style={{ 
                color: BLUE_COLORS.secondaryDark,
                borderLeft: `3px solid ${BLUE_COLORS.accentTeal}`,
                paddingLeft: "1rem"
              }}>
                "We don't just show you Zanzibar – we help you experience its soul."
              </p>
            </div>
          </Col>
        </Row>

        {/* Our Values */}
        <div className="text-center mb-5">
          <h6
            className="text-uppercase letter-spacing mb-3"
            style={{ 
              color: BLUE_COLORS.accentTeal, 
              letterSpacing: "3px",
              fontWeight: 600 
            }}
          >
            Our Promise
          </h6>
          <h2
            className="fw-bold mb-4"
            style={{
              fontSize: "2.5rem",
              color: BLUE_COLORS.primaryDark,
            }}
          >
            Core Values That Guide Us
          </h2>
        </div>

        <Row className="g-4 mb-5">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <Col lg={3} md={6} key={idx}>
                <Card
                  className="border-0 rounded-4 h-100 text-center"
                  style={{
                    background: "white",
                    transition: "all 0.4s ease",
                    border: `2px solid ${value.color}20`,
                    boxShadow: `0 10px 30px ${value.color}10`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-15px)";
                    e.currentTarget.style.boxShadow = `0 20px 40px ${value.color}20`;
                    e.currentTarget.style.borderColor = value.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 10px 30px ${value.color}10`;
                    e.currentTarget.style.borderColor = `${value.color}20`;
                  }}
                >
                  <Card.Body className="p-4 d-flex flex-column align-items-center">
                    <div
                      className="mb-4 rounded-4 d-flex align-items-center justify-content-center"
                      style={{
                        width: "80px",
                        height: "80px",
                        background: `linear-gradient(135deg, ${value.color} 0%, ${value.color}80 100%)`,
                        boxShadow: `0 8px 20px ${value.color}40`,
                      }}
                    >
                      <Icon size={32} color="white" />
                    </div>
                    <Card.Title 
                      className="fw-bold mb-3"
                      style={{ color: BLUE_COLORS.primaryDark }}
                    >
                      {value.title}
                    </Card.Title>
                    <Card.Text style={{ color: BLUE_COLORS.secondaryDark }}>
                      {value.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Sustainability Section */}
        <div className="py-5 mb-5 rounded-4" style={{ 
          background: `linear-gradient(135deg, ${BLUE_COLORS.lightTeal}15 0%, ${BLUE_COLORS.accentTeal}10 100%)`,
          border: `2px solid ${BLUE_COLORS.lightTeal}30`
        }}>
          <Container>
            <Row className="align-items-center">
              <Col lg={6} className="mb-5 mb-lg-0">
                <h6
                  className="text-uppercase letter-spacing mb-3"
                  style={{ 
                    color: BLUE_COLORS.accentTeal, 
                    letterSpacing: "3px",
                    fontWeight: 600 
                  }}
                >
                  Our Commitment
                </h6>
                <h2
                  className="fw-bold mb-4"
                  style={{
                    fontSize: "2.5rem",
                    color: BLUE_COLORS.primaryDark,
                  }}
                >
                  Sustainable Tourism Leader
                </h2>
                <p className="mb-4" style={{ 
                  lineHeight: "1.8",
                  color: BLUE_COLORS.secondaryDark,
                  fontSize: "1.1rem"
                }}>
                  We believe in leaving Zanzibar better than we found it. Our sustainability initiatives 
                  ensure that tourism supports conservation and community development.
                </p>
                <Button
                  className="rounded-pill px-4 py-3 fw-semibold d-inline-flex align-items-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${BLUE_COLORS.accentTeal} 0%, ${BLUE_COLORS.lightTeal} 100%)`,
                    border: "none",
                    color: BLUE_COLORS.white,
                    fontSize: "1rem",
                    boxShadow: `0 4px 20px ${BLUE_COLORS.accentTeal}40`,
                    transition: "all 0.3s ease",
                  }}
                >
                  <FaLeafIcon /> View Sustainability Report
                </Button>
              </Col>
              
              <Col lg={6}>
                <Row className="g-4">
                  {sustainabilityInitiatives.map((initiative, idx) => {
                    const Icon = initiative.icon;
                    return (
                      <Col md={6} key={idx}>
                        <div className="d-flex align-items-start gap-3">
                          <div
                            className="rounded-3 p-3 flex-shrink-0"
                            style={{
                              background: `${initiative.color}15`,
                              border: `1px solid ${initiative.color}30`,
                            }}
                          >
                            <Icon size={24} style={{ color: initiative.color }} />
                          </div>
                          <div>
                            <h6 className="fw-bold mb-2" style={{ color: BLUE_COLORS.primaryDark }}>
                              {initiative.title}
                            </h6>
                            <p className="mb-0 small" style={{ color: BLUE_COLORS.secondaryDark }}>
                              {initiative.description}
                            </p>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Team Section */}
        <div className="text-center mb-5">
          <h6
            className="text-uppercase letter-spacing mb-3"
            style={{ 
              color: BLUE_COLORS.accentTeal, 
              letterSpacing: "3px",
              fontWeight: 600 
            }}
          >
            Meet Our Team
          </h6>
          <h2
            className="fw-bold mb-4"
            style={{
              fontSize: "2.5rem",
              color: BLUE_COLORS.primaryDark,
            }}
          >
            Passionate Local Experts
          </h2>
          <p className="text-muted w-75 mx-auto mb-5" style={{ fontSize: "1.1rem" }}>
            Our team of dedicated professionals brings decades of experience and authentic local knowledge.
          </p>
        </div>

        <Row className="g-4">
          {teamMembers.map((member, idx) => (
            <Col lg={4} key={idx}>
              <Card
                className="border-0 rounded-4 overflow-hidden h-100"
                style={{
                  transition: "all 0.4s ease",
                  boxShadow: "0 15px 30px rgba(10, 37, 64, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = `0 25px 50px ${BLUE_COLORS.accentTeal}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 15px 30px rgba(10, 37, 64, 0.1)";
                }}
              >
                <div className="position-relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-100"
                    style={{
                      height: "300px",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                  />
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      background: `linear-gradient(to top, ${BLUE_COLORS.primaryDark} 0%, transparent 100%)`,
                      opacity: 0.3
                    }}
                  />
                </div>
                <Card.Body className="p-4 text-center">
                  <h5 className="fw-bold mb-2" style={{ color: BLUE_COLORS.primaryDark }}>
                    {member.name}
                  </h5>
                  <Badge
                    className="rounded-pill px-3 py-2 mb-3"
                    style={{
                      background: `linear-gradient(135deg, ${BLUE_COLORS.accentTeal} 0%, ${BLUE_COLORS.lightTeal} 100%)`,
                      border: "none",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                    }}
                  >
                    {member.role}
                  </Badge>
                  <p className="mb-0" style={{ color: BLUE_COLORS.secondaryDark }}>
                    {member.bio}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Statistics */}
        <Row className="mt-5 pt-5">
          <Col md={3} className="text-center mb-4">
            <div className="p-4 rounded-4" style={{ 
              background: "rgba(139, 211, 207, 0.1)",
              border: `2px solid ${BLUE_COLORS.lightTeal}30`
            }}>
              <h2 className="fw-bold mb-2" style={{ color: BLUE_COLORS.accentTeal }}>15+</h2>
              <p className="mb-0 fw-medium" style={{ color: BLUE_COLORS.primaryDark }}>Years Experience</p>
            </div>
          </Col>
          <Col md={3} className="text-center mb-4">
            <div className="p-4 rounded-4" style={{ 
              background: "rgba(139, 211, 207, 0.1)",
              border: `2px solid ${BLUE_COLORS.lightTeal}30`
            }}>
              <h2 className="fw-bold mb-2" style={{ color: BLUE_COLORS.accentTeal }}>98%</h2>
              <p className="mb-0 fw-medium" style={{ color: BLUE_COLORS.primaryDark }}>Satisfaction Rate</p>
            </div>
          </Col>
          <Col md={3} className="text-center mb-4">
            <div className="p-4 rounded-4" style={{ 
              background: "rgba(139, 211, 207, 0.1)",
              border: `2px solid ${BLUE_COLORS.lightTeal}30`
            }}>
              <h2 className="fw-bold mb-2" style={{ color: BLUE_COLORS.accentTeal }}>50+</h2>
              <p className="mb-0 fw-medium" style={{ color: BLUE_COLORS.primaryDark }}>Local Partners</p>
            </div>
          </Col>
          <Col md={3} className="text-center mb-4">
            <div className="p-4 rounded-4" style={{ 
              background: "rgba(139, 211, 207, 0.1)",
              border: `2px solid ${BLUE_COLORS.lightTeal}30`
            }}>
              <h2 className="fw-bold mb-2" style={{ color: BLUE_COLORS.accentTeal }}>12</h2>
              <p className="mb-0 fw-medium" style={{ color: BLUE_COLORS.primaryDark }}>Awards Won</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
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
      image: "https://images.unsplash.com/photo-1575992042651-e35f5a391252?auto=format&fit=crop&w=1200&q=80",
      icon: FaShip,
      color: BLUE_COLORS.gold,
      rating: 4.9,
      reviews: 128
    },
    {
      id: 2,
      title: "Stone Town Heritage Walk",
      description: "Immerse yourself in the rich history of this UNESCO World Heritage site with its ancient architecture.",
      location: "Stone Town",
      duration: "Cultural Journey",
      image: "https://images.unsplash.com/photo-1667650708785-2179a8eb2b70?auto=format&fit=crop&w=1200&q=80",
      icon: FaCity,
      color: BLUE_COLORS.accentTeal,
      rating: 4.8,
      reviews: 94
    },
    {
      id: 3,
      title: "Mnemba Marine Discovery",
      description: "Crystal clear waters reveal vibrant coral gardens and diverse marine ecosystems waiting to be explored.",
      location: "Mnemba Atoll",
      duration: "Full Day Adventure",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: FaFish,
      color: BLUE_COLORS.lightTeal,
      rating: 5.0,
      reviews: 156
    },
    {
      id: 4,
      title: "Spice Garden Sensory Tour",
      description: "Discover Zanzibar's spice heritage through guided tours of aromatic plantations and gardens.",
      location: "Central Plantations",
      duration: "Sensory Experience",
      image: "https://images.unsplash.com/photo-1760284592626-27a0b458d929?auto=format&fit=crop&w=1200&q=80",
      icon: FaLeaf,
      color: BLUE_COLORS.accentTeal,
      rating: 4.7,
      reviews: 87
    },
    {
      id: 5,
      title: "Jozani Forest Sanctuary",
      description: "Encounter rare red colobus monkeys in their natural habitat within this protected forest reserve.",
      location: "Jozani Chwaka Bay",
      duration: "Wildlife Encounter",
      image: "https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: FaTree,
      color: BLUE_COLORS.lightTeal,
      rating: 4.9,
      reviews: 112
    },
    {
      id: 6,
      title: "Pristine Beach Retreat",
      description: "Relax on untouched white sand beaches with turquoise waters and swaying palm trees.",
      location: "Paje Beach",
      duration: "Day Retreat",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: FaUmbrellaBeach,
      color: BLUE_COLORS.gold,
      rating: 4.6,
      reviews: 73
    },
  ];

  const destinations = [
    {
      name: "Stone Town",
      description: "Historic UNESCO site",
      image: "https://images.unsplash.com/photo-1516496636080-14fb876e029d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: BLUE_COLORS.accentTeal,
      experiences: 12
    },
    {
      name: "Nungwi Beach",
      description: "Pristine white sands",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: BLUE_COLORS.lightTeal,
      experiences: 8
    },
    {
      name: "Mnemba Island",
      description: "Coral paradise",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: BLUE_COLORS.gold,
      experiences: 6
    },
    {
      name: "Jozani Forest",
      description: "Wildlife sanctuary",
      image: "https://images.unsplash.com/photo-1550358864-518f202c02ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: BLUE_COLORS.accentTeal,
      experiences: 4
    }
  ];

  const testimonials = [
    {
      name: "Sophia & James",
      text: "Respira crafted the most magical honeymoon experience. Every detail was perfect, from the private beach dinners to the cultural insights.",
      origin: "London, UK",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 5,
      trip: "Honeymoon Special"
    },
    {
      name: "The Chen Family",
      text: "Our family adventure with Respira was beyond expectations. The kids loved the marine life, and we appreciated the sustainable approach.",
      origin: "Singapore",
      image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 5,
      trip: "Family Adventure"
    },
    {
      name: "Maya Rodriguez",
      text: "As a solo traveler, I felt completely safe and cared for. The local guides shared incredible stories that brought Zanzibar to life.",
      origin: "Barcelona, Spain",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 5,
      trip: "Solo Explorer"
    }
  ];

  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "2"
  });

  const [activeTab, setActiveTab] = useState("stays");

  const scrollToContent = () => {
    const element = document.getElementById('experiences');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        backgroundColor: BLUE_COLORS.lightGray,
        minHeight: "100vh",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        overflowX: "hidden",
      }}
    >
      <Header />

      {/* Hero Section - Full Width Design */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          paddingTop: "80px",
        }}
      >
        {/* Background Carousel - Full Width */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
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
                    backgroundImage: `linear-gradient(rgba(10, 37, 64, 0.85), rgba(15, 23, 42, 0.9)), url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    height: "100vh",
                    width: "100vw",
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* Hero Content - Full Width Container */}
        <div
          className="h-100 d-flex align-items-center"
          style={{
            position: "relative",
            zIndex: 2,
            paddingTop: "60px",
            paddingBottom: "40px",
            width: "100vw",
            maxWidth: "100%",
          }}
        >
          <div className="container-fluid px-0">
            <div className="row align-items-center g-0">
              {/* Left Column - Main Content - Full Width Background Effect */}
              <div className="col-12 col-lg-7">
                <div 
                  className="h-100 d-flex align-items-center"
                  style={{
                    padding: "4rem 2rem 4rem 5vw",
                    background: "linear-gradient(90deg, rgba(10, 37, 64, 0.8) 0%, rgba(10, 37, 64, 0.6) 50%, rgba(10, 37, 64, 0) 100%)",
                  }}
                >
                  <div className="max-content-width">
                    <div className="mb-4 mb-lg-5">
                      <h6
                        className="text-uppercase letter-spacing d-inline-block px-3 py-2 rounded-pill mb-4"
                        style={{
                          background: "rgba(47, 164, 169, 0.25)",
                          color: BLUE_COLORS.lightTeal,
                          fontSize: "0.875rem",
                          letterSpacing: "2px",
                          fontWeight: 600,
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(139, 211, 207, 0.3)",
                        }}
                      >
                        <FaCompass className="me-2" /> Welcome to Paradise
                      </h6>
                      
                      <h1
                        className="display-3 display-lg-1 fw-bold mb-4"
                        style={{
                          lineHeight: "1.1",
                          color: BLUE_COLORS.white,
                          textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                        }}
                      >
                        Discover the Magic
                        <br />
                        of <span style={{ color: BLUE_COLORS.lightTeal }}>Zanzibar</span>
                      </h1>
                      
                      <p
                        className="fs-4 fs-lg-5 mb-4 mb-lg-5"
                        style={{
                          maxWidth: "600px",
                          lineHeight: "1.8",
                          color: "rgba(255, 255, 255, 0.95)",
                          fontWeight: 300,
                          textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                        }}
                      >
                        Where turquoise waters meet ancient traditions. Experience the
                        magic of the Spice Islands through curated journeys that
                        connect you with authentic culture and breathtaking nature.
                      </p>
                      
                      <div className="d-flex flex-wrap gap-3 mt-4">
                        <Button
                          href="#experiences"
                          className="rounded-pill px-4 px-lg-5 py-3 fw-semibold d-flex align-items-center gap-2"
                          style={{
                            background: `linear-gradient(135deg, ${BLUE_COLORS.accentTeal} 0%, ${BLUE_COLORS.lightTeal} 100%)`,
                            border: "none",
                            color: BLUE_COLORS.white,
                            fontSize: "1rem",
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
                          variant="outline-light"
                          className="rounded-pill px-4 px-lg-5 py-3 fw-semibold d-flex align-items-center gap-2"
                          style={{
                            borderColor: BLUE_COLORS.lightTeal,
                            color: BLUE_COLORS.lightTeal,
                            fontSize: "1rem",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "rgba(139, 211, 207, 0.15)";
                            e.target.style.transform = "translateY(-3px)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.transform = "translateY(0)";
                          }}
                        >
                          <FaPlay className="me-2" /> Watch Tour
                        </Button>
                      </div>
                    </div>

                    {/* Stats - Hidden on small screens, shown on medium and up */}
                    <div className="d-none d-md-block mt-5 pt-3">
                      <div className="row g-3">
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-3">
                            <div style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "12px",
                              background: "rgba(139, 211, 207, 0.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "1px solid rgba(139, 211, 207, 0.3)",
                            }}>
                              <FaStar size={20} color={BLUE_COLORS.lightTeal} />
                            </div>
                            <div>
                              <h3 className="fw-bold mb-0 text-white">4.9</h3>
                              <small className="text-white" style={{ opacity: 0.9 }}>Rating</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-3">
                            <div style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "12px",
                              background: "rgba(139, 211, 207, 0.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "1px solid rgba(139, 211, 207, 0.3)",
                            }}>
                              <FaUsers size={20} color={BLUE_COLORS.lightTeal} />
                            </div>
                            <div>
                              <h3 className="fw-bold mb-0 text-white">2K+</h3>
                              <small className="text-white" style={{ opacity: 0.9 }}>Travelers</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex align-items-center gap-3">
                            <div style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "12px",
                              background: "rgba(139, 211, 207, 0.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "1px solid rgba(139, 211, 207, 0.3)",
                            }}>
                              <FaMapMarkerAlt size={20} color={BLUE_COLORS.lightTeal} />
                            </div>
                            <div>
                              <h3 className="fw-bold mb-0 text-white">50+</h3>
                              <small className="text-white" style={{ opacity: 0.9 }}>Destinations</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Search Card - Floating on the right */}
              <div className="col-12 col-lg-5 d-flex justify-content-lg-end">
                <div 
                  className="h-100 d-flex align-items-center"
                  style={{
                    padding: "2rem",
                  }}
                >
                  <div 
                    className="sticky-lg-top" 
                    style={{ 
                      top: "100px",
                      maxWidth: "450px",
                      width: "100%",
                    }}
                  >
                    <Card
                      className="border-0 rounded-4 shadow-lg"
                      style={{
                        background: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        overflow: "hidden",
                      }}
                    >
                      {/* Tab Navigation */}
                      <div className="d-flex border-bottom" style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
                        {["stays", "experiences", "tours"].map((tab) => (
                          <Button
                            key={tab}
                            variant="link"
                            className={`flex-fill text-decoration-none text-center py-3 fw-semibold ${activeTab === tab ? 'text-white' : 'text-white-50'}`}
                            style={{
                              background: activeTab === tab ? "rgba(47, 164, 169, 0.3)" : "transparent",
                              border: "none",
                              fontSize: "0.9rem",
                              letterSpacing: "0.5px",
                              transition: "all 0.3s ease",
                            }}
                            onClick={() => setActiveTab(tab)}
                            onMouseEnter={(e) => {
                              if (activeTab !== tab) {
                                e.target.style.color = BLUE_COLORS.white;
                                e.target.style.background = "rgba(255, 255, 255, 0.1)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (activeTab !== tab) {
                                e.target.style.color = "rgba(255, 255, 255, 0.5)";
                                e.target.style.background = "transparent";
                              }
                            }}
                          >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                          </Button>
                        ))}
                      </div>

                      <Card.Body className="p-4">
                        <h5 className="text-white fw-bold mb-4">
                          <FaSearch className="me-2" />
                          Find Your Perfect Journey
                        </h5>
                        
                        <Form>
                          <Form.Group className="mb-4">
                            <Form.Label className="text-white mb-2 small">
                              <FaMapMarkerAlt className="me-2" />
                              Destination
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Where do you want to go?"
                              value={searchData.destination}
                              onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                              className="rounded-pill py-3"
                              style={{
                                background: "rgba(255, 255, 255, 0.1)",
                                border: "1px solid rgba(255, 255, 255, 0.3)",
                                color: BLUE_COLORS.white,
                              }}
                            />
                          </Form.Group>

                          <div className="row g-3 mb-4">
                            <div className="col-md-6">
                              <Form.Group>
                                <Form.Label className="text-white mb-2 small">
                                  <FaCalendar className="me-2" />
                                  Check In
                                </Form.Label>
                                <Form.Control
                                  type="date"
                                  value={searchData.checkIn}
                                  onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                                  className="rounded-pill py-3"
                                  style={{
                                    background: "rgba(255, 255, 255, 0.1)",
                                    border: "1px solid rgba(255, 255, 255, 0.3)",
                                    color: BLUE_COLORS.white,
                                  }}
                                />
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group>
                                <Form.Label className="text-white mb-2 small">
                                  <FaCalendar className="me-2" />
                                  Check Out
                                </Form.Label>
                                <Form.Control
                                  type="date"
                                  value={searchData.checkOut}
                                  onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                                  className="rounded-pill py-3"
                                  style={{
                                    background: "rgba(255, 255, 255, 0.1)",
                                    border: "1px solid rgba(255, 255, 255, 0.3)",
                                    color: BLUE_COLORS.white,
                                  }}
                                />
                              </Form.Group>
                            </div>
                          </div>

                          <Form.Group className="mb-4">
                            <Form.Label className="text-white mb-2 small">
                              <FaUsers className="me-2" />
                              Guests
                            </Form.Label>
                            <div className="d-flex align-items-center">
                              <Button
                                variant="outline-light"
                                className="rounded-circle p-2"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderColor: "rgba(255, 255, 255, 0.3)",
                                  color: BLUE_COLORS.white,
                                }}
                              >
                                -
                              </Button>
                              <div className="mx-3 text-white fw-bold">{searchData.guests}</div>
                              <Button
                                variant="outline-light"
                                className="rounded-circle p-2"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderColor: "rgba(255, 255, 255, 0.3)",
                                  color: BLUE_COLORS.white,
                                }}
                              >
                                +
                              </Button>
                            </div>
                          </Form.Group>

                          <Button
                            className="w-100 rounded-pill py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                            style={{
                              background: `linear-gradient(135deg, ${BLUE_COLORS.accentTeal} 0%, ${BLUE_COLORS.lightTeal} 100%)`,
                              border: "none",
                              fontSize: "1rem",
                              transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = "translateY(-2px)";
                              e.target.style.boxShadow = `0 8px 25px ${BLUE_COLORS.accentTeal}60`;
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = "translateY(0)";
                              e.target.style.boxShadow = "none";
                            }}
                          >
                            <FaSearch /> Search Experiences
                          </Button>
                        </Form>
                      </Card.Body>

                      <Card.Footer className="border-0 p-3" style={{ background: "rgba(255, 255, 255, 0.05)" }}>
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-white-50">
                            <FaHeart className="me-2" style={{ color: BLUE_COLORS.coral }} />
                            Best Price Guarantee
                          </small>
                          <small className="text-white-50">
                            24/7 Support
                          </small>
                        </div>
                      </Card.Footer>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator - Only on large screens */}
        <div 
          className="d-none d-lg-block position-absolute bottom-0 start-50 translate-middle-x mb-4"
          style={{ zIndex: 3 }}
        >
          <Button
            variant="link"
            onClick={scrollToContent}
            className="text-decoration-none d-flex flex-column align-items-center"
            style={{
              color: BLUE_COLORS.lightTeal,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(5px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
            }}
          >
            <span className="mb-2" style={{ fontSize: "0.875rem", opacity: 0.9 }}>Explore More</span>
            <FaChevronDown className="animate-bounce" />
          </Button>
        </div>

        {/* Mobile Stats Bar - Shows only on small screens */}
        <div className="d-block d-md-none position-absolute bottom-0 start-0 w-100 py-3" 
          style={{
            background: "rgba(15, 23, 42, 0.8)",
            backdropFilter: "blur(10px)",
            zIndex: 3,
            borderTop: "1px solid rgba(139, 211, 207, 0.2)",
          }}
        >
          <div className="container">
            <div className="row g-2">
              <div className="col-4 text-center">
                <div className="text-white">
                  <h5 className="fw-bold mb-1">4.9</h5>
                  <small style={{ opacity: 0.8 }}>Rating</small>
                </div>
              </div>
              <div className="col-4 text-center">
                <div className="text-white">
                  <h5 className="fw-bold mb-1">2K+</h5>
                  <small style={{ opacity: 0.8 }}>Travelers</small>
                </div>
              </div>
              <div className="col-4 text-center">
                <div className="text-white">
                  <h5 className="fw-bold mb-1">50+</h5>
                  <small style={{ opacity: 0.8 }}>Destinations</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <AboutUsSection />

      {/* Experiences Section - Enhanced */}
      <section id="experiences" className="py-5" style={{ 
        backgroundColor: BLUE_COLORS.white,
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="position-absolute top-0 end-0 w-50 h-50"
          style={{
            background: `radial-gradient(circle, ${BLUE_COLORS.lightTeal}10 0%, transparent 70%)`,
            opacity: 0.5
          }}
        />
        <Container fluid className="px-4 px-lg-5 position-relative">
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

          <Tabs
            defaultActiveKey="all"
            className="mb-5 justify-content-center border-0"
            style={{
              borderBottom: `2px solid ${BLUE_COLORS.mediumGray}`,
            }}
          >
            <Tab eventKey="all" title="All Experiences" />
            <Tab eventKey="adventure" title="Adventure" />
            <Tab eventKey="culture" title="Culture" />
            <Tab eventKey="relaxation" title="Relaxation" />
            <Tab eventKey="wildlife" title="Wildlife" />
          </Tabs>

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
                      <div className="position-absolute top-0 end-0 m-4">
                        <Badge
                          className="rounded-pill px-3 py-2"
                          style={{
                            background: "rgba(255, 255, 255, 0.9)",
                            color: BLUE_COLORS.primaryDark,
                            fontWeight: 600,
                            backdropFilter: "blur(10px)",
                          }}
                        >
                          <FaStar className="me-1" style={{ color: BLUE_COLORS.gold }} />
                          {exp.rating} ({exp.reviews})
                        </Badge>
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
                          <FaClock className="me-1" /> {exp.duration}
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
                            From $89
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>

          <div className="text-center mt-5">
            <Button
              variant="outline-primary"
              className="rounded-pill px-5 py-3 fw-semibold"
              style={{
                borderColor: BLUE_COLORS.accentTeal,
                color: BLUE_COLORS.accentTeal,
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = BLUE_COLORS.accentTeal;
                e.target.style.color = BLUE_COLORS.white;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = BLUE_COLORS.accentTeal;
              }}
            >
              View All Experiences →
            </Button>
          </div>
        </Container>
      </section>

      {/* Destinations Section - Enhanced */}
      <section id="destinations" className="py-5" style={{ 
        background: `linear-gradient(135deg, ${BLUE_COLORS.primaryDark} 0%, ${BLUE_COLORS.secondaryDark} 100%)`,
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="position-absolute top-0 start-0 w-50 h-50"
          style={{
            background: `radial-gradient(circle, ${BLUE_COLORS.lightTeal}20 0%, transparent 70%)`,
            opacity: 0.3
          }}
        />
        <Container fluid className="px-0 position-relative">
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
            <p className="text-white-75 w-75 mx-auto" style={{ fontSize: "1.1rem" }}>
              Discover the diverse landscapes and rich culture that make Zanzibar truly special
            </p>
          </div>

          <Row className="g-0">
            {destinations.map((destination, idx) => (
              <Col lg={3} md={6} key={idx} className="px-0">
                <div
                  className="position-relative overflow-hidden"
                  style={{ height: "400px" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector('img').style.transform = "scale(1.1)";
                    e.currentTarget.querySelector('.destination-overlay').style.opacity = "1";
                    e.currentTarget.querySelector('.destination-experiences').style.bottom = "20px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector('img').style.transform = "scale(1)";
                    e.currentTarget.querySelector('.destination-overlay').style.opacity = "0.8";
                    e.currentTarget.querySelector('.destination-experiences').style.bottom = "-100px";
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
                    <p className="text-white mb-3" style={{ opacity: 0.9 }}>{destination.description}</p>
                    
                    <div 
                      className="destination-experiences position-absolute start-4"
                      style={{
                        bottom: "-100px",
                        transition: "bottom 0.3s ease",
                      }}
                    >
                      <Badge
                        className="rounded-pill px-3 py-2"
                        style={{
                          background: "rgba(255, 255, 255, 0.2)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.3)",
                        }}
                      >
                        <FaCompass className="me-2" />
                        {destination.experiences} Experiences
                      </Badge>
                    </div>
                    
                    <Button
                      variant="outline-light"
                      className="rounded-pill px-4 align-self-start"
                      size="sm"
                      style={{
                        borderColor: "rgba(255, 255, 255, 0.5)",
                        color: "white",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                        e.target.style.borderColor = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
                      }}
                    >
                      Explore
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section className="py-5" style={{ 
        backgroundColor: BLUE_COLORS.white,
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="position-absolute bottom-0 start-0 w-50 h-50"
          style={{
            background: `radial-gradient(circle, ${BLUE_COLORS.accentTeal}05 0%, transparent 70%)`,
            opacity: 0.5
          }}
        />
        <Container fluid className="px-4 px-lg-5 position-relative">
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
            <p className="text-muted w-75 mx-auto" style={{ fontSize: "1.1rem" }}>
              Hear from travelers who have experienced the magic of Zanzibar with us
            </p>
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
                  <Card.Body className="p-4 d-flex flex-column">
                    <div className="mb-4">
                      <div className="d-flex align-items-center mb-3">
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
                      <Badge
                        className="rounded-pill px-3 py-1 mb-3"
                        style={{
                          background: `${BLUE_COLORS.accentTeal}15`,
                          color: BLUE_COLORS.accentTeal,
                          fontSize: "0.75rem",
                          fontWeight: 500,
                        }}
                      >
                        {testimonial.trip}
                      </Badge>
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
                    <p className="text-muted mb-4 flex-grow-1" style={{ 
                      lineHeight: "1.7",
                      color: BLUE_COLORS.secondaryDark,
                      fontSize: "0.95rem"
                    }}>
                      <FaQuoteLeft className="me-2" style={{ color: BLUE_COLORS.lightTeal, opacity: 0.5 }} />
                      {testimonial.text}
                    </p>
                    <div className="d-flex align-items-center justify-content-between border-top pt-3">
                      <small className="text-muted">
                        <FaCalendar className="me-1" />
                        Jan 2024
                      </small>
                      <small className="text-muted">
                        <FaCheckCircle className="me-1" style={{ color: BLUE_COLORS.accentTeal }} />
                        Verified Stay
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-5" style={{ 
        background: `linear-gradient(135deg, ${BLUE_COLORS.accentTeal} 0%, ${BLUE_COLORS.lightTeal} 100%)`,
        position: "relative",
        overflow: "hidden"
      }}>
        <div className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1
          }}
        />
        <Container fluid className="px-4 px-lg-5 position-relative">
          <Row className="align-items-center text-center py-5">
            <Col lg={8} className="mx-auto">
              <div className="p-5 rounded-4" style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}>
                <h2 className="text-white fw-bold mb-4 display-5">
                  Ready to Experience Zanzibar?
                </h2>
                <p className="text-white mb-4 fs-5" style={{ opacity: 0.9 }}>
                  Let us craft your perfect Zanzibar adventure. Contact us today to start planning your journey.
                </p>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <Button
                    variant="light"
                    className="rounded-pill px-5 py-3 fw-semibold d-flex align-items-center gap-2"
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
                  <Button
                    variant="outline-light"
                    className="rounded-pill px-5 py-3 fw-semibold"
                    style={{
                      borderWidth: "2px",
                      fontSize: "1.1rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                    }}
                  >
                    Request Custom Quote
                  </Button>
                </div>
                <p className="text-white mt-4 mb-0" style={{ opacity: 0.8, fontSize: "0.9rem" }}>
                  <FaCheckCircle className="me-2" />
                  Free consultation · Best price guarantee · 24/7 support
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

// Add CSS for animations
const styles = `
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
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
  
  .animate-bounce {
    animation: bounce 2s infinite;
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-pulse {
    animation: pulse 2s ease-in-out infinite;
  }
  
  .max-content-width {
    max-width: 800px;
  }
  
  .experience-card:hover .card-img {
    transform: scale(1.05);
  }
  
  .nav-underline {
    transition: width 0.3s ease;
  }
  
  .letter-spacing {
    letter-spacing: 3px;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${BLUE_COLORS.lightGray};
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, ${BLUE_COLORS.accentTeal} 0%, ${BLUE_COLORS.lightTeal} 100%);
    border-radius: 5px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, ${BLUE_COLORS.lightTeal} 0%, ${BLUE_COLORS.accentTeal} 100%);
  }
  
  /* Gradient text */
  .gradient-text {
    background: linear-gradient(135deg, ${BLUE_COLORS.accentTeal} 0%, ${BLUE_COLORS.lightTeal} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

// Add styles to document head
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);