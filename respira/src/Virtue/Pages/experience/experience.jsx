import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import {
  Binoculars,
  Sun,
  PeopleFill,
  Compass,
  CupHotFill,
  HeartFill,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  XCircle,
  PlayCircle,
  PauseCircle
} from "react-bootstrap-icons";

const PRIMARY = "#2FB6A6";
const PRIMARY_LIGHT = "#4ECDC4";
const PRIMARY_DARK = "#1A998E";
const ACCENT = "#FF9F1C";
const BG_LIGHT = "#F9FDFC";

const experiences = [
  {
    title: "Safari & Marine Life",
    icon: Binoculars,
    image: "https://media.istockphoto.com/id/2198492232/photo/aerial-view-of-boats-anchored-near-pristine-white-sandy-beach-turquoise-waters-of-kizimkazi.webp?a=1&b=1&s=612x612&w=0&k=20&c=_Ozb1W7lRI__RYSAoIb3JLY720XHoS_1AOOrQxcHCw4=",
    description: "Marine safaris, dolphin tours, snorkeling, coral reefs, and unforgettable ocean adventures.",
    highlight: "Snorkeling & dolphins",
    color: "#4ECDC4",
    duration: "Half/Fullday",
    level: "All Levels"
  },
  {
    title: "Beaches & Relaxation",
    icon: Sun,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    description: "White sandy beaches, turquoise waters, swimming, sunbathing, and breathtaking sunsets.",
    highlight: "Pure relaxation",
    color: "#FF9F1C",
    duration: "Flexible",
    level: "Relaxing"
  },
  {
    title: "Culture & History",
    icon: PeopleFill,
    image: "https://images.unsplash.com/photo-1667650708785-2179a8eb2b70?auto=format&fit=crop&w=1200&q=80",
    description: "Explore Swahili culture, UNESCO Stone Town, spice farms, and traditional villages.",
    highlight: "Authentic Zanzibar",
    color: "#6C5CE7",
    duration: "4-8 hours",
    level: "Cultural"
  },
  {
    title: "Adventure & Exploration",
    icon: Compass,
    image: "https://images.unsplash.com/photo-1688904851329-c41d0a57f536?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFkdmVudHVyZSUyMGluJTIwemFuemliYXJ8ZW58MHx8MHx8fDA%3D",
    description: "Quad biking, cave swimming, forest walks, horseback riding, and adrenaline activities.",
    highlight: "Thrilling experiences",
    color: "#00B894",
    duration: "3-6 hours",
    level: "Adventurous"
  },
  {
    title: "Food & Local Life",
    icon: CupHotFill,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    description: "Seafood feasts, spice tasting, street food, cooking experiences, and village life.",
    highlight: "Taste Zanzibar",
    color: "#E17055",
    duration: "3-5 hours",
    level: "Culinary"
  },
  {
    title: "Sunset and Cruises",
    icon: HeartFill,
    image: "https://images.unsplash.com/photo-1737318824956-9a21f0f8fc7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3Vuc2V0JTIwY3J1aXNlcyUyMGluJTIwemFuemliYXJ8ZW58MHx8MHx8fDA%3D",
    description: "Sunset cruises, beach dinners, horseback sunsets, and honeymoon moments.",
    highlight: "Perfect for couples",
    color: "#FD79A8",
    duration: "2-4 hours",
    level: "Romantic"
  }
];

const injectStyles = () => {
  const styleId = 'experiences-styles';
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
      50% { opacity: 0.6; }
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

export default function Experiences() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragCurrent, setDragCurrent] = useState(0);
  const [screenSize, setScreenSize] = useState("desktop");
  const slideRef = useRef(null);

  const minSwipeDistance = 50;

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
    
    // Auto-advance slides
    let interval;
    if (isAutoPlaying && !isModalOpen) {
      interval = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, isModalOpen, activeIndex]);

  const isMobile = screenSize === "mobile";
  const isTablet = screenSize === "tablet";

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % experiences.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // Touch handlers
  const onTouchStart = (e) => {
    setIsAutoPlaying(false);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  // Mouse drag handlers
  const onMouseDown = (e) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    setDragStart(e.clientX);
    setDragCurrent(e.clientX);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    setDragCurrent(e.clientX);
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const dragDistance = dragStart - dragCurrent;
    if (Math.abs(dragDistance) > minSwipeDistance) {
      if (dragDistance > 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <section style={{ 
      padding: isMobile ? "40px 0 20px" : "80px 0", 
      background: `linear-gradient(180deg, ${BG_LIGHT} 0%, #ffffff 100%)`,
      position: "relative",
      overflow: "hidden"
    }}>
      
      {/* Background decorative elements */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "300px",
        background: `radial-gradient(circle at top right, ${PRIMARY}08 0%, transparent 70%)`,
        pointerEvents: "none"
      }} />

      <Container>
        {/* HEADER SECTION */}
        <div className="text-center mb-4">
          <Badge pill style={{ 
            background: `rgba(47, 182, 166, 0.15)`,
            color: PRIMARY_DARK,
            padding: "10px 24px",
            fontSize: "0.9rem",
            fontWeight: 700,
            letterSpacing: "1px",
            border: `1px solid ${PRIMARY}30`,
            marginBottom: "20px",
            backdropFilter: "blur(10px)"
          }}>
            ✨ EXPERIENCES & ACTIVITIES
          </Badge>

          <h2 style={{ 
            fontWeight: 900, 
            fontSize: isMobile ? "1.8rem" : isTablet ? "2.2rem" : "2.5rem",
            marginBottom: "15px",
            background: `linear-gradient(135deg, ${PRIMARY_DARK}, ${PRIMARY})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            How You Can Experience Zanzibar
          </h2>

          <p style={{
            maxWidth: "600px",
            margin: "0 auto 30px",
            color: "#555",
            lineHeight: 1.6,
            fontSize: isMobile ? "0.95rem" : "1rem"
          }}>
            Whether you seek adventure, culture, relaxation, or romance,
            Zanzibar offers unforgettable experiences tailored to every type of traveler.
          </p>
        </div>

        {/* COMPACT CAROUSEL */}
        <div style={{
          position: "relative",
          maxWidth: "1000px",
          margin: "0 auto 30px",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          background: "#fff"
        }}>
          {/* Main Slide Area */}
          <div 
            ref={slideRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            style={{
              position: "relative",
              height: isMobile ? "350px" : "450px",
              overflow: "hidden",
              cursor: isDragging ? "grabbing" : "grab"
            }}
          >
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${experiences[activeIndex].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: isDragging ? "none" : "transform 0.8s ease",
              transform: isDragging 
                ? `translateX(${dragCurrent - dragStart}px)`
                : "none"
            }}>
              {/* Gradient Overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)`
              }} />
              
              {/* Slide Info */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: isMobile ? "20px" : "30px",
                color: "white"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "15px",
                  marginBottom: "15px"
                }}>
                  <div style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: experiences[activeIndex].color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    boxShadow: `0 10px 30px ${experiences[activeIndex].color}80`,
                    flexShrink: 0,
                    marginTop: "5px"
                  }}>
                    {React.createElement(experiences[activeIndex].icon, { 
                      size: isMobile ? 22 : 24 
                    })}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontWeight: 800, 
                      fontSize: isMobile ? "1.4rem" : "1.8rem",
                      margin: 0,
                      lineHeight: 1.2
                    }}>
                      {experiences[activeIndex].title}
                    </h3>
                    <p style={{ 
                      fontSize: isMobile ? "0.9rem" : "1rem", 
                      opacity: 0.9,
                      marginTop: "8px",
                      lineHeight: 1.4,
                      marginBottom: "15px"
                    }}>
                      {experiences[activeIndex].description}
                    </p>
                    
                    {/* Experience Details */}
                    <div style={{
                      display: "flex",
                      gap: "15px",
                      flexWrap: "wrap"
                    }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "rgba(255,255,255,0.15)",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        backdropFilter: "blur(10px)"
                      }}>
                        <span style={{ fontSize: "0.8rem", opacity: 0.8 }}>Duration:</span>
                        <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                          {experiences[activeIndex].duration}
                        </span>
                      </div>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "rgba(255,255,255,0.15)",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        backdropFilter: "blur(10px)"
                      }}>
                        <span style={{ fontSize: "0.8rem", opacity: 0.8 }}>Level:</span>
                        <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                          {experiences[activeIndex].level}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Controls */}
            <div style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              right: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 10
            }}>
              {/* Slide Counter */}
              <div style={{
                background: "rgba(0,0,0,0.6)",
                color: "white",
                padding: "6px 15px",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: 600,
                backdropFilter: "blur(10px)"
              }}>
                {activeIndex + 1} / {experiences.length}
              </div>

              {/* Control Buttons */}
              <div style={{
                display: "flex",
                gap: "10px",
                alignItems: "center"
              }}>
                <Button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    border: "none",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: PRIMARY_DARK,
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                  }}
                >
                  {isAutoPlaying ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
                </Button>
                
                <Button
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    color: PRIMARY_DARK,
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 15px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                  }}
                >
                  <span>View All</span>
                  <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div style={{
            padding: "15px",
            background: "rgba(255,255,255,0.95)",
            borderTop: `1px solid rgba(47, 182, 166, 0.1)`,
            overflowX: "auto",
            WebkitOverflowScrolling: "touch"
          }}>
            <div style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              minWidth: "min-content"
            }}>
              {experiences.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    style={{
                      flex: "0 0 auto",
                      width: "80px",
                      height: "80px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      position: "relative",
                      border: `3px solid ${index === activeIndex ? item.color : 'transparent'}`,
                      padding: 0,
                      background: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      transform: index === activeIndex ? "scale(1.05)" : "scale(1)"
                    }}
                  >
                    <img
                      src={item.image}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: index === activeIndex ? "none" : "brightness(0.7)"
                      }}
                    />
                    <div style={{
                      position: "absolute",
                      bottom: "4px",
                      left: "4px",
                      background: item.color,
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white"
                    }}>
                      <Icon size={10} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation Controls Below Carousel */}
        <div className="d-flex justify-content-center align-items-center gap-4 mt-4 mb-4">
          {/* Previous Arrow */}
          <Button
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              background: "white",
              border: `2px solid ${PRIMARY}`,
              color: PRIMARY,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = PRIMARY;
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = PRIMARY;
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <ChevronLeft size={22} />
          </Button>
          
          {/* Indicators */}
          <div className="d-flex justify-content-center gap-2">
            {experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: index === activeIndex ? "35px" : "12px",
                  height: "12px",
                  borderRadius: index === activeIndex ? "6px" : "50%",
                  background: index === activeIndex 
                    ? `linear-gradient(90deg, ${experiences[index].color}, ${experiences[index].color}80)`
                    : "rgba(47, 182, 166, 0.3)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              />
            ))}
          </div>
          
          {/* Next Arrow */}
          <Button
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              background: "white",
              border: `2px solid ${PRIMARY}`,
              color: PRIMARY,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = PRIMARY;
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
              e.currentTarget.style.color = PRIMARY;
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <ChevronRight size={22} />
          </Button>
        </div>

        {/* Swipe Hint */}
        <div className="text-center mt-2 mb-4" style={{ color: "#888", fontSize: "0.9rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L1 12L7 7" />
              <path d="M1 12H23" />
              <path d="M17 7L23 12L17 17" />
            </svg>
            Swipe or drag to navigate • Click thumbnails to jump
          </span>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            style={{
              background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_LIGHT})`,
              border: "none",
              borderRadius: "50px",
              padding: "15px 45px",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "white",
              boxShadow: "0 15px 35px rgba(47, 182, 166, 0.3)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(47, 182, 166, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 15px 35px rgba(47, 182, 166, 0.3)";
            }}
          >
            Book Your Experience Now
            <ArrowRight className="ms-2" size={20} />
          </Button>
        </div>
      </Container>

      {/* Modal for Expanded View */}
      {isModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.9)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}>
          <div style={{
            position: "relative",
            width: "100%",
            maxWidth: "1000px",
            maxHeight: "90vh",
            background: "#fff",
            borderRadius: "20px",
            overflow: "hidden",
            animation: "fadeIn 0.3s ease"
          }}>
            {/* Close Button */}
            <Button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                zIndex: 1001,
                background: "rgba(0,0,0,0.6)",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                backdropFilter: "blur(10px)"
              }}
            >
              <XCircle size={24} />
            </Button>

            {/* Modal Content */}
            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              height: "100%"
            }}>
              {/* Image */}
              <div style={{
                backgroundImage: `url(${experiences[activeIndex].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: isMobile ? "300px" : "500px"
              }} />

              {/* Content */}
              <div style={{
                padding: isMobile ? "30px 20px" : "40px",
                overflowY: "auto"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  marginBottom: "25px"
                }}>
                  <div style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: experiences[activeIndex].color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white"
                  }}>
                    {React.createElement(experiences[activeIndex].icon, { size: 28 })}
                  </div>
                  <h3 style={{ 
                    fontWeight: 800, 
                    fontSize: isMobile ? "1.6rem" : "2rem",
                    margin: 0,
                    color: "#222"
                  }}>
                    {experiences[activeIndex].title}
                  </h3>
                </div>

                <p style={{ 
                  fontSize: "1.1rem", 
                  color: "#555",
                  lineHeight: 1.7,
                  marginBottom: "30px"
                }}>
                  {experiences[activeIndex].description}
                </p>

                {/* Modal Navigation */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "40px",
                  paddingTop: "20px",
                  borderTop: `2px solid rgba(47, 182, 166, 0.1)`
                }}>
                  <Button
                    onClick={prevSlide}
                    style={{
                      background: "transparent",
                      border: `2px solid ${PRIMARY}`,
                      color: PRIMARY,
                      borderRadius: "50px",
                      padding: "10px 25px",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    <ChevronLeft size={18} />
                    Previous
                  </Button>

                  <div style={{
                    display: "flex",
                    gap: "8px"
                  }}>
                    {experiences.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          background: index === activeIndex ? PRIMARY : "rgba(47, 182, 166, 0.3)",
                          border: "none",
                          cursor: "pointer"
                        }}
                      />
                    ))}
                  </div>

                  <Button
                    onClick={nextSlide}
                    style={{
                      background: PRIMARY,
                      border: "none",
                      color: "white",
                      borderRadius: "50px",
                      padding: "10px 25px",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    Next
                    <ChevronRight size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @media (max-width: 768px) {
          .modal-content {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}