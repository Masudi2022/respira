import React from "react";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { PeopleFill, ShieldCheck, Compass, EmojiSmile } from "react-bootstrap-icons";

const PRIMARY = "#2FB6A6";

export default function AboutUs() {
  return (
    <div style={{ background: "#ffffff" }}>
      {/* HERO SECTION */}
      <section
        style={{
          padding: "120px 0",
          background:
            "linear-gradient( rgba(0,0,0,0.45), rgba(0,0,0,0.45) ), url('https://images.unsplash.com/photo-1575377403410-4df059d2ccd8?auto=format&fit=crop&w=1400&q=80') center/cover no-repeat",
          color: "white",
          textAlign: "center"
        }}
      >
        <Container>
          <h1 style={{ fontWeight: 800, fontSize: "3rem" }}>About Us</h1>
          <p style={{ maxWidth: 650, margin: "15px auto", fontSize: "1.2rem" }}>
            We deliver world-class experiences in Zanzibar — with passion, culture, and expertise.
          </p>
        </Container>
      </section>

      {/* ABOUT STORY */}
      <section style={{ padding: "100px 0" }}>
        <Container>
          <Row className="align-items-center g-5">
            <Col md={6}>
              <img
                src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80"
                alt="Zanzibar beach"
                style={{
                  width: "100%",
                  borderRadius: "25px",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.15)"
                }}
              />
            </Col>

            <Col md={6}>
              <Badge pill style={{ background: PRIMARY, padding: "10px 18px" }}>
                Who We Are
              </Badge>
              <h2 style={{ fontWeight: 800, fontSize: "2.3rem", marginTop: "15px" }}>
                Bringing Zanzibar to the World
              </h2>
              <p style={{ fontSize: "1rem", color: "#555", marginTop: "10px" }}>
                We are a passionate local team helping travelers explore Zanzibar’s natural beauty,
                history, beaches, food, and culture. From group tours to private experiences —
                we make your trip smooth, safe and unforgettable.
              </p>

              <p style={{ fontSize: "1rem", color: "#555" }}>
                Our mission is simple: <strong>authentic travel, fair prices, and trusted service.</strong>
                We connect you directly with local guides and communities — supporting the island economy.
              </p>

              <Button
                style={{
                  marginTop: "10px",
                  background: PRIMARY,
                  border: "none",
                  padding: "12px 28px",
                  borderRadius: "50px",
                  fontWeight: 600
                }}
              >
                Explore Tours
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* STATS */}
      <section style={{ padding: "80px 0", background: "#F9FAFB" }}>
        <Container>
          <Row className="g-4 text-center">
            {[
              {
                icon: <PeopleFill size={40} color={PRIMARY} />,
                label: "Happy Travelers",
                value: "10,000+"
              },
              {
                icon: <Compass size={40} color={PRIMARY} />,
                label: "Tours & Experiences",
                value: "50+"
              },
              {
                icon: <ShieldCheck size={40} color={PRIMARY} />,
                label: "Trusted Safety",
                value: "100%"
              },
              {
                icon: <EmojiSmile size={40} color={PRIMARY} />,
                label: "Satisfaction Rate",
                value: "4.9/5"
              }
            ].map((stat, i) => (
              <Col key={i} md={3} sm={6}>
                <Card
                  style={{
                    border: "none",
                    padding: "35px 25px",
                    borderRadius: "20px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.08)"
                  }}
                >
                  {stat.icon}
                  <h3 style={{ fontWeight: 800, marginTop: "15px" }}>{stat.value}</h3>
                  <p style={{ margin: 0, color: "#555" }}>{stat.label}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}
