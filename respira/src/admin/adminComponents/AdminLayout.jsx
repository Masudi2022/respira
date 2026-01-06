import React from "react";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import AdminSidebar from "./SideBar";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";

const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="flex-grow-1 p-4">
          <Container fluid>
            {/* Stats Cards */}
            <Row className="mb-4 g-3">
              <Col md={3}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="text-muted mb-2">Total Bookings</h6>
                        <h3 className="mb-0">156</h3>
                        <small className="text-success">↑ 12% from last month</small>
                      </div>
                      <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                        <span className="text-primary fs-4">📅</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={3}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="text-muted mb-2">Active Users</h6>
                        <h3 className="mb-0">892</h3>
                        <small className="text-success">↑ 8% from last month</small>
                      </div>
                      <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                        <span className="text-success fs-4">👥</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={3}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="text-muted mb-2">Revenue</h6>
                        <h3 className="mb-0">$24,580</h3>
                        <small className="text-success">↑ 15% from last month</small>
                      </div>
                      <div className="bg-warning bg-opacity-10 p-3 rounded-circle">
                        <span className="text-warning fs-4">💰</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={3}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="text-muted mb-2">Destinations</h6>
                        <h3 className="mb-0">42</h3>
                        <small className="text-success">↑ 3% from last month</small>
                      </div>
                      <div className="bg-info bg-opacity-10 p-3 rounded-circle">
                        <span className="text-info fs-4">📍</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Main Content Area */}
            <Card className="border-0 shadow-sm">
              <Card.Body>
                {children}
              </Card.Body>
            </Card>
          </Container>
        </main>

        {/* Footer */}
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;