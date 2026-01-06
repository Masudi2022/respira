import { useState } from "react";
import api from "../config/api";
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
  PersonPlus,
  XCircle,
} from "react-bootstrap-icons";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuperuser, setIsSuperuser] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await api.post("/auth/register/", {
        username,
        email,
        password,
        is_superuser: isSuperuser,
      });

      navigate("/login", { replace: true });
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={10} lg={8} xl={6}>
          <Card className="shadow-lg border-0" style={{ borderRadius: "20px" }}>
            <Card.Body className="p-4 p-md-5">

              <div className="text-center mb-4">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                  style={{
                    width: 60,
                    height: 60,
                    background: "linear-gradient(135deg, #0d9488, #115e59)",
                  }}
                >
                  <PersonPlus size={30} className="text-white" />
                </div>
                <h2 className="fw-bold">Create Account</h2>
                <p className="text-muted">Register a new user</p>
              </div>

              {error && (
                <Alert variant="danger" className="border-0">
                  <XCircle className="me-2" />
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleRegister}>
                {/* Username */}
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <FormControl
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="py-3"
                  />
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <Envelope />
                    </InputGroup.Text>
                    <FormControl
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="py-3"
                    />
                  </InputGroup>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <Lock />
                    </InputGroup.Text>
                    <FormControl
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="py-3"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeSlash /> : <Eye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <FormControl
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="py-3"
                  />
                </Form.Group>

                {/* Superuser Checkbox */}
                <FormCheck
                  type="checkbox"
                  className="mb-4"
                  label={
                    <span className="fw-medium text-danger">
                      Grant Superuser Privileges (Learning only)
                    </span>
                  }
                  checked={isSuperuser}
                  onChange={(e) => setIsSuperuser(e.target.checked)}
                />

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-100 py-3 fw-bold border-0"
                  style={{
                    background: "linear-gradient(135deg, #0d9488, #115e59)",
                  }}
                >
                  {isLoading ? (
                    <>
                      <Spinner size="sm" className="me-2" />
                      Creating Account...
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <small className="text-muted">
                  Already have an account?{" "}
                  <span
                    style={{ color: "#0d9488", cursor: "pointer" }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </small>
              </div>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
