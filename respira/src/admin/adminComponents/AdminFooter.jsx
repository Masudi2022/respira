import React from "react";
import { Container, Row, Col, Nav, Badge } from "react-bootstrap";

const AdminFooter = () => {
  const primaryColor = "#4361ee";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto" style={{ 
      backgroundColor: "#1a1a2e",
      borderTop: `2px solid ${primaryColor}`,
      boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.1)"
    }}>
      <Container className="py-4">
        <Row className="align-items-center">
          {/* Brand and Copyright */}
          <Col lg={4} className="mb-3 mb-lg-0">
            <div className="d-flex align-items-center">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{ 
                  width: "40px", 
                  height: "40px", 
                  background: `linear-gradient(135deg, ${primaryColor}, #7209b7)`,
                  boxShadow: `0 4px 12px ${primaryColor}40`
                }}
              >
                <span className="text-white fw-bold">R</span>
              </div>
              <div>
                <h5 className="text-white mb-0 fw-bold">Respira Admin</h5>
                <p className="text-muted mb-0 small">
                  © {currentYear} All rights reserved
                </p>
              </div>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={4} className="mb-3 mb-lg-0">
            <Nav className="justify-content-center">
              <Nav.Item>
                <Nav.Link 
                  href="#" 
                  className="text-white-50 mx-2 px-2"
                  style={{ fontSize: "0.9rem" }}
                >
                  Privacy Policy
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  href="#" 
                  className="text-white-50 mx-2 px-2"
                  style={{ fontSize: "0.9rem" }}
                >
                  Terms of Service
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  href="#" 
                  className="text-white-50 mx-2 px-2"
                  style={{ fontSize: "0.9rem" }}
                >
                  Documentation
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  href="#" 
                  className="text-white-50 mx-2 px-2"
                  style={{ fontSize: "0.9rem" }}
                >
                  Support
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          {/* Status and Version */}
          <Col lg={4}>
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-lg-end gap-3">
              <div className="d-flex align-items-center">
                <div className="me-2">
                  <Badge 
                    bg="success" 
                    className="rounded-pill px-3 py-2 d-flex align-items-center"
                    style={{ fontSize: "0.75rem" }}
                  >
                    <span 
                      className="me-1" 
                      style={{ 
                        width: "6px", 
                        height: "6px", 
                        backgroundColor: "#28a745",
                        borderRadius: "50%",
                        display: "inline-block"
                      }}
                    ></span>
                    System Online
                  </Badge>
                </div>
              </div>
              
              <div className="d-flex align-items-center">
                <div className="me-2">
                  <span className="text-white-50 small">v2.1.0</span>
                </div>
                <div style={{ 
                  width: "1px", 
                  height: "20px", 
                  backgroundColor: "#495057",
                  margin: "0 10px"
                }}></div>
                <div>
                  <span className="text-white-50 small">
                    Last updated: Today
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Divider */}
        <Row>
          <Col>
            <hr style={{ 
              borderColor: "#495057",
              margin: "1.5rem 0 1rem 0",
              opacity: 0.5
            }} />
          </Col>
        </Row>

        {/* Additional Info */}
        <Row>
          <Col>
            <div className="text-center">
              <p className="text-white-50 mb-1 small">
                Built with React & Bootstrap • Designed for Admin Excellence
              </p>
              <p className="text-muted mb-0" style={{ fontSize: "0.75rem" }}>
                Server Response Time: <span className="text-success">42ms</span> • 
                Memory Usage: <span className="text-info">68%</span> • 
                Uptime: <span className="text-warning">99.8%</span>
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Bottom Bar */}
      <div style={{ 
        backgroundColor: "#0d1117",
        padding: "0.75rem 0"
      }}>
        <Container>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <span className="text-white-50 small mb-2 mb-md-0">
              Made with ❤️ for Respira Travel Admin
            </span>
            <div className="d-flex gap-3">
              <a 
                href="#" 
                className="text-white-50 text-decoration-none small"
                style={{ transition: "color 0.3s" }}
                onMouseEnter={(e) => e.target.style.color = primaryColor}
                onMouseLeave={(e) => e.target.style.color = "#adb5bd"}
              >
                Report Issue
              </a>
              <a 
                href="#" 
                className="text-white-50 text-decoration-none small"
                style={{ transition: "color 0.3s" }}
                onMouseEnter={(e) => e.target.style.color = primaryColor}
                onMouseLeave={(e) => e.target.style.color = "#adb5bd"}
              >
                Feature Request
              </a>
              <a 
                href="#" 
                className="text-white-50 text-decoration-none small"
                style={{ transition: "color 0.3s" }}
                onMouseEnter={(e) => e.target.style.color = primaryColor}
                onMouseLeave={(e) => e.target.style.color = "#adb5bd"}
              >
                Contact Dev Team
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default AdminFooter;