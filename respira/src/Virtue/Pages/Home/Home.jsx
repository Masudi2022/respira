import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  StarFill,
  ArrowRight,
  PauseFill,
  PlayFill,
  CircleFill
} from "react-bootstrap-icons";

/* COLORS */
const PRIMARY_WHITE = "#FFFFFF";
const TEAL_ACCENT = "#2FB6A6";
const TEAL_DARK = "#1A8376";
const TEAL_LIGHT = "#8BD3CF";

/* SLIDES - Updated to use same image for both background and card */
const slides = [
  {
    title: "ZANZIBAR",
    subtitle: "Respira Zanzibar",
    description: "Discover pristine beaches, turquoise waters, and the calm tropical soul of Zanzibar. A perfect escape to breathe, relax, and explore paradise.",
    tag: "Tropical Paradise",
    image: "https://images.unsplash.com/photo-1628531895969-df353541bafe?auto=format&fit=crop&w=2400&q=80",
  },
  {
    title: "INDIAN OCEAN",
    subtitle: "Pure Blue",
    description: "Crystal-clear waters and endless horizons make Zanzibar one of the most spectacular island destinations in the world.",
    tag: "Ocean View",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80",
  },
  {
    title: "STONE TOWN",
    subtitle: "Culture & History",
    description: "Stone Town is a living museum of Swahili culture, rich in history, traditions, and timeless architecture waiting to be discovered.",
    tag: "Historic Heritage",
    image: "https://images.unsplash.com/photo-1667650708785-2179a8eb2b70?auto=format&fit=crop&w=2400&q=80",
  },
];

// Create a style element for our animations
const injectStyles = () => {
  const styleId = 'respira-styles';
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
    
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }
    
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.6; box-shadow: 0 0 10px #2FB6A6, 0 0 20px #2FB6A6; }
      50% { opacity: 1; box-shadow: 0 0 20px #2FB6A6, 0 0 40px #2FB6A6; }
    }
    
    @keyframes card-float {
      0%, 100% { transform: translateY(0) translateX(var(--offset-x)) scale(var(--scale)); }
      50% { transform: translateY(-5px) translateX(var(--offset-x)) scale(var(--scale)); }
    }
    
    .glow-text {
      background: linear-gradient(90deg, #FFFFFF 0%, #2FB6A6 25%, #FFFFFF 50%, #2FB6A6 75%, #FFFFFF 100%);
      background-size: 200% auto;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 3s linear infinite;
    }
    
    .active-card {
      animation: card-float 3s ease-in-out infinite !important;
    }
  `;
  document.head.appendChild(styleElement);
};

export default function RespiraHome() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [screenSize, setScreenSize] = useState("desktop");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Inject styles when component mounts
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

  const transitionToSlide = (newIndex) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex(newIndex);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsTransitioning(false), 800);
  };

  useEffect(() => {
    if (!isPlaying || isTransitioning) return;
    const interval = setInterval(() => {
      transitionToSlide((index + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, isTransitioning, index]);

  const nextSlide = () => transitionToSlide((index + 1) % slides.length);
  const prevSlide = () => transitionToSlide((index - 1 + slides.length) % slides.length);
  const goToSlide = (i) => transitionToSlide(i);
  const togglePlay = () => setIsPlaying(!isPlaying);

  const isMobile = screenSize === "mobile";
  const isTablet = screenSize === "tablet";

  const cardWidth = isMobile ? "280px" : isTablet ? "320px" : "360px";
  const cardHeight = isMobile ? "350px" : isTablet ? "400px" : "450px";
  const cardOffset = isMobile ? 15 : isTablet ? 20 : 25;
  const titleSize = isMobile ? "2.8rem" : isTablet ? "3.8rem" : "4.5rem";
  const descriptionSize = isMobile ? "1.1rem" : isTablet ? "1.2rem" : "1.3rem";
  const buttonPadding = isMobile ? "14px 32px" : isTablet ? "16px 40px" : "18px 48px";

  const currentSlide = slides[index];

  return (
    <section
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${currentSlide.image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        color: PRIMARY_WHITE,
        position: "relative",
        overflow: "hidden",
        transition: "background-image 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Enhanced overlay with gradient animation */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(47, 182, 166, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(26, 131, 118, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 100%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Floating particles effect */}
      {!isMobile && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "2px",
                height: "2px",
                background: TEAL_ACCENT,
                borderRadius: "50%",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                filter: "blur(1px)",
                boxShadow: `0 0 20px ${TEAL_ACCENT}, 0 0 40px ${TEAL_ACCENT}`,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      )}

      <Container fluid className="px-lg-5 px-3">
        <Row className="align-items-center min-vh-100">
          {/* CARD CAROUSEL - Left */}
          <Col lg={5} md={12} className={isMobile ? "mb-5" : "mb-lg-0"} style={{ order: isMobile ? 1 : 0 }}>
            <div style={{ position: "relative", height: isMobile ? "380px" : isTablet ? "55vh" : "75vh", perspective: "1200px" }}>
              {/* 3D Carousel Container */}
              <div style={{ 
                position: "relative", 
                height: "100%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
              }}>
                {slides.map((slide, i) => {
                  const isActive = i === index;
                  const distance = Math.abs(i - index);
                  const offset = (i - index) * cardOffset;
                  const scale = isActive ? 1 : 0.88;
                  const opacity = isActive ? 1 : 0.65;
                  const zIndex = slides.length - distance;

                  return (
                    <div
                      key={i}
                      onClick={() => goToSlide(i)}
                      onMouseEnter={() => setHoveredCard(i)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        position: "absolute",
                        width: cardWidth,
                        height: cardHeight,
                        transform: `
                          translateX(${offset}px) 
                          scale(${scale}) 
                          rotateY(${isActive ? 0 : hoveredCard === i ? 3 : 0}deg)
                        `,
                        opacity,
                        zIndex,
                        transition: "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        cursor: "pointer",
                        animation: isActive ? 'card-float 3s ease-in-out infinite' : 'none',
                      }}
                    >
                      {/* Enhanced card with inner glow */}
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundImage: `url(${slide.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "24px",
                          overflow: "hidden",
                          position: "relative",
                          border: isActive ? `2px solid ${TEAL_ACCENT}` : "1px solid rgba(255,255,255,0.15)",
                          boxShadow: isActive
                            ? `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(47,182,166,0.4), inset 0 0 30px rgba(47,182,166,0.2)`
                            : "0 20px 50px rgba(0,0,0,0.3)",
                        }}
                      >
                        {/* Inner gradient overlay */}
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `
                              linear-gradient(
                                to top, 
                                rgba(0,0,0,0.95) 0%, 
                                transparent 40%, 
                                transparent 60%, 
                                rgba(47,182,166,0.1) 100%
                              )`,
                            padding: isMobile ? "24px" : "28px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                          }}
                        >
                          {/* Enhanced tag */}
                          <div
                            style={{
                              background: isActive 
                                ? `linear-gradient(90deg, ${TEAL_DARK}, ${TEAL_ACCENT})`
                                : `rgba(47, 182, 166, 0.95)`,
                              color: PRIMARY_WHITE,
                              padding: "10px 24px",
                              borderRadius: "30px",
                              fontSize: "13px",
                              fontWeight: "700",
                              display: "inline-block",
                              marginBottom: "20px",
                              alignSelf: "flex-start",
                              letterSpacing: "1px",
                              textTransform: "uppercase",
                              border: isActive ? `1px solid rgba(255,255,255,0.3)` : "none",
                              boxShadow: isActive ? `0 4px 20px rgba(47,182,166,0.4)` : "none",
                              transition: "all 0.3s ease",
                            }}
                          >
                            {slide.tag}
                          </div>
                          
                          <h3 style={{ 
                            fontSize: isMobile ? "1.6rem" : "2rem", 
                            fontWeight: "900", 
                            color: PRIMARY_WHITE,
                            letterSpacing: "0.5px",
                            marginBottom: "8px",
                            textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
                          }}>
                            {slide.title}
                          </h3>
                          
                          {/* Active indicator with glow */}
                          {isActive && (
                            <div style={{ 
                              position: "absolute", 
                              top: "28px", 
                              right: "28px", 
                              width: "12px", 
                              height: "12px", 
                              borderRadius: "50%", 
                              background: TEAL_ACCENT,
                              boxShadow: `0 0 20px ${TEAL_ACCENT}, 0 0 40px ${TEAL_ACCENT}`,
                              animation: "pulse-glow 2s infinite",
                            }} />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Enhanced Navigation Controls */}
              <div style={{ 
                position: "absolute", 
                bottom: isMobile ? "-60px" : "-70px", 
                left: "50%", 
                transform: "translateX(-50%)",
                display: "flex", 
                alignItems: "center", 
                gap: isMobile ? "15px" : "25px",
                zIndex: 100,
              }}>
                <Button
                  onClick={prevSlide}
                  style={{
                    width: isMobile ? "44px" : "52px",
                    height: isMobile ? "44px" : "52px",
                    borderRadius: "50%",
                    border: `2px solid rgba(255,255,255,0.3)`,
                    background: "rgba(0,0,0,0.3)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    color: PRIMARY_WHITE,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = `2px solid ${TEAL_ACCENT}`;
                    e.currentTarget.style.background = "rgba(47,182,166,0.2)";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = `2px solid rgba(255,255,255,0.3)`;
                    e.currentTarget.style.background = "rgba(0,0,0,0.3)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <ChevronLeft size={isMobile ? 18 : 22} />
                </Button>

                <div style={{ display: "flex", gap: "8px" }}>
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      style={{
                        width: i === index ? "28px" : "12px",
                        height: "12px",
                        borderRadius: i === index ? "8px" : "50%",
                        background: i === index 
                          ? `linear-gradient(90deg, ${TEAL_ACCENT}, ${TEAL_LIGHT})`
                          : "rgba(255,255,255,0.3)",
                        border: "none",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>

                <Button
                  onClick={nextSlide}
                  style={{
                    width: isMobile ? "44px" : "52px",
                    height: isMobile ? "44px" : "52px",
                    borderRadius: "50%",
                    border: `2px solid rgba(255,255,255,0.3)`,
                    background: "rgba(0,0,0,0.3)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    color: PRIMARY_WHITE,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.border = `2px solid ${TEAL_ACCENT}`;
                    e.currentTarget.style.background = "rgba(47,182,166,0.2)";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.border = `2px solid rgba(255,255,255,0.3)`;
                    e.currentTarget.style.background = "rgba(0,0,0,0.3)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <ChevronRight size={isMobile ? 18 : 22} />
                </Button>
              </div>
            </div>
          </Col>

          {/* CONTENT - Right Side with Enhanced Visuals */}
          <Col lg={7} md={12} className={isMobile ? "mt-5" : ""} style={{ order: isMobile ? 2 : 1 }}>
            <div
              style={{
                maxWidth: "720px",
                marginLeft: "auto",
                marginRight: isMobile ? "auto" : "0",
                textAlign: isMobile ? "center" : "left",
                position: "relative",
              }}
            >
              {/* Glassmorphism background with gradient border */}
              <div
                style={{
                  position: "absolute",
                  top: "-40px",
                  bottom: "-40px",
                  left: isMobile ? "-20px" : "-60px",
                  right: "-40px",
                  background: "rgba(0, 0, 0, 0.35)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "32px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  zIndex: -1,
                  boxShadow: `
                    inset 0 1px 0 rgba(255,255,255,0.1),
                    0 25px 80px rgba(0,0,0,0.5),
                    0 0 0 1px rgba(47,182,166,0.1)
                  `,
                  overflow: "hidden",
                }}
              >
                {/* Animated gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: `linear-gradient(90deg, transparent, ${TEAL_ACCENT}, transparent)`,
                    animation: "shimmer 3s linear infinite",
                  }}
                />
              </div>

              <div style={{ position: "relative", padding: "48px 56px" }}>
                {/* Enhanced title with gradient text */}
                <h1
                  className={isPlaying ? "glow-text" : ""}
                  style={{
                    fontSize: titleSize,
                    fontWeight: "900",
                    lineHeight: 1.1,
                    marginBottom: "28px",
                    color: PRIMARY_WHITE,
                    textShadow: `
                      3px 3px 15px rgba(0,0,0,0.9),
                      0 0 20px rgba(47,182,166,0.3)
                    `,
                    letterSpacing: isMobile ? "-0.5px" : "-1px",
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  {currentSlide.title}
                  {/* Underline effect */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-10px",
                      left: 0,
                      width: "120px",
                      height: "4px",
                      background: `linear-gradient(90deg, ${TEAL_ACCENT}, transparent)`,
                      borderRadius: "2px",
                    }}
                  />
                </h1>

                {/* Enhanced subtitle */}
                <div
                  style={{
                    color: TEAL_ACCENT,
                    fontSize: isMobile ? "1.4rem" : "2rem",
                    fontWeight: "700",
                    marginBottom: "36px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    justifyContent: isMobile ? "center" : "flex-start",
                    textShadow: "0 0 10px rgba(47,182,166,0.3)",
                  }}
                >
                  <CircleFill 
                    size={isMobile ? 10 : 12} 
                    style={{ 
                      animation: "pulse 2s infinite",
                      filter: `drop-shadow(0 0 8px ${TEAL_ACCENT})`
                    }} 
                  />
                  <span style={{ 
                    background: `linear-gradient(90deg, ${TEAL_ACCENT}, ${TEAL_LIGHT})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 800,
                  }}>
                    {currentSlide.subtitle}
                  </span>
                </div>

                {/* Enhanced description */}
                <p
                  style={{
                    fontSize: descriptionSize,
                    lineHeight: 1.9,
                    color: "rgba(255,255,255,0.95)",
                    fontWeight: "500",
                    marginBottom: "40px",
                    maxWidth: "600px",
                    marginLeft: isMobile ? "auto" : "0",
                    marginRight: isMobile ? "auto" : "0",
                    textShadow: "1px 1px 8px rgba(0,0,0,0.9)",
                    position: "relative",
                    paddingLeft: isMobile ? "0" : "20px",
                    borderLeft: isMobile ? "none" : `3px solid ${TEAL_ACCENT}`,
                  }}
                >
                  {currentSlide.description}
                </p>

                {/* Enhanced Rating */}
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "15px", 
                  marginBottom: "36px",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {[...Array(5)].map((_, i) => (
                      <StarFill 
                        key={i} 
                        size={22} 
                        style={{ 
                          color: TEAL_ACCENT,
                          filter: "drop-shadow(0 0 6px rgba(47,182,166,0.5))",
                          animation: i < 4 ? `pulse ${1 + i * 0.2}s infinite ${i * 0.1}s` : "none"
                        }} 
                      />
                    ))}
                  </div>
                  <span style={{ 
                    color: "rgba(255,255,255,0.9)", 
                    fontWeight: "600",
                    fontSize: "1.1rem",
                    textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                  }}>
                    4.8 • 2,458 Reviews
                  </span>
                </div>

                {/* Enhanced Buttons */}
                <div style={{ 
                  display: "flex", 
                  gap: "20px", 
                  justifyContent: isMobile ? "center" : "flex-start", 
                  flexWrap: "wrap",
                  position: "relative",
                  zIndex: 2,
                }}>
                  <Button
                    style={{
                      padding: buttonPadding,
                      background: `linear-gradient(135deg, ${TEAL_ACCENT} 0%, ${TEAL_DARK} 100%)`,
                      border: "none",
                      borderRadius: "50px",
                      fontWeight: "700",
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: `0 10px 30px rgba(47,182,166,0.4)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = `0 15px 40px rgba(47,182,166,0.6)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = `0 10px 30px rgba(47,182,166,0.4)`;
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      Book Now
                      <ArrowRight size={20} />
                    </span>
                  </Button>

                  <Button
                    onClick={togglePlay}
                    style={{
                      padding: buttonPadding,
                      background: "rgba(255,255,255,0.1)",
                      border: `2px solid rgba(255,255,255,0.3)`,
                      borderRadius: "50px",
                      fontWeight: "700",
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                      e.currentTarget.style.border = `2px solid ${TEAL_ACCENT}`;
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.border = `2px solid rgba(255,255,255,0.3)`;
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {isPlaying ? (
                        <>
                          <PauseFill size={20} />
                          Pause
                        </>
                      ) : (
                        <>
                          <PlayFill size={20} />
                          Play Slideshow
                        </>
                      )}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Enhanced Scroll Indicator */}
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            animation: "float 2s ease-in-out infinite",
            cursor: "pointer",
          }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          <div
            style={{
              width: "50px",
              height: "80px",
              border: `2px solid rgba(47,182,166,0.5)`,
              borderRadius: "25px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              backdropFilter: "blur(10px)",
              background: "rgba(0,0,0,0.2)",
            }}
          >
            <ChevronDown 
              size={24} 
              style={{ 
                color: TEAL_ACCENT,
                animation: "pulse 1.5s infinite",
              }} 
            />
            <div
              style={{
                position: "absolute",
                top: "15px",
                width: "4px",
                height: "15px",
                background: TEAL_ACCENT,
                borderRadius: "2px",
                animation: "pulse 1.5s infinite 0.5s",
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}