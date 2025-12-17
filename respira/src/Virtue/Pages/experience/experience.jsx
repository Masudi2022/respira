import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import {
  Binoculars,
  Sun,
  PeopleFill,
  Compass,
  CupHotFill
} from "react-bootstrap-icons";

const PRIMARY = "#2FB6A6";

const experiences = [
  {
    title: "Safari",
    icon: Binoculars,
    image:
      "https://images.unsplash.com/photo-1543248939-4296e1fea89b?auto=format&fit=crop&w=1200&q=80",
    description:
      "Wildlife adventures, marine safaris, snorkeling, and nature exploration across Zanzibar."
  },
  {
    title: "Beach",
    icon: Sun,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    description:
      "White sandy beaches, turquoise waters, sunbathing, swimming, and breathtaking sunsets."
  },
  {
    title: "Culture",
    icon: PeopleFill,
    image:
      "https://images.unsplash.com/photo-1667650708785-2179a8eb2b70?auto=format&fit=crop&w=1200&q=80",
    description:
      "Discover Swahili traditions, historic Stone Town, spice farms, and local communities."
  },
  {
    title: "Adventure",
    icon: Compass,
    image:
      "https://images.unsplash.com/photo-1609766418204-94aae83d8d9f?auto=format&fit=crop&w=1200&q=80",
    description:
      "Quad biking, cave swimming, horseback riding, and thrilling outdoor activities."
  },
  {
    title: "Food & Local Life",
    icon: CupHotFill,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    description:
      "Taste Zanzibar’s flavors through seafood, spices, street food, and village life."
  }
];

export default function Experiences() {
  return (
    <section style={{ padding: "100px 0", background: "#f9fbfb" }}>
      <Container>
        {/* HEADER */}
        <div className="text-center mb-5">
          <Badge pill style={{ background: PRIMARY, padding: "10px 20px" }}>
            What You Can Experience
          </Badge>
          <h2 style={{ fontWeight: 800, fontSize: "2.5rem" }}>
            Experiences & Activities
          </h2>
          <p style={{ maxWidth: "650px", margin: "15px auto", color: "#666" }}>
            Choose how you want to experience Zanzibar — adventure, culture, nature, or relaxation.
          </p>
        </div>

        {/* EXPERIENCE CARDS */}
        <Row className="g-4">
          {experiences.map((item, index) => {
            const Icon = item.icon;
            return (
              <Col key={index} lg={4} md={6}>
                <Card
                  className="experience-card"
                  style={{
                    border: "none",
                    borderRadius: "22px",
                    overflow: "hidden",
                    height: "100%",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                    transition: "all 0.4s ease"
                  }}
                >
                  {/* IMAGE */}
                  <div style={{ position: "relative", height: "240px" }}>
                    <Card.Img
                      src={item.image}
                      alt={item.title}
                      style={{ height: "100%", objectFit: "cover" }}
                    />

                    {/* OVERLAY */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.65), transparent 70%)"
                      }}
                    />

                    {/* ICON */}
                    <div
                      style={{
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: PRIMARY,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 8px 25px ${PRIMARY}80`
                      }}
                    >
                      <Icon size={22} />
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
                      <h5 style={{ fontWeight: 700 }}>{item.title}</h5>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <Card.Body style={{ padding: "25px" }}>
                    <Card.Text style={{ color: "#555", lineHeight: 1.6 }}>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      <style jsx>{`
        .experience-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </section>
  );
}
