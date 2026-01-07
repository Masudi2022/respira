import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from "react-bootstrap";
import { GeoAltFill, ArrowRight, Clock, Sun, StarFill, ChevronDown, Heart, HeartFill } from "react-bootstrap-icons";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import api from "../../../config/api";
import "./styles.css";

const PRIMARY = "#008080";
const PRIMARY_LIGHT = "#00a8a8";
const SECONDARY = "#f4c95d";
const ACCENT = "#004d4d";
const BG_FADE = "#f5fbfb";

// Sample destinations data for fallback
const SAMPLE_DESTINATIONS = [
  {
    id: 1,
    title: "Nungwi Beach",
    location: "North Coast, Zanzibar",
    description: "Experience pristine white sands and turquoise waters at one of Zanzibar's most famous beaches, perfect for sunset views and water sports.",
    duration: "Full Day",
    best_time: "June - October",
    price: "249",
    rating: "4.9",
    slug: "nungwi-beach",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Stone Town",
    location: "Zanzibar City",
    description: "Wander through the UNESCO World Heritage site with its narrow alleys, historic buildings, and rich Swahili culture.",
    duration: "Half Day",
    best_time: "Year Round",
    price: "189",
    rating: "4.7",
    slug: "stone-town",
    image: "https://images.unsplash.com/photo-1593701461762-4c6c0515266e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Prison Island",
    location: "Changuu Island",
    description: "Visit this historic island known for its giant Aldabra tortoises and beautiful coral reefs perfect for snorkeling.",
    duration: "5-6 Hours",
    best_time: "November - March",
    price: "299",
    rating: "4.8",
    slug: "prison-island",
    image: "https://images.unsplash.com/photo-1597036879256-4c7d68c8c57b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Jozani Forest",
    location: "Central Zanzibar",
    description: "Explore the last remaining sanctuary of the endangered red colobus monkey in this beautiful tropical forest.",
    duration: "3-4 Hours",
    best_time: "April - November",
    price: "159",
    rating: "4.6",
    slug: "jozani-forest",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Kendwa Beach",
    location: "Northwest Coast",
    description: "Relax on this stunning beach with its famous full moon parties and crystal-clear shallow waters.",
    duration: "Full Day",
    best_time: "December - March",
    price: "229",
    rating: "4.8",
    slug: "kendwa-beach",
    image: "https://images.unsplash.com/photo-1573843989-c9d4a65d6c8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Spice Plantations",
    location: "Various Locations",
    description: "Discover why Zanzibar is called the 'Spice Island' with a tour through fragrant spice and fruit plantations.",
    duration: "4-5 Hours",
    best_time: "Year Round",
    price: "179",
    rating: "4.7",
    slug: "spice-plantations",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default function PopularDestinations() {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [screenSize, setScreenSize] = useState("desktop");
  const [favorites, setFavorites] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);
  const [useSampleData, setUseSampleData] = useState(false);

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
  // FETCH DESTINATIONS FROM API WITH FALLBACK
  // ============================
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await api.get("/api/destinations/");
        
        // Check if response has valid data
        if (response.data && response.data.length > 0) {
          // Process images to ensure they're valid
          const processedDestinations = response.data.map(destination => {
            // If image is invalid or missing, use a sample image
            if (!destination.image || destination.image.includes('placeholder') || destination.image === '') {
              // Assign a random sample image from our collection
              const sampleImages = [
                "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1593701461762-4c6c0515266e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1597036879256-4c7d68c8c57b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              ];
              const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
              return {
                ...destination,
                image: randomImage,
                rating: destination.rating || '4.7',
                price: destination.price || '199'
              };
            }
            return destination;
          });
          
          setDestinations(processedDestinations);
          setUseSampleData(false);
        } else {
          // If no data from backend, use sample data
          throw new Error("No destinations found");
        }
      } catch (err) {
        console.error("Error fetching destinations:", err);
        
        // Use sample data as fallback
        setDestinations(SAMPLE_DESTINATIONS);
        setUseSampleData(true);
        setError("Using sample destinations - Connection to server failed");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
    
    // Set timeout for fallback in case API is very slow
    const timeoutId = setTimeout(() => {
      if (loading && destinations.length === 0) {
        setDestinations(SAMPLE_DESTINATIONS.slice(0, 3));
        setUseSampleData(true);
        setLoading(false);
        setError("Loading sample destinations - Server response delayed");
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeoutId);
  }, []);

  // ============================
  // IMAGE ERROR HANDLER
  // ============================
  const handleImageError = (e, destinationId) => {
    console.log(`Image failed to load for destination ${destinationId}`);
    
    // Try to find the destination and get a backup image
    const destination = destinations.find(d => d.id === destinationId);
    if (destination) {
      // Assign a new sample image
      const sampleImages = [
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1593701461762-4c6c0515266e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1597036879256-4c7d68c8c57b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ];
      
      // Try different images until one works
      const currentIndex = sampleImages.indexOf(e.target.src);
      const nextIndex = (currentIndex + 1) % sampleImages.length;
      e.target.src = sampleImages[nextIndex];
      e.target.onerror = null; // Remove error handler to prevent infinite loop
    }
  };

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

  const retryFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/destinations/");
      if (response.data && response.data.length > 0) {
        setDestinations(response.data);
        setUseSampleData(false);
      } else {
        setDestinations(SAMPLE_DESTINATIONS);
        setUseSampleData(true);
      }
    } catch (err) {
      setDestinations(SAMPLE_DESTINATIONS);
      setUseSampleData(true);
      setError("Connection failed. Using sample destinations.");
    } finally {
      setLoading(false);
    }
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
          
          {/* Show warning if using sample data */}
          {useSampleData && error && (
            <div className="sample-data-warning">
              <Alert variant="warning" className="mt-3" style={{ 
                borderRadius: '15px',
                border: 'none',
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span>⚠️</span>
                <span>
                  <strong>Demo Mode:</strong> {error}. 
                  <Button 
                    variant="link" 
                    onClick={retryFetch}
                    style={{ 
                      color: PRIMARY, 
                      textDecoration: 'none',
                      padding: 0,
                      marginLeft: '5px'
                    }}
                  >
                    Try again
                  </Button>
                </span>
              </Alert>
            </div>
          )}
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
                    onError={(e) => handleImageError(e, place.id)}
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