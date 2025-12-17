import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import {
  GeoAltFill,
  StarFill,
  ArrowRight
} from "react-bootstrap-icons";

const PRIMARY = "#2FB6A6";

const destinations = [
  {
    title: "Nakupenda Sandbank",
    location: "Zanzibar",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1544550581-1bcabf842b77?auto=format&fit=crop&w=1200&q=80",
    description:
      "A stunning white sandbank surrounded by crystal-clear waters, perfect for relaxation and snorkeling."
  },
  {
    title: "Mnemba Atoll",
    location: "North Zanzibar",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    description:
      "A private marine paradise known for dolphins, coral reefs, and turquoise waters."
  },
  {
    title: "Stone Town",
    location: "Zanzibar City",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1667650708785-2179a8eb2b70?auto=format&fit=crop&w=1200&q=80",
    description:
      "A UNESCO World Heritage Site rich in history, culture, and Swahili architecture."
  }
];

export default function PopularDestinations() {
  return (
    <section style={{ padding: "100px 0", background: "#f9fbfb" }}>
      <Container>
        {/* SECTION HEADER */}
        <div className="text-center mb-5">
          <Badge
            pill
            style={{
              background: PRIMARY,
              padding: "10px 20px",
              fontSize: "0.85rem",
              marginBottom: "15px"
            }}
          >
            Top Places to Visit
          </Badge>
          <h2 style={{ fontWeight: 800, fontSize: "2.5rem" }}>
            Popular Destinations
          </h2>
          <p style={{ maxWidth: "600px", margin: "15px auto", color: "#666" }}>
            Explore Zanzibar’s most loved destinations — where nature, culture,
            and unforgettable experiences meet.
          </p>
        </div>

        {/* DESTINATION CARDS */}
        <Row className="g-4">
          {destinations.map((place, index) => (
            <Col key={index} lg={4} md={6}>
              <Card
                className="destination-card"
                style={{
                  border: "none",
                  borderRadius: "20px",
                  overflow: "hidden",
                  height: "100%",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                  transition: "all 0.4s ease"
                }}
              >
                {/* IMAGE */}
                <div style={{ position: "relative", height: "260px" }}>
                  <Card.Img
                    src={place.image}
                    alt={place.title}
                    style={{
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />

                  {/* IMAGE OVERLAY */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.65), transparent 70%)"
                    }}
                  />

                  {/* RATING */}
                  <div
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      background: "white",
                      padding: "6px 12px",
                      borderRadius: "50px",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <StarFill color={PRIMARY} size={14} />
                    {place.rating}
                  </div>

                  {/* TITLE */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "20px",
                      color: "white"
                    }}
                  >
                    <h5 style={{ fontWeight: 700, marginBottom: "4px" }}>
                      {place.title}
                    </h5>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.9rem",
                        opacity: 0.9
                      }}
                    >
                      <GeoAltFill />
                      {place.location}
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <Card.Body style={{ padding: "25px" }}>
                  <Card.Text style={{ color: "#555", lineHeight: 1.6 }}>
                    {place.description}
                  </Card.Text>

                  <Button
                    variant="outline-dark"
                    className="mt-3"
                    style={{
                      borderRadius: "50px",
                      padding: "10px 22px",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      borderColor: PRIMARY,
                      color: PRIMARY
                    }}
                  >
                    Explore <ArrowRight />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* HOVER EFFECT */}
      <style jsx>{`
        .destination-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </section>
  );
}
