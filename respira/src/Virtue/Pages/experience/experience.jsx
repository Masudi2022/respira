import React from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import {
  Binoculars,
  Sun,
  PeopleFill,
  Compass,
  CupHotFill,
  HeartFill,
  ArrowRight
} from "react-bootstrap-icons";

const PRIMARY = "#2FB6A6";

const experiences = [
  {
    title: "Safari & Marine Life",
    icon: Binoculars,
    image:
      "https://media.istockphoto.com/id/2198492232/photo/aerial-view-of-boats-anchored-near-pristine-white-sandy-beach-turquoise-waters-of-kizimkazi.webp?a=1&b=1&s=612x612&w=0&k=20&c=_Ozb1W7lRI__RYSAoIb3JLY720XHoS_1AOOrQxcHCw4=",
    description:
      "Marine safaris, dolphin tours, snorkeling, coral reefs, and unforgettable ocean adventures.",
    highlight: "Snorkeling & dolphins"
  },
  {
    title: "Beaches & Relaxation",
    icon: Sun,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    description:
      "White sandy beaches, turquoise waters, swimming, sunbathing, and breathtaking sunsets.",
    highlight: "Pure relaxation"
  },
  {
    title: "Culture & History",
    icon: PeopleFill,
    image:
      "https://images.unsplash.com/photo-1667650708785-2179a8eb2b70?auto=format&fit=crop&w=1200&q=80",
    description:
      "Explore Swahili culture, UNESCO Stone Town, spice farms, and traditional villages.",
    highlight: "Authentic Zanzibar"
  },
  {
    title: "Adventure & Exploration",
    icon: Compass,
    image:
      "https://images.unsplash.com/photo-1688904851329-c41d0a57f536?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFkdmVudHVyZSUyMGluJTIwemFuemliYXJ8ZW58MHx8MHx8fDA%3D",
    description:
      "Quad biking, cave swimming, forest walks, horseback riding, and adrenaline activities.",
    highlight: "Thrilling experiences"
  },
  {
    title: "Food & Local Life",
    icon: CupHotFill,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    description:
      "Seafood feasts, spice tasting, street food, cooking experiences, and village life.",
    highlight: "Taste Zanzibar"
  },
  {
    title: "Sunset and Cruises",
    icon: HeartFill,
    image:
      "https://images.unsplash.com/photo-1737318824956-9a21f0f8fc7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3Vuc2V0JTIwY3J1aXNlcyUyMGluJTIwemFuemliYXJ8ZW58MHx8MHx8fDA%3Dttps://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    description:
      "Sunset cruises, beach dinners, horseback sunsets, and honeymoon moments.",
    highlight: "Perfect for couples"
  }
];

export default function Experiences() {
  return (
    <section style={{ padding: "100px 0", background: "#f9fbfb" }}>
      <Container>
        {/* HEADER */}
        <div className="text-center mb-5">
          <Badge pill style={{ background: PRIMARY, padding: "10px 22px" }}>
            Experiences & Activities
          </Badge>

          <h2 style={{ fontWeight: 800, fontSize: "2.6rem" }}>
            How You Can Experience Zanzibar
          </h2>

          <p
            style={{
              maxWidth: "720px",
              margin: "15px auto",
              color: "#666",
              lineHeight: 1.7
            }}
          >
            Whether you seek adventure, culture, relaxation, or romance,
            Zanzibar offers unforgettable experiences tailored to every type of
            traveler.
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
                      <small style={{ opacity: 0.9 }}>
                        {item.highlight}
                      </small>
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
            Explore All Experiences <ArrowRight />
          </Button>
        </div>
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
