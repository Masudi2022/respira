import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";

const PRIMARY = "#2FB6A6";

export default function Testimonials() {
  return (
    <div style={{ background: "#ffffff" }}>
      {/* HERO */}
      <section
        style={{
          padding: "120px 0",
          background:
            "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80') center/cover no-repeat",
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

          {/* Coming Soon Message */}
          <Row className="justify-content-center">
            <Col lg={8} md={10}>
              <Card
                className="text-center border-0"
                style={{
                  padding: "50px 30px",
                  borderRadius: "22px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                  background: "#f8fffe"
                }}
              >
                <div style={{ marginBottom: "20px" }}>
                  <StarFill size={32} style={{ color: PRIMARY }} />
                  <StarFill size={32} style={{ color: PRIMARY }} />
                  <StarFill size={32} style={{ color: PRIMARY }} />
                  <StarFill size={32} style={{ color: PRIMARY }} />
                  <StarFill size={32} style={{ color: PRIMARY }} />
                </div>
                <h4 style={{ fontWeight: 700, marginBottom: "20px" }}>
                  Real Guest Reviews Coming Soon!
                </h4>
                <p style={{ color: "#555", fontSize: "1.1rem", maxWidth: 600, margin: "0 auto" }}>
                  We're excited to welcome our first guests and share their authentic experiences from Zanzibar's stunning beaches, safaris, and adventures. 
                  Check back soon to see what travelers are saying!
                </p>
                <p style={{ color: "#777", fontSize: "0.95rem", marginTop: "25px" }}>
                  In the meantime, feel free to reach out with any questions — we're here to make your trip unforgettable.
                </p>
              </Card>
            </Col>
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