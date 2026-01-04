import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
  Badge,
  Form,
  Card,
  Carousel,
  Image,
  Tab,
  Tabs,
  ListGroup,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import {
  GeoAltFill,
  Clock,
  Sun,
  ArrowLeft,
  Star,
  StarFill,
  People,
  Calendar,
  ShieldCheck,
  CreditCard,
  Whatsapp,
  Envelope,
  Telephone,
  CheckCircle,
} from "react-bootstrap-icons";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../config/api";

/* ============================
   MODERN COLOR THEME
============================ */
const THEME = {
  primary: "#008080",
  primaryLight: "#4DA6A6",
  primaryDark: "#005959",
  secondary: "#FF7E5F",
  accent: "#F4C95D",
  dark: "#1A1A2E",
  light: "#F8F9FA",
  gradient: "linear-gradient(135deg, #008080 0%, #005959 100%)",
  gradientOrange: "linear-gradient(135deg, #FF7E5F 0%, #FF9A8B 100%)",
};

export default function DestinationDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  /* ============================
     DESTINATION STATE
  ============================ */
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ============================
     BOOKING UI STATE
  ============================ */
  const [showBooking, setShowBooking] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  /* ============================
     BOOKING FORM STATE
  ============================ */
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    date: "",
    number_of_people: 1,
    package_type: "standard",
    special_requests: "",
  });

  /* ============================
     FETCH DESTINATION BY SLUG
  ============================ */
  useEffect(() => {
    if (!slug) return;

    const fetchDestination = async () => {
      try {
        const res = await api.get(`/api/destinations/${slug}/`);
        setDestination(res.data);
      } catch (err) {
        console.error(err);
        setError("Destination not found");
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [slug]);

  /* ============================
     FORM HANDLERS
  ============================ */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitBooking = async (e) => {
    e.preventDefault();

    setBookingLoading(true);
    setBookingError("");
    setBookingSuccess("");

    try {
      await api.post("/api/bookings/", {
        ...formData,
        destination: destination.id,
      });

      setBookingSuccess(
        "🎉 Booking submitted successfully! Check your email for confirmation."
      );
      setShowBookingModal(false);
      
      // Reset form
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        date: "",
        number_of_people: 1,
        package_type: "standard",
        special_requests: "",
      });

      // Show success toast
      setTimeout(() => {
        setBookingSuccess("");
      }, 5000);
      
    } catch (err) {
      console.error(err);
      setBookingError("Failed to submit booking. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  /* ============================
     LOADING SCREEN
  ============================ */
  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-50">
        <Spinner 
          animation="border" 
          style={{ color: THEME.primary, width: '3rem', height: '3rem' }}
        />
        <p className="mt-4 text-muted fw-medium">Loading destination details...</p>
        <ProgressBar 
          animated 
          now={100} 
          style={{ width: '200px', marginTop: '20px' }}
          variant="success"
        />
      </div>
    );
  }

  /* ============================
     ERROR SCREEN
  ============================ */
  if (error || !destination) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div style={{ fontSize: '5rem', color: THEME.secondary }}>😔</div>
          <h2 className="mt-4 fw-bold" style={{ color: THEME.dark }}>Destination Not Found</h2>
          <p className="text-muted mb-4">We couldn't find the destination you're looking for.</p>
          <Button 
            variant="primary" 
            onClick={() => navigate(-1)}
            style={{
              background: THEME.gradient,
              border: 'none',
              padding: '12px 30px',
              borderRadius: '10px',
              fontWeight: 600,
            }}
          >
            <ArrowLeft className="me-2" /> Back to Destinations
          </Button>
        </div>
      </Container>
    );
  }

  /* ============================
     RENDER RATING STARS
  ============================ */
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarFill key={`full-${i}`} className="text-warning" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="text-warning" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-muted" />);
    }
    
    return stars;
  };

  return (
    <div style={{ background: THEME.light }}>
      {/* ============================
         MODERN HERO SECTION
      ============================ */}
      <div className="position-relative overflow-hidden">
        <div
          style={{
            height: "70vh",
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${destination.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <Container className="h-100 d-flex align-items-center">
            <Row className="w-100">
              <Col lg={8}>
                <div className="text-white">
                  {destination.highlight && (
                    <Badge
                      style={{
                        background: THEME.gradientOrange,
                        color: 'white',
                        fontWeight: 700,
                        padding: '8px 20px',
                        fontSize: '0.9rem',
                        borderRadius: '20px',
                        marginBottom: 20,
                      }}
                    >
                      {destination.highlight}
                    </Badge>
                  )}
                  
                  <h1 className="fw-bold display-4 mb-3">{destination.title}</h1>
                  
                  <div className="d-flex align-items-center gap-4 mb-4">
                    <div className="d-flex align-items-center gap-2">
                      <GeoAltFill size={20} />
                      <span className="fs-5">{destination.location}</span>
                    </div>
                    
                    {destination.rating && (
                      <div className="d-flex align-items-center gap-2">
                        {renderStars(destination.rating)}
                        <span className="fs-5">({destination.rating})</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="fs-5 opacity-90 mb-4" style={{ maxWidth: '600px' }}>
                    {destination.short_description || destination.description.substring(0, 150)}...
                  </p>
                  
                  <div className="d-flex gap-3">
                    <Button
                      onClick={() => setShowBookingModal(true)}
                      style={{
                        background: THEME.gradientOrange,
                        border: 'none',
                        padding: '15px 40px',
                        borderRadius: '10px',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                      }}
                    >
                      Book Now <Calendar className="ms-2" />
                    </Button>
                    
                    <Button
                      variant="outline-light"
                      onClick={() => document.getElementById('details-section').scrollIntoView({ behavior: 'smooth' })}
                      style={{
                        padding: '15px 40px',
                        borderRadius: '10px',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                      }}
                    >
                      Explore Details
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        
        {/* Floating Info Cards */}
        <Container>
          <Row className="justify-content-center" style={{ marginTop: '-50px' }}>
            <Col md={4} className="mb-3">
              <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '15px' }}>
                <Card.Body className="d-flex align-items-center p-4">
                  <div className="me-3">
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: THEME.gradient,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Clock size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <Card.Text className="text-muted mb-1">Duration</Card.Text>
                    <Card.Title style={{ color: THEME.primaryDark, fontWeight: 700 }}>
                      {destination.duration}
                    </Card.Title>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-3">
              <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '15px' }}>
                <Card.Body className="d-flex align-items-center p-4">
                  <div className="me-3">
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: THEME.gradientOrange,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Sun size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <Card.Text className="text-muted mb-1">Best Time to Visit</Card.Text>
                    <Card.Title style={{ color: THEME.secondary, fontWeight: 700 }}>
                      {destination.best_time}
                    </Card.Title>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-3">
              <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '15px' }}>
                <Card.Body className="d-flex align-items-center p-4">
                  <div className="me-3">
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: THEME.gradient,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <People size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <Card.Text className="text-muted mb-1">Group Size</Card.Text>
                    <Card.Title style={{ color: THEME.primaryDark, fontWeight: 700 }}>
                      Up to {destination.group_size || 12} people
                    </Card.Title>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ============================
         DETAILS SECTION
      ============================ */}
      <section id="details-section" className="py-5">
        <Container>
          <Row className="gy-5">
            {/* Main Content */}
            <Col lg={8}>
              <Card className="border-0 shadow-sm" style={{ borderRadius: '15px' }}>
                <Card.Body className="p-4">
                  <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="mb-4 border-0"
                    style={{ borderBottom: '2px solid #f0f0f0' }}
                  >
                    <Tab eventKey="overview" title="Overview" className="p-3">
                      <h4 className="fw-bold mb-4" style={{ color: THEME.dark }}>About this destination</h4>
                      <div className="mb-4">
                        <Image
                          src={destination.image}
                          alt={destination.title}
                          fluid
                          rounded
                          className="mb-4"
                        />
                        <p className="fs-5 lh-lg" style={{ color: '#555' }}>
                          {destination.description}
                        </p>
                      </div>
                      
                      {destination.features && (
                        <div className="mt-4">
                          <h5 className="fw-bold mb-3" style={{ color: THEME.primaryDark }}>Key Features</h5>
                          <Row>
                            {destination.features.map((feature, index) => (
                              <Col md={6} key={index} className="mb-3">
                                <div className="d-flex align-items-center gap-3">
                                  <CheckCircle className="text-success" />
                                  <span>{feature}</span>
                                </div>
                              </Col>
                            ))}
                          </Row>
                        </div>
                      )}
                    </Tab>
                    
                    <Tab eventKey="itinerary" title="Itinerary" className="p-3">
                      <h4 className="fw-bold mb-4" style={{ color: THEME.dark }}>Tour Itinerary</h4>
                      <ListGroup variant="flush">
                        {destination.itinerary?.map((item, index) => (
                          <ListGroup.Item key={index} className="border-0 py-3">
                            <div className="d-flex">
                              <div className="me-3">
                                <div style={{
                                  width: '40px',
                                  height: '40px',
                                  background: THEME.gradient,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  fontWeight: 'bold'
                                }}>
                                  {index + 1}
                                </div>
                              </div>
                              <div>
                                <h6 className="fw-bold">{item.time}</h6>
                                <p className="mb-0 text-muted">{item.description}</p>
                              </div>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Tab>
                    
                    <Tab eventKey="inclusions" title="Inclusions" className="p-3">
                      <h4 className="fw-bold mb-4" style={{ color: THEME.dark }}>What's Included</h4>
                      <Row>
                        <Col md={6}>
                          <h6 className="fw-bold mb-3" style={{ color: THEME.primary }}>✅ Included</h6>
                          <ListGroup variant="flush">
                            {destination.included?.map((item, index) => (
                              <ListGroup.Item key={index} className="border-0 py-2">
                                <CheckCircle className="text-success me-2" />
                                {item}
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Col>
                        <Col md={6}>
                          <h6 className="fw-bold mb-3" style={{ color: THEME.secondary }}>❌ Not Included</h6>
                          <ListGroup variant="flush">
                            {destination.not_included?.map((item, index) => (
                              <ListGroup.Item key={index} className="border-0 py-2">
                                <div className="text-muted">{item}</div>
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </Col>
                      </Row>
                    </Tab>
                  </Tabs>
                </Card.Body>
              </Card>
            </Col>

            {/* Sidebar - Booking Card */}
            <Col lg={4}>
              <div className="sticky-top" style={{ top: '100px' }}>
                <Card className="border-0 shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                  <Card.Header className="border-0 py-4" style={{ background: THEME.gradient }}>
                    <h4 className="mb-0 text-white fw-bold">Book This Tour</h4>
                  </Card.Header>
                  
                  <Card.Body className="p-4">
                    <div className="text-center mb-4">
                      <h2 style={{ color: THEME.primaryDark, fontWeight: 800 }}>
                        ${destination.price || 299}
                        <span className="fs-6 text-muted"> / person</span>
                      </h2>
                      <p className="text-muted">All taxes and fees included</p>
                    </div>
                    
                    <ListGroup variant="flush" className="mb-4">
                      <ListGroup.Item className="border-0 d-flex justify-content-between py-2">
                        <span>Duration</span>
                        <strong>{destination.duration}</strong>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 d-flex justify-content-between py-2">
                        <span>Difficulty</span>
                        <strong style={{ color: THEME.secondary }}>{destination.difficulty || 'Moderate'}</strong>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 d-flex justify-content-between py-2">
                        <span>Best Time</span>
                        <strong>{destination.best_time}</strong>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 d-flex justify-content-between py-2">
                        <span>Group Size</span>
                        <strong>Up to {destination.group_size || 12}</strong>
                      </ListGroup.Item>
                    </ListGroup>
                    
                    <div className="text-center mb-4">
                      <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                        <ShieldCheck size={20} className="text-success" />
                        <span className="text-muted">Secure Booking</span>
                        <CreditCard size={20} className="text-success ms-3" />
                        <span className="text-muted">Flexible Payment</span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => setShowBookingModal(true)}
                      style={{
                        background: THEME.gradientOrange,
                        border: 'none',
                        padding: '15px',
                        borderRadius: '10px',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        width: '100%',
                        marginBottom: '15px'
                      }}
                    >
                      Book Now
                    </Button>
                    
                    <Button
                      variant="outline-primary"
                      onClick={() => setShowBooking(true)}
                      style={{
                        borderColor: THEME.primary,
                        color: THEME.primary,
                        padding: '15px',
                        borderRadius: '10px',
                        fontWeight: 600,
                        fontSize: '1rem',
                        width: '100%'
                      }}
                    >
                      Quick Inquiry
                    </Button>
                    
                    <div className="text-center mt-4">
                      <small className="text-muted">
                        Need help? Contact us:
                      </small>
                      <div className="d-flex justify-content-center gap-3 mt-2">
                        <Button size="sm" variant="outline-success">
                          <Whatsapp />
                        </Button>
                        <Button size="sm" variant="outline-primary">
                          <Envelope />
                        </Button>
                        <Button size="sm" variant="outline-info">
                          <Telephone />
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                
                {/* Quick Inquiry Form */}
                {showBooking && (
                  <Card className="mt-4 border-0 shadow" style={{ borderRadius: '15px' }}>
                    <Card.Body className="p-4">
                      <h5 className="fw-bold mb-3">Quick Inquiry</h5>
                      <Form onSubmit={submitBooking}>
                        <Form.Group className="mb-3">
                          <Form.Control
                            name="full_name"
                            placeholder="Your Name"
                            required
                            value={formData.full_name}
                            onChange={handleChange}
                            className="py-2"
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="py-2"
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="date"
                            name="date"
                            required
                            value={formData.date}
                            onChange={handleChange}
                            className="py-2"
                          />
                        </Form.Group>
                        
                        <Button
                          type="submit"
                          disabled={bookingLoading}
                          style={{
                            background: THEME.gradient,
                            border: 'none',
                            padding: '10px',
                            borderRadius: '10px',
                            fontWeight: 600,
                            width: '100%'
                          }}
                        >
                          {bookingLoading ? 'Sending...' : 'Send Inquiry'}
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                )}
              </div>
            </Col>
          </Row>
          
          {/* Success Alert */}
          {bookingSuccess && (
            <Alert 
              variant="success" 
              className="mt-4 border-0 shadow" 
              style={{ borderRadius: '10px', background: '#d4edda' }}
            >
              <div className="d-flex align-items-center">
                <CheckCircle size={24} className="me-3" />
                <div>
                  <h6 className="fw-bold mb-1">Booking Confirmed!</h6>
                  <p className="mb-0">{bookingSuccess}</p>
                </div>
              </div>
            </Alert>
          )}
          
          {/* Back Button */}
          <div className="text-center mt-5">
            <Button
              variant="outline-primary"
              onClick={() => navigate(-1)}
              style={{
                borderColor: THEME.primary,
                color: THEME.primary,
                padding: '12px 40px',
                borderRadius: '10px',
                fontWeight: 600,
              }}
            >
              <ArrowLeft className="me-2" /> Back to Destinations
            </Button>
          </div>
        </Container>
      </section>

      {/* ============================
         BOOKING MODAL
      ============================ */}
      <Modal
        show={showBookingModal}
        onHide={() => setShowBookingModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="border-0" style={{ background: THEME.gradient }}>
          <Modal.Title className="text-white fw-bold">Complete Your Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={submitBooking}>
            <Row className="gy-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    name="full_name"
                    placeholder="John Doe"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    className="py-2"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="py-2"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Phone *</Form.Label>
                  <Form.Control
                    name="phone"
                    placeholder="+1 (555) 123-4567"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="py-2"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Travel Date *</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="py-2"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Number of People</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max="20"
                    name="number_of_people"
                    value={formData.number_of_people}
                    onChange={handleChange}
                    className="py-2"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Package Type</Form.Label>
                  <Form.Select
                    name="package_type"
                    value={formData.package_type}
                    onChange={handleChange}
                    className="py-2"
                  >
                    <option value="standard">Standard Package</option>
                    <option value="premium">Premium Package (+$100)</option>
                    <option value="vip">VIP Package (+$250)</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label>Special Requests (Optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="special_requests"
                    placeholder="Any special requirements or requests..."
                    value={formData.special_requests}
                    onChange={handleChange}
                    className="py-2"
                  />
                </Form.Group>
              </Col>

              {bookingError && (
                <Col md={12}>
                  <Alert variant="danger" className="border-0">
                    {bookingError}
                  </Alert>
                </Col>
              )}

              <Col md={12}>
                <div className="d-flex gap-3">
                  <Button
                    type="submit"
                    disabled={bookingLoading}
                    style={{
                      flex: 1,
                      background: THEME.gradientOrange,
                      border: 'none',
                      padding: '12px',
                      borderRadius: '10px',
                      fontWeight: 700,
                    }}
                  >
                    {bookingLoading ? 'Processing...' : 'Confirm Booking'}
                  </Button>
                  
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowBookingModal(false)}
                    style={{
                      padding: '12px 30px',
                      borderRadius: '10px',
                      fontWeight: 600,
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}