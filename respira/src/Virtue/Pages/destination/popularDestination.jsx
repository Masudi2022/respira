import React, { useState, useEffect } from "react";
import { 
  Container, Row, Col, Card, Button, Badge, 
  Spinner, Alert, Modal, Carousel, Stack, 
  ProgressBar, Image, Placeholder, Offcanvas
} from "react-bootstrap";
import { 
  GeoAltFill, ArrowRight, Clock, Sun, ChevronDown, Heart, HeartFill, TelephoneFill, 
  EnvelopeFill, InfoCircle, Whatsapp, ShieldCheck,
  CalendarCheck, PeopleFill, CheckCircleFill,
  ArrowUpRight, AwardFill, PinMapFill, Globe,
  Cloud, WifiOff, Camera, Image as ImageIcon,
  PersonCircle, ChatDots, Phone
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import api from "../../../config/api";
import "./styles.css";

const PRIMARY = "#008080";
const PRIMARY_LIGHT = "#00a8a8";
const SECONDARY = "#f4c95d";
const ACCENT = "#004d4d";
const BG_FADE = "#f8fdfd";

// Placeholder images for when images fail to load
const PLACEHOLDER_IMAGES = [
  `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='${encodeURIComponent(PRIMARY)}'/%3E%3Cstop offset='1' stop-color='${encodeURIComponent(PRIMARY_LIGHT)}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='400' height='300'/%3E%3Cg fill='white' fill-opacity='0.3'%3E%3Ccircle cx='100' cy='100' r='50'/%3E%3Ccircle cx='300' cy='200' r='30'/%3E%3Ccircle cx='200' cy='250' r='40'/%3E%3C/g%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Ccircle cx='50' cy='250' r='60'/%3E%3Ccircle cx='350' cy='100' r='40'/%3E%3C/g%3E%3C/svg%3E`,
  `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='${encodeURIComponent(SECONDARY)}'/%3E%3Cstop offset='1' stop-color='%23f5d587'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='400' height='300'/%3E%3Cpath fill='white' fill-opacity='0.2' d='M0,0 L400,0 L200,300 Z'/%3E%3Ccircle cx='200' cy='150' r='80' fill='white' fill-opacity='0.1'/%3E%3C/svg%3E`,
  `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='${encodeURIComponent(ACCENT)}' width='400' height='300'/%3E%3Cg transform='translate(200,150)'%3E%3Cg fill='white' fill-opacity='0.2'%3E%3Ccircle r='60'/%3E%3Ccircle r='40' transform='translate(100,0)'/%3E%3Ccircle r='30' transform='translate(-100,0)'/%3E%3Ccircle r='20' transform='translate(0,100)'/%3E%3Ccircle r='25' transform='translate(0,-100)'/%3E%3C/g%3E%3C/svg%3E`
];

const SAMPLE_DESTINATIONS = [
  {
    id: 1,
    title: "Nungwi Beach",
    location: "North Coast, Zanzibar",
    description: "Experience pristine white sands and turquoise waters at one of Zanzibar's most famous beaches, perfect for sunset views and water sports.",
    duration: "Full Day",
    best_time: "June - October",
    slug: "nungwi-beach",
    image: "https://images.unsplash.com/photo-1731329571540-a1d6dfc902b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bnVuZ3dpJTIwYmVhY2glMjBpbiUyMHRhbnphbmlhfGVufDB8fDB8fHww",
    popularity: 95,
    category: "Beach"
  },
  {
    id: 2,
    title: "Stone Town",
    location: "Zanzibar City",
    description: "Wander through the UNESCO World Heritage site with its narrow alleys, historic buildings, and rich Swahili culture.",
    duration: "Half Day",
    best_time: "Year Round",
    slug: "stone-town",
    image: "https://media.istockphoto.com/id/927136034/photo/architectural-details-stone-town-zanzibar-tanzania.jpg?s=612x612&w=0&k=20&c=QII2Obal7wKb1jcWydNpgpDSaFGKVFtjB69oKfQGwqU=",
    tags: ["Cultural", "UNESCO", "Historic"],
    popularity: 88,
    category: "Cultural"
  },
  {
    id: 3,
    title: "Prison Island",
    location: "Changuu Island",
    description: "Visit this historic island known for its giant Aldabra tortoises and beautiful coral reefs perfect for snorkeling.",
    duration: "5-6 Hours",
    best_time: "November - March",
    slug: "prison-island",
    image: "https://media.istockphoto.com/id/1327941996/photo/a-tourist-woman-feeding-giant-turtle-aldabrachelys-gigantea-or-aldabra-giant-tortoise-with.jpg?s=612x612&w=0&k=20&c=JpYY5dbWTcEzmEvv1Rv-V6pBL3_4BEYlX6HHd9vMrHY=",
    tags: ["Wildlife", "Snorkeling", "Island"],
    popularity: 82,
    category: "Adventure"
  },
  {
    id: 4,
    title: "Jozani Forest",
    location: "Central Zanzibar",
    description: "Explore the last remaining sanctuary of the endangered red colobus monkey in this beautiful tropical forest.",
    duration: "3-4 Hours",
    best_time: "April - November",
    slug: "jozani-forest",
    image: "https://media.istockphoto.com/id/927042764/photo/jozani-mangrove-zanzibar-tanzania.jpg?s=612x612&w=0&k=20&c=ZqFh6nWNDugi04owQolEMUrd9HivtMwRYjphx60G9t0=",
    tags: ["Wildlife", "Nature", "Forest"],
    popularity: 75,
    category: "Nature"
  },
  {
    id: 5,
    title: "Kendwa Beach",
    location: "Northwest Coast",
    description: "Relax on this stunning beach with its famous full moon parties and crystal-clear shallow waters.",
    duration: "Full Day",
    best_time: "December - March",
    slug: "kendwa-beach",
    image: "https://media.istockphoto.com/id/1165219736/photo/kendwa-beach-unguja-zanzibar-island-tanzania-east-africa.webp?a=1&b=1&s=612x612&w=0&k=20&c=Jf-bpWIe925qL-kZnu7rEqISxptFhcuP6aBExM6QuqU=",
    tags: ["Beach", "Party", "Relaxation"],
    popularity: 90,
    category: "Beach"
  },
  {
    id: 6,
    title: "Spice Plantations",
    location: "Various Locations",
    description: "Discover why Zanzibar is called the 'Spice Island' with a tour through fragrant spice and fruit plantations.",
    duration: "4-5 Hours",
    best_time: "Year Round",
    slug: "spice-plantations",
    image: "https://media.istockphoto.com/id/946590302/photo/fresh-cloves.jpg?s=612x612&w=0&k=20&c=Ct4Cynn7QWZQEzuu68vcJhxYC-WQy6UJd7fMm1czwhM=",
    tags: ["Cultural", "Food", "Educational"],
    popularity: 85,
    category: "Cultural"
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
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [imageLoaded, setImageLoaded] = useState({});
  const [showContactCanvas, setShowContactCanvas] = useState(false);

  // Screen size handler
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

  // Fetch destinations with improved error handling
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await api.get("/api/destinations/");
        if (response.data?.length > 0) {
          const processedDestinations = response.data.map((dest, index) => ({
            ...dest,
            image: dest.image || PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length],
            popularity: dest.popularity || Math.floor(Math.random() * 30) + 70,
            tags: dest.tags || ["Popular", "Featured"]
          }));
          setDestinations(processedDestinations);
          setUseSampleData(false);
        } else {
          throw new Error("No destinations found");
        }
      } catch (err) {
        console.warn("Using sample data:", err.message);
        setDestinations(SAMPLE_DESTINATIONS.map((dest, index) => ({
          ...dest,
          image: dest.image || PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]
        })));
        setUseSampleData(true);
        setError("We're showing sample destinations while connecting to our live data feed");
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
    
    // Fallback timeout
    const timeoutId = setTimeout(() => {
      if (loading) {
        setDestinations(SAMPLE_DESTINATIONS.map((dest, index) => ({
          ...dest,
          image: dest.image || PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length]
        })));
        setUseSampleData(true);
        setLoading(false);
        setError("Loading optimized experience with sample destinations");
      }
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Image error handler with state management
  const handleImageError = (e, destinationId) => {
    console.log(`Image failed to load for destination ${destinationId}`);
    
    // Mark this image as errored
    setImageErrors(prev => ({ ...prev, [destinationId]: true }));
    
    // Use a placeholder image that won't fail
    const placeholderIndex = destinationId % PLACEHOLDER_IMAGES.length;
    e.target.src = PLACEHOLDER_IMAGES[placeholderIndex];
    e.target.onerror = null; // Prevent infinite loop
    
    // Add a class to style the placeholder
    e.target.classList.add("placeholder-image");
  };

  const handleImageLoad = (destinationId) => {
    setImageLoaded(prev => ({ ...prev, [destinationId]: true }));
  };

  const isMobile = screenSize === "mobile";
  const isTablet = screenSize === "tablet";
  const initialDestinationsCount = isMobile ? 2 : isTablet ? 3 : 3;

  const visibleDestinations = showAll
    ? destinations
    : destinations.slice(0, initialDestinationsCount);

  const handleExploreClick = (destination) => {
    if (useSampleData) {
      setSelectedDestination(destination);
      setShowDemoModal(true);
    } else {
      navigate(`/destination/${destination.slug}`);
    }
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
      return newFavorites;
    });
  };

  const retryFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/destinations/");
      if (response.data?.length > 0) {
        setDestinations(response.data);
        setUseSampleData(false);
        setShowDemoModal(false);
      } else {
        throw new Error("No data available");
      }
    } catch (err) {
      setDestinations(SAMPLE_DESTINATIONS);
      setUseSampleData(true);
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = (method) => {
    switch(method) {
      case 'phone':
        window.location.href = 'tel:+255777123456';
        break;
      case 'email':
        window.location.href = 'mailto:info@zanzibartours.com?subject=Zanzibar%20Travel%20Inquiry';
        break;
      case 'whatsapp':
        window.open('https://wa.me/255777123456?text=Hello%20Zanzibar%20Tours!%20I%20saw%20your%20destinations%20and%20would%20like%20more%20information.', '_blank');
        break;
      default:
        navigate('/contact');
    }
  };

  if (loading) {
    return (
      <Container className="py-5 my-5">
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <div className="position-relative d-inline-block">
              <Spinner animation="border" variant="primary" style={{ width: '4rem', height: '4rem' }} />
              <Globe className="position-absolute top-50 start-50 translate-middle" style={{ color: PRIMARY }} size={24} />
            </div>
            <h3 className="mt-4 fw-bold" style={{ color: ACCENT }}>Loading Paradise...</h3>
            <p className="text-muted">Discovering the best of Zanzibar for you</p>
            
            {/* Loading placeholders */}
            <Row className="mt-5 g-4">
              {[1, 2, 3].map((i) => (
                <Col key={i} lg={4} md={6}>
                  <Card className="border-0 shadow-sm">
                    <Card.Body>
                      <Placeholder as={Card.Title} animation="wave">
                        <Placeholder xs={6} />
                      </Placeholder>
                      <Placeholder as={Card.Text} animation="wave">
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                      </Placeholder>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section with Enhanced Design */}
      <section className="py-5 position-relative overflow-hidden" style={{ 
        background: `linear-gradient(135deg, ${BG_FADE} 0%, white 100%)`
      }}>
        {/* Decorative Elements */}
        <div className="position-absolute top-0 start-0 w-100" style={{ height: '4px', background: `linear-gradient(90deg, ${PRIMARY}, ${SECONDARY}, ${PRIMARY_LIGHT})` }} />
        <div className="position-absolute top-50 start-0 translate-middle-y" style={{ width: '100px', height: '100px', background: `radial-gradient(circle, ${PRIMARY}20 0%, transparent 70%)`, borderRadius: '50%' }} />
        <div className="position-absolute bottom-0 end-0" style={{ width: '150px', height: '150px', background: `radial-gradient(circle, ${SECONDARY}20 0%, transparent 70%)`, borderRadius: '50%' }} />

        <Container className="position-relative py-5">
          {/* Header Section */}
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <Badge bg="primary" className="mb-3 px-4 py-3 rounded-pill fs-6 shadow-sm">
                <AwardFill className="me-2" />
                <span className="fw-bold">ZANZIBAR'S PREMIUM DESTINATIONS</span>
              </Badge>
              
              <h1 className="display-4 fw-bold mb-4">
                <span className="d-block" style={{ 
                  background: `linear-gradient(135deg, ${ACCENT}, ${PRIMARY})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Discover Tropical
                </span>
                <span style={{ color: SECONDARY }}>Paradise Awaits</span>
              </h1>
              
              <p className="lead text-muted mb-4 fs-4">
                Immerse yourself in Zanzibar's breathtaking beauty where every moment becomes a memory
              </p>
              
              {/* Trust Indicators */}
              <Stack direction="horizontal" gap={4} className="justify-content-center flex-wrap">
                <div className="d-flex align-items-center">
                  <div className="rounded-circle p-2 me-2" style={{ background: `${PRIMARY}15` }}>
                    <CheckCircleFill className="text-success" size={20} />
                  </div>
                  <div>
                    <div className="fw-bold">5,000+</div>
                    <small className="text-muted">Happy Travelers</small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle p-2 me-2" style={{ background: `${SECONDARY}15` }}>
                    <ShieldCheck className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="fw-bold">Best Experience</div>
                    <small className="text-muted">Guarantee</small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="rounded-circle p-2 me-2" style={{ background: `${PRIMARY_LIGHT}15` }}>
                    <PeopleFill className="text-warning" size={20} />
                  </div>
                  <div>
                    <div className="fw-bold">24/7</div>
                    <small className="text-muted">Support</small>
                  </div>
                </div>
              </Stack>
              
              {/* Sample Data Notice */}
              {useSampleData && (
                <Alert variant="info" className="mt-4 border-0 shadow-sm rounded-3">
                  <Row className="align-items-center">
                    <Col xs="auto">
                      <div className="rounded-circle p-2" style={{ background: `${PRIMARY}20` }}>
                        <InfoCircle size={24} style={{ color: PRIMARY }} />
                      </div>
                    </Col>
                    <Col>
                      <div className="fw-bold mb-1">Preview Experience</div>
                      <p className="mb-0 text-muted">{error}</p>
                      <Button 
                        variant="link" 
                        onClick={retryFetch}
                        className="p-0 text-decoration-none fw-semibold"
                        style={{ color: PRIMARY }}
                      >
                        <ArrowUpRight className="me-1" />
                        Try live connection
                      </Button>
                    </Col>
                  </Row>
                </Alert>
              )}
            </Col>
          </Row>

          {/* Destinations Grid with Enhanced Cards */}
          <Row className="g-4 mb-5">
            {visibleDestinations.map((place) => {
              const hasImageError = imageErrors[place.id];
              const isImageLoaded = imageLoaded[place.id];
              
              return (
                <Col key={place.id} lg={4} md={6} className="mb-4">
                  <Card 
                    className="h-100 border-0 shadow-lg overflow-hidden"
                    style={{ 
                      borderRadius: '20px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={() => setHoveredCard(place.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Card Image with Fallback */}
                    <div className="position-relative" style={{ 
                      height: '300px', 
                      background: `linear-gradient(135deg, ${PRIMARY}20, ${SECONDARY}20)`,
                      overflow: 'hidden'
                    }}>
                      {/* Image Container */}
                      <div className="w-100 h-100">
                        <img
                          src={place.image}
                          alt={place.title}
                          className={`w-100 h-100 ${hasImageError ? 'placeholder-image' : ''}`}
                          style={{ 
                            objectFit: 'cover',
                            transition: 'opacity 0.3s ease',
                            opacity: isImageLoaded ? 1 : 0.7
                          }}
                          onError={(e) => handleImageError(e, place.id)}
                          onLoad={() => handleImageLoad(place.id)}
                          loading="lazy"
                        />
                        
                        {/* Image Loading/Error Overlay */}
                        {!isImageLoaded && !hasImageError && (
                          <div className="position-absolute top-50 start-50 translate-middle text-center">
                            <div className="spinner-border text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>
                        )}
                        
                        {hasImageError && (
                          <div className="position-absolute top-50 start-50 translate-middle text-center">
                            <div className="rounded-circle p-3 d-inline-block" style={{ background: 'rgba(255,255,255,0.9)' }}>
                              <Camera size={32} style={{ color: PRIMARY }} />
                            </div>
                            <p className="mt-2 mb-0 text-muted fw-semibold">Beautiful Destination</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Gradient Overlay */}
                      <div className="position-absolute top-0 start-0 w-100 h-100"
                        style={{
                          background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)'
                        }}
                      />
                      
                      {/* Category Badge */}
                      <Badge 
                        bg={hasImageError ? "secondary" : "dark"} 
                        className="position-absolute top-3 start-3 px-3 py-2"
                        style={{ 
                          backdropFilter: 'blur(10px)',
                          backgroundColor: hasImageError ? `${ACCENT}CC` : 'rgba(0,0,0,0.7)'
                        }}
                      >
                        {place.category}
                      </Badge>
                      
                      {/* Favorite Button */}
                      <Button
                        variant="light"
                        className="position-absolute top-3 end-3 rounded-circle shadow"
                        style={{ width: '45px', height: '45px' }}
                        onClick={(e) => toggleFavorite(place.id, e)}
                      >
                        {favorites.has(place.id) ? (
                          <HeartFill className="text-danger" />
                        ) : (
                          <Heart className="text-dark" />
                        )}
                      </Button>
                      
                      {/* Preview Badge */}
                      {useSampleData && (
                        <Badge 
                          bg="primary" 
                          className="position-absolute bottom-3 start-3 px-3 py-2"
                          style={{ backdropFilter: 'blur(10px)' }}
                        >
                          <EyeFill className="me-1" />
                          Preview
                        </Badge>
                      )}
                      
                      {/* Bottom Info */}
                      <div className="position-absolute bottom-0 start-0 end-0 p-4">
                        <h4 className="text-white mb-2 fw-bold">{place.title}</h4>
                        <div className="d-flex align-items-center text-white-50 mb-3">
                          <GeoAltFill className="me-2" />
                          <span>{place.location}</span>
                        </div>
                        {hasImageError && (
                          <Badge bg="light" text="dark" className="px-2 py-1">
                            <Cloud className="me-1" />
                            Image Preview
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <Card.Body className="p-4">
                      <Card.Text className="text-muted mb-3" style={{ lineHeight: '1.6' }}>
                        {place.description}
                      </Card.Text>
                      
                      {/* Tags */}
                      <Stack direction="horizontal" gap={2} className="mb-3 flex-wrap">
                        {place.tags?.map((tag, idx) => (
                          <Badge 
                            key={idx} 
                            bg="light" 
                            text="dark" 
                            className="px-3 py-1 border"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </Stack>
                      
                      {/* Meta Info */}
                      <Row className="mb-3 g-3">
                        <Col xs={6}>
                          <div className="d-flex align-items-center p-2 rounded" style={{ background: `${PRIMARY}10` }}>
                            <Clock className="me-2" style={{ color: PRIMARY }} />
                            <div>
                              <small className="text-muted d-block">Duration</small>
                              <span className="fw-semibold">{place.duration}</span>
                            </div>
                          </div>
                        </Col>
                        <Col xs={6}>
                          <div className="d-flex align-items-center p-2 rounded" style={{ background: `${SECONDARY}10` }}>
                            <Sun className="me-2" style={{ color: SECONDARY }} />
                            <div>
                              <small className="text-muted d-block">Best Time</small>
                              <span className="fw-semibold">{place.best_time}</span>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      
                      {/* Popularity Bar */}
                      
                      
                      {/* Action Button */}
                      <div className="d-flex justify-content-end align-items-center pt-3 border-top">
                        <Button 
                          variant={useSampleData ? "outline-primary" : "primary"}
                          size="lg"
                          className="rounded-pill px-4 py-2"
                          onClick={() => handleExploreClick(place)}
                        >
                          {useSampleData ? 'Preview Details' : 'Explore Now'}
                          <ArrowRight className="ms-2" />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>

          {/* Show More/Less Button */}
          {destinations.length > initialDestinationsCount && (
            <div className="text-center mb-5">
              <Button 
                variant="outline-primary"
                size="lg"
                className="rounded-pill px-5 py-3 fw-bold"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? (
                  <>
                    <ChevronDown className="rotate-180 me-2" />
                    Show Less Destinations
                  </>
                ) : (
                  <>
                    View All {destinations.length} Premium Destinations
                    <ChevronDown className="ms-2" />
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Enhanced CTA Section */}
          <Card className="border-0 shadow-lg overflow-hidden mb-5" style={{ 
            background: `linear-gradient(135deg, ${ACCENT} 0%, ${PRIMARY} 100%)`,
            borderRadius: '25px'
          }}>
            <Card.Body className="p-5">
              <Row className="align-items-center">
                <Col lg={8}>
                  <h2 className="text-white mb-3 fw-bold">Begin Your Zanzibar Journey Today</h2>
                  <p className="text-white-75 mb-4 fs-5">
                    Our travel concierge team is ready to craft your perfect island escape with exclusive access and personalized service.
                  </p>
                  <Stack direction="horizontal" gap={3} className="flex-wrap">
                    <Badge bg="white" text="dark" className="px-3 py-2">
                      <CheckCircleFill className="text-success me-2" />
                      Free Cancellation
                    </Badge>
                    <Badge bg="white" text="dark" className="px-3 py-2">
                      <ShieldCheck className="text-primary me-2" />
                      COVID-Safe Travel
                    </Badge>
                    <Badge bg="white" text="dark" className="px-3 py-2">
                      <PeopleFill className="text-warning me-2" />
                      Private Guides Available
                    </Badge>
                  </Stack>
                </Col>
                <Col lg={4} className="mt-4 mt-lg-0">
                  <Stack gap={3}>
                    <Button 
                      variant="light" 
                      size="lg"
                      className="rounded-pill px-4 py-3 fw-bold"
                      onClick={() => navigate("/contact")}
                    >
                      <CalendarCheck className="me-2" />
                      Book Free Consultation
                    </Button>
                    <Button 
                      variant="outline-light" 
                      size="lg"
                      className="rounded-pill px-4 py-3"
                      onClick={() => navigate("/packages")}
                    >
                      View Luxury Packages
                    </Button>
                    <Button 
                      variant="light" 
                      size="sm"
                      className="rounded-pill"
                      onClick={() => setShowContactCanvas(true)}
                    >
                      <ChatDots className="me-2" />
                      Quick Contact Options
                    </Button>
                  </Stack>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Stats Section */}
          <Row className="text-center g-4 mb-5">
            <Col md={3} sm={6}>
              <div className="p-4 rounded-3 shadow-sm" style={{ background: 'white' }}>
                <h2 className="fw-bold display-6" style={{ color: PRIMARY }}>98%</h2>
                <p className="text-muted mb-0">Customer Satisfaction</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="p-4 rounded-3 shadow-sm" style={{ background: 'white' }}>
                <h2 className="fw-bold display-6" style={{ color: SECONDARY }}>5,000+</h2>
                <p className="text-muted mb-0">Happy Travelers</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="p-4 rounded-3 shadow-sm" style={{ background: 'white' }}>
                <h2 className="fw-bold display-6" style={{ color: PRIMARY_LIGHT }}>150+</h2>
                <p className="text-muted mb-0">Destinations</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="p-4 rounded-3 shadow-sm" style={{ background: 'white' }}>
                <h2 className="fw-bold display-6" style={{ color: ACCENT }}>24/7</h2>
                <p className="text-muted mb-0">Support Available</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Warm Demo Modal */}
      <Modal
        show={showDemoModal}
        onHide={() => setShowDemoModal(false)}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header 
          closeButton 
          className="border-0 text-white"
          style={{ 
            background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_LIGHT})`,
            padding: '2rem'
          }}
        >
          <Modal.Title className="fw-bold d-flex align-items-center gap-3">
            <div className="rounded-circle p-2" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <InfoCircle size={28} />
            </div>
            <div>
              <h4 className="mb-1">Your Zanzibar Adventure Awaits!</h4>
              <small className="opacity-75">Preview Mode - Real booking available</small>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          {selectedDestination && (
            <Card className="border-0 shadow-sm mb-4 overflow-hidden">
              <Row className="g-0 align-items-center">
                <Col md={5}>
                  <div className="position-relative" style={{ height: '200px' }}>
                    <img
                      src={selectedDestination.image}
                      alt={selectedDestination.title}
                      className="w-100 h-100"
                      style={{ objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = PLACEHOLDER_IMAGES[0];
                        e.target.classList.add('placeholder-image');
                      }}
                    />
                    <Badge 
                      bg="primary" 
                      className="position-absolute top-3 start-3"
                    >
                      {selectedDestination.category}
                    </Badge>
                  </div>
                </Col>
                <Col md={7}>
                  <Card.Body>
                    <h5 className="fw-bold mb-2">{selectedDestination.title}</h5>
                    <p className="text-muted mb-3">{selectedDestination.description}</p>
                    <div className="d-flex gap-2 flex-wrap">
                      <Badge bg="primary">{selectedDestination.duration}</Badge>
                      <Badge bg="warning" text="dark">
                        <Sun className="me-1" />
                        {selectedDestination.best_time}
                      </Badge>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          )}

          {/* Warm Welcome Message */}
          <Alert variant="info" className="border-0 rounded-3 mb-4" style={{ 
            background: `linear-gradient(135deg, ${PRIMARY}10, ${SECONDARY}10)`
          }}>
            <div className="d-flex align-items-start">
              <div className="rounded-circle p-2 me-3" style={{ background: `${PRIMARY}20` }}>
                <Globe size={24} style={{ color: PRIMARY }} />
              </div>
              <div>
                <h5 className="fw-bold mb-2">Welcome to Paradise Preview! 🌴</h5>
                <p className="mb-0">
                  You're viewing a sample of what Zanzibar has to offer. Our real platform provides live availability, 
                  instant booking, and personalized travel planning with our expert team.
                </p>
              </div>
            </div>
          </Alert>

          {/* What You Get */}
          <h5 className="fw-bold mb-3" style={{ color: ACCENT }}>Complete Your Dream Trip:</h5>
          <Row className="g-3 mb-4">
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100 text-center p-3">
                <div className="rounded-circle p-3 mx-auto mb-3" style={{ 
                  width: '70px', 
                  height: '70px',
                  background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_LIGHT})`
                }}>
                  <CalendarCheck size={28} className="text-white" />
                </div>
                <h6 className="fw-bold">Real-Time Booking</h6>
                <small className="text-muted">Live availability & instant confirmation</small>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100 text-center p-3">
                <div className="rounded-circle p-3 mx-auto mb-3" style={{ 
                  width: '70px', 
                  height: '70px',
                  background: `linear-gradient(135deg, ${SECONDARY}, #f5d587)`
                }}>
                  <PinMapFill size={28} className="text-dark" />
                </div>
                <h6 className="fw-bold">Personalized Itinerary</h6>
                <small className="text-muted">Tailored to your preferences</small>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100 text-center p-3">
                <div className="rounded-circle p-3 mx-auto mb-3" style={{ 
                  width: '70px', 
                  height: '70px',
                  background: `linear-gradient(135deg, #34c759, #30b157)`
                }}>
                  <ShieldCheck size={28} className="text-white" />
                </div>
                <h6 className="fw-bold">Secure Experience</h6>
                <small className="text-muted">Verified reviews & safe payments</small>
              </Card>
            </Col>
          </Row>

          {/* Contact Options */}
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h5 className="fw-bold mb-4" style={{ color: ACCENT }}>
                <PersonCircle className="me-2" />
                Connect with Our Travel Experts
              </h5>
              <p className="text-muted mb-4">
                Get personalized assistance and exclusive offers for your Zanzibar adventure:
              </p>
              
              <Row className="g-3">
                <Col md={6}>
                  <Button 
                    variant="outline-primary" 
                    className="w-100 py-3 d-flex align-items-center justify-content-start"
                    onClick={() => handleContactClick('phone')}
                  >
                    <Phone className="me-3" size={20} />
                    <div className="text-start">
                      <div className="fw-bold">Call Now</div>
                      <small className="text-muted">+255 777 123 456</small>
                    </div>
                  </Button>
                </Col>
                
                <Col md={6}>
                  <Button 
                    variant="outline-primary" 
                    className="w-100 py-3 d-flex align-items-center justify-content-start"
                    onClick={() => handleContactClick('email')}
                  >
                    <EnvelopeFill className="me-3" size={20} />
                    <div className="text-start">
                      <div className="fw-bold">Email Us</div>
                      <small className="text-muted">info@zanzibartours.com</small>
                    </div>
                  </Button>
                </Col>
                
                <Col md={6}>
                  <Button 
                    variant="outline-success" 
                    className="w-100 py-3 d-flex align-items-center justify-content-start"
                    onClick={() => handleContactClick('whatsapp')}
                  >
                    <Whatsapp className="me-3" size={20} />
                    <div className="text-start">
                      <div className="fw-bold">WhatsApp</div>
                      <small className="text-muted">Instant chat support</small>
                    </div>
                  </Button>
                </Col>
                
                <Col md={6}>
                  <Button 
                    variant="primary" 
                    className="w-100 py-3 d-flex align-items-center justify-content-start"
                    onClick={() => navigate('/contact')}
                    style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_LIGHT})` }}
                  >
                    <CalendarCheck className="me-3" size={20} />
                    <div className="text-start">
                      <div className="fw-bold">Book Consultation</div>
                      <small>Free 30-minute planning call</small>
                    </div>
                  </Button>
                </Col>
              </Row>
              
              <div className="text-center mt-4 pt-3 border-top">
                <small className="text-muted">
                  <CheckCircleFill className="text-success me-1" />
                  Response guaranteed within 1 hour during business hours
                </small>
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>

        <Modal.Footer className="border-0">
          <Stack direction="horizontal" gap={3} className="w-100">
            <Button 
              variant="outline-secondary" 
              className="rounded-pill flex-grow-1"
              onClick={() => setShowDemoModal(false)}
            >
              Continue Exploring
            </Button>
            <Button 
              variant="light" 
              className="rounded-pill flex-grow-1"
              onClick={retryFetch}
              style={{ color: PRIMARY }}
            >
              <WifiOff className="me-2" />
              Try Live Connection
            </Button>
          </Stack>
        </Modal.Footer>
      </Modal>

      {/* Contact Options Offcanvas */}
      <Offcanvas
        show={showContactCanvas}
        onHide={() => setShowContactCanvas(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Quick Contact</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            <Button variant="outline-primary" onClick={() => handleContactClick('phone')}>
              <Phone className="me-2" />
              Call: +255 777 123 456
            </Button>
            <Button variant="outline-primary" onClick={() => handleContactClick('email')}>
              <EnvelopeFill className="me-2" />
              Email Us
            </Button>
            <Button variant="outline-success" onClick={() => handleContactClick('whatsapp')}>
              <Whatsapp className="me-2" />
              WhatsApp Chat
            </Button>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

// Add missing EyeFill icon
const EyeFill = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" {...props}>
    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
  </svg>
);