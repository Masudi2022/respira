import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from "react-bootstrap";
import { GeoAltFill, ArrowRight, Clock, Sun, StarFill, ChevronDown, Heart, HeartFill } from "react-bootstrap-icons";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import api from "../../../config/api";
import "./styles.css"; // We'll create this CSS file

const PRIMARY = "#008080";
const PRIMARY_LIGHT = "#00a8a8";
const SECONDARY = "#f4c95d";
const ACCENT = "#004d4d";
const BG_FADE = "#f5fbfb";

export default function PopularDestinations() {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [screenSize, setScreenSize] = useState("desktop");
  const [favorites, setFavorites] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);

  // ============================
  // SCREEN SIZE HANDLER
  // ============================
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setScreenSize("mobile");
      else if (width < 1200) setScreenSize("tablet");
      else setScreenSize("desktop");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ============================
  // FETCH DESTINATIONS FROM API
  // ============================
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await api.get("/api/destinations/");
        setDestinations(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load destinations");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // ============================
  // UI LOGIC
  // ============================
  const isMobile = screenSize === "mobile";
  const isTablet = screenSize === "tablet";

  const initialDestinationsCount = isMobile ? 2 : isTablet ? 3 : 3;

  const visibleDestinations = showAll
    ? destinations
    : destinations.slice(0, initialDestinationsCount);

  const handleExploreClick = (destination) => {
    navigate(`/destination/${destination.slug}`);
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  // ============================
  // LOADING STATE
  // ============================
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner-container">
          <div className="custom-spinner">
            <div className="spinner-circle"></div>
            <div className="spinner-circle"></div>
            <div className="spinner-circle"></div>
          </div>
          <p className="mt-4" style={{ color: PRIMARY, fontWeight: 600 }}>Discovering Paradise...</p>
        </div>
      </div>
    );
  }

  // ============================
  // ERROR STATE
  // ============================
  if (error) {
    return (
      <Container className="py-5">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h4>Connection Lost</h4>
          <p>{error}</p>
          <Button 
            variant="outline-primary"
            onClick={() => window.location.reload()}
            style={{ 
              borderColor: PRIMARY, 
              color: PRIMARY,
              borderRadius: '25px',
              padding: '10px 30px'
            }}
          >
            Try Again
          </Button>
        </div>
      </Container>
    );
  }

  // ============================
  // MAIN RENDER
  // ============================
  return (
    <section className="destinations-section">
      {/* Background Elements */}
      <div className="background-pattern"></div>
      <div className="floating-island floating-1"></div>
      <div className="floating-island floating-2"></div>
      
      <Container>
        {/* HEADER */}
        <div className="text-center mb-5 header-container">
          <div className="section-badge">
            <span className="badge-icon">🌴</span>
            <span>ZANZIBAR'S TOP DESTINATIONS</span>
          </div>

          <h1 className="main-title">
            <span className="title-gradient">Discover</span>
            <span className="title-paradise"> Paradise</span>
          </h1>
          
          <p className="section-subtitle">
            Where crystal waters meet golden sands and culture dances with nature
          </p>
        </div>

        {/* DESTINATIONS GRID */}
        <Row className="g-4 justify-content-center">
          {visibleDestinations.map((place, index) => (
            <Col 
              key={place.id} 
              lg={4} 
              md={6} 
              className="mb-4"
              onMouseEnter={() => setHoveredCard(place.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div 
                className={`destination-card ${hoveredCard === place.id ? 'card-hovered' : ''}`}
                onClick={() => handleExploreClick(place)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Image with Overlay */}
                <div className="card-image-container">
                  <img 
                    src={place.image} 
                    alt={place.title}
                    className="card-image"
                    loading="lazy"
                  />
                  <div className="image-gradient-overlay"></div>
                  
                  {/* Favorite Button */}
                  <button 
                    className="favorite-btn"
                    onClick={(e) => toggleFavorite(place.id, e)}
                  >
                    {favorites.has(place.id) ? 
                      <HeartFill size={20} className="text-danger" /> : 
                      <Heart size={20} className="text-white" />
                    }
                  </button>
                  
                  {/* Rating Badge */}
                  <div className="rating-badge">
                    <StarFill size={12} className="text-warning" />
                    <span>{place.rating || '4.8'}</span>
                  </div>
                  
                  {/* Location Tag */}
                  <div className="location-tag">
                    <GeoAltFill size={14} />
                    <span>{place.location}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="card-content">
                  <h3 className="destination-title">{place.title}</h3>
                  
                  <p className="destination-description">
                    {place.description}
                  </p>
                  
                  <div className="destination-meta">
                    <div className="meta-item">
                      <Clock className="meta-icon" />
                      <span>{place.duration}</span>
                    </div>
                    <div className="meta-item">
                      <Sun className="meta-icon" />
                      <span>Best: {place.best_time}</span>
                    </div>
                  </div>
                  
                  <div className="price-tag">
                    From <span className="price">${place.price || '299'}</span> / person
                  </div>
                  
                  <Button 
                    className="explore-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExploreClick(place);
                    }}
                  >
                    <span>Explore Destination</span>
                    <ArrowRight className="ms-2" />
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* SHOW MORE BUTTON */}
        {destinations.length > initialDestinationsCount && (
          <div className="text-center mt-5 pt-3">
            <Button 
              className="show-more-btn"
              onClick={() => setShowAll(!showAll)}
            >
              <span>{showAll ? "Show Less" : `Show All ${destinations.length} Destinations`}</span>
              <ChevronDown className={`ms-2 ${showAll ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        )}

        {/* CTA SECTION */}
        <div className="cta-section mt-5 pt-5">
          <div className="cta-card">
            <h3>Ready for Your Zanzibar Adventure?</h3>
            <p>Contact our travel experts to customize your perfect getaway</p>
            <div className="cta-buttons">
              <Button className="cta-btn-primary">
                Book Consultation
              </Button>
              <Button className="cta-btn-secondary">
                View All Packages
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}