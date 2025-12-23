import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, Modal, Button } from "react-bootstrap";
import {
  FaUsers,
  FaShieldAlt,
  FaCompass,
  FaSmile,
  FaAward,
  FaPlayCircle,
  FaClock,
  FaBook,
  FaCamera,
  FaMapMarkerAlt,
  FaFlag,
  FaBuilding,
  FaHandshake,
  FaHistory,
  FaWater,
  FaLeaf,
  FaUsersCog,
  FaChartLine,
  FaHandsHelping,
  FaChevronRight,
  FaChevronLeft,
  FaQuoteLeft,
  FaQuoteRight
} from "react-icons/fa";

const PRIMARY = "#2FB6A6";
const PRIMARY_LIGHT = "#4ECDC4";
const PRIMARY_DARK = "#1A998E";
const SECONDARY = "#FF7E5F";
const SECONDARY_LIGHT = "#FF9F7F";
const ACCENT = "#3A4F6D";
const BG_LIGHT = "#F9FDFC";

// Inject custom styles
const injectStyles = () => {
  const styleId = 'about-styles';
  if (document.getElementById(styleId)) return;
  
  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.innerHTML = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    .gradient-text {
      background: linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_DARK}, ${PRIMARY});
      background-size: 200% auto;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 3s linear infinite;
    }
  `;
  document.head.appendChild(styleElement);
};

export default function AboutUs() {
  const [showVideo, setShowVideo] = useState(false);
  const [screenSize, setScreenSize] = useState("desktop");
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [currentValueIndex, setCurrentValueIndex] = useState(0);

  useEffect(() => {
    injectStyles();
    
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setScreenSize("mobile");
      else if (width < 1200) setScreenSize("tablet");
      else setScreenSize("desktop");
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenSize === "mobile";
  const isTablet = screenSize === "tablet";

  const stats = [
    { 
      icon: <FaUsers size={isMobile ? 28 : 40} />, 
      label: "People Served", 
      value: "10K+", 
      description: "Visitors engaged" 
    },
    { 
      icon: <FaCompass size={isMobile ? 28 : 40} />, 
      label: "Experiences", 
      value: "50+", 
      description: "Cultural & nature based" 
    },
    { 
      icon: <FaShieldAlt size={isMobile ? 28 : 40} />, 
      label: "Years", 
      value: "14+", 
      description: "Continuous dedication" 
    },
    { 
      icon: <FaSmile size={isMobile ? 28 : 40} />, 
      label: "Rating", 
      value: "4.9/5", 
      description: "Public reviews" 
    }
  ];

  const team = [
    {
      name: "Ali Hassan",
      role: "Founder & Cultural Guide",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
      bio: "Born in Stone Town, Ali has 20+ years documenting Zanzibar's history, architecture, and traditions.",
      specialty: "History & Cultural Preservation",
      experience: "20+ years",
      expertise: ["Historical Documentation", "Cultural Storytelling", "Architectural Heritage"],
      teamIcon: <FaHistory />
    },
    {
      name: "Fatima Mohammed",
      role: "Marine Specialist",
      image: "https://images.unsplash.com/photo-1494790108755-2616b786d4d5?auto=format&fit=crop&w=400&h=400&q=80",
      bio: "Marine biologist leading conservation initiatives and educational programs on sustainable ocean practices.",
      specialty: "Marine Ecology",
      experience: "12+ years",
      expertise: ["Coral Reefs", "Marine Education", "Eco-Tourism"],
      teamIcon: <FaWater />
    },
    {
      name: "James Wilson",
      role: "Nature Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80",
      bio: "Former park ranger collaborating with communities to protect Zanzibar's unique biodiversity.",
      specialty: "Wildlife Conservation",
      experience: "15+ years",
      expertise: ["Wildlife Monitoring", "Habitat Protection", "Community Engagement"],
      teamIcon: <FaLeaf />
    }
  ];

  const values = [
    { 
      icon: <FaBook />, 
      title: "Authentic Documentation", 
      description: "Accurate information sourced from local knowledge and verified research.",
      quote: "We believe in preserving truth through meticulous documentation of Zanzibar's heritage."
    },
    { 
      icon: <FaHandshake />, 
      title: "Community Collaboration", 
      description: "Ensuring local voices and perspectives are properly represented.",
      quote: "True preservation happens when communities are active participants in their own story."
    },
    { 
      icon: <FaFlag />, 
      title: "Cultural Integrity", 
      description: "Preserving heritage with authenticity and respect for traditions.",
      quote: "Cultural integrity means honoring traditions while sharing them with the world."
    },
    { 
      icon: <FaCamera />, 
      title: "Transparent Storytelling", 
      description: "Sharing genuine experiences without commercial bias.",
      quote: "Our stories reflect reality, not curated perfection."
    }
  ];

  const timeline = [
    { year: "2010", event: "Founded", description: "Started documenting Stone Town", icon: <FaBuilding /> },
    { year: "2013", event: "Expanded", description: "Marine conservation work", icon: <FaWater /> },
    { year: "2016", event: "Team Growth", description: "Added conservation specialists", icon: <FaUsersCog /> },
    { year: "2019", event: "Award", description: "Heritage preservation award", icon: <FaAward /> },
    { year: "2023", event: "Current", description: "Ongoing community work", icon: <FaChartLine /> }
  ];

  const nextTeamMember = () => {
    setCurrentTeamIndex((prev) => (prev + 1) % team.length);
  };

  const prevTeamMember = () => {
    setCurrentTeamIndex((prev) => (prev - 1 + team.length) % team.length);
  };

  const nextValue = () => {
    setCurrentValueIndex((prev) => (prev + 1) % values.length);
  };

  const prevValue = () => {
    setCurrentValueIndex((prev) => (prev - 1 + values.length) % values.length);
  };

  return (
    <div style={{ 
      background: `linear-gradient(180deg, #ffffff 0%, ${BG_LIGHT} 100%)`,
      minHeight: "100vh",
      color: "#333",
      fontFamily: "'Inter', -apple-system, sans-serif",
      fontSize: isMobile ? "14px" : "16px"
    }}>
      
      {/* HERO SECTION */}
      <section
        style={{
          padding: isMobile ? "80px 0 50px" : isTablet ? "120px 0 70px" : "140px 0 90px",
          background: `
            linear-gradient(135deg, 
              rgba(0, 0, 0, 0.8) 0%, 
              rgba(47, 182, 166, 0.6) 100%
            ),
            url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2070&q=80')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Container style={{ position: "relative", zIndex: 2 }}>
          <Badge 
            pill 
            style={{
              background: `rgba(255, 255, 255, 0.2)`,
              backdropFilter: "blur(10px)",
              padding: isMobile ? "8px 16px" : "10px 24px",
              fontSize: isMobile ? "0.75rem" : "0.85rem",
              fontWeight: 600,
              letterSpacing: "1px",
              border: "1px solid rgba(255,255,255,0.3)",
              marginBottom: "20px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <FaCompass /> ABOUT OUR JOURNEY
          </Badge>

          <h1 style={{ 
            fontWeight: 800, 
            fontSize: isMobile ? "1.8rem" : isTablet ? "2.5rem" : "3rem",
            marginTop: "12px",
            marginBottom: "16px",
            lineHeight: 1.2
          }}>
            Preserving Zanzibar's
            <br />
            <span style={{ 
              background: `linear-gradient(135deg, ${SECONDARY}, ${SECONDARY_LIGHT})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Heritage & Nature
            </span>
          </h1>

          <p style={{ 
            maxWidth: isMobile ? "100%" : "650px", 
            margin: "16px auto 24px", 
            fontSize: isMobile ? "0.9rem" : "1rem",
            lineHeight: 1.6,
            opacity: 0.9,
            padding: isMobile ? "0 16px" : "0"
          }}>
            A dedicated team focused on documenting, preserving, and sharing 
            Zanzibar's rich cultural heritage and natural beauty through authentic 
            storytelling and community collaboration.
          </p>

          <div style={{ 
            display: "flex", 
            gap: isMobile ? "10px" : "12px", 
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "24px"
          }}>
            <Button
              onClick={() => document.getElementById("our-story").scrollIntoView({ behavior: "smooth" })}
              style={{
                background: SECONDARY,
                border: "none",
                padding: isMobile ? "10px 20px" : "12px 28px",
                borderRadius: "50px",
                fontWeight: 700,
                fontSize: isMobile ? "0.85rem" : "0.9rem",
                color: "white",
                boxShadow: "0 6px 16px rgba(255, 126, 95, 0.3)"
              }}
              className="hover-lift"
            >
              Explore Our Story
            </Button>
            
            <Button
              onClick={() => setShowVideo(true)}
              variant="outline-light"
              style={{
                background: "transparent",
                border: "2px solid white",
                padding: isMobile ? "10px 20px" : "12px 28px",
                borderRadius: "50px",
                fontWeight: 700,
                fontSize: isMobile ? "0.85rem" : "0.9rem",
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
              className="hover-lift"
            >
              <FaPlayCircle size={14} /> Watch Journey
            </Button>
          </div>
        </Container>
      </section>

      {/* OUR STORY SECTION */}
      <section id="our-story" style={{ 
        padding: isMobile ? "50px 0" : isTablet ? "70px 0" : "90px 0", 
        background: "#ffffff" 
      }}>
        <Container>
          <div className="text-center mb-4">
            <Badge 
              pill 
              style={{ 
                background: `${PRIMARY}10`, 
                color: PRIMARY,
                padding: isMobile ? "6px 14px" : "8px 20px",
                fontSize: isMobile ? "0.7rem" : "0.8rem",
                fontWeight: 600,
                marginBottom: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              <FaHistory size={12} /> OUR BACKGROUND
            </Badge>
            <h2 style={{ 
              fontWeight: 800, 
              fontSize: isMobile ? "1.5rem" : isTablet ? "1.9rem" : "2.2rem",
              marginBottom: "12px",
              color: ACCENT
            }}>
              From Local Initiative to
              <br />
              <span style={{ color: PRIMARY }}>Heritage Stewards</span>
            </h2>
          </div>

          <Row className="align-items-center g-4">
            <Col lg={6}>
              <div style={{ position: "relative", padding: isMobile ? "16px 0" : "0" }}>
                <img
                  src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80"
                  alt="Zanzibar cultural heritage"
                  style={{
                    width: "100%",
                    borderRadius: "16px",
                    boxShadow: "0 16px 32px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s ease"
                  }}
                  className="hover-scale"
                />
              </div>
            </Col>

            <Col lg={6}>
              <div style={{ padding: isMobile ? "16px 0" : "0 0 0 24px" }}>
                <div style={{ 
                  borderLeft: `3px solid ${PRIMARY}`,
                  paddingLeft: isMobile ? "12px" : "16px",
                  marginBottom: "16px"
                }}>
                  <p style={{ 
                    fontSize: isMobile ? "0.9rem" : "1rem", 
                    color: "#555", 
                    lineHeight: 1.6,
                    marginBottom: "12px"
                  }}>
                    Our journey began in 2010 as a small local initiative focused on 
                    documenting the everyday life, historical landmarks, and natural 
                    environments across Zanzibar.
                  </p>
                  
                  <p style={{ 
                    fontSize: isMobile ? "0.9rem" : "1rem", 
                    color: "#555", 
                    lineHeight: 1.6 
                  }}>
                    Today, we collaborate with historians, marine biologists, conservationists, 
                    and local communities to ensure that Zanzibar's stories are told 
                    authentically and preserved for future generations.
                  </p>
                </div>

                {/* Timeline Preview */}
                <div style={{
                  background: `${PRIMARY}05`,
                  borderRadius: "12px",
                  padding: "16px",
                  marginTop: "20px"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "10px"
                  }}>
                    <FaClock color={PRIMARY} size={12} />
                    <h5 style={{ fontWeight: 700, margin: 0, color: PRIMARY, fontSize: "0.9rem" }}>
                      Our Timeline
                    </h5>
                  </div>
                  <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "8px" }}>
                    {timeline.map((item, index) => (
                      <div key={index} style={{
                        background: "white",
                        padding: "10px",
                        borderRadius: "10px",
                        minWidth: "100px",
                        boxShadow: "0 3px 10px rgba(0,0,0,0.04)",
                        textAlign: "center",
                        flexShrink: 0
                      }}>
                        <div style={{
                          fontSize: "1.1rem",
                          fontWeight: 800,
                          color: PRIMARY,
                          marginBottom: "3px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px"
                        }}>
                          {React.cloneElement(item.icon, { size: 12 })}
                          {item.year}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#666", fontWeight: 600 }}>
                          {item.event}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* STATS SECTION - Mobile: Horizontal Scroll, Desktop: Grid */}
      <section style={{ 
        padding: isMobile ? "50px 0" : isTablet ? "70px 0" : "90px 0", 
        background: `linear-gradient(135deg, #f8fcfb 0%, #e6f7f4 100%)`,
      }}>
        <Container>
          <div className="text-center mb-4">
            <h2 style={{ 
              fontWeight: 800, 
              fontSize: isMobile ? "1.5rem" : isTablet ? "1.9rem" : "2.2rem",
              marginBottom: "8px"
            }}>
              Our Impact in
              <span style={{ color: PRIMARY }}> Numbers</span>
            </h2>
            <p style={{ 
              color: "#666", 
              maxWidth: 500, 
              margin: "0 auto", 
              fontSize: isMobile ? "0.85rem" : "0.95rem" 
            }}>
              Measuring our commitment to Zanzibar's heritage and communities
            </p>
          </div>

          {isMobile ? (
            // Mobile: Horizontal Scroll
            <div style={{ 
              display: "flex", 
              gap: "12px", 
              overflowX: "auto",
              padding: "20px 0 30px",
              msOverflowStyle: "none",
              scrollbarWidth: "none"
            }}>
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  style={{
                    border: "none",
                    padding: "20px 15px",
                    borderRadius: "16px",
                    background: "white",
                    boxShadow: "0 12px 24px rgba(47, 182, 166, 0.08)",
                    transition: "all 0.3s ease",
                    textAlign: "center",
                    minWidth: "140px",
                    flexShrink: 0
                  }}
                  className="hover-lift"
                >
                  <div style={{
                    width: "50px",
                    height: "50px",
                    background: `${PRIMARY}08`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                    color: PRIMARY
                  }}>
                    {stat.icon}
                  </div>
                  
                  <h3 style={{ 
                    fontWeight: 800, 
                    fontSize: "1.5rem",
                    marginBottom: "4px",
                    color: ACCENT
                  }}>
                    {stat.value}
                  </h3>
                  
                  <p style={{ 
                    fontWeight: 700, 
                    marginBottom: "4px",
                    fontSize: "0.8rem",
                    color: ACCENT
                  }}>
                    {stat.label}
                  </p>
                  
                  <small style={{ 
                    color: "#777", 
                    fontSize: "0.7rem",
                    display: "block"
                  }}>
                    {stat.description}
                  </small>
                </Card>
              ))}
            </div>
          ) : (
            // Desktop/Tablet: Grid Layout
            <Row className="g-3">
              {stats.map((stat, index) => (
                <Col key={index} xs={6} md={3} lg={3}>
                  <Card
                    style={{
                      border: "none",
                      padding: isMobile ? "20px 15px" : "25px 20px",
                      borderRadius: "16px",
                      background: "white",
                      boxShadow: "0 12px 24px rgba(47, 182, 166, 0.08)",
                      transition: "all 0.3s ease",
                      textAlign: "center",
                      height: "100%"
                    }}
                    className="hover-lift"
                  >
                    <div style={{
                      width: "60px",
                      height: "60px",
                      background: `${PRIMARY}08`,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 16px",
                      color: PRIMARY
                    }}>
                      {stat.icon}
                    </div>
                    
                    <h3 style={{ 
                      fontWeight: 800, 
                      fontSize: "1.8rem",
                      marginBottom: "6px",
                      color: ACCENT
                    }}>
                      {stat.value}
                    </h3>
                    
                    <p style={{ 
                      fontWeight: 700, 
                      marginBottom: "6px",
                      fontSize: "0.9rem",
                      color: ACCENT
                    }}>
                      {stat.label}
                    </p>
                    
                    <small style={{ 
                      color: "#777", 
                      fontSize: "0.8rem",
                      display: "block"
                    }}>
                      {stat.description}
                    </small>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* VALUES SECTION - Mobile: Testimonial Style, Desktop: Grid */}
      <section style={{ 
        padding: isMobile ? "50px 0" : isTablet ? "70px 0" : "90px 0", 
        background: "#ffffff" 
      }}>
        <Container>
          <div className="text-center mb-4">
            <Badge 
              pill 
              style={{ 
                background: `${SECONDARY}10`, 
                color: SECONDARY,
                padding: isMobile ? "6px 14px" : "8px 20px",
                fontSize: isMobile ? "0.7rem" : "0.8rem",
                fontWeight: 600,
                marginBottom: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px"
              }}
            >
              <FaAward size={12} /> OUR PRINCIPLES
            </Badge>
            <h2 style={{ 
              fontWeight: 800, 
              fontSize: isMobile ? "1.5rem" : isTablet ? "1.9rem" : "2.2rem",
              marginBottom: "12px"
            }}>
              Values That
              <br />
              <span style={{ color: PRIMARY }}>Define Our Work</span>
            </h2>
          </div>

          {isMobile ? (
            // Mobile: Testimonial Carousel
            <div style={{ position: "relative", margin: "30px 0" }}>
              <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden" }}>
                <div style={{ 
                  display: "flex",
                  transform: `translateX(-${currentValueIndex * 100}%)`,
                  transition: "transform 0.4s ease"
                }}>
                  {values.map((value, index) => (
                    <div key={index} style={{ minWidth: "100%", padding: "0 10px" }}>
                      <Card style={{
                        border: "none",
                        borderRadius: "16px",
                        overflow: "hidden",
                        background: `linear-gradient(135deg, ${PRIMARY}08, ${SECONDARY}05)`,
                        boxShadow: "0 16px 32px rgba(0,0,0,0.08)",
                        textAlign: "center",
                        padding: "30px 20px",
                        position: "relative"
                      }}>
                        {/* Quote marks */}
                        <div style={{
                          position: "absolute",
                          top: "15px",
                          left: "15px",
                          color: `${PRIMARY}30`,
                          fontSize: "2rem"
                        }}>
                          <FaQuoteLeft />
                        </div>
                        
                        <div style={{
                          position: "absolute",
                          bottom: "15px",
                          right: "15px",
                          color: `${PRIMARY}30`,
                          fontSize: "2rem"
                        }}>
                          <FaQuoteRight />
                        </div>
                        
                        <div style={{
                          width: "60px",
                          height: "60px",
                          background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 20px",
                          color: "white",
                          boxShadow: "0 8px 20px rgba(47, 182, 166, 0.2)"
                        }}>
                          {React.cloneElement(value.icon, { size: 24 })}
                        </div>
                        
                        <h4 style={{ 
                          fontWeight: 700, 
                          marginBottom: "15px",
                          color: ACCENT,
                          fontSize: "1.1rem"
                        }}>
                          {value.title}
                        </h4>
                        
                        <p style={{ 
                          color: "#555", 
                          lineHeight: 1.6,
                          fontSize: "0.9rem",
                          marginBottom: "20px",
                          fontStyle: "italic"
                        }}>
                          "{value.quote}"
                        </p>
                        
                        <p style={{ 
                          color: "#666", 
                          lineHeight: 1.5,
                          fontSize: "0.85rem",
                          marginBottom: 0
                        }}>
                          {value.description}
                        </p>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation */}
              <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                gap: "20px",
                marginTop: "20px"
              }}>
                <Button
                  variant="outline-primary"
                  onClick={prevValue}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: `2px solid ${PRIMARY}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0
                  }}
                >
                  <FaChevronLeft size={12} />
                </Button>
                
                <div style={{ display: "flex", gap: "6px" }}>
                  {values.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentValueIndex(index)}
                      style={{
                        width: index === currentValueIndex ? "20px" : "6px",
                        height: "6px",
                        borderRadius: index === currentValueIndex ? "3px" : "50%",
                        background: index === currentValueIndex ? PRIMARY : "#ddd",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}
                    />
                  ))}
                </div>

                <Button
                  variant="outline-primary"
                  onClick={nextValue}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: `2px solid ${PRIMARY}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0
                  }}
                >
                  <FaChevronRight size={12} />
                </Button>
              </div>
            </div>
          ) : (
            // Desktop/Tablet: Grid Layout
            <Row className="g-3">
              {values.map((value, index) => (
                <Col key={index} xs={12} sm={6} lg={3}>
                  <Card
                    style={{
                      border: "none",
                      padding: "30px 25px",
                      borderRadius: "16px",
                      background: "white",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.06)",
                      transition: "all 0.3s ease",
                      height: "100%",
                      textAlign: "center",
                      position: "relative",
                      overflow: "hidden"
                    }}
                    className="hover-lift"
                  >
                    {/* Background accent */}
                    <div style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`
                    }} />
                    
                    <div style={{
                      width: "60px",
                      height: "60px",
                      background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      color: "white",
                      boxShadow: "0 8px 20px rgba(47, 182, 166, 0.15)"
                    }}>
                      {React.cloneElement(value.icon, { size: 24 })}
                    </div>
                    
                    <h4 style={{ 
                      fontWeight: 700, 
                      marginBottom: "12px",
                      color: ACCENT,
                      fontSize: "1.1rem"
                    }}>
                      {value.title}
                    </h4>
                    
                    <p style={{ 
                      color: "#666", 
                      lineHeight: 1.6,
                      fontSize: "0.9rem",
                      marginBottom: 0
                    }}>
                      {value.description}
                    </p>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* TEAM SECTION */}
      <section style={{ 
        padding: isMobile ? "50px 0" : isTablet ? "70px 0" : "90px 0", 
        background: `linear-gradient(135deg, ${BG_LIGHT} 0%, #ffffff 100%)` 
      }}>
        <Container>
          <div className="text-center mb-4">
            <h2 style={{ 
              fontWeight: 800, 
              fontSize: isMobile ? "1.5rem" : isTablet ? "1.9rem" : "2.2rem",
              marginBottom: "8px"
            }}>
              Meet Our
              <span style={{ color: PRIMARY }}> Dedicated Team</span>
            </h2>
            <p style={{ 
              color: "#666", 
              maxWidth: 500, 
              margin: "0 auto", 
              fontSize: isMobile ? "0.85rem" : "0.95rem" 
            }}>
              Experts passionate about preserving Zanzibar's heritage and nature
            </p>
          </div>

          {isMobile ? (
            // Mobile Carousel
            <div style={{ position: "relative", margin: "24px 0" }}>
              <div style={{ position: "relative", overflow: "hidden", borderRadius: "16px" }}>
                <div style={{ 
                  display: "flex",
                  transform: `translateX(-${currentTeamIndex * 100}%)`,
                  transition: "transform 0.4s ease"
                }}>
                  {team.map((member, index) => (
                    <div key={index} style={{ minWidth: "100%", padding: "0 10px" }}>
                      <Card style={{
                        border: "none",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0 16px 32px rgba(0,0,0,0.1)",
                        background: "white"
                      }}>
                        <div style={{ position: "relative", height: "180px" }}>
                          <img
                            src={member.image}
                            alt={member.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover"
                            }}
                          />
                          <div style={{
                            position: "absolute",
                            bottom: "12px",
                            left: "12px",
                            background: "rgba(47, 182, 166, 0.9)",
                            color: "white",
                            padding: "6px 12px",
                            borderRadius: "16px",
                            fontSize: "0.75rem",
                            fontWeight: 600
                          }}>
                            {member.experience}
                          </div>
                        </div>
                        
                        <Card.Body style={{ padding: "20px" }}>
                          <h5 style={{ fontWeight: 800, marginBottom: "4px", fontSize: "1rem" }}>
                            {member.name}
                          </h5>
                          <p style={{ 
                            color: PRIMARY, 
                            fontSize: "0.8rem", 
                            fontWeight: 600,
                            marginBottom: "8px"
                          }}>
                            {member.role}
                          </p>
                          <p style={{ 
                            fontSize: "0.8rem", 
                            color: "#555", 
                            lineHeight: 1.6,
                            marginBottom: "12px"
                          }}>
                            {member.bio}
                          </p>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation */}
              <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                gap: "16px",
                marginTop: "16px"
              }}>
                <Button
                  variant="outline-primary"
                  onClick={prevTeamMember}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: `2px solid ${PRIMARY}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0
                  }}
                >
                  <FaChevronLeft size={12} />
                </Button>
                
                <div style={{ display: "flex", gap: "6px" }}>
                  {team.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTeamIndex(index)}
                      style={{
                        width: index === currentTeamIndex ? "20px" : "6px",
                        height: "6px",
                        borderRadius: index === currentTeamIndex ? "3px" : "50%",
                        background: index === currentTeamIndex ? PRIMARY : "#ddd",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}
                    />
                  ))}
                </div>

                <Button
                  variant="outline-primary"
                  onClick={nextTeamMember}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: `2px solid ${PRIMARY}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0
                  }}
                >
                  <FaChevronRight size={12} />
                </Button>
              </div>
            </div>
          ) : (
            // Desktop/Tablet Grid
            <Row className="g-3">
              {team.map((member, index) => (
                <Col key={index} md={6} lg={4}>
                  <Card
                    style={{
                      border: "none",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 16px 32px rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                      height: "100%",
                      background: "white"
                    }}
                    className="hover-lift"
                  >
                    <div style={{ position: "relative", height: "200px" }}>
                      <img
                        src={member.image}
                        alt={member.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                      <div style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "12px",
                        background: `linear-gradient(90deg, ${PRIMARY}, ${PRIMARY_LIGHT})`,
                        color: "white",
                        padding: "6px 14px",
                        borderRadius: "16px",
                        fontSize: "0.8rem",
                        fontWeight: 600
                      }}>
                        {member.experience}
                      </div>
                    </div>
                    
                    <Card.Body style={{ padding: "20px" }}>
                      <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "8px",
                        marginBottom: "8px"
                      }}>
                        {React.cloneElement(member.teamIcon, { color: PRIMARY, size: 18 })}
                        <h5 style={{ fontWeight: 800, margin: 0, fontSize: "1.1rem" }}>
                          {member.name}
                        </h5>
                      </div>
                      
                      <p style={{ 
                        color: PRIMARY, 
                        fontSize: "0.85rem", 
                        fontWeight: 600,
                        marginBottom: "12px"
                      }}>
                        {member.role}
                      </p>
                      
                      <p style={{ 
                        fontSize: "0.85rem", 
                        color: "#555", 
                        lineHeight: 1.6,
                        marginBottom: "12px"
                      }}>
                        {member.bio}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* CONNECT SECTION */}
      <section style={{ 
        padding: isMobile ? "50px 0" : isTablet ? "70px 0" : "90px 0", 
        background: "#ffffff" 
      }}>
        <Container>
          <div style={{
            background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
            borderRadius: "20px",
            padding: isMobile ? "30px 20px" : "40px 30px",
            color: "white",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              position: "relative",
              zIndex: 2
            }}>
              <FaHandsHelping size={isMobile ? 32 : 36} style={{ color: "rgba(255,255,255,0.9)" }} />
              <h2 style={{ 
                fontWeight: 800, 
                fontSize: isMobile ? "1.5rem" : isTablet ? "1.9rem" : "2.2rem",
                marginBottom: "8px"
              }}>
                Interested in Our Work?
              </h2>
              
              <p style={{ 
                maxWidth: 500, 
                margin: "0 auto 20px", 
                fontSize: isMobile ? "0.9rem" : "1rem",
                opacity: 0.9
              }}>
                We welcome collaboration with researchers, institutions, and community 
                organizations focused on heritage preservation and sustainable development.
              </p>
              
              <Button
                variant="light"
                style={{
                  background: "white",
                  color: PRIMARY,
                  border: "none",
                  padding: isMobile ? "10px 24px" : "12px 28px",
                  borderRadius: "50px",
                  fontWeight: 700,
                  fontSize: isMobile ? "0.85rem" : "0.9rem",
                  boxShadow: "0 6px 20px rgba(255,255,255,0.1)"
                }}
                className="hover-lift"
              >
                <FaMapMarkerAlt style={{ marginRight: "6px" }} />
                Connect With Us
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* VIDEO MODAL */}
      <Modal
        show={showVideo}
        onHide={() => setShowVideo(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ 
            fontWeight: 600, 
            color: ACCENT, 
            display: "flex", 
            alignItems: "center", 
            gap: "8px",
            fontSize: isMobile ? "0.9rem" : "1.1rem"
          }}>
            <FaPlayCircle color={PRIMARY} /> Our Journey & Work
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ 
          padding: isMobile ? "20px" : "25px", 
          textAlign: "center" 
        }}>
          <div style={{
            background: '#f8f9fa',
            padding: isMobile ? "25px 16px" : "30px 25px",
            borderRadius: '12px',
            minHeight: '180px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FaPlayCircle size={isMobile ? 40 : 50} style={{ marginBottom: '16px', color: PRIMARY }} />
            <h5 style={{ marginBottom: '10px', color: ACCENT, fontSize: isMobile ? "0.9rem" : "1.1rem" }}>
              Our Documentary Journey
            </h5>
            <p style={{ 
              color: '#666', 
              maxWidth: '450px',
              fontSize: isMobile ? "0.85rem" : "0.95rem" 
            }}>
              A visual overview of our work preserving Zanzibar's heritage, 
              collaborating with local communities, and documenting the island's 
              natural beauty.
            </p>
          </div>
        </Modal.Body>
      </Modal>

      {/* Global Styles */}
      <style jsx>{`
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 32px rgba(0,0,0,0.12) !important;
        }

        .hover-scale:hover {
          transform: scale(1.02);
        }

        /* Hide scrollbar for mobile stats */
        .mobile-stats::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 576px) {
          section {
            padding: 40px 0 !important;
          }
          
          h1 {
            font-size: 1.6rem !important;
          }
          
          h2 {
            font-size: 1.3rem !important;
          }
        }

        /* Custom scrollbar for timeline */
        .timeline-scroll::-webkit-scrollbar {
          height: 4px;
        }

        .timeline-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }

        .timeline-scroll::-webkit-scrollbar-thumb {
          background: #ddd;
          border-radius: 2px;
        }

        .timeline-scroll::-webkit-scrollbar-thumb:hover {
          background: #ccc;
        }
      `}</style>
    </div>
  );
}