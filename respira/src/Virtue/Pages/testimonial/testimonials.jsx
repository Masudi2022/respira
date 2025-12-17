import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";

const PRIMARY = "#2FB6A6";

const testimonials = [
  {
    name: "Emily Johnson",
    country: "USA",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=60",
    rating: 5,
    review:
      "Amazing experience! The guides were super friendly and Zanzibar was even more beautiful than expected."
  },
  {
    name: "Mark Thompson",
    country: "UK",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=60",
    rating: 4,
    review:
      "Loved the tours, especially Nakupenda sandbank. Great price and smooth organization."
  },
  {
    name: "Amina Yusuf",
    country: "Kenya",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=60",
    rating: 5,
    review:
      "Top-notch service. I felt safe and supported all the way. I highly recommend booking with them!"
  },
  {
    name: "Sebastian Müller",
    country: "Germany",
    image:
      "https://images.unsplash.com/photo-1548167415-4c2e72c3302b?auto=format&fit=crop&w=400&q=60",
    rating: 5,
    review:
      "Very organized and professional! The Blue Safari was the highlight of my trip."
  }
];

export default function Testimonials() {
  return (
    <div style={{ background: "#ffffff" }}>
      {/* HERO */}
      <section
        style={{
          padding: "120px 0",
          background:
            "linear-gradient( rgba(0,0,0,0.45), rgba(0,0,0,0.45) ), url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80') center/cover no-repeat",
          color: "white",
          textAlign: "center"
        }}
      >
        <Container>
          <h1 style={{ fontWeight: 800, fontSize: "3rem" }}>What Travelers Say</h1>
          <p style={{ maxWidth: 650, margin: "15px auto", fontSize: "1.2rem" }}>
            Real experiences from real people — trusted by thousands of happy explorers.
          </p>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 0" }}>
        <Container>
          <div className="text-center mb-5">
            <Badge pill style={{ background: PRIMARY, padding: "10px 20px" }}>
              Testimonials
            </Badge>
            <h2 style={{ fontWeight: 800, fontSize: "2.3rem", marginTop: 15 }}>
              Trusted by Travelers Worldwide
            </h2>
            <p style={{ maxWidth: 650, margin: "10px auto", color: "#555" }}>
              We pride ourselves on excellent service, comfort, and unforgettable adventures.
            </p>
          </div>

          <Row className="g-4">
            {testimonials.map((t, i) => (
              <Col key={i} lg={3} md={4} sm={6}>
                <Card
                  className="testimonial-card text-center"
                  style={{
                    border: "none",
                    padding: "25px",
                    borderRadius: "22px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                    height: "100%",
                    transition: "0.3s"
                  }}
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    style={{
                      width: "95px",
                      height: "95px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginBottom: "15px",
                      border: `3px solid ${PRIMARY}`
                    }}
                  />

                  <h5 style={{ fontWeight: 800 }}>{t.name}</h5>
                  <p style={{ fontWeight: 500, color: PRIMARY }}>{t.country}</p>

                  {/* RATING */}
                  <div style={{ color: PRIMARY, marginBottom: "10px" }}>
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <StarFill key={idx} size={18} />
                    ))}
                  </div>

                  <p style={{ color: "#555", fontSize: "0.92rem" }}>{t.review}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* STYLES */}
      <style jsx>{`
        .testimonial-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}
