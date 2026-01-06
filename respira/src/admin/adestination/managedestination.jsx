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
  Toast,
  ToastContainer,
  Pagination,
  Placeholder,
  OverlayTrigger,
  Tooltip,
  InputGroup,
  Dropdown
} from "react-bootstrap";
import { 
  Plus, 
  Pencil, 
  Trash, 
  Search, 
  Filter,
  Globe,
  Clock,
  Calendar,
  Star,
  Eye,
  EyeSlash,
  Image as ImageIcon,
  SortAlphaDown,
  SortAlphaUp,
  GeoAlt,
  CloudSun,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft
} from "react-bootstrap-icons";
import api from "../../config/api";

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showToast, setShowToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagePreview, setImagePreview] = useState("");
  const [processing, setProcessing] = useState(false);
  const itemsPerPage = 8;

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    image: "",
    description: "",
    highlight: "",
    duration: "",
    best_time: "",
    is_active: true,
  });

  // Fetch destinations
  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const res = await api.get("api/destinations/");
      setDestinations(res.data);
      setFilteredDestinations(res.data);
    } catch (err) {
      showNotification("Failed to load destinations", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  // Filter and search
  useEffect(() => {
    let result = [...destinations];

    if (searchTerm) {
      result = result.filter(d => 
        d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterActive !== "all") {
      const isActive = filterActive === "active";
      result = result.filter(d => d.is_active === isActive);
    }

    result.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      }
      return b.title.localeCompare(a.title);
    });

    setFilteredDestinations(result);
    setCurrentPage(1);
  }, [searchTerm, filterActive, sortOrder, destinations]);

  // Form handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "image") {
      setImagePreview(value);
    }
  };

  const openCreateModal = () => {
    setEditing(null);
    setFormData({
      title: "",
      location: "",
      image: "",
      description: "",
      highlight: "",
      duration: "",
      best_time: "",
      is_active: true,
    });
    setImagePreview("");
    setShowModal(true);
  };

  const openEditModal = (destination) => {
    setEditing(destination);
    setFormData(destination);
    setImagePreview(destination.image);
    setShowModal(true);
  };

  // Create/Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    try {
      if (editing) {
        await api.put(`api/destinations/${editing.slug}/`, formData);
        showNotification("Destination updated successfully!", "success");
      } else {
        await api.post("api/destinations/", formData);
        showNotification("Destination created successfully!", "success");
      }
      setShowModal(false);
      fetchDestinations();
    } catch (err) {
      const message = err.response?.data?.message || "Failed to save destination";
      showNotification(message, "error");
    } finally {
      setProcessing(false);
    }
  };

  // Delete
  const handleDelete = async (slug) => {
    if (!window.confirm("Are you sure you want to delete this destination?")) return;
    
    try {
      await api.delete(`api/destinations/${slug}/`);
      showNotification("Destination deleted successfully!", "success");
      fetchDestinations();
    } catch (err) {
      showNotification("Failed to delete destination", "error");
    }
  };

  // Helper functions
  const showNotification = (message, type = "success") => {
    if (type === "success") {
      setSuccess(message);
      setError("");
    } else {
      setError(message);
      setSuccess("");
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const toggleStatus = async (destination) => {
    try {
      const updatedData = { ...destination, is_active: !destination.is_active };
      await api.put(`api/destinations/${destination.slug}/`, updatedData);
      showNotification(
        `Destination ${destination.is_active ? "deactivated" : "activated"}!`,
        "success"
      );
      fetchDestinations();
    } catch (err) {
      showNotification("Failed to update status", "error");
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDestinations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Stats calculation
  const activeCount = destinations.filter(d => d.is_active).length;

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* Toast Notifications */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={3000} 
          autohide
          bg={error ? "danger" : "success"}
        >
          <Toast.Body className="text-white d-flex align-items-center">
            {error ? <XCircle className="me-2" /> : <CheckCircle className="me-2" />}
            <div>
              <strong>{error ? "Error" : "Success"}:</strong> {error || success}
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold mb-2">
            <Globe className="me-2 text-primary" />
            Destination Management
          </h1>
          <p className="text-muted mb-0">
            Manage {destinations.length} travel destinations ({activeCount} active)
          </p>
        </div>
        <Button 
          onClick={openCreateModal}
          variant="primary"
          className="rounded-pill px-4"
        >
          <Plus className="me-2" /> Add Destination
        </Button>
      </div>

      {/* Controls Card */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text className="bg-white">
                  <Search />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="w-100">
                  <Filter className="me-2" />
                  {filterActive === "all" ? "All" : filterActive === "active" ? "Active" : "Inactive"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setFilterActive("all")}>
                    All Destinations
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterActive("active")}>
                    Active Only
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterActive("inactive")}>
                    Inactive Only
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={3}>
              <Button
                variant="outline-primary"
                onClick={toggleSortOrder}
                className="w-100"
              >
                {sortOrder === "asc" ? <SortAlphaDown className="me-2" /> : <SortAlphaUp className="me-2" />}
                Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Stats Cards */}
      <Row className="mb-4 g-3">
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                <Globe size={24} className="text-primary" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Total</h6>
                <h3 className="mb-0">{destinations.length}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                <Eye size={24} className="text-success" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Active</h6>
                <h3 className="mb-0">{activeCount}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-warning bg-opacity-10 p-3 rounded-circle me-3">
                <CloudSun size={24} className="text-warning" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Showing</h6>
                <h3 className="mb-0">{filteredDestinations.length}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-info bg-opacity-10 p-3 rounded-circle me-3">
                <Star size={24} className="text-info" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Inactive</h6>
                <h3 className="mb-0">{destinations.length - activeCount}</h3>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Content */}
      {loading ? (
        <Row>
          {[...Array(8)].map((_, i) => (
            <Col xl={3} lg={4} md={6} key={i} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Placeholder as={Card.Img} animation="wave" style={{ height: "180px" }} />
                <Card.Body>
                  <Placeholder as={Card.Title} animation="wave">
                    <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation="wave">
                    <Placeholder xs={7} /> <Placeholder xs={4} />
                  </Placeholder>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : filteredDestinations.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <Card.Body className="text-center py-5">
            <div className="mb-4">
              {searchTerm || filterActive !== "all" ? 
                <Search size={64} className="text-muted" /> : 
                <Globe size={64} className="text-muted" />
              }
            </div>
            <h4 className="text-muted mb-3">
              {searchTerm ? "No destinations found" : "No destinations yet"}
            </h4>
            <p className="text-muted mb-4">
              {searchTerm 
                ? "Try adjusting your search terms" 
                : "Get started by adding your first destination"}
            </p>
            <Button onClick={openCreateModal} variant="primary">
              <Plus className="me-2" /> Add Destination
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Row>
            {currentItems.map((d) => (
              <Col xl={3} lg={4} md={6} key={d.id} className="mb-4">
                <Card className="h-100 border-0 shadow-sm hover-shadow">
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={d.image || "https://via.placeholder.com/400x200?text=No+Image"}
                      alt={d.title}
                      style={{ height: "180px", objectFit: "cover" }}
                      className="rounded-top"
                    />
                    <Badge 
                      bg={d.is_active ? "success" : "secondary"} 
                      className="position-absolute top-0 end-0 m-2"
                    >
                      {d.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Card.Title className="h6 mb-0 fw-bold text-truncate">
                        {d.title}
                      </Card.Title>
                      <OverlayTrigger overlay={<Tooltip>{d.is_active ? "Deactivate" : "Activate"}</Tooltip>}>
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 ms-2"
                          onClick={() => toggleStatus(d)}
                        >
                          {d.is_active ? 
                            <EyeSlash size={16} className="text-secondary" /> : 
                            <Eye size={16} className="text-success" />
                          }
                        </Button>
                      </OverlayTrigger>
                    </div>
                    
                    <div className="mb-3">
                      <small className="text-muted d-flex align-items-center">
                        <GeoAlt size={12} className="me-1" /> {d.location}
                      </small>
                    </div>
                    
                    {d.highlight && (
                      <div className="mb-3">
                        <Badge bg="warning" className="text-dark mb-2">
                          Highlight
                        </Badge>
                        <p className="small mb-0">{d.highlight}</p>
                      </div>
                    )}
                    
                    {d.description && (
                      <Card.Text className="small text-muted flex-grow-1 mb-3">
                        {d.description.length > 100 
                          ? `${d.description.substring(0, 100)}...` 
                          : d.description}
                      </Card.Text>
                    )}
                    
                    <div className="mt-auto">
                      <Row className="g-2 mb-3">
                        <Col>
                          <div className="bg-light p-2 rounded text-center">
                            <Clock size={14} className="text-primary mb-1" />
                            <div className="small">{d.duration || "Flexible"}</div>
                          </div>
                        </Col>
                        <Col>
                          <div className="bg-light p-2 rounded text-center">
                            <Calendar size={14} className="text-primary mb-1" />
                            <div className="small">{d.best_time || "Year-round"}</div>
                          </div>
                        </Col>
                      </Row>
                      
                      <div className="d-flex justify-content-between pt-2 border-top">
                        <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => openEditModal(d)}
                            className="rounded-circle"
                            style={{ width: "36px", height: "36px" }}
                          >
                            <Pencil size={14} />
                          </Button>
                        </OverlayTrigger>
                        
                        <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(d.slug)}
                            className="rounded-circle"
                            style={{ width: "36px", height: "36px" }}
                          >
                            <Trash size={14} />
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev 
                  onClick={() => paginate(currentPage - 1)} 
                  disabled={currentPage === 1}
                />
                
                {[...Array(totalPages)].map((_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                
                <Pagination.Next 
                  onClick={() => paginate(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
      )}

      {/* Create/Edit Modal */}
      <Modal 
        show={showModal} 
        onHide={() => !processing && setShowModal(false)} 
        size="lg"
        centered
        backdrop={processing ? "static" : true}
      >
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            {editing ? "Edit Destination" : "Create New Destination"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={8}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Destination Name *</Form.Label>
                      <Form.Control
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter destination name"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Location *</Form.Label>
                      <Form.Control
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        placeholder="City, Country"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Image URL *</Form.Label>
                      <Form.Control
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        placeholder="https://example.com/image.jpg"
                      />
                      <Form.Text className="text-muted">
                        Enter a valid image URL
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Detailed description..."
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Highlight</Form.Label>
                      <Form.Control
                        name="highlight"
                        value={formData.highlight}
                        onChange={handleChange}
                        placeholder="Main attraction or feature"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Duration</Form.Label>
                      <Form.Control
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="e.g., 7 days"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Best Time</Form.Label>
                      <Form.Control
                        name="best_time"
                        value={formData.best_time}
                        onChange={handleChange}
                        placeholder="e.g., Dec-Feb"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Check
                      type="switch"
                      id="status-switch"
                      label={<span className="fw-bold">Active Destination</span>}
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </Col>
              
              <Col md={4}>
                <Card className="h-100">
                  <Card.Header className="bg-light">
                    <h6 className="mb-0">Image Preview</h6>
                  </Card.Header>
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    {imagePreview ? (
                      <>
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="img-fluid rounded mb-3"
                          style={{ maxHeight: '150px', objectFit: 'cover' }}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/300x150?text=Invalid+URL";
                          }}
                        />
                        <small className="text-muted">Live Preview</small>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <ImageIcon size={48} className="text-muted mb-3" />
                        <p className="text-muted mb-0 small">Enter image URL to see preview</p>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
              <Button 
                variant="outline-secondary" 
                onClick={() => setShowModal(false)}
                disabled={processing}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="primary"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Saving...
                  </>
                ) : editing ? (
                  "Update Destination"
                ) : (
                  "Create Destination"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminDestinations;