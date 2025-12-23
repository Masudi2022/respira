import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { GeoAltFill, StarFill, ArrowRight, Clock, Sun } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const PRIMARY = "#008080";
const PRIMARY_LIGHT = "#00a8a8";
const SECONDARY = "#f4c95d";
const ACCENT = "#004d4d";
const BG_FADE = "#f5fbfb";

const destinations = [
  {
    id: "Nakupenda-Sandbank",
    title: "Nakupenda Sandbank",
    location: "Zanzibar",
    image: "https://media.istockphoto.com/id/2217360852/photo/aerial-view-of-nakupenda-island-sandbank-in-ocean-white-sandy-beach-boats-blue-sea-during-low.webp?a=1&b=1&s=612x612&w=0&k=20&c=fqRSjUoau0PDhGmsRxRGBUFnsKMJfHQJsVWBfMhLjRA=",
    description: "A breathtaking white sandbank in the Indian Ocean, ideal for swimming, snorkeling, and seafood lunches.",
    highlight: "Best for relaxation & photos",
    duration: "Half Day",
    bestTime: "Sunrise",
  },
  {
    id: "Mnemba-Atoll",
    title: "Mnemba Atoll",
    location: "North Zanzibar",
    image: "https://media.istockphoto.com/id/1215633044/photo/dolphins-in-the-ocean.webp?a=1&b=1&s=612x612&w=0&k=20&c=2sbDtxHiKiHORMrdw30TSTgxN1L_2sfYWSpyDzy50hk=",
    description: "Zanzibar's top snorkeling destination, famous for dolphins and crystal-clear turquoise waters.",
    highlight: "Best snorkeling & dolphins",
    duration: "Full Day",
    bestTime: "Morning",
  },
  {
    id: "Stone-Town",
    title: "Stone Town",
    location: "Zanzibar City",
    image: "https://images.unsplash.com/photo-1667650708785-2179a8eb2b70?auto=format&fit=crop&w=800&h=600&q=80",
    description: "UNESCO World Heritage Site rich in Swahili culture, historic landmarks, and local markets.",
    highlight: "Culture & history",
    duration: "Full Day",
    bestTime: "Afternoon",
  },
  {
    id: "Prison-Island",
    title: "Prison Island",
    location: "Zanzibar",
    image: "https://media.istockphoto.com/id/1621326544/photo/building-of-the-old-abandoned-prison-on-prison-island-zanzibar-in-tanzania.jpg?s=612x612&w=0&k=20&c=n91R-BttOi8a47evassTTlWSU-bk7uTSINI8wxYzA2U=",
    description: "Famous giant tortoises sanctuary with beautiful beaches and clear waters for swimming.",
    highlight: "Giant tortoises",
    duration: "Half Day",
    bestTime: "Morning",
  },
  {
    id: "Jozani-Forest",
    title: "Jozani Forest",
    location: "South Zanzibar",
    image: "https://images.unsplash.com/photo-1694960679151-8b2da9099d0c?auto=format&fit=crop&w=800&h=600&q=80",
    description: "Zanzibar's only national park, home to rare red colobus monkeys and lush tropical forest.",
    highlight: "Wildlife & nature",
    duration: "Half Day",
    bestTime: "Morning",
  },
  {
    id: "Kae-Beach",
    title: "Kae Beach",
    location: "South Zanzibar",
    image: "https://images.unsplash.com/photo-1563453778883-5bc2ad352c00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHN1biUyMHNldCUyMGNydWlzZSUyMGJlYWNoJTIwaW4lMjB6YW56aWJhcnxlbnwwfHwwfHx8MA%3D%3D",
    description: "Stunning beach famous for dramatic tides and unforgettable sunset views.",
    highlight: "Best sunset experience",
    duration: "Half Day",
    bestTime: "Sunset",
  },
];

export default function PopularDestinations() {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [screenSize, setScreenSize] = useState("desktop");

  useEffect(() => {
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

  const handleExploreClick = (destination) => {
    navigate(`/destination/${destination.id}`);
  };

  const isMobile = screenSize === "mobile";
  const isTablet = screenSize === "tablet";

  // Determine how many destinations to show initially
  const initialDestinationsCount = isMobile ? 2 : 3;
  const visibleDestinations = showAll 
    ? destinations 
    : destinations.slice(0, initialDestinationsCount);

  const handleViewAllDestinations = () => {
    navigate("/destinations");
  };

  return (
    <section
      style={{
        padding: "80px 0 60px",
        background: `linear-gradient(180deg, ${BG_FADE} 0%, #ffffff 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle decorative waves */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "400px",
          background: `radial-gradient(circle at top left, ${PRIMARY}10 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "100%",
          height: "300px",
          background: `radial-gradient(circle at bottom right, ${SECONDARY}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <Container>
        {/* Hero Title Section */}
        <div className="text-center mb-5">
          <Badge
            pill
            style={{
              background: `rgba(0,128,128,0.15)`,
              color: "#ffffff",
              padding: "12px 30px",
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: "1px",
              border: `1px solid ${PRIMARY}30`,
            }}
          >
            🌴 ZANZIBAR'S TOP DESTINATIONS
          </Badge>
          <h1
            style={{
              fontWeight: 900,
              fontSize: isMobile ? "2.5rem" : isTablet ? "3rem" : "3.5rem",
              margin: "30px 0 20px",
              background: `linear-gradient(135deg, ${ACCENT}, ${PRIMARY})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2,
            }}
          >
            Discover Paradise
          </h1>
          <p
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              fontSize: isMobile ? "1rem" : "1.2rem",
              color: "#555",
              lineHeight: 1.8,
            }}
          >
            From hidden sandbanks to ancient Stone Town, explore Zanzibar's most breathtaking locations hand-picked for unforgettable memories.
          </p>
        </div>

        {/* Destinations Grid */}
        <Row className="g-4">
          {visibleDestinations.map((place) => (
            <Col 
              key={place.id} 
              lg={showAll || !isMobile ? 4 : 6} 
              md={showAll || !isMobile ? 6 : 12}
            >
              <Card
                style={{
                  border: "none",
                  borderRadius: "20px",
                  overflow: "hidden",
                  height: "100%",
                  minHeight: "520px",
                  background: "#ffffff",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.08)",
                  transition: "all 0.4s ease",
                  cursor: "pointer",
                }}
                onClick={() => handleExploreClick(place)}
                className="destination-card"
              >
                <div style={{ position: "relative", height: "240px", overflow: "hidden" }}>
                  <Card.Img
                    src={place.image}
                    alt={place.title}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s ease",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "20px",
                      color: "white",
                      zIndex: 2,
                    }}
                  >
                    <h4 style={{ fontWeight: 800, fontSize: isMobile ? "1.3rem" : "1.5rem", margin: 0 }}>
                      {place.title}
                    </h4>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
                      <GeoAltFill color={SECONDARY} size={16} />
                      <span style={{ fontWeight: 500, fontSize: isMobile ? "0.9rem" : "1rem" }}>
                        {place.location}
                      </span>
                    </div>
                  </div>
                  {/* Highlight Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      background: `rgba(244,201,93,0.9)`,
                      color: ACCENT,
                      padding: "6px 12px",
                      borderRadius: "50px",
                      fontWeight: 700,
                      fontSize: isMobile ? "0.75rem" : "0.85rem",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {place.highlight}
                  </div>
                </div>

                <Card.Body style={{ padding: "25px" }}>
                  <p style={{ 
                    color: "#555", 
                    lineHeight: 1.7, 
                    marginBottom: "20px",
                    fontSize: isMobile ? "0.9rem" : "1rem"
                  }}>
                    {place.description}
                  </p>

                  <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Clock color={PRIMARY} size={16} />
                      <span style={{ color: ACCENT, fontWeight: 600, fontSize: "0.9rem" }}>
                        {place.duration}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Sun color={SECONDARY} size={16} />
                      <span style={{ color: ACCENT, fontWeight: 600, fontSize: "0.9rem" }}>
                        Best: {place.bestTime}
                      </span>
                    </div>
                  </div>

                  <RouterLink 
                    to={`/destination/${place.id}`} 
                    style={{ textDecoration: "none", width: "100%" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      style={{
                        width: "100%",
                        background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_LIGHT})`,
                        border: "none",
                        borderRadius: "50px",
                        padding: isMobile ? "12px 0" : "14px 0",
                        fontWeight: 700,
                        fontSize: isMobile ? "0.9rem" : "1rem",
                        color: "white",
                        boxShadow: "0 6px 20px rgba(0,128,128,0.25)",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,128,128,0.35)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,128,128,0.25)";
                      }}
                    >
                      Explore Destination
                      <ArrowRight size={isMobile ? 16 : 18} />
                    </Button>
                  </RouterLink>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Show More / Show Less Button */}
        <div className="text-center mt-5">
          <Button
            onClick={() => setShowAll(!showAll)}
            style={{
              background: "transparent",
              border: `2px solid ${PRIMARY}`,
              color: PRIMARY,
              borderRadius: "50px",
              padding: "12px 40px",
              fontWeight: 700,
              fontSize: "1rem",
              transition: "all 0.3s ease",
              marginRight: "15px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = PRIMARY;
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = PRIMARY;
            }}
          >
            {showAll ? "Show Less" : `Show ${destinations.length - initialDestinationsCount} More`}
            <ArrowRight className="ms-2" />
          </Button>

          {/* View All Destinations Button */}
          <Button
            onClick={handleViewAllDestinations}
            style={{
              background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_LIGHT})`,
              border: "none",
              color: "white",
              borderRadius: "50px",
              padding: "12px 40px",
              fontWeight: 700,
              fontSize: "1rem",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 25px rgba(0,128,128,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,128,128,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,128,128,0.3)";
            }}
          >
            View All Destinations
            <ArrowRight className="ms-2" />
          </Button>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-5">
          <div
            style={{
              background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_LIGHT})`,
              borderRadius: "25px",
              padding: isMobile ? "40px 25px" : "50px 40px",
              color: "white",
              boxShadow: "0 25px 50px rgba(0,128,128,0.25)",
              marginTop: "40px",
            }}
          >
            <h2 style={{ 
              fontWeight: 800, 
              fontSize: isMobile ? "2rem" : "2.5rem", 
              marginBottom: "20px" 
            }}>
              Ready to Explore Zanzibar?
            </h2>
            <p style={{ 
              maxWidth: "700px", 
              margin: "0 auto 30px", 
              fontSize: isMobile ? "1rem" : "1.1rem", 
              opacity: 0.9 
            }}>
              Let us craft your perfect island getaway with personalized itineraries and exclusive experiences.
            </p>
            <Button
              style={{
                background: "white",
                color: PRIMARY,
                border: "none",
                borderRadius: "50px",
                padding: isMobile ? "12px 30px" : "14px 40px",
                fontWeight: 800,
                fontSize: isMobile ? "0.95rem" : "1.05rem",
              }}
            >
              Plan My Trip <ArrowRight className="ms-2" />
            </Button>
          </div>
        </div>
      </Container>

      {/* Hover Animations */}
      <style jsx>{`
        .destination-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.12);
        }
        .destination-card:hover img {
          transform: scale(1.08);
        }
        @media (max-width: 768px) {
          .destination-card {
            min-height: 480px !important;
          }
          .destination-card:hover {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </section>
  );
}