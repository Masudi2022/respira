import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { 
  ShieldCheck, 
  GlobeAmericas, 
  Headset, 
  CashStack,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Star,
  Award
} from "react-bootstrap-icons";

const PRIMARY = "#2FB6A6";
const PRIMARY_LIGHT = "#4ECDC4";
const PRIMARY_DARK = "#1A998E";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Trust Factors",
    text: "Transparent pricing, reliable service and officially licensed guides.",
    features: ["No Hidden Fees", "Licensed Guides", "Secure Payments"],
    stat: "100%"
  },
  {
    icon: GlobeAmericas,
    title: "Local Expertise",
    text: "We are local specialists who know Zanzibar's hidden gems, culture & tours.",
    features: ["Local Guides", "Hidden Gems", "Cultural Insights"],
    stat: "15+ Years"
  },
  {
    icon: Headset,
    title: "Safety & Support",
    text: "We provide safe transport, professional crew, and full customer support.",
    features: ["24/7 Support", "Safe Transport", "Insurance"],
    stat: "24/7"
  },
  {
    icon: CashStack,
    title: "Value for Money",
    text: "Best tour rates without compromising on experience or quality.",
    features: ["Best Prices", "No Compromise", "Quality Guaranteed"],
    stat: "40% Less"
  },
  {
    icon: Award,
    title: "Award Winning",
    text: "Recognized as best tour operator in Zanzibar for 3 consecutive years.",
    features: ["3x Award Winner", "Top Rated", "Expert Team"],
    stat: "🏆"
  },
  {
    icon: Star,
    title: "Premium Experience",
    text: "Luxury services, personalized itineraries, and VIP treatment.",
    features: ["VIP Treatment", "Personalized Tours", "Luxury Services"],
    stat: "5★"
  },
  {
    icon: Clock,
    title: "Instant Booking",
    text: "Quick confirmation, flexible scheduling, and easy modifications.",
    features: ["Instant Confirmation", "Flexible Dates", "Easy Changes"],
    stat: "5 Min"
  },
  {
    icon: CheckCircle,
    title: "Quality Guarantee",
    text: "Every experience is vetted and quality-checked for excellence.",
    features: ["Vetted Tours", "Quality Checks", "Excellence Promise"],
    stat: "100%"
  }
];

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const slideRef = useRef(null);
  
  const totalSlides = benefits.length;
  const minSwipeDistance = 50;
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setSlidesToShow(1);
      else if (width < 992) setSlidesToShow(2);
      else setSlidesToShow(4);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Auto-play carousel
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, activeIndex]);
  
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % Math.ceil(totalSlides / slidesToShow));
  };
  
  const prevSlide = () => {
    setActiveIndex((prev) => 
      prev === 0 ? Math.ceil(totalSlides / slidesToShow) - 1 : prev - 1
    );
  };
  
  const goToSlide = (index) => {
    setActiveIndex(index);
  };
  
  const totalSlideGroups = Math.ceil(totalSlides / slidesToShow);
  
  // Touch swipe handlers
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
  
  // Mouse drag handlers for desktop
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragCurrent, setDragCurrent] = useState(0);
  
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
      padding: "80px 0", 
      background: "linear-gradient(135deg, #F9FAFB 0%, #F0F9F8 100%)",
      position: "relative",
      overflow: "hidden"
    }}>
      
      {/* Background Elements */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "200px",
        background: `radial-gradient(circle at top center, ${PRIMARY}08 0%, transparent 70%)`,
        pointerEvents: "none"
      }} />
      
      <Container>
        {/* HEADER */}
        <div className="text-center mb-5">
          <Badge pill style={{ 
            background: `rgba(47, 182, 166, 0.15)`,
            color: PRIMARY_DARK,
            padding: "10px 25px",
            fontSize: "0.9rem",
            fontWeight: 700,
            letterSpacing: "1px",
            border: `1px solid ${PRIMARY}30`,
            marginBottom: "25px",
            backdropFilter: "blur(10px)"
          }}>
            ✨ WHY CHOOSE US
          </Badge>
          
          <h2 style={{ 
            fontWeight: 900, 
            fontSize: "2.8rem",
            marginBottom: "15px",
            background: `linear-gradient(135deg, ${PRIMARY_DARK}, ${PRIMARY})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Your Trusted Zanzibar Travel Partner
          </h2>
          
          <p style={{ 
            maxWidth: "700px", 
            margin: "0 auto 40px", 
            color: "#555",
            fontSize: "1.1rem",
            lineHeight: 1.6
          }}>
            We make your Zanzibar holiday hassle-free through expertise, support and unbeatable value.
          </p>
        </div>
        
        {/* CAROUSEL CONTAINER */}
        <div style={{ position: "relative" }}>
          {/* SLIDES */}
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
              overflow: "hidden",
              cursor: isDragging ? "grabbing" : "grab",
              borderRadius: "24px",
              transform: isDragging ? `translateX(${dragCurrent - dragStart}px)` : "none",
              transition: isDragging ? "none" : "transform 0.5s ease"
            }}
          >
            <div style={{
              display: "flex",
              transition: isDragging ? "none" : "transform 0.5s ease",
              transform: isDragging 
                ? `translateX(calc(-${activeIndex * (100 / slidesToShow)}% + ${dragCurrent - dragStart}px))`
                : `translateX(-${activeIndex * (100 / slidesToShow)}%)`
            }}>
              {benefits.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    style={{
                      flex: `0 0 ${100 / slidesToShow}%`,
                      padding: "10px"
                    }}
                  >
                    <Card
                      className="benefit-card"
                      style={{
                        border: "none",
                        borderRadius: "24px",
                        padding: "35px 25px",
                        height: "100%",
                        background: "white",
                        boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        overflow: "hidden",
                        userSelect: "none"
                      }}
                    >
                      {/* Stat Badge */}
                      <div style={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                        background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_LIGHT})`,
                        color: "white",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "0.9rem",
                        boxShadow: `0 8px 20px ${PRIMARY}40`
                      }}>
                        {item.stat}
                      </div>
                      
                      {/* Icon */}
                      <div style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "20px",
                        background: `rgba(47, 182, 166, 0.1)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "25px",
                        border: `1px solid ${PRIMARY}20`
                      }}>
                        <Icon size={32} color={PRIMARY} />
                      </div>
                      
                      {/* Title */}
                      <h5 style={{ 
                        fontWeight: 800, 
                        fontSize: "1.3rem",
                        marginBottom: "15px",
                        color: "#222"
                      }}>
                        {item.title}
                      </h5>
                      
                      {/* Description */}
                      <p style={{ 
                        marginBottom: "25px", 
                        fontSize: "0.95rem", 
                        color: "#555",
                        lineHeight: 1.6,
                        minHeight: "70px"
                      }}>
                        {item.text}
                      </p>
                      
                      {/* Features */}
                      <div style={{ borderTop: `1px solid ${PRIMARY}20`, paddingTop: "20px" }}>
                        {item.features.map((feature, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              marginBottom: "8px",
                              fontSize: "0.85rem",
                              color: "#666"
                            }}
                          >
                            <div style={{
                              width: "18px",
                              height: "18px",
                              borderRadius: "50%",
                              background: PRIMARY,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}>
                              <CheckCircle size={10} color="white" />
                            </div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Navigation Controls (Below Carousel) */}
<div className="d-flex justify-content-center align-items-center gap-4 mt-4">

  {/* Previous Arrow */}
  <Button
    onClick={prevSlide}
    onMouseEnter={() => setIsAutoPlaying(false)}
    className="nav-btn"
  >
    <ChevronLeft size={22} />
  </Button>

  {/* Indicators */}
  <div className="d-flex justify-content-center gap-2">
    {Array.from({ length: totalSlideGroups }).map((_, index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        style={{
          width: index === activeIndex ? "35px" : "12px",
          height: "12px",
          borderRadius: index === activeIndex ? "6px" : "50%",
          background:
            index === activeIndex
              ? `linear-gradient(90deg, ${PRIMARY}, ${PRIMARY_LIGHT})`
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
              className="nav-btn"
            >
              <ChevronRight size={22} />
            </Button>

          </div>

          {/* Swipe Hint */}
          <div
            className="text-center mt-3"
            style={{ color: "#888", fontSize: "0.9rem" }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 17L1 12L7 7" />
                <path d="M1 12H23" />
                <path d="M17 7L23 12L17 17" />
              </svg>
              Swipe or drag to navigate
            </span>
          </div>

        {/* Swipe Hint */}
        <div className="text-center mt-3" style={{ color: "#888", fontSize: "0.9rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L1 12L7 7" />
              <path d="M1 12H23" />
              <path d="M17 7L23 12L17 17" />
            </svg>
            Swipe or drag to navigate
          </span>
        </div>
        
        {/* CTA BUTTON */}
        <div className="text-center mt-5">
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
            Start Planning Your Trip
            <ChevronRight className="ms-2" size={20} />
          </Button>
        </div>
        
        {/* STATS BAR */}
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "30px",
          marginTop: "50px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
          border: `1px solid ${PRIMARY}20`
        }}>
          <Row className="text-center">
            <Col md={3} sm={6}>
              <div style={{ fontSize: "2.5rem", fontWeight: 900, color: PRIMARY }}>5,000+</div>
              <div style={{ color: "#666", fontWeight: 600 }}>Happy Travelers</div>
            </Col>
            <Col md={3} sm={6}>
              <div style={{ fontSize: "2.5rem", fontWeight: 900, color: PRIMARY }}>200+</div>
              <div style={{ color: "#666", fontWeight: 600 }}>Tours & Activities</div>
            </Col>
            <Col md={3} sm={6}>
              <div style={{ fontSize: "2.5rem", fontWeight: 900, color: PRIMARY }}>15+</div>
              <div style={{ color: "#666", fontWeight: 600 }}>Years Experience</div>
            </Col>
            <Col md={3} sm={6}>
              <div style={{ fontSize: "2.5rem", fontWeight: 900, color: PRIMARY }}>4.9★</div>
              <div style={{ color: "#666", fontWeight: 600 }}>Customer Rating</div>
            </Col>
          </Row>
        </div>
      </Container>
      
      {/* Custom CSS */}
      <style jsx>{`
        .benefit-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }
        
        @media (max-width: 768px) {
          .benefit-card {
            padding: 25px 20px !important;
          }
          
          .benefit-card:hover {
            transform: translateY(-5px);
          }
        }
        
        /* Prevent text selection during drag */
        .benefit-card * {
          user-select: none;
        }
      `}</style>
    </section>
  );
}