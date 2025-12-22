import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { GeoAltFill, StarFill, ArrowRight, Clock, Sun } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const PRIMARY = "#008080";     // Deep teal
const PRIMARY_LIGHT = "#00a8a8"; // Lighter teal accent
const SECONDARY = "#f4c95d";    // Soft sandy gold
const ACCENT = "#004d4d";       // Dark teal for text
const BG_FADE = "#f5fbfb";      // Very light teal fade background

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

  const handleExploreClick = (destination) => {
    navigate(`/destination/${destination.id}`);
  };

  return (
    <section
      style={{
        padding: "140px 0 100px", // Extra top padding to clear fixed header
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
              fontSize: "4rem",
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
              fontSize: "1.2rem",
              color: "#555",
              lineHeight: 1.8,
            }}
          >
            From hidden sandbanks to ancient Stone Town, explore Zanzibar's most breathtaking locations hand-picked for unforgettable memories.
          </p>
        </div>

        {/* Destinations Grid */}
        <Row className="g-5">
          {destinations.map((place) => (
            <Col key={place.id} lg={4} md={6}>
              <Card
                style={{
                  border: "none",
                  borderRadius: "24px",
                  overflow: "hidden",
                  height: "100%",
                  background: "#ffffff",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                  transition: "all 0.5s ease",
                  cursor: "pointer",
                }}
                onClick={() => handleExploreClick(place)}
                className="destination-card"
              >
                <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
                  <Card.Img
                    src={place.image}
                    alt={place.title}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      transition: "transform 0.8s ease",
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
                      left: "25px",
                      color: "white",
                      zIndex: 2,
                    }}
                  >
                    <h4 style={{ fontWeight: 800, fontSize: "1.6rem", margin: 0 }}>
                      {place.title}
                    </h4>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
                      <GeoAltFill color={SECONDARY} size={18} />
                      <span style={{ fontWeight: 500 }}>{place.location}</span>
                    </div>
                  </div>
                  {/* Highlight Badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      background: `rgba(244,201,93,0.9)`,
                      color: ACCENT,
                      padding: "8px 16px",
                      borderRadius: "50px",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {place.highlight}
                  </div>
                </div>

                <Card.Body style={{ padding: "30px" }}>
                  <p style={{ color: "#555", lineHeight: 1.8, marginBottom: "25px" }}>
                    {place.description}
                  </p>

                  <div style={{ display: "flex", gap: "25px", marginBottom: "25px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Clock color={PRIMARY} size={18} />
                      <span style={{ color: ACCENT, fontWeight: 600 }}>{place.duration}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Sun color={SECONDARY} size={18} />
                      <span style={{ color: ACCENT, fontWeight: 600 }}>Best: {place.bestTime}</span>
                    </div>
                  </div>

                  <RouterLink to={`/destination/${place.id}`} style={{ textDecoration: "none", width: "100%" }}>
                    <Button
                      style={{
                        width: "100%",
                        background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_LIGHT})`,
                        border: "none",
                        borderRadius: "50px",
                        padding: "14px 0",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        color: "white",
                        boxShadow: "0 8px 25px rgba(0,128,128,0.3)",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,128,128,0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,128,128,0.3)";
                      }}
                    >
                      Explore This Destination
                      <ArrowRight size={20} />
                    </Button>
                  </RouterLink>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Bottom CTA */}
        <div className="text-center mt-5">
          <div
            style={{
              background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_LIGHT})`,
              borderRadius: "30px",
              padding: "60px 40px",
              color: "white",
              boxShadow: "0 30px 60px rgba(0,128,128,0.3)",
            }}
          >
            <h2 style={{ fontWeight: 800, fontSize: "2.8rem", marginBottom: "20px" }}>
              Ready to Explore Zanzibar?
            </h2>
            <p style={{ maxWidth: "700px", margin: "0 auto 40px", fontSize: "1.2rem", opacity: 0.9 }}>
              Let us craft your perfect island getaway with personalized itineraries and exclusive experiences.
            </p>
            <Button
              style={{
                background: "white",
                color: PRIMARY,
                border: "none",
                borderRadius: "50px",
                padding: "16px 40px",
                fontWeight: 800,
                fontSize: "1.1rem",
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
          transform: translateY(-12px);
          box-shadow: 0 35px 70px rgba(0,0,0,0.15);
        }
        .destination-card:hover img {
          transform: scale(1.12);
        }
        @media (max-width: 992px) {
          h1 { font-size: 3.2rem !important; }
        }
        @media (max-width: 768px) {
          .destination-card:hover {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </section>
  );
}