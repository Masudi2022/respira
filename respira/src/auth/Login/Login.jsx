import { useState } from "react";
import api from "../../config/api";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  Spinner,
  InputGroup,
  FormControl,
  FormCheck,
} from "react-bootstrap";
import {
  Envelope,
  Lock,
  ShieldCheck,
  Eye,
  EyeSlash,
  PersonCircle,
  XCircle,
} from "react-bootstrap-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login/", {
        username: email,
        password,
      });

      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      localStorage.setItem("user_email", res.data.email);
      localStorage.setItem("role", res.data.role);

      navigate("/my-bookings", { replace: true });
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      const alertElement = document.querySelector('.error-alert');
      if (alertElement) {
        alertElement.classList.add('animate__animated', 'animate__shakeX');
        setTimeout(() => {
          alertElement.classList.remove('animate__animated', 'animate__shakeX');
        }, 1000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center p-3 bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={10} lg={8} xl={6}>
          <Card className="shadow-lg border-0 overflow-hidden" style={{ borderRadius: "20px" }}>
            <Card.Body className="p-0">
              <Row className="g-0">
                {/* Left Panel - Branding */}
                <Col md={6} className="d-none d-md-flex">
                  <div 
                    className="h-100 p-5 d-flex flex-column justify-content-center position-relative"
                    style={{
                      background: "linear-gradient(135deg, #0d9488 0%, #115e59 100%)",
                    }}
                  >
                    {/* Decorative Elements */}
                    <div className="position-absolute top-0 end-0 p-4">
                      <div className="bg-white bg-opacity-10 rounded-circle p-2">
                        <ShieldCheck size={24} className="text-white" />
                      </div>
                    </div>
                    
                    <div className="position-absolute bottom-0 start-0 p-4">
                      <div className="bg-white bg-opacity-10 rounded-circle p-2">
                        <ShieldCheck size={24} className="text-white" />
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="bg-white bg-opacity-20 p-4 rounded-circle d-inline-flex mb-4">
                        <ShieldCheck size={48} className="text-white" />
                      </div>
                      
                      <h1 className="text-white fw-bold mb-3 display-6">
                        RespiraZanzibar
                      </h1>
                      <p className="text-white text-opacity-85 mb-0 fs-5">
                        Tours & Safaris
                      </p>
                      
                      <div className="mt-5 pt-4">
                        <p className="text-white text-opacity-75">
                          Sign in to manage your bookings and reservations
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Right Panel - Login Form */}
                <Col md={6}>
                  <div className="p-4 p-md-5 h-100 d-flex flex-column justify-content-center">
                    <div className="text-center mb-5">
                      <div className="d-flex justify-content-center mb-3">
                        <div 
                          className="p-3 rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            background: "linear-gradient(135deg, #0d9488 0%, #115e59 100%)",
                            width: "60px",
                            height: "60px"
                          }}
                        >
                          <PersonCircle size={32} className="text-white" />
                        </div>
                      </div>
                      <h2 className="fw-bold text-dark mb-2">Welcome Back</h2>
                    </div>

                    {error && (
                      <Alert 
                        variant="danger" 
                        className="border-0 error-alert mb-4"
                        style={{
                          background: "linear-gradient(to right, rgba(220,53,69,0.1), rgba(220,53,69,0.05))",
                          borderLeft: "4px solid #dc3545"
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <XCircle className="me-2 flex-shrink-0" />
                          <span>{error}</span>
                        </div>
                      </Alert>
                    )}

                    <Form onSubmit={handleLogin} className="mt-2">
                      {/* Email Input */}
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-medium text-dark mb-2">
                          Email Address
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text 
                            className="bg-white border-end-0"
                            style={{ borderColor: "#e0e0e0" }}
                          >
                            <Envelope className="text-muted" />
                          </InputGroup.Text>
                          <FormControl
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                              borderColor: "#e0e0e0",
                              borderLeft: "none",
                            }}
                            className="py-3"
                          />
                        </InputGroup>
                      </Form.Group>

                      {/* Password Input */}
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-medium text-dark mb-2">
                          Password
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text 
                            className="bg-white border-end-0"
                            style={{ borderColor: "#e0e0e0" }}
                          >
                            <Lock className="text-muted" />
                          </InputGroup.Text>
                          <FormControl
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                              borderColor: "#e0e0e0",
                              borderLeft: "none",
                            }}
                            className="py-3"
                          />
                          <Button
                            variant="outline-secondary"
                            className="border-start-0"
                            style={{
                              borderColor: "#e0e0e0",
                              backgroundColor: "white",
                            }}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeSlash /> : <Eye />}
                          </Button>
                        </InputGroup>
                      </Form.Group>

                      {/* Remember Me & Forgot Password */}
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <FormCheck
                          type="checkbox"
                          id="remember-me"
                          label={
                            <span className="text-dark">
                              Remember me
                            </span>
                          }
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <Button
                          variant="link"
                          className="text-decoration-none p-0 fw-medium"
                          style={{ color: "#0d9488" }}
                        >
                          Forgot Password?
                        </Button>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-100 py-3 mb-3 fw-bold border-0"
                        style={{
                          background: "linear-gradient(135deg, #0d9488, #115e59)",
                          fontSize: "1.1rem",
                        }}
                      >
                        {isLoading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              className="me-2"
                            />
                            Signing In...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </Form>

                    {/* Footer */}
                    <div className="text-center mt-4 pt-3">
                      <small className="text-muted">
                        © 2024 RespiraZanzibar Tours & Safaris
                      </small>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add some CSS for animations */}
      <style jsx>{`
        .form-control:focus {
          box-shadow: 0 0 0 0.25rem rgba(13, 148, 136, 0.25);
          border-color: #0d9488;
        }
        
        .form-check-input:checked {
          background-color: #0d9488;
          border-color: #0d9488;
        }
        
        .form-check-input:focus {
          box-shadow: 0 0 0 0.25rem rgba(13, 148, 136, 0.25);
        }
      `}</style>
    </Container>
  );
};

export default Login;