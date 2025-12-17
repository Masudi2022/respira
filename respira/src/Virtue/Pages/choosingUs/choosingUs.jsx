import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { ShieldCheck, GlobeAmericas, Headset, CashStack } from "react-bootstrap-icons";

const PRIMARY = "#2FB6A6";

const benefits = [
  {
    icon: <ShieldCheck size={40} color={PRIMARY} />,
    title: "Trust Factors",
    text: "Transparent pricing, reliable service and officially licensed guides."
  },
  {
    icon: <GlobeAmericas size={40} color={PRIMARY} />,
    title: "Local Expertise",
    text: "We are local specialists who know Zanzibar’s hidden gems, culture & tours."
  },
  {
    icon: <Headset size={40} color={PRIMARY} />,
    title: "Safety & Support",
    text: "We provide safe transport, professional crew, and full customer support."
  },
  {
    icon: <CashStack size={40} color={PRIMARY} />,
    title: "Value for Money",
    text: "Best tour rates without compromising on experience or quality."
  }
];

export default function WhyChooseUs() {
  return (
    <section style={{ padding: "100px 0", background: "#F9FAFB" }}>
      <Container>
        {/* HEADER */}
        <div className="text-center mb-5">
          <Badge pill style={{ background: PRIMARY, padding: "10px 20px" }}>
            6️⃣ Why Choose Us
          </Badge>
          <h2 style={{ fontWeight: 800, fontSize: "2.5rem" }}>
            Your Trusted Zanzibar Travel Partner
          </h2>
          <p style={{ maxWidth: "650px", margin: "15px auto", color: "#666" }}>
            We make your Zanzibar holiday hassle-free through expertise, support and unbeatable value.
          </p>
        </div>

        {/* BENEFITS */}
        <Row className="g-4">
          {benefits.map((item, index) => (
            <Col key={index} lg={3} md={6} sm={12}>
              <Card
                className="benefit-card text-center"
                style={{
                  border: "none",
                  borderRadius: "20px",
                  padding: "40px 25px",
                  height: "100%",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
                  transition: "all 0.3s ease",
                  background: "white"
                }}
              >
                <div className="mb-3">{item.icon}</div>
                <h5 style={{ fontWeight: 700 }}>{item.title}</h5>
                <p style={{ marginTop: 10, fontSize: "0.95rem", color: "#555" }}>
                  {item.text}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* HOVER STYLE */}
      <style jsx>{`
        .benefit-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </section>
  );
}
