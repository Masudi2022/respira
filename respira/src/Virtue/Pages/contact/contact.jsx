import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Alert } from "react-bootstrap";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaCheckCircle,
  FaShieldAlt,
  FaUser,
  FaComments,
  FaCalendarAlt,
  FaGlobe,
  FaArrowRight,
  FaMapPin,
  FaUsers,
  FaMoneyBillWave,
  FaSearchLocation
} from "react-icons/fa";

const TEAL = "#008080";
const TEAL_LIGHT = "#20B2AA";
const TEAL_DARK = "#006666";
const SECONDARY = "#FF6B35";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    travelDates: "",
    travelers: "",
    budget: ""
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [activeTopic, setActiveTopic] = useState("general");

  const contactTopics = [
    { id: "general", label: "General Inquiry", icon: <FaComments /> },
    { id: "booking", label: "Tour Booking", icon: <FaCalendarAlt /> },
    { id: "custom", label: "Custom Package", icon: <FaGlobe /> },
    { id: "group", label: "Group Travel", icon: <FaUsers /> },
    { id: "support", label: "Customer Support", icon: <FaShieldAlt /> }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleWhatsAppClick = () => {
    const message = `Hello! I'm interested in ${contactTopics.find(t => t.id === activeTopic)?.label}.`;
    const phone = "+255777186221";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div style={{
      background: "#ffffff",
      minHeight: "100vh",
      color: "#2C3E50",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Hero Section */}
      <section style={{
        padding: "140px 0 80px",
        background: `linear-gradient(135deg, ${TEAL}05 0%, ${TEAL}02 100%)`,
        borderBottom: `1px solid ${TEAL}20`
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div style={{
                background: `linear-gradient(135deg, ${SECONDARY}, ${TEAL_LIGHT})`,
                color: "white",
                padding: "12px 30px",
                borderRadius: "50px",
                fontSize: "0.9rem",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "25px"
              }}>
                <FaComments /> CONTACT US
              </div>

              <h1 style={{
                fontSize: "3.5rem",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: "25px",
                color: TEAL_DARK
              }}>
                Get In Touch
                <br />
                <span style={{ color: SECONDARY }}>With Our Team</span>
              </h1>

              <p style={{
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "#666",
                marginBottom: "35px",
                maxWidth: "500px"
              }}>
                Have questions about our services? Need assistance with booking?
                Our team is here to help you with any inquiries.
              </p>

              <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                <button
                  onClick={handleWhatsAppClick}
                  style={{
                    background: "#25D366",
                    border: "none",
                    borderRadius: "50px",
                    padding: "14px 35px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "white",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}
                  className="hover-lift"
                >
                  <FaWhatsapp size={18} />
                  Chat on WhatsApp
                </button>
                
                <button
                  onClick={() => document.getElementById("contact-form").scrollIntoView({ behavior: "smooth" })}
                  style={{
                    background: "transparent",
                    border: `2px solid ${TEAL}`,
                    borderRadius: "50px",
                    padding: "14px 35px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: TEAL,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}
                  className="hover-lift"
                >
                  <FaPaperPlane />
                  Send Message
                </button>
              </div>
            </Col>

            <Col lg={6}>
              <div style={{
                background: "white",
                borderRadius: "25px",
                padding: "40px",
                boxShadow: "0 20px 40px rgba(0,128,128,0.1)",
                border: `1px solid ${TEAL}20`
              }}>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "20px", 
                  marginBottom: "30px" 
                }}>
                  <div style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: `${TEAL}10`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: TEAL,
                    flexShrink: 0
                  }}>
                    <FaPhone size={24} />
                  </div>
                  <div>
                    <div style={{ 
                      fontSize: "0.9rem", 
                      color: TEAL_DARK,
                      fontWeight: 600,
                      marginBottom: "5px"
                    }}>
                      24/7 SUPPORT
                    </div>
                    <div style={{ 
                      fontWeight: 800, 
                      fontSize: "1.5rem",
                      color: TEAL_DARK 
                    }}>
                      +255 777 186 221
                    </div>
                  </div>
                </div>
                
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "20px",
                  marginBottom: "30px"
                }}>
                  <div style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: `${TEAL}10`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: TEAL,
                    flexShrink: 0
                  }}>
                    <FaEnvelope size={24} />
                  </div>
                  <div>
                    <div style={{ 
                      fontSize: "0.9rem", 
                      color: TEAL_DARK,
                      fontWeight: 600,
                      marginBottom: "5px"
                    }}>
                      EMAIL ADDRESS
                    </div>
                    <div style={{ 
                      fontWeight: 800, 
                      fontSize: "1.3rem",
                      color: TEAL_DARK 
                    }}>
                      Zanzibarespira@respira.co.tz
                    </div>
                  </div>
                </div>
                
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  background: `${TEAL}08`,
                  padding: "15px 20px",
                  borderRadius: "15px",
                  width: "fit-content"
                }}>
                  <FaClock color={TEAL} />
                  <span style={{ 
                    fontWeight: 600, 
                    color: TEAL_DARK,
                    fontSize: "0.9rem"
                  }}>
                    Mon-Sat: 8AM-8PM EAT
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Topics */}
      <section style={{ padding: "80px 0", background: "#ffffff" }}>
        <Container>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h2 style={{
              fontWeight: 800,
              fontSize: "2.8rem",
              color: TEAL_DARK,
              marginBottom: "15px"
            }}>
              How Can We Help?
            </h2>
            <p style={{ 
              color: "#666", 
              maxWidth: "600px", 
              margin: "0 auto",
              fontSize: "1.1rem"
            }}>
              Select your inquiry type for personalized assistance
            </p>
          </div>
          
          <Row className="g-4">
            {contactTopics.map(topic => (
              <Col lg={2.4} md={4} sm={6} key={topic.id}>
                <div
                  onClick={() => setActiveTopic(topic.id)}
                  style={{
                    background: activeTopic === topic.id 
                      ? `linear-gradient(135deg, ${TEAL}, ${TEAL_LIGHT})` 
                      : "white",
                    color: activeTopic === topic.id ? "white" : TEAL_DARK,
                    borderRadius: "20px",
                    padding: "30px 15px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: activeTopic === topic.id 
                      ? "none" 
                      : `2px solid ${TEAL}20`,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
                  }}
                  className="hover-lift"
                >
                  <div style={{
                    fontSize: "2rem",
                    marginBottom: "15px",
                    color: activeTopic === topic.id ? "white" : TEAL
                  }}>
                    {topic.icon}
                  </div>
                  <div style={{ 
                    fontWeight: 600,
                    fontSize: "0.95rem"
                  }}>
                    {topic.label}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Main Contact Section */}
      <section id="contact-form" style={{ 
        padding: "80px 0", 
        background: `linear-gradient(135deg, ${TEAL}03 0%, ${TEAL}01 100%)`
      }}>
        <Container>
          <Row className="g-5">
            {/* Contact Form */}
            <Col lg={7}>
              <Card style={{
                border: "none",
                borderRadius: "25px",
                background: "white",
                boxShadow: "0 20px 40px rgba(0,128,128,0.08)",
                padding: "40px",
                height: "100%",
                position: "relative"
              }}>
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "5px",
                  background: `linear-gradient(90deg, ${TEAL}, ${TEAL_LIGHT})`
                }} />
                
                {submitted && (
                  <Alert variant="success" style={{
                    background: `${TEAL}10`,
                    border: `1px solid ${TEAL}30`,
                    color: TEAL_DARK,
                    borderRadius: "15px",
                    marginBottom: "30px",
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px"
                  }}>
                    <FaCheckCircle size={24} color={TEAL} />
                    <div>
                      <div style={{ fontWeight: 700, marginBottom: "5px" }}>Message Sent!</div>
                      <div style={{ fontSize: "0.95rem" }}>
                        Thank you! We'll contact you within 2 business hours.
                      </div>
                    </div>
                  </Alert>
                )}
                
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "15px",
                  marginBottom: "30px"
                }}>
                  <div style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: `${TEAL}10`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: TEAL
                  }}>
                    <FaPaperPlane size={20} />
                  </div>
                  <div>
                    <h3 style={{ 
                      fontWeight: 700, 
                      color: TEAL_DARK, 
                      margin: 0,
                      fontSize: "1.5rem"
                    }}>
                      Send a Message
                    </h3>
                    <p style={{ 
                      color: "#666", 
                      margin: "5px 0 0 0", 
                      fontSize: "0.9rem"
                    }}>
                      We respond within 2 hours during business hours
                    </p>
                  </div>
                </div>
                
                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ 
                          fontWeight: 600, 
                          color: "#2C3E50",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "8px"
                        }}>
                          <FaUser size={14} />
                          Your Name *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          style={{
                            borderRadius: "10px",
                            border: `2px solid ${TEAL}30`,
                            padding: "12px 15px",
                            fontSize: "0.95rem"
                          }}
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ 
                          fontWeight: 600, 
                          color: "#2C3E50",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "8px"
                        }}>
                          <FaEnvelope size={14} />
                          Email Address *
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          style={{
                            borderRadius: "10px",
                            border: `2px solid ${TEAL}30`,
                            padding: "12px 15px",
                            fontSize: "0.95rem"
                          }}
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ 
                          fontWeight: 600, 
                          color: "#2C3E50",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "8px"
                        }}>
                          <FaPhone size={14} />
                          Phone Number
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          style={{
                            borderRadius: "10px",
                            border: `2px solid ${TEAL}30`,
                            padding: "12px 15px",
                            fontSize: "0.95rem"
                          }}
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ 
                          fontWeight: 600, 
                          color: "#2C3E50",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "8px"
                        }}>
                          <FaCalendarAlt size={14} />
                          Travel Dates
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="travelDates"
                          value={formData.travelDates}
                          onChange={handleChange}
                          placeholder="e.g., June 15-22, 2024"
                          style={{
                            borderRadius: "10px",
                            border: `2px solid ${TEAL}30`,
                            padding: "12px 15px",
                            fontSize: "0.95rem"
                          }}
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ 
                          fontWeight: 600, 
                          color: "#2C3E50",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "8px"
                        }}>
                          <FaUsers size={14} />
                          Number of Travelers
                        </Form.Label>
                        <Form.Select
                          name="travelers"
                          value={formData.travelers}
                          onChange={handleChange}
                          style={{
                            borderRadius: "10px",
                            border: `2px solid ${TEAL}30`,
                            padding: "12px 15px",
                            fontSize: "0.95rem"
                          }}
                        >
                          <option>Select number</option>
                          <option>1-2 (Couple/Romantic)</option>
                          <option>3-4 (Small Family)</option>
                          <option>5-8 (Family/Friends)</option>
                          <option>9+ (Large Group)</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      {/* <Form.Group className="mb-3">
                        <Form.Label style={{ 
                          fontWeight: 600, 
                          color: "#2C3E50",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "8px"
                        }}>
                          <FaMoneyBillWave size={14} />
                          Estimated Budget
                        </Form.Label>
                        <Form.Select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          style={{
                            borderRadius: "10px",
                            border: `2px solid ${TEAL}30`,
                            padding: "12px 15px",
                            fontSize: "0.95rem"
                          }}
                        >
                          <option>Select budget range</option>
                          <option>Economy ($800-1500)</option>
                          <option>Standard ($1500-3000)</option>
                          <option>Premium ($3000-5000)</option>
                          <option>Luxury ($5000+)</option>
                          <option>Custom Quote</option>
                        </Form.Select>
                      </Form.Group> */}
                    </Col>
                    
                    <Col md={12}>
                      <Form.Group className="mb-4">
                        <Form.Label style={{ 
                          fontWeight: 600, 
                          color: "#2C3E50",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "8px"
                        }}>
                          <FaComments size={14} />
                          Your Message *
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder={`Tell us about your ${contactTopics.find(t => t.id === activeTopic)?.label.toLowerCase()}...`}
                          style={{
                            borderRadius: "15px",
                            border: `2px solid ${TEAL}30`,
                            padding: "15px",
                            fontSize: "0.95rem",
                            resize: "none"
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginTop: "25px",
                    paddingTop: "20px",
                    borderTop: `1px solid ${TEAL}20`
                  }}>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "10px",
                      fontSize: "0.85rem", 
                      color: TEAL_DARK 
                    }}>
                      <FaShieldAlt size={16} />
                      <span style={{ fontWeight: 600 }}>Your information is secure</span>
                    </div>
                    
                    <button
                      type="submit"
                      style={{
                        background: `linear-gradient(135deg, ${TEAL}, ${TEAL_LIGHT})`,
                        border: "none",
                        borderRadius: "50px",
                        padding: "14px 40px",
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "white",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                      }}
                      className="hover-lift"
                    >
                      Send Message
                      <FaArrowRight />
                    </button>
                  </div>
                </Form>
              </Card>
            </Col>
            
            {/* Contact Info */}
            <Col lg={5}>
              <div style={{ marginBottom: "30px" }}>
                <h3 style={{ 
                  fontWeight: 700, 
                  color: TEAL_DARK,
                  marginBottom: "25px",
                  fontSize: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <FaMapMarkerAlt color={TEAL} />
                  Our Location
                </h3>
                
                <Card style={{
                  border: "none",
                  borderRadius: "20px",
                  background: "white",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  marginBottom: "20px",
                  overflow: "hidden"
                }}>
                  <div style={{ padding: "30px" }}>
                    <div style={{ 
                      display: "flex", 
                      alignItems: "flex-start", 
                      gap: "15px",
                      marginBottom: "20px"
                    }}>
                      <div style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: `${TEAL}10`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: TEAL,
                        flexShrink: 0
                      }}>
                        <FaMapPin size={20} />
                      </div>
                      <div>
                        <h5 style={{ 
                          fontWeight: 700, 
                          color: TEAL_DARK, 
                          marginBottom: "8px",
                          fontSize: "1.1rem"
                        }}>
                          Main Office
                        </h5>
                        <p style={{ 
                          color: "#666", 
                          margin: 0, 
                          lineHeight: 1.6,
                          fontSize: "0.95rem"
                        }}>
                          Stone Town<br />
                          Zanzibar City, Tanzania
                        </p>
                      </div>
                    </div>
                    
                    <div style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "15px",
                      padding: "15px",
                      background: `${TEAL}08`,
                      borderRadius: "12px",
                      marginBottom: "15px"
                    }}>
                      <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "12px",
                        flex: 1
                      }}>
                        <FaClock size={16} color={TEAL} />
                        <div>
                          <div style={{ 
                            fontWeight: 600, 
                            fontSize: "0.9rem",
                            color: TEAL_DARK
                          }}>
                            Opening Hours
                          </div>
                          <div style={{ 
                            fontSize: "0.85rem", 
                            color: "#666",
                            marginTop: "3px"
                          }}>
                            Monday - Saturday: 8:00 AM - 8:00 PM
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => window.open('https://maps.google.com/?q=Stone+Town+Zanzibar', '_blank')}
                        style={{
                          background: "transparent",
                          border: `1px solid ${TEAL}`,
                          borderRadius: "50px",
                          padding: "8px 20px",
                          fontWeight: 600,
                          color: TEAL,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "0.85rem"
                        }}
                        className="hover-lift"
                      >
                        <FaSearchLocation />
                        Directions
                      </button>
                    </div>
                  </div>
                </Card>
                
                {/* Quick Contact Cards */}
                <Row className="g-3">
                  <Col md={6}>
                    <Card style={{
                      border: "none",
                      borderRadius: "15px",
                      background: "white",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                      padding: "20px",
                      textAlign: "center",
                      height: "100%",
                      transition: "all 0.3s ease"
                    }} className="hover-lift">
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: `${SECONDARY}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: SECONDARY,
                        margin: "0 auto 15px"
                      }}>
                        <FaPhone size={18} />
                      </div>
                      <div style={{ 
                        fontSize: "0.85rem", 
                        color: TEAL_DARK, 
                        fontWeight: 600,
                        marginBottom: "5px"
                      }}>
                        Call Us
                      </div>
                      <div style={{ 
                        fontWeight: 700, 
                        color: TEAL_DARK,
                        fontSize: "1rem"
                      }}>
                        +255 777 186 221
                      </div>
                    </Card>
                  </Col>
                  
                  <Col md={6}>
                    <Card style={{
                      border: "none",
                      borderRadius: "15px",
                      background: "white",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                      padding: "20px",
                      textAlign: "center",
                      height: "100%",
                      transition: "all 0.3s ease"
                    }} className="hover-lift">
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: `${TEAL}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: TEAL,
                        margin: "0 auto 15px"
                      }}>
                        <FaEnvelope size={18} />
                      </div>
                      <div style={{ 
                        fontSize: "0.85rem", 
                        color: TEAL_DARK, 
                        fontWeight: 600,
                        marginBottom: "5px"
                      }}>
                        Email Us
                      </div>
                      <div style={{ 
                        fontWeight: 700, 
                        color: TEAL_DARK,
                        fontSize: "0.9rem"
                      }}>
                        Comming Soon
                        {/* hello@respira.co.tz */}
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
              
              {/* Map */}
              <div style={{
                height: "250px",
                borderRadius: "20px",
                overflow: "hidden",
                marginBottom: "30px",
                position: "relative",
                background: `${TEAL}05`,
                border: `1px solid ${TEAL}20`
              }}>
                <div style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  color: TEAL
                }}>
                  <FaMapMarkerAlt size={40} />
                  <div style={{ 
                    marginTop: "15px", 
                    fontWeight: 600,
                    fontSize: "1rem"
                  }}>
                    Interactive Map
                  </div>
                  <p style={{ 
                    fontSize: "0.85rem", 
                    color: "#666", 
                    margin: "10px 0 0",
                    textAlign: "center",
                    maxWidth: "200px"
                  }}>
                    View our location and get directions via Google Maps
                  </p>
                </div>
              </div>
              
              {/* Social Media */}
              <Card style={{
                border: "none",
                borderRadius: "20px",
                background: `${TEAL}05`,
                padding: "25px"
              }}>
                <h5 style={{ 
                  fontWeight: 700, 
                  color: TEAL_DARK,
                  marginBottom: "20px",
                  textAlign: "center"
                }}>
                  Connect With Us
                </h5>
                
                <div style={{ 
                  display: "flex", 
                  gap: "12px",
                  justifyContent: "center",
                  marginBottom: "15px"
                }}>
                  <button
                    onClick={() => window.open('https://instagram.com/respirazanzibartour', '_blank')}
                    style={{
                      background: "white",
                      border: `1px solid ${TEAL}30`,
                      borderRadius: "50%",
                      width: "45px",
                      height: "45px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#E4405F",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontSize: "1.1rem"
                    }}
                    className="hover-lift"
                    title="Instagram"
                  >
                    <FaInstagram />
                  </button>
                  
                 
                  
                  <button
                    onClick={handleWhatsAppClick}
                    style={{
                      background: "white",
                      border: `1px solid ${TEAL}30`,
                      borderRadius: "50%",
                      width: "45px",
                      height: "45px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#25D366",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontSize: "1.1rem"
                    }}
                    className="hover-lift"
                    title="WhatsApp"
                  >
                    <FaWhatsapp />
                  </button>
                </div>
                
                <p style={{ 
                  textAlign: "center", 
                  color: "#666", 
                  fontSize: "0.85rem",
                  margin: 0
                }}>
                  Follow us for updates and travel tips
                </p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Custom CSS */}
      <style jsx>{`
        .hover-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem !important;
          }

          h2 {
            font-size: 2rem !important;
          }

          section {
            padding: 60px 0 !important;
          }
        }

        @media (max-width: 576px) {
          h1 {
            font-size: 2rem !important;
          }

          h2 {
            font-size: 1.6rem !important;
          }

          section {
            padding: 40px 0 !important;
          }
        }
      `}</style>
    </div>
  );
}