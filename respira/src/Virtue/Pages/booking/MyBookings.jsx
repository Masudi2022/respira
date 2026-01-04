import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
  Button,
} from "react-bootstrap";
import {
  Calendar,
  GeoAlt,
  People,
  Map,
  Book,
  Person,
  BarChart,
} from "react-bootstrap-icons";

const STATUS_COLORS = {
  PENDING: "warning",
  CONFIRMED: "success",
  CANCELLED: "danger",
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const role = localStorage.getItem("role"); // admin / user
  const navigate = useNavigate();

  // ============================
  // FETCH BOOKINGS
  // ============================
  const fetchBookings = async () => {
    try {
      const res = await api.get("api/bookings/my-bookings/");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ============================
  // ADMIN ACTIONS
  // ============================
  const confirmBooking = async (id) => {
    await api.patch(`api/bookings/${id}/confirm/`);
    fetchBookings();
  };

  const cancelBooking = async (id) => {
    await api.patch(`api/bookings/${id}/cancel/`);
    fetchBookings();
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    await api.delete(`api/bookings/${id}/delete/`);
    fetchBookings();
  };

  // ============================
  // LOADING
  // ============================
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-3">Loading bookings...</p>
      </div>
    );
  }

  // ============================
  // ERROR
  // ============================
  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">

      {/* ================= ADMIN DASHBOARD ================= */}
      {role === "admin" && (
        <Row className="g-4 mb-5">
          <Col md={6} lg={3}>
            <Card
              className="shadow-sm text-center h-100 cursor-pointer"
              onClick={() => navigate("/admin/destinations")}
            >
              <Card.Body>
                <Map size={32} className="mb-2" />
                <h6 className="fw-bold">Destinations</h6>
                <small className="text-muted">Manage tours</small>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card
              className="shadow-sm text-center h-100"
              onClick={() => navigate("/admin/bookings")}
            >
              <Card.Body>
                <Book size={32} className="mb-2" />
                <h6 className="fw-bold">Bookings</h6>
                <small className="text-muted">Manage bookings</small>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card
              className="shadow-sm text-center h-100"
              onClick={() => navigate("/admin/users")}
            >
              <Card.Body>
                <Person size={32} className="mb-2" />
                <h6 className="fw-bold">Users</h6>
                <small className="text-muted">Manage accounts</small>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card
              className="shadow-sm text-center h-100"
              onClick={() => navigate("/admin/reports")}
            >
              <Card.Body>
                <BarChart size={32} className="mb-2" />
                <h6 className="fw-bold">Reports</h6>
                <small className="text-muted">Analytics</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* ================= BOOKINGS HEADER ================= */}
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">
            {role === "admin" ? "All Bookings" : "My Bookings"}
          </h2>
          <p className="text-muted">
            {role === "admin"
              ? "Manage all customer bookings"
              : "View your tour reservations"}
          </p>
        </Col>
      </Row>

      {/* ================= BOOKINGS LIST ================= */}
      {bookings.length === 0 ? (
        <Alert variant="info">No bookings found.</Alert>
      ) : (
        <Row className="g-4">
          {bookings.map((booking) => (
            <Col md={6} lg={4} key={booking.id}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <div className="d-flex justify-content-between mb-3">
                    <strong>{booking.booking_reference}</strong>
                    <Badge bg={STATUS_COLORS[booking.status]}>
                      {booking.status}
                    </Badge>
                  </div>

                  <div className="mb-2 d-flex gap-2">
                    <GeoAlt />
                    <span>
                      {booking.destination_details?.title || "Unknown destination"}
                    </span>
                  </div>

                  <div className="mb-2 d-flex gap-2">
                    <Calendar />
                    <span>{booking.date}</span>
                  </div>

                  <div className="mb-3 d-flex gap-2">
                    <People />
                    <span>{booking.number_of_people} people</span>
                  </div>

                  <Badge bg="secondary">
                    {booking.package_type.toUpperCase()}
                  </Badge>

                  {role === "admin" && (
                    <div className="mt-3 small text-muted">
                      <div><strong>Name:</strong> {booking.full_name}</div>
                      <div><strong>Email:</strong> {booking.email}</div>
                    </div>
                  )}
                </Card.Body>

                {/* ================= ADMIN ACTION BUTTONS ================= */}
                {role === "admin" && (
                  <Card.Footer className="bg-white border-0 d-grid gap-2">
                    {booking.status === "PENDING" && (
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => confirmBooking(booking.id)}
                      >
                        Confirm
                      </Button>
                    )}

                    {booking.status !== "CANCELLED" && (
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => cancelBooking(booking.id)}
                      >
                        Cancel
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => deleteBooking(booking.id)}
                    >
                      Delete
                    </Button>
                  </Card.Footer>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyBookings;
