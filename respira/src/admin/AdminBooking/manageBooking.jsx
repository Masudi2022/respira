import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Modal,
  Form,
  Spinner,
  Alert,
  InputGroup,
  FormControl,
  Dropdown,
  Table
} from "react-bootstrap";
import { 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  Mail, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock,
  Download,
  ChevronDown,
  ChevronUp
} from "react-feather";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      full_name: "John Doe",
      email: "john@example.com",
      booking_reference: "BK-001",
      destination: { title: "Stone Town Tour", category: "Cultural" },
      date: "2024-12-15",
      time: "09:00 AM",
      number_of_people: 2,
      status: "PENDING",
      created_at: "2024-12-01"
    },
    {
      id: 2,
      full_name: "Jane Smith",
      email: "jane@example.com",
      booking_reference: "BK-002",
      destination: { title: "Spice Farm Visit", category: "Adventure" },
      date: "2024-12-20",
      time: "02:30 PM",
      number_of_people: 4,
      status: "CONFIRMED",
      created_at: "2024-12-02"
    },
    {
      id: 3,
      full_name: "Robert Johnson",
      email: "robert@example.com",
      booking_reference: "BK-003",
      destination: { title: "Jozani Forest", category: "Nature" },
      date: "2024-12-25",
      time: "10:00 AM",
      number_of_people: 3,
      status: "CANCELLED",
      created_at: "2024-12-03"
    },
    {
      id: 4,
      full_name: "Sarah Williams",
      email: "sarah@example.com",
      booking_reference: "BK-004",
      destination: { title: "Prison Island", category: "Historical" },
      date: "2024-12-18",
      time: "11:00 AM",
      number_of_people: 5,
      status: "CONFIRMED",
      created_at: "2024-12-04"
    },
    {
      id: 5,
      full_name: "Michael Brown",
      email: "michael@example.com",
      booking_reference: "BK-005",
      destination: { title: "Dhow Sunset Cruise", category: "Leisure" },
      date: "2024-12-22",
      time: "05:00 PM",
      number_of_people: 2,
      status: "PENDING",
      created_at: "2024-12-05"
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [status, setStatus] = useState("PENDING");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0
  });

  // Calculate stats
  useEffect(() => {
    const stats = {
      total: bookings.length,
      pending: bookings.filter(b => b.status === "PENDING").length,
      confirmed: bookings.filter(b => b.status === "CONFIRMED").length,
      cancelled: bookings.filter(b => b.status === "CANCELLED").length
    };
    setStats(stats);
  }, [bookings]);

  // Filter and sort bookings
  const filteredBookings = bookings
    .filter(booking => {
      const matchesSearch = 
        booking.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.booking_reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.destination.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === "ALL" || booking.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc" 
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.full_name.localeCompare(b.full_name)
          : b.full_name.localeCompare(a.full_name);
      }
      return 0;
    });

  const openEditModal = (booking) => {
    setEditing(booking);
    setStatus(booking.status);
    setShowModal(true);
  };

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    setBookings(prev => prev.map(b => 
      b.id === editing.id ? { ...b, status } : b
    ));
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const handleBulkDelete = () => {
    if (selectedBookings.length === 0) return;
    if (!window.confirm(`Delete ${selectedBookings.length} selected bookings?`)) return;
    setBookings(prev => prev.filter(b => !selectedBookings.includes(b.id)));
    setSelectedBookings([]);
  };

  const handleSelectAll = () => {
    if (selectedBookings.length === filteredBookings.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(filteredBookings.map(b => b.id));
    }
  };

  const toggleBookingSelection = (id) => {
    setSelectedBookings(prev => 
      prev.includes(id) 
        ? prev.filter(bookingId => bookingId !== id)
        : [...prev, id]
    );
  };

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
        return <Badge bg="success" className="d-flex align-items-center gap-1"><CheckCircle size={14} /> Confirmed</Badge>;
      case "CANCELLED":
        return <Badge bg="danger" className="d-flex align-items-center gap-1"><XCircle size={14} /> Cancelled</Badge>;
      case "PENDING":
        return <Badge bg="warning" className="d-flex align-items-center gap-1"><Clock size={14} /> Pending</Badge>;
      default:
        return <Badge bg="secondary">{status || "Unknown"}</Badge>;
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED": return <CheckCircle className="text-success" />;
      case "CANCELLED": return <XCircle className="text-danger" />;
      case "PENDING": return <Clock className="text-warning" />;
      default: return null;
    }
  };

  return (
    <Container fluid className="py-4 px-lg-4">
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div>
          <h2 className="fw-bold mb-2" style={{ color: "#0d9488" }}>
            Bookings Management
          </h2>
          <p className="text-muted mb-0">Manage and monitor all customer bookings</p>
        </div>
        <Button 
          variant="outline-primary" 
          className="mt-2 mt-md-0"
          onClick={() => console.log("Export bookings")}
        >
          <Download size={18} className="me-2" />
          Export
        </Button>
      </div>

      {/* Stats Cards */}
      <Row className="mb-4 g-3">
        <Col xs={6} md={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Total Bookings</h6>
                  <h3 className="fw-bold mb-0">{stats.total}</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: "rgba(13, 148, 136, 0.1)" }}>
                  <Calendar size={24} style={{ color: "#0d9488" }} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Pending</h6>
                  <h3 className="fw-bold mb-0 text-warning">{stats.pending}</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: "rgba(255, 193, 7, 0.1)" }}>
                  <Clock size={24} style={{ color: "#ffc107" }} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Confirmed</h6>
                  <h3 className="fw-bold mb-0 text-success">{stats.confirmed}</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: "rgba(25, 135, 84, 0.1)" }}>
                  <CheckCircle size={24} style={{ color: "#198754" }} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">Cancelled</h6>
                  <h3 className="fw-bold mb-0 text-danger">{stats.cancelled}</h3>
                </div>
                <div className="rounded-circle p-3" style={{ backgroundColor: "rgba(220, 53, 69, 0.1)" }}>
                  <XCircle size={24} style={{ color: "#dc3545" }} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Controls Section */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="py-3">
          <Row className="g-3 align-items-center">
            <Col xs={12} md={4}>
              <InputGroup>
                <InputGroup.Text style={{ backgroundColor: "#f8f9fa" }}>
                  <Search size={18} />
                </InputGroup.Text>
                <FormControl
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            
            <Col xs={12} md={3}>
              <InputGroup>
                <InputGroup.Text style={{ backgroundColor: "#f8f9fa" }}>
                  <Filter size={18} />
                </InputGroup.Text>
                <Form.Select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="ALL">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="CANCELLED">Cancelled</option>
                </Form.Select>
              </InputGroup>
            </Col>

            <Col xs={12} md={3}>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="w-100">
                  Sort by: {sortBy === "date" ? "Date" : "Name"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSortBy("date")}>
                    Date {sortBy === "date" && (sortOrder === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy("name")}>
                    Name {sortBy === "name" && (sortOrder === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}>
                    {sortOrder === "asc" ? "Descending" : "Ascending"}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Col xs={12} md={2}>
              <div className="btn-group w-100">
                <Button 
                  variant={viewMode === "grid" ? "primary" : "outline-primary"}
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </Button>
                <Button 
                  variant={viewMode === "table" ? "primary" : "outline-primary"}
                  onClick={() => setViewMode("table")}
                >
                  Table
                </Button>
              </div>
            </Col>
          </Row>

          {/* Bulk Actions */}
          {selectedBookings.length > 0 && (
            <div className="mt-3 p-3 rounded" style={{ backgroundColor: "rgba(13, 148, 136, 0.1)" }}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="fw-bold">{selectedBookings.length}</span> bookings selected
                </div>
                <div>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={handleBulkDelete}
                    className="me-2"
                  >
                    <Trash2 size={16} className="me-1" />
                    Delete Selected
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={() => setSelectedBookings([])}
                  >
                    Clear Selection
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")} className="mb-4">
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" style={{ color: "#0d9488" }} />
          <p className="mt-3 text-muted">Loading bookings...</p>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            // Grid View
            <Row>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <Col xs={12} md={6} lg={4} key={booking.id} className="mb-4">
                    <Card className="h-100 shadow-sm border-hover">
                      <Card.Body className="d-flex flex-column">
                        <div className="d-flex align-items-start mb-3">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                            style={{ 
                              width: "56px", 
                              height: "56px", 
                              backgroundColor: "#0d9488",
                              color: "white",
                              fontWeight: "bold",
                              fontSize: "22px",
                              boxShadow: "0 4px 6px rgba(13, 148, 136, 0.2)"
                            }}
                          >
                            {booking.full_name?.charAt(0) || "?"}
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h6 className="fw-bold mb-1">{booking.full_name}</h6>
                                <small className="text-muted d-flex align-items-center gap-1">
                                  <Mail size={12} />
                                  {booking.email}
                                </small>
                              </div>
                              <Form.Check
                                type="checkbox"
                                checked={selectedBookings.includes(booking.id)}
                                onChange={() => toggleBookingSelection(booking.id)}
                                className="ms-2"
                              />
                            </div>
                            <div className="mt-2">{getStatusBadge(booking.status)}</div>
                          </div>
                        </div>

                        <div className="border-top pt-3 mt-auto">
                          <div className="d-flex align-items-center mb-2">
                            <Calendar size={16} className="me-2 text-muted" />
                            <span>{booking.date} at {booking.time}</span>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <Users size={16} className="me-2 text-muted" />
                            <span>{booking.number_of_people} Guests</span>
                          </div>
                          <p className="mb-2">
                            <strong>Reference:</strong> 
                            <Badge bg="light" text="dark" className="ms-2 font-monospace">
                              {booking.booking_reference}
                            </Badge>
                          </p>
                          <p className="mb-3">
                            <strong>Tour:</strong> {booking.destination?.title}
                            <Badge bg="light" text="dark" className="ms-2">
                              {booking.destination?.category}
                            </Badge>
                          </p>
                        </div>

                        <div className="d-flex justify-content-between border-top pt-3">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => openEditModal(booking)}
                            className="d-flex align-items-center gap-1"
                          >
                            <Edit2 size={16} />
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(booking.id)}
                            className="d-flex align-items-center gap-1"
                          >
                            <Trash2 size={16} />
                            Delete
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col>
                  <div className="text-center py-5">
                    <div className="mb-4">
                      <Calendar size={64} className="text-muted" />
                    </div>
                    <h5 className="text-muted mb-2">No bookings found</h5>
                    <p className="text-muted">Try adjusting your search or filter criteria</p>
                  </div>
                </Col>
              )}
            </Row>
          ) : (
            // Table View
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead style={{ backgroundColor: "#f8f9fa" }}>
                      <tr>
                        <th>
                          <Form.Check
                            type="checkbox"
                            checked={selectedBookings.length === filteredBookings.length && filteredBookings.length > 0}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th>Customer</th>
                        <th>Tour</th>
                        <th>Date & Time</th>
                        <th>Guests</th>
                        <th>Status</th>
                        <th>Reference</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id}>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={selectedBookings.includes(booking.id)}
                              onChange={() => toggleBookingSelection(booking.id)}
                            />
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div 
                                className="rounded-circle d-flex align-items-center justify-content-center me-2"
                                style={{ 
                                  width: "36px", 
                                  height: "36px", 
                                  backgroundColor: "#0d9488",
                                  color: "white",
                                  fontWeight: "bold",
                                  fontSize: "14px"
                                }}
                              >
                                {booking.full_name?.charAt(0) || "?"}
                              </div>
                              <div>
                                <div className="fw-bold">{booking.full_name}</div>
                                <small className="text-muted">{booking.email}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>{booking.destination?.title}</div>
                            <small className="text-muted">{booking.destination?.category}</small>
                          </td>
                          <td>
                            <div>{booking.date}</div>
                            <small className="text-muted">{booking.time}</small>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <Users size={16} className="me-1 text-muted" />
                              {booking.number_of_people}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              {getStatusIcon(booking.status)}
                              {booking.status}
                            </div>
                          </td>
                          <td>
                            <Badge bg="light" text="dark" className="font-monospace">
                              {booking.booking_reference}
                            </Badge>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => openEditModal(booking)}
                              >
                                <Edit2 size={14} />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(booking.id)}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Pagination (Optional) */}
          {filteredBookings.length > 0 && (
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div className="text-muted">
                Showing {filteredBookings.length} of {bookings.length} bookings
              </div>
              <div className="d-flex gap-2">
                <Button variant="outline-secondary" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline-secondary" size="sm">
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Status Update Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">Update Booking Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editing && (
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{ 
                    width: "48px", 
                    height: "48px", 
                    backgroundColor: "#0d9488",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "18px"
                  }}
                >
                  {editing.full_name?.charAt(0) || "?"}
                </div>
                <div>
                  <h6 className="fw-bold mb-1">{editing.full_name}</h6>
                  <small className="text-muted">{editing.email}</small>
                </div>
              </div>
              
              <div className="row g-2">
                <div className="col-6">
                  <p className="mb-1 text-muted">Reference</p>
                  <p className="fw-bold">{editing.booking_reference}</p>
                </div>
                <div className="col-6">
                  <p className="mb-1 text-muted">Current Status</p>
                  <div>{getStatusBadge(editing.status)}</div>
                </div>
              </div>
            </div>
          )}

          <Form onSubmit={handleUpdateStatus}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Select New Status</Form.Label>
              <div className="d-flex flex-column gap-2">
                {["PENDING", "CONFIRMED", "CANCELLED"].map((stat) => (
                  <Form.Check
                    key={stat}
                    type="radio"
                    name="status"
                    id={`status-${stat}`}
                    label={
                      <div className="d-flex align-items-center gap-2">
                        {getStatusIcon(stat)}
                        {stat.charAt(0) + stat.slice(1).toLowerCase()}
                      </div>
                    }
                    value={stat}
                    checked={status === stat}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                ))}
              </div>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 pt-3 border-top">
              <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="px-4">
                Update Status
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminBookings;