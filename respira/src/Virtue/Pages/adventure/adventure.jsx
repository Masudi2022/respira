import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Badge, Modal } from "react-bootstrap";
import { GeoAltFill, StarFill, Clock, Person, Award, Heart, HeartFill, Calendar, Whatsapp } from "react-bootstrap-icons";

const PRIMARY = "#0D9488"; // Teal
const SECONDARY = "#0891B2"; // Cyan-teal

const adventures = [
  {
    id: "scuba-diving",
    title: "Scuba Diving Safari",
    location: "Mnemba Atoll",
    rating: 4.9,
    reviewCount: 842,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&h=600&q=80",
    description: "Explore vibrant coral reefs and swim with tropical fish.",
    category: "Water",
    duration: "Full Day",
    groupSize: "4-8 divers",
    price: "$125",
    highlight: "PADI certified instructors",
    features: ["Two tank dive", "Full equipment", "Marine park fees", "Lunch included"]
  },
  {
    id: "kite-surfing",
    title: "Kite Surfing Lessons",
    location: "Paje Beach",
    rating: 4.8,
    reviewCount: 567,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&h=600&q=80",
    description: "Learn to kite surf on Zanzibar's famous windy beaches.",
    category: "Water",
    duration: "3-5 Hours",
    groupSize: "Private or Group",
    price: "$85",
    highlight: "IKO certified school",
    features: ["All equipment", "Safety briefing", "Video analysis", "Insurance"]
  },
  {
    id: "jungle-trekking",
    title: "Forest Trek",
    location: "Jozani Forest",
    rating: 4.7,
    reviewCount: 723,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&h=600&q=80",
    description: "Walk among rare red colobus monkeys in the national park.",
    category: "Nature",
    duration: "Half Day",
    groupSize: "2-12 people",
    price: "$45",
    highlight: "Monkey encounters",
    features: ["Park guide", "Entrance fees", "Binoculars", "Snacks"]
  },
  {
    id: "sunset-sailing",
    title: "Sunset Dhow Cruise",
    location: "Stone Town",
    rating: 4.9,
    reviewCount: 932,
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&h=600&q=80",
    description: "Sail on a traditional wooden dhow at sunset.",
    category: "Water",
    duration: "2-3 Hours",
    groupSize: "Private or Shared",
    price: "$65",
    highlight: "Romantic experience",
    features: ["Traditional dhow", "Snacks & drinks", "Swimming stop", "Sunset timing"]
  }
];

const categories = [
  { id: "all", label: "All Adventures", count: adventures.length },
  { id: "water", label: "Water Sports", count: adventures.filter(a => a.category === "Water").length },
  { id: "nature", label: "Nature", count: adventures.filter(a => a.category === "Nature").length }
];

export default function Adventure() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLiked, setIsLiked] = useState({});
  const [showAdventureDetail, setShowAdventureDetail] = useState(null);

  const filteredAdventures = selectedCategory === "all" 
    ? adventures 
    : adventures.filter(adventure => adventure.category.toLowerCase() === selectedCategory);

  const handleLike = (id) => {
    setIsLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{
      background: "#ffffff",
      minHeight: "100vh",
      color: "#333",
      fontFamily: "'Inter', sans-serif",
      // IMPORTANT: Add padding-top here based on your header height
      paddingTop: "80px" // Adjust this value based on your header height
    }}>
      {/* ADJUSTMENT GUIDE:
          - If you have a fixed header, check its height
          - If header height is 60px, set paddingTop: "60px"
          - If header height is 70px, set paddingTop: "70px"
          - If you're not sure, try: 60px, 70px, 80px, 90px, or 100px
          - Better approach: Use CSS variable or state to dynamically calculate
      */}

      {/* Hero Section */}
      <section style={{
        background: `linear-gradient(135deg, ${PRIMARY}, ${SECONDARY})`,
        color: "white",
        padding: "60px 0 40px",
        // Remove negative margin if you had it before
        marginTop: "0"
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 style={{
                fontSize: "3.5rem",
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: "20px"
              }}>
                Discover Your Next Adventure
              </h1>
              <p style={{
                fontSize: "1.2rem",
                opacity: 0.9,
                marginBottom: "30px"
              }}>
                Experience thrilling activities in stunning locations with expert guides.
              </p>
              <Button
                onClick={() => document.getElementById("adventures-grid").scrollIntoView({ behavior: "smooth" })}
                style={{
                  background: "white",
                  color: PRIMARY,
                  border: "none",
                  padding: "12px 30px",
                  borderRadius: "50px",
                  fontWeight: 600,
                  fontSize: "1rem"
                }}
              >
                Explore Adventures
              </Button>
            </Col>
            <Col lg={6}>
              <div style={{
                height: "300px",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}>
                <img
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
                  alt="Adventure"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats */}
      <section style={{ padding: "40px 0", background: "#F8FAFC" }}>
        <Container>
          <Row className="g-4">
            {[
              { label: "Adventures", value: "24+", color: PRIMARY },
              { label: "Expert Guides", value: "50+", color: SECONDARY },
              { label: "Happy Customers", value: "10K+", color: PRIMARY },
              { label: "Safety Record", value: "100%", color: SECONDARY }
            ].map((stat, index) => (
              <Col md={3} sm={6} key={index}>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: stat.color,
                    marginBottom: "5px"
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ color: "#64748B", fontSize: "0.9rem" }}>
                    {stat.label}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Categories */}
      <section style={{ padding: "60px 0 30px" }}>
        <Container>
          <h2 style={{
            textAlign: "center",
            fontWeight: 700,
            marginBottom: "40px",
            color: "#1E293B"
          }}>
            Adventure Categories
          </h2>
          <div style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "40px"
          }}>
            {categories.map(category => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  background: selectedCategory === category.id ? PRIMARY : "#F1F5F9",
                  color: selectedCategory === category.id ? "white" : "#64748B",
                  border: "none",
                  borderRadius: "50px",
                  padding: "10px 20px",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <span>{category.label}</span>
                <Badge
                  pill
                  style={{
                    background: selectedCategory === category.id ? "rgba(255,255,255,0.2)" : "#E2E8F0",
                    color: selectedCategory === category.id ? "white" : "#64748B",
                    fontSize: "0.8rem"
                  }}
                >
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </Container>
      </section>

      {/* Adventures Grid */}
      <section id="adventures-grid" style={{ padding: "0 0 80px" }}>
        <Container>
          <Row className="g-4">
            {filteredAdventures.map(adventure => (
              <Col lg={3} md={6} key={adventure.id}>
                <Card
                  style={{
                    border: "1px solid #E2E8F0",
                    borderRadius: "12px",
                    overflow: "hidden",
                    height: "100%",
                    transition: "all 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  onClick={() => setShowAdventureDetail(adventure)}
                >
                  <div style={{ position: "relative" }}>
                    <Card.Img
                      src={adventure.image}
                      alt={adventure.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <Button
                      variant="light"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(adventure.id);
                      }}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {isLiked[adventure.id] ? 
                        <HeartFill color="#EF4444" /> : 
                        <Heart color="#94A3B8" />
                      }
                    </Button>
                    <div style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "10px",
                      background: PRIMARY,
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      fontWeight: 600
                    }}>
                      {adventure.category}
                    </div>
                  </div>

                  <Card.Body>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      marginBottom: "8px",
                      fontSize: "0.9rem",
                      color: "#64748B"
                    }}>
                      <GeoAltFill size={14} />
                      <span>{adventure.location}</span>
                    </div>

                    <Card.Title style={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      marginBottom: "10px",
                      color: "#1E293B"
                    }}>
                      {adventure.title}
                    </Card.Title>

                    <Card.Text style={{
                      fontSize: "0.9rem",
                      color: "#64748B",
                      marginBottom: "15px",
                      minHeight: "40px"
                    }}>
                      {adventure.description}
                    </Card.Text>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <StarFill color="#F59E0B" />
                        <span style={{ fontWeight: 600 }}>{adventure.rating}</span>
                        <span style={{ color: "#94A3B8", fontSize: "0.85rem" }}>
                          ({adventure.reviewCount})
                        </span>
                      </div>
                      <div style={{
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        color: PRIMARY
                      }}>
                        {adventure.price}
                      </div>
                    </div>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.85rem",
                      color: "#64748B",
                      marginBottom: "20px"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <Clock size={14} />
                        <span>{adventure.duration}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <Person size={14} />
                        <span>{adventure.groupSize}</span>
                      </div>
                    </div>

                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "#F0FDFA",
                      color: PRIMARY,
                      padding: "8px 12px",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      marginBottom: "15px"
                    }}>
                      <Award size={14} />
                      {adventure.highlight}
                    </div>

                    <Button
                      style={{
                        width: "100%",
                        background: PRIMARY,
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px",
                        fontWeight: 600
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAdventureDetail(adventure);
                      }}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "60px 0", background: "#F0FDF9" }}>
        <Container>
          <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "40px",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(13, 148, 136, 0.1)"
          }}>
            <h2 style={{
              fontWeight: 700,
              fontSize: "2rem",
              marginBottom: "15px",
              color: "#1E293B"
            }}>
              Ready for Adventure?
            </h2>
            <p style={{
              color: "#64748B",
              maxWidth: "600px",
              margin: "0 auto 30px",
              fontSize: "1.1rem"
            }}>
              Book your adventure today and create unforgettable memories.
            </p>
            <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                style={{
                  background: PRIMARY,
                  border: "none",
                  borderRadius: "50px",
                  padding: "12px 30px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <Calendar />
                Book Now
              </Button>
              <Button
                variant="outline-primary"
                style={{
                  borderColor: PRIMARY,
                  color: PRIMARY,
                  borderRadius: "50px",
                  padding: "12px 30px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <Whatsapp />
                Chat with Expert
              </Button>
            </div>
          </div>
        </Container>
      </section>

     

      {/* Adventure Detail Modal */}
      
    </div>
  );
}