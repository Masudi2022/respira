import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  GeoAlt,
  CalendarCheck,
  People,
  BarChart,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Manage Destinations",
      description: "Create, update and delete destinations",
      icon: <GeoAlt size={40} />,
      path: "/admin/destinations", // 👈 destination management URL
      color: "primary",
    },
    {
      title: "Manage Bookings",
      description: "View and manage all bookings",
      icon: <CalendarCheck size={40} />,
      path: "/admin/bookings",
      color: "success",
    },
    {
      title: "Manage Users",
      description: "Control users and permissions",
      icon: <People size={40} />,
      path: "/admin/users",
      color: "warning",
    },
    {
      title: "Reports & Analytics",
      description: "View system statistics",
      icon: <BarChart size={40} />,
      path: "/admin/reports",
      color: "info",
    },
  ];

  return (
    <Container className="py-5">
      <div className="mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <p className="text-muted">Choose what you want to manage</p>
      </div>

      <Row className="g-4">
        {cards.map((card, index) => (
          <Col md={6} lg={3} key={index}>
            <Card
              className="h-100 shadow-sm border-0 cursor-pointer"
              onClick={() => navigate(card.path)}
              style={{ cursor: "pointer" }}
            >
              <Card.Body className="text-center">
                <div
                  className={`bg-${card.color} bg-opacity-10 text-${card.color} rounded-circle d-inline-flex align-items-center justify-content-center mb-3`}
                  style={{ width: 80, height: 80 }}
                >
                  {card.icon}
                </div>
                <h5 className="fw-bold">{card.title}</h5>
                <p className="text-muted small">{card.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminHome;
