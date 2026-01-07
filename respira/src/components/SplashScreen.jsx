import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./SplashScreen.css";

const SplashScreen = () => {
  return (
    <div className="ocean-splash">

      {/* LIGHT RAYS */}
      <div className="light-rays"></div>

      {/* WATER DROP */}
      <div className="water-drop"></div>

      {/* RIPPLE */}
      <div className="ripple ripple-1"></div>
      <div className="ripple ripple-2"></div>

      {/* BUBBLES */}
      <div className="bubble b1"></div>
      <div className="bubble b2"></div>
      <div className="bubble b3"></div>

      <Container fluid className="h-100">
        <Row className="h-100 align-items-center justify-content-center">
          <Col md={9} className="text-center text-white splash-content">

            <h1 className="fade-in delay-2 welcome-title">
              Karibu Zanzibar 🌴
            </h1>

            <h2 className="fade-in delay-3 brand-title pulse">
              Respira Zanzibar
            </h2>

            <h3 className="fade-in delay-4">
              Tours & Safaris
            </h3>

            <p className="fade-in delay-5 tagline">
              Where the ocean meets adventure and unforgettable memories
            </p>

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SplashScreen;
