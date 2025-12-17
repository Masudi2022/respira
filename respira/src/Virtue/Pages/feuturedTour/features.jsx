import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Clock, CashStack, StarFill, ArrowRight } from "react-bootstrap-icons";

const PRIMARY = "#2FB6A6";

const tours = [
  {
    title: "Nakupenda & Prison Island Tour",
    price: "$60",
    duration: "Full Day",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1544550581-1bcabf842b77?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Giant tortoises",
      "Sandbank experience",
      "Seafood lunch",
      "Snorkeling"
    ],
    badge: "Best Seller"
  },
  {
    title: "Blue Safari Adventure",
    price: "$50",
    duration: "Full Day",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1526481280691-3d3c9c0f1c4f?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Snorkeling",
      "Seafood BBQ",
      "Blue Lagoon",
      "Mangroves"
    ],
    badge: "Popular"
  },
  {
    title: "Stone Town & Spice Tour",
    price: "$30",
    duration: "Half Day",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1667650708785-2179a8eb2b70?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "UNESCO heritage",
      "Local markets",
      "Spice plantations",
      "Cultural guide"
    ],
    badge: "Special Offer"
  }
];

export default function FeaturedTours() {
  return (
    <section style={{ padding: "100px 0", background: "#ffffff" }}>
      <Container>
        {/* HEADER */}
        <div className="text-center mb-5">
          <Badge pill style={{ background: PRIMARY, padding: "10px 20px" }}>
            Best Deals
          </Badge>
          <h2 style={{ fontWeight: 800, fontSize: "2.5rem" }}>
            Featured Tours & Packages
          </h2>
          <p style={{ maxWidth: "650px", margin: "15px auto", color: "#666" }}>
            Our most loved tours and special offers designed to give you the best Zanzibar experience.
          </p>
        </div>

        {/* TOURS */}
        <Row className="g-4">
          {tours.map((tour, index) => (
            <Col key={index} lg={4} md={6}>
              <Card
                className="tour-card"
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
                    src={tour.image}
                    alt={tour.title}
                    style={{ height: "100%", objectFit: "cover" }}
                  />

                  {/* BADGE */}
                  <div
                    style={{
                      position: "absolute",
                      top: "15px",
                      left: "15px",
                      background: PRIMARY,
                      color: "white",
                      padding: "6px 14px",
                      borderRadius: "50px",
                      fontSize: "0.8rem",
                      fontWeight: 600
                    }}
                  >
                    {tour.badge}
                  </div>

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
                    <StarFill color={PRIMARY} size={14} /> {tour.rating}
                  </div>
                </div>

                {/* BODY */}
                <Card.Body style={{ padding: "25px" }}>
                  <h5 style={{ fontWeight: 700 }}>{tour.title}</h5>

                  {/* META */}
                  <div className="d-flex gap-3 mb-3" style={{ fontSize: "0.9rem", color: "#555" }}>
                    <span className="d-flex align-items-center gap-1">
                      <Clock /> {tour.duration}
                    </span>
                    <span className="d-flex align-items-center gap-1">
                      <CashStack /> {tour.price}
                    </span>
                  </div>

                  {/* HIGHLIGHTS */}
                  <ul style={{ paddingLeft: "18px", color: "#555" }}>
                    {tour.highlights.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <Button
                    className="mt-3"
                    style={{
                      background: PRIMARY,
                      border: "none",
                      borderRadius: "50px",
                      padding: "10px 22px",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    View Details <ArrowRight />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <style jsx>{`
        .tour-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </section>
  );
}
