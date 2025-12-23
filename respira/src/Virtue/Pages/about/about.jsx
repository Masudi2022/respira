import React, { useState } from "react";
import { Container, Row, Col, Card, Badge, Modal } from "react-bootstrap";
import {
  FaUsers,
  FaShieldAlt,
  FaCompass,
  FaSmile,
  FaGlobeAmericas,
  FaAward,
  FaHeart,
  FaStar,
  FaPlayCircle,
  FaClock,
  FaBook,
  FaCamera,
  FaMapMarkerAlt,
  FaFlag,
  FaBuilding,
  FaLightbulb,
  FaHandshake,
  FaHistory,
  FaWater,
  FaLeaf,
  FaUsersCog,
  FaGraduationCap,
  FaChartLine,
  FaHandsHelping,
  FaMountain,
  FaUmbrellaBeach
} from "react-icons/fa";

const PRIMARY = "#2FB6A6";
const SECONDARY = "#FF7E5F";
const ACCENT = "#3A4F6D";

export default function AboutUs() {
  const [showVideo, setShowVideo] = useState(false);

  const stats = [
    { 
      icon: <FaUsers size={48} color={PRIMARY} />, 
      label: "People Served", 
      value: "10,000+", 
      description: "Visitors & locals engaged" 
    },
    { 
      icon: <FaCompass size={48} color={PRIMARY} />, 
      label: "Experiences Documented", 
      value: "50+", 
      description: "Cultural & nature based" 
    },
    { 
      icon: <FaShieldAlt size={48} color={PRIMARY} />, 
      label: "Operational Years", 
      value: "14+", 
      description: "Continuous dedication" 
    },
    { 
      icon: <FaSmile size={48} color={PRIMARY} />, 
      label: "Community Feedback", 
      value: "4.9/5", 
      description: "Public reviews & ratings" 
    }
  ];

  const team = [
    {
      name: "Ali Hassan",
      role: "Founder & Cultural Guide",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      bio: "Born and raised in Stone Town, Ali has spent over 20 years documenting Zanzibar's rich history, architecture, and traditions. His deep local knowledge forms the foundation of our cultural preservation efforts.",
      specialty: "History & Cultural Preservation",
      experience: "20+ years",
      expertise: ["Historical Documentation", "Cultural Storytelling", "Architectural Heritage"],
      teamIcon: <FaHistory />
    },
    {
      name: "Fatima Mohammed",
      role: "Marine Conservation Specialist",
      image: "https://images.unsplash.com/photo-1494790108755-2616b786d4d5?auto=format&fit=crop&w=600&q=80",
      bio: "Marine biologist with extensive research on Zanzibar's coral ecosystems. Fatima leads our marine conservation initiatives and educational programs focused on sustainable ocean practices.",
      specialty: "Marine Ecology & Conservation",
      experience: "12+ years",
      expertise: ["Coral Reef Monitoring", "Marine Education", "Eco-Tourism"],
      teamIcon: <FaWater />
    },
    {
      name: "James Wilson",
      role: "Nature & Conservation Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
      bio: "Former national park ranger turned conservation educator. James collaborates with local communities to document and protect Zanzibar's unique biodiversity and natural habitats.",
      specialty: "Wildlife & Habitat Conservation",
      experience: "15+ years",
      expertise: ["Wildlife Monitoring", "Habitat Protection", "Community Engagement"],
      teamIcon: <FaLeaf />
    }
  ];

  const values = [
    { 
      icon: <FaBook />, 
      title: "Authentic Documentation", 
      description: "We ensure all information shared is accurate, respectful, and sourced from local knowledge and verified research." 
    },
    { 
      icon: <FaHandshake />, 
      title: "Community Collaboration", 
      description: "Working directly with local communities to ensure their voices, stories, and perspectives are properly represented." 
    },
    { 
      icon: <FaFlag />, 
      title: "Cultural Integrity", 
      description: "Preserving and presenting Zanzibar's cultural heritage with authenticity and respect for traditions." 
    },
    { 
      icon: <FaCamera />, 
      title: "Transparent Storytelling", 
      description: "Sharing genuine experiences and information without commercial bias or misrepresentation." 
    }
  ];

  const timeline = [
    { year: "2010", event: "Founding", description: "Started as a local initiative documenting Stone Town", icon: <FaBuilding /> },
    { year: "2013", event: "Expansion", description: "Began marine conservation documentation", icon: <FaWater /> },
    { year: "2016", event: "Team Growth", description: "Expanded team to include conservation specialists", icon: <FaUsersCog /> },
    { year: "2019", event: "Recognition", description: "Received local heritage preservation award", icon: <FaAward /> },
    { year: "2023", event: "Present", description: "Ongoing community and conservation work", icon: <FaChartLine /> }
  ];

  return (
    <div style={{ 
      background: "linear-gradient(180deg, #ffffff 0%, #f8fcfb 100%)",
      minHeight: "100vh",
      color: "#333",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      
      {/* HERO SECTION */}
      <section
        className="hero-section"
        style={{
          padding: "160px 0 100px",
          background: `
            linear-gradient(135deg, 
              rgba(0, 0, 0, 0.7) 0%, 
              rgba(47, 182, 166, 0.5) 100%
            ),
            url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2070&q=80')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          color: "white",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Animated background elements */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 30% 50%, rgba(47, 182, 166, 0.3) 0%, transparent 70%)",
          animation: "pulse 8s ease-in-out infinite"
        }} />
        
        <Container style={{ position: "relative", zIndex: 2 }}>
          <Badge 
            pill 
            style={{
              background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
              padding: "14px 32px",
              fontSize: "0.95rem",
              fontWeight: 700,
              letterSpacing: "1.5px",
              border: "none",
              marginBottom: "30px",
              boxShadow: "0 8px 20px rgba(47, 182, 166, 0.4)",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <FaCompass /> ABOUT OUR JOURNEY
          </Badge>

          <h1 style={{ 
            fontWeight: 800, 
            fontSize: "4.5rem",
            marginTop: "20px",
            marginBottom: "25px",
            lineHeight: 1.1,
            textShadow: "0 4px 12px rgba(0,0,0,0.3)"
          }}>
            Preserving Zanzibar's
            <br />
            <span style={{ color: SECONDARY }}>Heritage & Nature</span>
          </h1>

          <p style={{ 
            maxWidth: "750px", 
            margin: "30px auto 40px", 
            fontSize: "1.25rem",
            lineHeight: 1.7,
            opacity: 0.95,
            fontWeight: 300
          }}>
            We are a dedicated team focused on documenting, preserving, and sharing 
            Zanzibar's rich cultural heritage and natural beauty through authentic 
            storytelling and community collaboration.
          </p>

          <div style={{ 
            display: "flex", 
            gap: "20px", 
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "40px"
          }}>
            <button
              onClick={() => document.getElementById("our-story").scrollIntoView({ behavior: "smooth" })}
              style={{
                background: SECONDARY,
                border: "none",
                padding: "16px 40px",
                borderRadius: "50px",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 8px 20px rgba(255, 126, 95, 0.4)"
              }}
              className="hover-lift"
            >
              Explore Our Story
            </button>
            
            <button
              onClick={() => setShowVideo(true)}
              style={{
                background: "transparent",
                border: "2px solid white",
                padding: "16px 40px",
                borderRadius: "50px",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "white",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
              className="hover-lift"
            >
              <FaPlayCircle size={20} /> Watch Our Journey
            </button>
          </div>
        </Container>
      </section>

      {/* OUR STORY SECTION */}
      <section id="our-story" style={{ padding: "120px 0", background: "#ffffff" }}>
        <Container>
          <div className="text-center mb-5">
            <Badge 
              pill 
              style={{ 
                background: `${PRIMARY}15`, 
                color: PRIMARY,
                padding: "10px 25px",
                fontSize: "0.9rem",
                fontWeight: 600,
                marginBottom: "20px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <FaHistory /> OUR BACKGROUND
            </Badge>
            <h2 style={{ 
              fontWeight: 800, 
              fontSize: "3.2rem",
              marginBottom: "20px",
              color: ACCENT
            }}>
              From Local Initiative to
              <br />
              <span style={{ color: PRIMARY }}>Heritage Stewards</span>
            </h2>
          </div>

          <Row className="align-items-center g-5">
            <Col lg={6}>
              <div style={{ position: "relative" }}>
                <img
                  src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80"
                  alt="Zanzibar cultural heritage"
                  style={{
                    width: "100%",
                    borderRadius: "30px",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
                    transform: "rotate(-2deg)",
                    transition: "transform 0.6s ease"
                  }}
                  className="img-rotate"
                />
                {/* Decorative element */}
                <div style={{
                  position: "absolute",
                  bottom: "-30px",
                  right: "-30px",
                  background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
                  width: "180px",
                  height: "180px",
                  borderRadius: "20px",
                  zIndex: -1,
                  opacity: 0.1
                }} />
              </div>
            </Col>

            <Col lg={6}>
              <div style={{ padding: "0 0 0 40px" }}>
                <div style={{ 
                  borderLeft: `4px solid ${PRIMARY}`,
                  paddingLeft: "25px",
                  marginBottom: "30px"
                }}>
                  <p style={{ 
                    fontSize: "1.15rem", 
                    color: "#555", 
                    lineHeight: 1.8,
                    marginBottom: "25px"
                  }}>
                    Our journey began in 2010 as a small local initiative focused on 
                    documenting the everyday life, historical landmarks, and natural 
                    environments across Zanzibar. What started with simple walking tours 
                    in Stone Town has evolved into a comprehensive effort to preserve 
                    and share our island's unique heritage.
                  </p>
                  
                  <p style={{ 
                    fontSize: "1.15rem", 
                    color: "#555", 
                    lineHeight: 1.8 
                  }}>
                    Today, we collaborate with historians, marine biologists, conservationists, 
                    and local communities to ensure that Zanzibar's stories are told 
                    authentically and preserved for future generations.
                  </p>
                </div>

                {/* Timeline Preview */}
                <div style={{
                  background: `${PRIMARY}08`,
                  borderRadius: "20px",
                  padding: "25px",
                  marginTop: "30px"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "15px"
                  }}>
                    <FaClock color={PRIMARY} />
                    <h5 style={{ fontWeight: 700, margin: 0, color: PRIMARY }}>
                      Our Timeline
                    </h5>
                  </div>
                  <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                    {timeline.slice(0, 3).map((item, index) => (
                      <div key={index} style={{
                        background: "white",
                        padding: "15px",
                        borderRadius: "15px",
                        flex: "1",
                        minWidth: "120px",
                        boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                        textAlign: "center"
                      }}>
                        <div style={{
                          fontSize: "1.5rem",
                          fontWeight: 800,
                          color: PRIMARY,
                          marginBottom: "5px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px"
                        }}>
                          {item.icon}
                          {item.year}
                        </div>
                        <div style={{ fontSize: "0.9rem", color: "#666" }}>
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

      {/* STATS SECTION */}
      <section style={{ 
        padding: "100px 0", 
        background: "linear-gradient(135deg, #f8fcfb 0%, #e6f7f4 100%)",
        position: "relative"
      }}>
        <Container>
          <div className="text-center mb-5">
            <h2 style={{ 
              fontWeight: 800, 
              fontSize: "2.8rem",
              marginBottom: "15px"
            }}>
              Our Impact in
              <span style={{ color: PRIMARY }}> Numbers</span>
            </h2>
            <p style={{ color: "#666", maxWidth: 600, margin: "0 auto", fontSize: "1.1rem" }}>
              Measuring our commitment to Zanzibar's heritage and communities
            </p>
          </div>

          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col key={index} lg={3} md={6}>
                <Card
                  className="hover-lift"
                  style={{
                    border: "none",
                    padding: "45px 25px",
                    borderRadius: "25px",
                    background: "white",
                    boxShadow: "0 20px 40px rgba(47, 182, 166, 0.1)",
                    transition: "all 0.3s ease",
                    textAlign: "center",
                    height: "100%"
                  }}
                >
                  <div style={{
                    width: "90px",
                    height: "90px",
                    background: `${PRIMARY}10`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 25px",
                    border: `2px solid ${PRIMARY}30`
                  }}>
                    {stat.icon}
                  </div>
                  
                  <h3 style={{ 
                    fontWeight: 800, 
                    fontSize: "2.8rem",
                    marginBottom: "10px",
                    color: ACCENT
                  }}>
                    {stat.value}
                  </h3>
                  
                  <p style={{ 
                    fontWeight: 700, 
                    marginBottom: "8px",
                    fontSize: "1.1rem",
                    color: ACCENT
                  }}>
                    {stat.label}
                  </p>
                  
                  <small style={{ color: "#777", fontSize: "0.9rem" }}>
                    {stat.description}
                  </small>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* VALUES SECTION */}
      <section style={{ padding: "120px 0", background: "#ffffff" }}>
        <Container>
          <div className="text-center mb-5">
            <Badge 
              pill 
              style={{ 
                background: `${SECONDARY}15`, 
                color: SECONDARY,
                padding: "10px 25px",
                fontSize: "0.9rem",
                fontWeight: 600,
                marginBottom: "20px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <FaAward /> OUR PRINCIPLES
            </Badge>
            <h2 style={{ 
              fontWeight: 800, 
              fontSize: "2.8rem",
              marginBottom: "20px"
            }}>
              Guiding Values That
              <br />
              <span style={{ color: PRIMARY }}>Define Our Work</span>
            </h2>
          </div>

          <Row className="g-4">
            {values.map((value, index) => (
              <Col key={index} md={6} lg={3}>
                <Card
                  className="hover-lift"
                  style={{
                    border: "none",
                    padding: "40px 25px",
                    borderRadius: "25px",
                    background: "white",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease",
                    height: "100%",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  {/* Background accent */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "5px",
                    background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY})`
                  }} />
                  
                  <div style={{
                    width: "70px",
                    height: "70px",
                    background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 25px",
                    color: "white",
                    boxShadow: "0 10px 20px rgba(47, 182, 166, 0.2)"
                  }}>
                    {React.cloneElement(value.icon, { size: 28 })}
                  </div>
                  
                  <h4 style={{ 
                    fontWeight: 700, 
                    marginBottom: "15px",
                    color: ACCENT,
                    fontSize: "1.3rem"
                  }}>
                    {value.title}
                  </h4>
                  
                  <p style={{ 
                    color: "#666", 
                    lineHeight: 1.6,
                    fontSize: "0.95rem"
                  }}>
                    {value.description}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      

      {/* CONNECT SECTION */}
      <section style={{ padding: "100px 0", background: "#ffffff" }}>
        <Container>
          <div style={{
            background: `linear-gradient(135deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
            borderRadius: "30px",
            padding: "60px 40px",
            color: "white",
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}>
            {/* Background pattern */}
            <div style={{
              position: "absolute",
              top: "50%",
              right: "-100px",
              transform: "translateY(-50%)",
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
              borderRadius: "50%"
            }} />
            
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              position: "relative",
              zIndex: 2
            }}>
              <FaHandsHelping size={48} style={{ color: "rgba(255,255,255,0.9)" }} />
              <h2 style={{ 
                fontWeight: 800, 
                fontSize: "2.8rem",
                marginBottom: "10px"
              }}>
                Interested in Our Work?
              </h2>
              
              <p style={{ 
                maxWidth: 600, 
                margin: "0 auto 40px", 
                fontSize: "1.1rem",
                opacity: 0.9
              }}>
                We welcome collaboration with researchers, institutions, and community 
                organizations focused on heritage preservation and sustainable development.
              </p>
              
              <button
                style={{
                  background: "white",
                  color: PRIMARY,
                  border: "none",
                  padding: "16px 40px",
                  borderRadius: "50px",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 10px 30px rgba(255,255,255,0.2)"
                }}
                className="hover-lift"
              >
                <FaMapMarkerAlt /> Connect With Us
              </button>
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
          <Modal.Title style={{ fontWeight: 600, color: ACCENT, display: "flex", alignItems: "center", gap: "10px" }}>
            <FaPlayCircle color={PRIMARY} /> Our Journey & Work
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "40px", textAlign: "center" }}>
          <div style={{
            background: '#f8f9fa',
            padding: '50px',
            borderRadius: '15px',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FaPlayCircle size={70} style={{ marginBottom: '25px', color: PRIMARY }} />
            <h5 style={{ marginBottom: '15px', color: ACCENT }}>Our Documentary Journey</h5>
            <p style={{ color: '#666', maxWidth: '500px' }}>
              A visual overview of our work preserving Zanzibar's heritage, 
              collaborating with local communities, and documenting the island's 
              natural beauty.
            </p>
          </div>
        </Modal.Body>
      </Modal>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
          transition: all 0.3s ease;
        }

        .img-rotate:hover {
          transform: rotate(0deg) scale(1.02);
          transition: transform 0.6s ease;
        }

        .img-hover:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 120px 0 80px !important;
          }

          h1 {
            font-size: 2.8rem !important;
          }

          h2 {
            font-size: 2.2rem !important;
          }

          section {
            padding: 80px 0 !important;
          }
        }

        @media (max-width: 576px) {
          h1 {
            font-size: 2.2rem !important;
          }

          h2 {
            font-size: 1.8rem !important;
          }

          .hero-section {
            padding: 100px 0 60px !important;
          }
        }
      `}</style>
    </div>
  );
}