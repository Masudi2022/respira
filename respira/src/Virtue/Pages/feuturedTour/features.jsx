import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Clock, CashStack, StarFill, ArrowRight, ShieldCheck, PeopleFill } from "react-bootstrap-icons";

const PRIMARY = "#2FB6A6";

const tours = [
  {
    title: "Nakupenda Island Day Trip",
    // price: "$60",
    duration: "Full Day",
    // rating: 4.9,
    image:
      "https://media.istockphoto.com/id/2236448463/photo/aerial-drone-footage-showcasing-the-stunning-white-sand-beaches-and-turquoise-waters-of.jpg?s=612x612&w=0&k=20&c=SCSnesKjrs3L80b3qECR3QNhscUfQjD96a4zrOV-fzA=",
    highlights: [
      "Visit giant tortoises",
      "Relax on Nakupenda sandbank",
      "Fresh seafood lunch",
      "Snorkeling experience"
    ],
    badge: "Best Seller"
  },
  {
    title: "Blue Safari Adventure",
    // price: "$50",
    duration: "Full Day",
    // rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1545583477-39bccc07119d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ymx1ZSUyMHNhZmFyaSUyMGluJTIwemFuemliYXJ8ZW58MHx8MHx8fDA%3D",
    highlights: [
      "Blue Lagoon snorkeling",
      "Seafood BBQ on sandbank",
      "Mangrove exploration",
      "Island hopping"
    ],
    badge: "Most Popular"
  },
  {
    title: "Stone Town & Spice Tour",
    // price: "$30",
    duration: "Half Day",
    // rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1667650708785-2179a8eb2b70?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "UNESCO Stone Town",
      "Local markets",
      "Spice plantation visit",
      "Professional local guide"
    ],
    badge: "Cultural Favorite"
  }
];

export default function FeaturedTours() {
  return (
    <section style={{ padding: "100px 0", background: "#ffffff" }}>
      <Container>
        {/* HEADER */}
        <div className="text-center mb-5">
          <Badge pill style={{ background: PRIMARY, padding: "10px 22px" }}>
            Featured Experiences
          </Badge>

          <h2 style={{ fontWeight: 800, fontSize: "2.6rem" }}>
            Best Tours & Experiences in Zanzibar
          </h2>

          <p
            style={{
              maxWidth: "720px",
              margin: "15px auto",
              color: "#666",
              lineHeight: 1.7
            }}
          >
            Carefully selected tours offering the perfect mix of adventure,
            culture, nature, and relaxation — guided by local experts for an
            unforgettable Zanzibar experience.
          </p>
        </div>

        {/* TRUST FEATURES */}
        <Row className="text-center mb-5 g-4">
          <Col md={4}>
            <ShieldCheck size={40} color={PRIMARY} />
            <h6 className="mt-3 fw-bold">Trusted Local Guides</h6>
            <p style={{ color: "#666" }}>
              Experienced guides with deep local knowledge and friendly service.
            </p>
          </Col>
          <Col md={4}>
            <StarFill size={40} color={PRIMARY} />
            <h6 className="mt-3 fw-bold">Top-Rated Tours</h6>
            <p style={{ color: "#666" }}>
              Highly rated experiences loved by travelers from around the world.
            </p>
          </Col>
          <Col md={4}>
            <PeopleFill size={40} color={PRIMARY} />
            <h6 className="mt-3 fw-bold">Small Groups & Comfort</h6>
            <p style={{ color: "#666" }}>
              Personalized tours designed for comfort, safety, and enjoyment.
            </p>
          </Col>
        </Row>

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
                  

                  {/* RATING */}
                  
                </div>

                {/* BODY */}
                <Card.Body style={{ padding: "25px" }}>
                  <h5 style={{ fontWeight: 700 }}>{tour.title}</h5>

                  {/* META */}
                  <div
                    className="d-flex gap-3 mb-3"
                    style={{ fontSize: "0.9rem", color: "#555" }}
                  >
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
                    View Tour Details <ArrowRight />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* CTA */}
        <div className="text-center mt-5">
          <Button
            style={{
              background: PRIMARY,
              border: "none",
              borderRadius: "50px",
              padding: "14px 36px",
              fontWeight: 700
            }}
          >
            View All Tours <ArrowRight />
          </Button>
        </div>
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
