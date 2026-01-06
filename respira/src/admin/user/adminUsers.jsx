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
  Dropdown,
  Table,
  ProgressBar,
  OverlayTrigger,
  Tooltip,
  Toast,
  ToastContainer
} from "react-bootstrap";
import { 
  Pencil, 
  Trash, 
  Search, 
  Filter,
  Person,
  Envelope,
  Calendar,
  Shield,
  Power,
  Star,
  StarFill,
  ThreeDotsVertical,
  SortAlphaDown,
  SortAlphaUp,
  Eye,
  EyeSlash,
  CheckCircle,
  XCircle,
  PersonPlus
} from "react-bootstrap-icons";
import api from "../../config/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState("all");
  const [filterStaff, setFilterStaff] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showToast, setShowToast] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "table"

  // ======================
  // FETCH USERS
  // ======================
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("auth/users/");
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      setError("Failed to load users");
      showNotification("Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ======================
  // FILTER & SEARCH
  // ======================
  useEffect(() => {
    let result = [...users];

    // Search filter
    if (searchTerm) {
      result = result.filter(u => 
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Active status filter
    if (filterActive !== "all") {
      const isActive = filterActive === "active";
      result = result.filter(u => u.is_active === isActive);
    }

    // Staff status filter
    if (filterStaff !== "all") {
      const isStaff = filterStaff === "staff";
      result = result.filter(u => u.is_staff === isStaff);
    }

    // Sorting
    if (sortOrder === "newest") {
      result.sort((a, b) => new Date(b.date_joined) - new Date(a.date_joined));
    } else if (sortOrder === "oldest") {
      result.sort((a, b) => new Date(a.date_joined) - new Date(b.date_joined));
    } else if (sortOrder === "name-asc") {
      result.sort((a, b) => a.username.localeCompare(b.username));
    } else if (sortOrder === "name-desc") {
      result.sort((a, b) => b.username.localeCompare(a.username));
    }

    setFilteredUsers(result);
  }, [searchTerm, filterActive, filterStaff, sortOrder, users]);

  // ======================
  // HELPER FUNCTIONS
  // ======================
  const showNotification = (message, type = "success") => {
    setSuccess(message);
    setError(type === "error" ? message : "");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (username) => {
    return username.charAt(0).toUpperCase();
  };

  const getUserRoleBadge = (user) => {
    if (user.is_superuser) {
      return { text: "Super Admin", variant: "danger", icon: <StarFill size={12} /> };
    } else if (user.is_staff) {
      return { text: "Staff", variant: "warning", icon: <Shield size={12} /> };
    } else {
      return { text: "User", variant: "info", icon: <Person size={12} /> };
    }
  };

  // ======================
  // MODAL HANDLERS
  // ======================
  const openEditModal = (user) => {
    setEditing(user);
    setIsActive(user.is_active);
    setShowModal(true);
  };

  const openQuickView = (user) => {
    setSelectedUser(user);
    // You can implement a quick view sidebar here
  };

  // ======================
  // UPDATE USER ACTIVE STATUS
  // ======================
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`auth/users/${editing.id}/`, {
        is_active: isActive,
      });
      showNotification(`User ${isActive ? "activated" : "deactivated"} successfully!`, "success");
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      showNotification("Failed to update user", "error");
    }
  };

  // ======================
  // DELETE USER
  // ======================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`auth/users/${id}/`);
      showNotification("User deleted successfully!", "success");
      fetchUsers();
    } catch (err) {
      showNotification("Failed to delete user", "error");
    }
  };

  // ======================
  // TOGGLE USER STATUS
  // ======================
  const toggleUserStatus = async (user) => {
    try {
      await api.patch(`auth/users/${user.id}/`, {
        is_active: !user.is_active,
      });
      showNotification(`User ${user.is_active ? "deactivated" : "activated"}!`, "success");
      fetchUsers();
    } catch (err) {
      showNotification("Failed to update user status", "error");
    }
  };

  // ======================
  // STATISTICS
  // ======================
  const stats = {
    total: users.length,
    active: users.filter(u => u.is_active).length,
    staff: users.filter(u => u.is_staff).length,
    superusers: users.filter(u => u.is_superuser).length,
  };

  return (
    <Container fluid className="py-4 px-4">
      {/* Toast Notifications */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={3000} 
          autohide
          className={`${error ? "bg-danger" : "bg-success"} border-0 shadow-lg`}
        >
          <Toast.Body className="d-flex align-items-center text-white">
            {error ? (
              <XCircle size={20} className="me-3" />
            ) : (
              <CheckCircle size={20} className="me-3" />
            )}
            <div>
              <span>{error || success}</span>
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Header Section */}
      <div className="position-relative overflow-hidden rounded-4 p-5 mb-5 shadow-lg" 
           style={{
             background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
           }}>
        <div className="position-absolute top-0 end-0 w-100 h-100 opacity-10">
          <i className="fas fa-users position-absolute" style={{top: '20%', right: '10%', fontSize: '10rem'}}></i>
          <i className="fas fa-user-shield position-absolute" style={{top: '40%', left: '5%', fontSize: '8rem'}}></i>
        </div>
        <Row className="align-items-center position-relative">
          <Col md={6}>
            <h1 className="display-5 fw-bold text-white mb-3">
              <i className="fas fa-user-cog me-3"></i>
              User Management
            </h1>
            <p className="text-white-70 mb-0 lead">
              Manage user accounts and permissions
              <span className="d-block mt-2">
                <span className="badge bg-light text-primary rounded-pill px-3 py-2 me-2">
                  <i className="fas fa-users me-2"></i>
                  {stats.total} Total Users
                </span>
                <span className="badge bg-success bg-opacity-25 text-white rounded-pill px-3 py-2 me-2">
                  <i className="fas fa-check-circle me-2"></i>
                  {stats.active} Active
                </span>
              </span>
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <div className="d-flex gap-3 justify-content-end">
              <Button 
                variant="light"
                className="rounded-pill px-4 py-2 fw-bold shadow-sm hover-lift"
                onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
              >
                <i className={`fas fa-${viewMode === "grid" ? "table" : "th-large"} me-2`}></i>
                {viewMode === "grid" ? "Table View" : "Grid View"}
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Statistics Cards */}
      <Row className="g-4 mb-5">
        <Col xl={3} lg={6}>
          <Card className="border-0 shadow-lg hover-lift" style={{ borderRadius: '20px' }}>
            <Card.Body className="p-4">
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                  <Person size={24} className="text-primary" />
                </div>
                <div>
                  <h6 className="text-muted mb-1">Total Users</h6>
                  <h3 className="fw-bold mb-0">{stats.total}</h3>
                </div>
              </div>
              <ProgressBar 
                now={(stats.total / (stats.total + 10)) * 100} 
                variant="primary"
                className="mt-3"
                style={{ height: '4px', borderRadius: '2px' }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} lg={6}>
          <Card className="border-0 shadow-lg hover-lift" style={{ borderRadius: '20px' }}>
            <Card.Body className="p-4">
              <div className="d-flex align-items-center">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                  <CheckCircle size={24} className="text-success" />
                </div>
                <div>
                  <h6 className="text-muted mb-1">Active Users</h6>
                  <h3 className="fw-bold mb-0">{stats.active}</h3>
                </div>
              </div>
              <ProgressBar 
                now={(stats.active / stats.total) * 100} 
                variant="success"
                className="mt-3"
                style={{ height: '4px', borderRadius: '2px' }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} lg={6}>
          <Card className="border-0 shadow-lg hover-lift" style={{ borderRadius: '20px' }}>
            <Card.Body className="p-4">
              <div className="d-flex align-items-center">
                <div className="bg-warning bg-opacity-10 p-3 rounded-circle me-3">
                  <Shield size={24} className="text-warning" />
                </div>
                <div>
                  <h6 className="text-muted mb-1">Staff Members</h6>
                  <h3 className="fw-bold mb-0">{stats.staff}</h3>
                </div>
              </div>
              <ProgressBar 
                now={(stats.staff / stats.total) * 100} 
                variant="warning"
                className="mt-3"
                style={{ height: '4px', borderRadius: '2px' }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} lg={6}>
          <Card className="border-0 shadow-lg hover-lift" style={{ borderRadius: '20px' }}>
            <Card.Body className="p-4">
              <div className="d-flex align-items-center">
                <div className="bg-danger bg-opacity-10 p-3 rounded-circle me-3">
                  <StarFill size={24} className="text-danger" />
                </div>
                <div>
                  <h6 className="text-muted mb-1">Super Admins</h6>
                  <h3 className="fw-bold mb-0">{stats.superusers}</h3>
                </div>
              </div>
              <ProgressBar 
                now={(stats.superusers / stats.total) * 100} 
                variant="danger"
                className="mt-3"
                style={{ height: '4px', borderRadius: '2px' }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Controls Section */}
      <Card className="border-0 shadow-lg mb-5 overflow-hidden" 
            style={{
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)'
            }}>
        <Card.Body className="p-4">
          <Row className="g-3 align-items-center">
            <Col md={5}>
              <div className="position-relative">
                <InputGroup className="shadow-sm">
                  <InputGroup.Text className="bg-white border-end-0 ps-4">
                    <Search className="text-primary" />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search users by username or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-start-0 py-3 ps-0 border-0"
                    style={{borderRadius: '0 12px 12px 0'}}
                  />
                  <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                    <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">
                      {filteredUsers.length} users
                    </span>
                  </div>
                </InputGroup>
              </div>
            </Col>
            <Col md={2}>
              <Dropdown>
                <Dropdown.Toggle 
                  variant="outline-secondary" 
                  className="w-100 py-3 border-0 shadow-sm rounded-pill bg-white"
                >
                  <Filter className="me-2" />
                  Status
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow-lg border-0 rounded-3 mt-2">
                  <Dropdown.Item onClick={() => setFilterActive("all")}>
                    All Status
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterActive("active")}>
                    <CheckCircle className="me-2 text-success" />
                    Active Only
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterActive("inactive")}>
                    <XCircle className="me-2 text-secondary" />
                    Inactive Only
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={2}>
              <Dropdown>
                <Dropdown.Toggle 
                  variant="outline-secondary" 
                  className="w-100 py-3 border-0 shadow-sm rounded-pill bg-white"
                >
                  <Shield className="me-2" />
                  Role
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow-lg border-0 rounded-3 mt-2">
                  <Dropdown.Item onClick={() => setFilterStaff("all")}>
                    All Roles
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterStaff("staff")}>
                    <Shield className="me-2 text-warning" />
                    Staff Only
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setFilterStaff("user")}>
                    <Person className="me-2 text-info" />
                    Users Only
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={3}>
              <Dropdown>
                <Dropdown.Toggle 
                  variant="outline-primary" 
                  className="w-100 py-3 rounded-pill shadow-sm hover-lift"
                >
                  <SortAlphaDown className="me-2" />
                  Sort By
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow-lg border-0 rounded-3 mt-2">
                  <Dropdown.Item onClick={() => setSortOrder("newest")}>
                    <Calendar className="me-2" />
                    Newest First
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortOrder("oldest")}>
                    <Calendar className="me-2" />
                    Oldest First
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortOrder("name-asc")}>
                    <SortAlphaDown className="me-2" />
                    Name A-Z
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortOrder("name-desc")}>
                    <SortAlphaUp className="me-2" />
                    Name Z-A
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Content Section */}
      {loading ? (
        <Row className="g-4">
          {[...Array(6)].map((_, i) => (
            <Col xl={4} lg={6} key={i}>
              <Card className="border-0 shadow-lg h-100" style={{ borderRadius: '20px' }}>
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-4">
                    <div className="placeholder rounded-circle" style={{ width: '60px', height: '60px' }}></div>
                    <div className="ms-3 flex-grow-1">
                      <div className="placeholder placeholder-xs col-8 mb-2"></div>
                      <div className="placeholder placeholder-xs col-5"></div>
                    </div>
                  </div>
                  <div className="placeholder placeholder-xs col-12 mb-2" style={{ height: '20px' }}></div>
                  <div className="placeholder placeholder-xs col-8 mb-4" style={{ height: '20px' }}></div>
                  <div className="d-flex gap-2">
                    <div className="placeholder col-6" style={{ height: '40px', borderRadius: '20px' }}></div>
                    <div className="placeholder col-6" style={{ height: '40px', borderRadius: '20px' }}></div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : filteredUsers.length === 0 ? (
        <Card className="border-0 shadow-lg text-center py-5 my-5 overflow-hidden" 
              style={{
                borderRadius: '25px',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)'
              }}>
          <Card.Body className="py-5 px-4">
            <div className="display-1 text-primary mb-4">
              <i className="fas fa-user-slash"></i>
            </div>
            <h3 className="fw-bold text-gray-800 mb-3">
              No Users Found
            </h3>
            <p className="text-muted mb-4 lead">
              {searchTerm 
                ? `No users match "${searchTerm}"`
                : "No users in the system yet"}
            </p>
          </Card.Body>
        </Card>
      ) : viewMode === "grid" ? (
        <Row className="g-4">
          {filteredUsers.map((u) => {
            const roleBadge = getUserRoleBadge(u);
            return (
              <Col xl={4} lg={6} key={u.id}>
                <Card className="border-0 shadow-lg h-100 hover-lift overflow-hidden" 
                      style={{
                        borderRadius: '20px',
                        transition: 'all 0.3s ease'
                      }}>
                  <Card.Body className="p-4">
                    {/* User Header */}
                    <div className="d-flex align-items-start mb-4">
                      <div className="position-relative">
                        <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                             style={{ width: '60px', height: '60px' }}>
                          <span className="display-6 fw-bold text-primary">
                            {getInitials(u.username)}
                          </span>
                        </div>
                        <Badge 
                          bg={u.is_active ? "success" : "secondary"}
                          pill 
                          className="position-absolute bottom-0 end-0 border border-2 border-white"
                          style={{ width: '20px', height: '20px' }}
                        >
                          {u.is_active ? <CheckCircle size={10} /> : <XCircle size={10} />}
                        </Badge>
                      </div>
                      <div className="ms-3 flex-grow-1">
                        <h5 className="fw-bold mb-1">{u.username}</h5>
                        <div className="d-flex align-items-center text-muted mb-2">
                          <Envelope size={12} className="me-1" />
                          <small>{u.email}</small>
                        </div>
                        <Badge 
                          bg={roleBadge.variant} 
                          className="rounded-pill d-inline-flex align-items-center"
                        >
                          {roleBadge.icon}
                          <span className="ms-1">{roleBadge.text}</span>
                        </Badge>
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle variant="link" className="p-0 text-muted">
                          <ThreeDotsVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="shadow-lg border-0 rounded-3">
                          <Dropdown.Item onClick={() => openQuickView(u)}>
                            <Eye className="me-2" />
                            Quick View
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => openEditModal(u)}>
                            <Pencil className="me-2" />
                            Edit User
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => toggleUserStatus(u)}>
                            <Power className="me-2" />
                            {u.is_active ? "Deactivate" : "Activate"}
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item 
                            onClick={() => handleDelete(u.id)}
                            className="text-danger"
                          >
                            <Trash className="me-2" />
                            Delete User
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>

                    {/* User Details */}
                    <div className="mb-4">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Joined Date</span>
                        <span className="fw-bold">{formatDate(u.date_joined)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Last Login</span>
                        <span className="fw-bold">
                          {u.last_login ? formatDate(u.last_login) : "Never"}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex gap-2">
                      <Button
                        variant={u.is_active ? "outline-warning" : "outline-success"}
                        size="sm"
                        className="rounded-pill flex-grow-1 d-flex align-items-center justify-content-center"
                        onClick={() => toggleUserStatus(u)}
                      >
                        {u.is_active ? <EyeSlash className="me-2" /> : <Eye className="me-2" />}
                        {u.is_active ? "Deactivate" : "Activate"}
                      </Button>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Edit User</Tooltip>}
                      >
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="rounded-circle p-2"
                          onClick={() => openEditModal(u)}
                        >
                          <Pencil size={16} />
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Delete User</Tooltip>}
                      >
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="rounded-circle p-2"
                          onClick={() => handleDelete(u.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        /* Table View */
        <Card className="border-0 shadow-lg overflow-hidden" style={{ borderRadius: '20px' }}>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-4 border-0">User</th>
                    <th className="border-0">Email</th>
                    <th className="border-0">Role</th>
                    <th className="border-0">Status</th>
                    <th className="border-0">Joined</th>
                    <th className="border-0 text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => {
                    const roleBadge = getUserRoleBadge(u);
                    return (
                      <tr key={u.id} style={{ cursor: 'pointer' }} onClick={() => openQuickView(u)}>
                        <td className="ps-4 align-middle">
                          <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3"
                                 style={{ width: '40px', height: '40px' }}>
                              <span className="fw-bold text-primary">
                                {getInitials(u.username)}
                              </span>
                            </div>
                            <div>
                              <h6 className="fw-bold mb-0">{u.username}</h6>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <Envelope size={14} className="me-2 text-muted" />
                            <span>{u.email}</span>
                          </div>
                        </td>
                        <td className="align-middle">
                          <Badge bg={roleBadge.variant} className="rounded-pill">
                            {roleBadge.text}
                          </Badge>
                        </td>
                        <td className="align-middle">
                          <Badge bg={u.is_active ? "success" : "secondary"} className="rounded-pill">
                            {u.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="align-middle">
                          <small className="text-muted">{formatDate(u.date_joined)}</small>
                        </td>
                        <td className="align-middle text-end pe-4">
                          <div className="d-flex gap-2 justify-content-end">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="rounded-circle p-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditModal(u);
                              }}
                            >
                              <Pencil size={14} />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="rounded-circle p-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(u.id);
                              }}
                            >
                              <Trash size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Status Update Modal */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        centered
        className="modal-blur"
      >
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '25px', overflow: 'hidden' }}>
          <div className="modal-header border-0 text-white p-4" 
               style={{background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'}}>
            <Modal.Title className="d-flex align-items-center">
              <div className="bg-white bg-opacity-20 p-2 rounded-circle me-3">
                <Person size={24} className="text-white" />
              </div>
              <div>
                <h5 className="fw-bold mb-0">Update User Status</h5>
                <small className="opacity-75">{editing?.username}</small>
              </div>
            </Modal.Title>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <Modal.Body className="p-4">
            <div className="text-center mb-4">
              <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                   style={{ width: '80px', height: '80px' }}>
                <span className="display-5 fw-bold text-primary">
                  {editing && getInitials(editing.username)}
                </span>
              </div>
              <h5 className="fw-bold mb-1">{editing?.username}</h5>
              <p className="text-muted mb-0">{editing?.email}</p>
            </div>

            <Form onSubmit={handleUpdateUser}>
              <div className="p-4 rounded-3 border mb-4"
                   style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)'}}>
                <Form.Group>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="fw-bold mb-1">Account Status</h6>
                      <p className="text-muted mb-0 small">
                        {isActive 
                          ? "User can log in and use the system"
                          : "User cannot log in to the system"}
                      </p>
                    </div>
                    <Form.Check
                      type="switch"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="fs-4"
                      style={{transform: 'scale(1.5)'}}
                    />
                  </div>
                </Form.Group>
              </div>

              <div className="text-end">
                <Button
                  variant="outline-secondary"
                  className="rounded-pill px-4 me-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="rounded-pill px-4"
                  style={{background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', border: 'none'}}
                >
                  Update Status
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </div>
      </Modal>

      {/* Add these styles */}
      <style jsx>{`
        .hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
        }
        .modal-blur .modal-backdrop {
          backdrop-filter: blur(5px);
        }
        .text-white-70 {
          color: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </Container>
  );
};

export default AdminUsers;