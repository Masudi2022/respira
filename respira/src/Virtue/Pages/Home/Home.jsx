import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ChevronRight,
  ArrowDown,
  PlayCircle,
  StarFill,
  Clock,
  Map,
  Calendar,
  ChevronDown,
  ChevronLeft,
  CheckCircle,
  Shield,
  Award,
  Heart,
  ArrowRight
} from "react-bootstrap-icons";

/* -----------------------------
   PRIMARY COLOR: Teal/Turquoise #2FB6A6
-------------------------------- */
const PRIMARY_COLOR = "#2FB6A6";
const SECONDARY_COLORS = ["#8BD3CF", "#FFD166", "#FF7F50"];

/* -----------------------------
   STATIC IMAGE DATA
-------------------------------- */
const imageData = [
  {
    bg: "https://images.unsplash.com/photo-1544550581-1bcabf842b77?auto=format&fit=crop&w=2000&q=80",
    thumb: "https://images.unsplash.com/photo-1544550581-1bcabf842b77?auto=format&fit=crop&w=800&q=80",
    accent: SECONDARY_COLORS[0]
  },
  {
    bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80",
    thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    accent: SECONDARY_COLORS[1]
  },
  {
    bg: "https://images.unsplash.com/photo-1667650708785-2179a8eb2b70?auto=format&fit=crop&w=2000&q=80",
    thumb: "https://images.unsplash.com/photo-1667650708785-2179a8eb2b70?auto=format&fit=crop&w=800&q=80",
    accent: SECONDARY_COLORS[2]
  }
];

/* -----------------------------
   STATIC TEXT CONTENT IN ENGLISH
-------------------------------- */
const slides = [
  {
    title: "ZANZIBAR",
    subtitle: "Respira Zanzibar",
    description: "Discover pristine beaches, turquoise waters, and the calm tropical soul of Zanzibar. A perfect escape to breathe, relax, and explore.",
    tag: "Tropical Paradise",
    bg: "https://images.unsplash.com/photo-1544550581-1bcabf842b77?auto=format&fit=crop&w=2000&q=80",
    thumb: "https://images.unsplash.com/photo-1544550581-1bcabf842b77?auto=format&fit=crop&w=800&q=80",
    accent: SECONDARY_COLORS[0],
    color: PRIMARY_COLOR
  },
  {
    title: "INDIAN OCEAN",
    subtitle: "Pure Blue",
    description: "Crystal-clear waters and endless horizons make Zanzibar one of the most spectacular island destinations in the world.",
    tag: "Ocean View",
    bg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80",
    thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    accent: SECONDARY_COLORS[1],
    color: PRIMARY_COLOR
  },
  {
    title: "STONE TOWN",
    subtitle: "Culture & History",
    description: "Stone Town is a living museum of Swahili culture, rich in history, traditions, and timeless architecture.",
    tag: "Historic Heritage",
    bg: "https://images.unsplash.com/photo-1667650708785-2179a8eb2b70?auto=format&fit=crop&w=2000&q=80",
    thumb: "https://images.unsplash.com/photo-1667650708785-2179a8eb2b70?auto=format&fit=crop&w=800&q=80",
    accent: SECONDARY_COLORS[2],
    color: PRIMARY_COLOR
  }
];

/* -----------------------------
   BUTTON TEXT & OTHER STATIC CONTENT
-------------------------------- */
const buttonText = {
  explore: "Explore Destination",
  watchVideo: "Watch Video"
};

export default function RespiraHome() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBgLoaded, setIsBgLoaded] = useState(false);

  /* AUTO SLIDE */
  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length, isHovered]);

  /* MOBILE CHECK */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 992);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* LOAD BACKGROUND IMAGE */
  useEffect(() => {
    const img = new Image();
    img.src = slides[index].bg;
    img.onload = () => setIsBgLoaded(true);
  }, [index]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      style={{
        width: "100%",
        minHeight: "100vh",
        background: `linear-gradient(rgba(47, 182, 166, 0.1), rgba(0,0,0,0.3)), url(${slides[index].bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        color: "#fff",
        // padding: "30px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        padding: isMobile ? "40px 0" : "60px 0",
        transition: "background 1s ease-in-out",
        opacity: isBgLoaded ? 1 : 0.9
      }}
    >
      {/* LIGHT OVERLAY FOR BETTER TEXT READABILITY - REDUCED DARKNESS */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, rgba(47, 182, 166, 0.05) 0%, rgba(0,0,0,0.2) 50%)",
        zIndex: 1
      }} />

      <Container fluid className="px-lg-5 px-3" style={{ position: "relative", zIndex: 2 }}>
        <Row className="align-items-center" style={{ minHeight: "calc(100vh - 120px)" }}>
          
          {/* LEFT CONTENT COLUMN - WIDER */}
          <Col lg={7} className="mb-5 mb-lg-0">
            <div style={{
              paddingRight: isMobile ? "0" : "3rem",
              animation: "fadeInLeft 0.8s ease-out"
            }}>
              {/* BADGE */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: slides[index].accent,
                color: "white",
                padding: "10px 24px",
                borderRadius: "50px",
                fontSize: "0.9rem",
                fontWeight: "600",
                marginBottom: "1.5rem",
                boxShadow: `0 6px 20px ${slides[index].accent}40`
              }}>
                <Award size={16} />
                {slides[index].tag}
              </div>

              {/* TITLE */}
              <h1 style={{
                fontSize: isMobile ? "2.8rem" : "4rem",
                fontWeight: "900",
                marginBottom: "1rem",
                lineHeight: "1.1",
                textTransform: "uppercase",
                letterSpacing: "2px"
              }}>
                {slides[index].title}
              </h1>

              {/* SUBTITLE */}
              <div style={{
                fontSize: isMobile ? "1.2rem" : "1.5rem",
                fontWeight: "500",
                color: slides[index].accent,
                marginBottom: "1.5rem",
                letterSpacing: "1px"
              }}>
                {slides[index].subtitle}
              </div>

              {/* DESCRIPTION */}
              <p
                style={{
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  lineHeight: "1.7",
                  opacity: 0.95,
                  marginBottom: "2.5rem",
                  maxWidth: "550px"
                }}
              >
                {slides[index].description}
              </p>

              {/* ACTION BUTTONS */}
              <div className="d-flex flex-wrap gap-3 mb-4">
                <Button
                  size={isMobile ? "md" : "lg"}
                  style={{
                    backgroundColor: PRIMARY_COLOR,
                    border: "none",
                    padding: isMobile ? "14px 32px" : "16px 40px",
                    borderRadius: "50px",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    boxShadow: `0 6px 20px ${PRIMARY_COLOR}60`
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = `0 10px 30px ${PRIMARY_COLOR}80`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = `0 6px 20px ${PRIMARY_COLOR}60`;
                  }}
                >
                  {buttonText.explore} <ArrowRight size={20} />
                </Button>

                <Button
                  variant="outline-light"
                  size={isMobile ? "md" : "lg"}
                  style={{
                    padding: isMobile ? "14px 32px" : "16px 40px",
                    borderRadius: "50px",
                    fontWeight: "600",
                    border: `2px solid ${slides[index].accent}`,
                    transition: "all 0.3s ease",
                    color: "white",
                    background: "rgba(255,255,255,0.05)"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = slides[index].accent;
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.05)";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.color = "white";
                  }}
                >
                  <PlayCircle size={18} className="me-2" /> {buttonText.watchVideo}
                </Button>
              </div>

              {/* FEATURES */}
              <div className="d-flex flex-wrap gap-4 mt-5">
                {[
                  { icon: CheckCircle, text: "Best Price Guarantee", color: slides[index].accent },
                  { icon: Shield, text: "Secure Booking", color: slides[index].accent },
                  { icon: Clock, text: "24/7 Support", color: slides[index].accent },
                  { icon: Heart, text: "Eco-Friendly", color: slides[index].accent }
                ].map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div 
                      key={i} 
                      className="d-flex align-items-center gap-3"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        padding: "8px 16px",
                        borderRadius: "50px",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                      }}
                    >
                      <Icon size={18} color={feature.color} />
                      <span style={{ opacity: 0.95, fontWeight: "500", fontSize: "0.9rem" }}>
                        {feature.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Col>

          {/* RIGHT IMAGE COLUMN */}
          <Col lg={5}>
            <div 
              className="card-stack-container"
              style={{
                position: "relative",
                height: isMobile ? "350px" : "65vh",
                maxHeight: "650px",
                overflow: "visible",
                animation: "fadeInRight 0.8s ease-out"
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* CARD STACK EFFECT */}
              {slides.map((slide, i) => {
                const isActive = i === index;
                const isPrev = i === (index - 1 + slides.length) % slides.length;
                const isNext = i === (index + 1) % slides.length;
                
                let transform = "";
                let zIndex = 1;
                let opacity = 0.5;
                let scale = 0.85;
                let width = isMobile ? "70%" : "65%";
                let leftOffset = "0%";
                
                if (isActive) {
                  transform = "translateX(0) translateY(0)";
                  zIndex = 10;
                  opacity = 1;
                  scale = 1;
                  width = isMobile ? "75%" : "70%";
                  leftOffset = "15%";
                } else if (isPrev) {
                  transform = "translateX(-60%) translateY(20px)";
                  zIndex = 2;
                  opacity = 0.7;
                  scale = 0.85;
                  width = isMobile ? "60%" : "55%";
                  leftOffset = "0%";
                } else if (isNext) {
                  transform = "translateX(60%) translateY(20px)";
                  zIndex = 2;
                  opacity = 0.7;
                  scale = 0.85;
                  width = isMobile ? "60%" : "55%";
                  leftOffset = "45%";
                } else {
                  transform = "translateX(0) translateY(40px)";
                  opacity = 0.4;
                  scale = 0.8;
                  width = isMobile ? "50%" : "45%";
                  leftOffset = "27.5%";
                }

                return (
                  <div
                    key={i}
                    className="card-slide"
                    style={{
                      position: "absolute",
                      top: "0",
                      left: leftOffset,
                      width: width,
                      height: "100%",
                      borderRadius: "18px",
                      overflow: "hidden",
                      boxShadow: `0 20px 50px rgba(0,0,0,${isActive ? 0.4 : 0.2})`,
                      border: isActive ? `3px solid ${slide.accent}` : "1px solid rgba(255,255,255,0.15)",
                      transform: transform,
                      opacity: opacity,
                      scale: scale,
                      zIndex: zIndex,
                      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer"
                    }}
                    onClick={() => setIndex(i)}
                  >
                    <img
                      src={slide.thumb}
                      alt={slide.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease"
                      }}
                    />
                    
                    {/* IMAGE OVERLAY - LIGHTER */}
                    <div style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent 80%)",
                      padding: isMobile ? "1.2rem" : "1.5rem",
                      color: "white"
                    }}>
                      <h5 style={{ 
                        margin: 0, 
                        fontWeight: "700",
                        fontSize: isMobile ? "1.1rem" : "1.3rem",
                        marginBottom: "4px"
                      }}>
                        {slide.title}
                      </h5>
                      <p style={{ 
                        opacity: 0.9, 
                        margin: 0,
                        fontSize: "0.9rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}>
                        <span>{slide.subtitle}</span>
                        {isActive && (
                          <StarFill size={14} color={slide.accent} />
                        )}
                      </p>
                    </div>

                    {/* ACTIVE INDICATOR */}
                    {isActive && (
                      <div style={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                        background: slide.accent,
                        color: "white",
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "700",
                        fontSize: "1.1rem",
                        boxShadow: `0 6px 20px ${slide.accent}80`
                      }}>
                        {i + 1}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* NAVIGATION CONTROLS */}
              <div style={{
                position: "absolute",
                bottom: isMobile ? "-50px" : "-60px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "20px",
                alignItems: "center",
                zIndex: 20
              }}>
                <button
                  onClick={prevSlide}
                  style={{
                    width: isMobile ? "44px" : "50px",
                    height: isMobile ? "44px" : "50px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    border: `2px solid ${slides[index].accent}`,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontSize: "1.1rem"
                  }}
                  className="hover-grow"
                >
                  <ChevronLeft size={20} />
                </button>

                <div style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center"
                }}>
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      style={{
                        width: i === index ? "35px" : "10px",
                        height: "4px",
                        borderRadius: "2px",
                        backgroundColor: i === index ? slides[index].accent : "rgba(255,255,255,0.4)",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        padding: 0
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  style={{
                    width: isMobile ? "44px" : "50px",
                    height: isMobile ? "44px" : "50px",
                    borderRadius: "50%",
                    background: slides[index].accent,
                    border: "none",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontSize: "1.1rem",
                    boxShadow: `0 6px 20px ${slides[index].accent}60`
                  }}
                  className="hover-grow"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* SLIDE COUNTER */}
              <div style={{
                position: "absolute",
                top: isMobile ? "-45px" : "-50px",
                left: "0",
                background: "rgba(255,255,255,0.12)",
                padding: "8px 16px",
                borderRadius: "12px",
                border: `1px solid ${slides[index].accent}40`,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backdropFilter: "blur(4px)"
              }}>
                <div style={{ 
                  background: slides[index].accent, 
                  color: "white", 
                  width: "32px", 
                  height: "32px", 
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontSize: "1rem"
                }}>
                  {index + 1}
                </div>
                <div>
                  <div style={{ fontSize: "0.85rem", opacity: 0.9 }}>Slide</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: "700", color: slides[index].accent }}>
                    {index + 1} / {slides.length}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* SCROLL DOWN INDICATOR */}
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "14px",
            opacity: 0.8,
            textAlign: "center",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px"
          }}
        >
         
          <div style={{
           
          }} />
            <ChevronDown
            style={{
              animation: "bounce 2s infinite",
              fontSize: "2.5rem",
              color: "white",
              opacity: 0.9
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .hover-grow:hover {
          transform: translateY(-2px) scale(1.05) !important;
        }
        
        .card-slide:hover {
          transform: translateX(0) translateY(-10px) scale(1.02) !important;
          box-shadow: 0 25px 60px rgba(0,0,0,0.5) !important;
          opacity: 0.95 !important;
        }
        
        /* RESPONSIVE STYLES */
        @media (max-width: 1200px) {
          .card-slide {
            width: 60% !important;
            left: 20% !important;
          }
          
          .card-slide.active {
            width: 65% !important;
            left: 17.5% !important;
          }
        }
        
        @media (max-width: 992px) {
          .card-stack-container {
            height: 350px !important;
            margin-top: 2rem;
          }
          
          .card-slide {
            width: 70% !important;
            left: 15% !important;
          }
          
          .card-slide.active {
            width: 75% !important;
            left: 12.5% !important;
          }
          
          h1 {
            font-size: 2.5rem !important;
          }
        }
        
        @media (max-width: 768px) {
          .card-stack-container {
            height: 300px !important;
          }
          
          .card-slide {
            width: 80% !important;
            left: 10% !important;
          }
          
          .card-slide.active {
            width: 85% !important;
            left: 7.5% !important;
          }
          
          h1 {
            font-size: 2.2rem !important;
          }
          
          p {
            font-size: 1rem !important;
          }
        }
        
        @media (max-width: 576px) {
          .card-stack-container {
            height: 250px !important;
          }
          
          h1 {
            font-size: 2rem !important;
          }
          
          .d-flex.flex-wrap {
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}