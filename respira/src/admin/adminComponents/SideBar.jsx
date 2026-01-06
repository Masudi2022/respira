import React from "react";
import { 
  Nav, 
  Navbar, 
  Container, 
  Badge,
  Dropdown,
  Button,
  Form,
  InputGroup
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const primaryColor = "#4361ee"; // Modern blue for admin dashboard

  const links = [
    { label: "Dashboard", path: "/admin/home", icon: "📊", badge: null },
    { label: "Destinations", path: "/admin/destinations", icon: "📍", badge: 5 },
    { label: "Bookings", path: "/admin/bookings", icon: "📅", badge: 12 },
    { label: "Users", path: "/admin/users", icon: "👥", badge: null },
    { label: "Analytics", path: "/admin/analytics", icon: "📈", badge: "New" },
    { label: "Settings", path: "/admin/settings", icon: "⚙️", badge: null },
  ];

  return (
    <Navbar 
      expand="lg" 
      className="flex-column align-items-stretch p-0" 
      style={{ 
        width: "280px", 
        backgroundColor: "#1a1a2e",
        minHeight: "100vh",
        boxShadow: "5px 0 15px rgba(0, 0, 0, 0.1)",
        borderRight: `3px solid ${primaryColor}`
      }}
    >
      {/* Logo Section */}
      <Container className="py-4 border-bottom border-secondary">
        <div className="d-flex align-items-center justify-content-center">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{ 
              width: "50px", 
              height: "50px", 
              backgroundColor: primaryColor,
              boxShadow: `0 4px 15px ${primaryColor}40`
            }}
          >
            <span className="text-white fw-bold fs-4">R</span>
          </div>
          <div>
            <h5 className="text-white mb-0 fw-bold">Respira</h5>
            <small className="text-muted">Admin Dashboard</small>
          </div>
        </div>
      </Container>

      {/* Search Bar */}
      <Container className="py-3 px-4">
        <InputGroup className="rounded-pill">
          <Form.Control
            placeholder="Search..."
            className="bg-dark text-white border-secondary"
            style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}
          />
          <Button 
            variant="outline-secondary"
            style={{ 
              borderTopRightRadius: '20px', 
              borderBottomRightRadius: '20px',
              borderColor: '#495057'
            }}
          >
            🔍
          </Button>
        </InputGroup>
      </Container>

      {/* Navigation */}
      <Navbar.Collapse className="flex-column align-items-stretch">
        <Nav className="flex-column px-3">
          <h6 className="text-uppercase text-muted mb-3 px-2 small">Main Menu</h6>
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Nav.Link
                as={Link}
                to={link.path}
                key={link.path}
                className={`d-flex align-items-center justify-content-between py-3 px-3 mb-1 rounded-3 ${isActive ? 'active-nav' : ''}`}
                style={{
                  backgroundColor: isActive ? `${primaryColor}20` : 'transparent',
                  color: isActive ? primaryColor : '#b0b7c3',
                  borderLeft: isActive ? `3px solid ${primaryColor}` : '3px solid transparent',
                  transition: 'all 0.3s ease',
                }}
              >
                <div className="d-flex align-items-center">
                  <span className="me-3 fs-5">{link.icon}</span>
                  <span className="fw-medium">{link.label}</span>
                </div>
                {link.badge && (
                  <Badge 
                    bg={link.badge === "New" ? "success" : "primary"} 
                    className="rounded-pill"
                  >
                    {link.badge}
                  </Badge>
                )}
              </Nav.Link>
            );
          })}
        </Nav>

        {/* Quick Stats */}
        <div className="mt-5 px-4">
          <h6 className="text-uppercase text-muted mb-3 small">Quick Stats</h6>
          <div className="row g-2">
            <div className="col-6">
              <div className="p-2 rounded-3 text-center" style={{ backgroundColor: '#2d3748' }}>
                <small className="text-muted d-block">Bookings</small>
                <span className="fw-bold text-white">42</span>
              </div>
            </div>
            <div className="col-6">
              <div className="p-2 rounded-3 text-center" style={{ backgroundColor: '#2d3748' }}>
                <small className="text-muted d-block">Users</small>
                <span className="fw-bold text-white">156</span>
              </div>
            </div>
          </div>
        </div>
      </Navbar.Collapse>

      {/* User Profile */}
      <Container className="mt-auto py-4 border-top border-secondary">
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="link"
            className="d-flex align-items-center w-100 text-decoration-none p-0"
            style={{ color: 'white' }}
          >
            <div className="d-flex align-items-center">
              <div 
                className="rounded-circle me-3"
                style={{ 
                  width: "40px", 
                  height: "40px", 
                  background: `linear-gradient(135deg, ${primaryColor}, #7209b7)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span className="text-white fw-bold">A</span>
              </div>
              <div className="text-start">
                <p className="mb-0 fw-medium">Admin User</p>
                <small className="text-muted">Administrator</small>
              </div>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu 
            className="border-0 shadow-lg" 
            style={{ backgroundColor: '#2d3748' }}
          >
            <Dropdown.Item className="text-white">
              👤 My Profile
            </Dropdown.Item>
            <Dropdown.Item className="text-white">
              ⚙️ Settings
            </Dropdown.Item>
            <Dropdown.Divider className="bg-secondary" />
            <Dropdown.Item className="text-danger">
              🚪 Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default AdminSidebar;