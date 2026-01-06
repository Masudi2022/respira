import React, { useState, useEffect } from "react";
import { 
  Navbar, 
  Container, 
  Dropdown,
  Button,
  Badge,
  Nav
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const AdminHeader = () => {
  const [userData, setUserData] = useState({
    username: "Admin User",
    email: "admin@respira.com",
    role: "admin",
    lastLogin: "Today 09:45 AM",
    todayBookings: 12,
    totalBookings: 156,
    revenue: 12450
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const primaryColor = "#0d9488";
  const accentColor = "#115e59";

  useEffect(() => {
    // Load user data from localStorage
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("user_email");
    const role = localStorage.getItem("role");
    
    if (username) {
      setUserData(prev => ({
        ...prev,
        username: username,
        email: email || "admin@respira.com",
        role: role || "admin",
        lastLogin: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })
      }));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "A";
    return name.charAt(0).toUpperCase();
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/admin/home")) return "Dashboard";
    if (path.includes("/admin/destinations")) return "Destinations";
    if (path.includes("/admin/bookings")) return "Bookings";
    if (path.includes("/admin/users")) return "Users";
    if (path.includes("/admin/analytics")) return "Analytics";
    if (path.includes("/admin/settings")) return "Settings";
    return "Dashboard";
  };

  const getFullPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/admin/home")) return "Dashboard Overview";
    if (path.includes("/admin/destinations")) return "Destinations Management";
    if (path.includes("/admin/bookings")) return "Bookings Management";
    if (path.includes("/admin/users")) return "User Management";
    if (path.includes("/admin/analytics")) return "Analytics & Reports";
    if (path.includes("/admin/settings")) return "System Settings";
    return "Dashboard";
  };

  return (
    <Navbar 
      bg="white" 
      expand="lg" 
      className="shadow-sm border-bottom py-3"
      style={{ position: 'sticky', top: 0, zIndex: 1030 }}
    >
      <Container fluid className="position-relative">
        {/* Logo/Brand on Left */}
        <Navbar.Brand href="/admin/home" className="d-flex align-items-center">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center me-2"
            style={{ 
              width: "40px", 
              height: "40px", 
              background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
              boxShadow: `0 4px 12px ${primaryColor}40`
            }}
          >
            <span>R</span>
          </div>
          <div className="d-none d-md-block">
            <div className="fw-bold" style={{ color: accentColor, fontSize: "18px" }}>
              Respira Admin
            </div>
            <div className="text-muted small">
              <Badge bg="success" className="rounded-pill" style={{ fontSize: "10px", padding: "2px 6px" }}>
                Online
              </Badge>
            </div>
          </div>
        </Navbar.Brand>

        {/* Centered Page Title */}
        <div className="position-absolute start-50 translate-middle-x d-none d-md-block">
          <div className="text-center">
            <h4 className="fw-bold mb-0" style={{ color: "#2d3748", fontSize: "22px" }}>
              {getPageTitle()}
            </h4>
            <Nav className="justify-content-center mt-1">
              <Nav.Item>
                <Nav.Link href="/admin/home" className="text-muted p-0 me-2" style={{ fontSize: "13px" }}>
                  Home
                </Nav.Link>
              </Nav.Item>
              <span className="text-muted mx-2" style={{ fontSize: "13px" }}>›</span>
              <Nav.Item>
                <span className="text-dark fw-medium" style={{ fontSize: "13px" }}>
                  {getFullPageTitle()}
                </span>
              </Nav.Item>
            </Nav>
          </div>
        </div>

        {/* Right Section - Notification & User Initials */}
        <div className="d-flex align-items-center" style={{ marginRight: "10px" }}>
          {/* Coming Soon - Notification (Simple Version) */}
          <div className="me-3 d-none d-md-block">
            <div className="position-relative">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ 
                  width: "38px", 
                  height: "38px",
                  backgroundColor: '#f1f5f9',
                  cursor: 'default',
                  border: '1px solid #e2e8f0'
                }}
                title="Notifications - Coming Soon"
              >
                <span className="fs-5 text-muted">🔔</span>
                <Badge 
                  pill 
                  bg="secondary" 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ 
                    fontSize: '8px', 
                    padding: '2px 4px',
                    minWidth: '14px'
                  }}
                >
                  SOON
                </Badge>
              </div>
            </div>
          </div>

          {/* User Profile Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle 
              variant="link" 
              className="d-flex align-items-center text-decoration-none p-0"
            >
              <div className="d-flex align-items-center">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ 
                    width: "42px", 
                    height: "42px", 
                    background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "18px",
                    boxShadow: `0 4px 12px ${primaryColor}40`,
                    marginLeft: "0"
                  }}
                >
                  {getInitials(userData.username)}
                </div>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="shadow-lg border-0 p-3" style={{ minWidth: '320px' }}>
              {/* User Info Header */}
              <div className="px-2 mb-3">
                <div className="d-flex align-items-center mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ 
                      width: "60px", 
                      height: "60px", 
                      background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "24px"
                    }}
                  >
                    {getInitials(userData.username)}
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">{userData.username}</h5>
                    <small className="text-muted d-block mb-2">{userData.email}</small>
                    <Badge 
                      bg={userData.role === 'admin' ? 'danger' : 'primary'} 
                      className="rounded-pill px-3 py-1"
                    >
                      {userData.role}
                    </Badge>
                    <div className="mt-2 small text-muted">
                      <span>📅 Last login: {userData.lastLogin}</span>
                    </div>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="bg-light p-3 rounded">
                  <div className="row text-center">
                    <div className="col-4 border-end">
                      <div className="fw-bold" style={{ color: primaryColor, fontSize: "22px" }}>
                        {userData.totalBookings}
                      </div>
                      <small className="text-muted">Total Bookings</small>
                    </div>
                    <div className="col-4 border-end">
                      <div className="fw-bold" style={{ color: primaryColor, fontSize: "22px" }}>
                        {userData.todayBookings}
                      </div>
                      <small className="text-muted">Today</small>
                    </div>
                    <div className="col-4">
                      <div className="fw-bold" style={{ color: primaryColor, fontSize: "22px" }}>
                        ${(userData.revenue / 1000).toFixed(1)}K
                      </div>
                      <small className="text-muted">Revenue</small>
                    </div>
                  </div>
                </div>
              </div>

              <Dropdown.Divider />

              {/* Quick Actions */}
              <div className="mb-3">
                <Button 
                  variant="primary"
                  className="w-100 d-flex align-items-center justify-content-center gap-2 mb-2 py-2"
                  style={{ 
                    background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '15px'
                  }}
                  onClick={() => navigate("/admin/bookings/new")}
                >
                  <span style={{ fontSize: '18px' }}>+</span>
                  <span>New Booking</span>
                </Button>
              </div>

              <Dropdown.Divider />

              {/* Menu Items */}
              <Dropdown.Item 
                className="py-2 d-flex align-items-center"
                onClick={() => navigate("/admin/profile")}
                style={{ fontSize: '14px' }}
              >
                <div 
                  className="rounded-circle bg-primary bg-opacity-10 p-2 me-3"
                  style={{ width: "38px", height: "38px" }}
                >
                  <span className="text-primary fs-5">👤</span>
                </div>
                <div>
                  <div className="fw-medium">My Profile</div>
                  <small className="text-muted">View & edit profile</small>
                </div>
              </Dropdown.Item>
              
              <Dropdown.Item 
                className="py-2 d-flex align-items-center"
                onClick={() => navigate("/admin/settings")}
                style={{ fontSize: '14px' }}
              >
                <div 
                  className="rounded-circle bg-warning bg-opacity-10 p-2 me-3"
                  style={{ width: "38px", height: "38px" }}
                >
                  <span className="text-warning fs-5">⚙️</span>
                </div>
                <div>
                  <div className="fw-medium">Settings</div>
                  <small className="text-muted">Manage preferences</small>
                </div>
              </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item 
                className="py-2 d-flex align-items-center text-danger"
                onClick={handleLogout}
                style={{ fontSize: '14px' }}
              >
                <div 
                  className="rounded-circle bg-danger bg-opacity-10 p-2 me-3"
                  style={{ width: "38px", height: "38px" }}
                >
                  <span className="text-danger fs-5">🚪</span>
                </div>
                <div>
                  <div className="fw-medium">Logout</div>
                  <small className="text-danger">Sign out of your account</small>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Mobile Title (Center) */}
        <div className="d-md-none w-100 text-center position-absolute start-50 translate-middle-x" style={{ top: "50%" }}>
          <h5 className="fw-bold mb-0" style={{ color: "#2d3748", fontSize: "18px" }}>
            {getPageTitle()}
          </h5>
        </div>
      </Container>
    </Navbar>
  );
};

export default AdminHeader;