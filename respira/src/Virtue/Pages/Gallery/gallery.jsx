import React, { useState } from "react";
import { Container, Row, Col, Button, Badge, Modal, Carousel } from "react-bootstrap";
import {
  Camera,
  Heart,
  HeartFill,
  Search,
  Filter,
  Download,
  Share,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Grid3x3,
  Calendar,
  GeoAlt,
  Tag,
  Instagram,
  Facebook,
  Twitter,
  Whatsapp,
  ZoomIn,
  X
} from "react-bootstrap-icons";

const TEAL = "#008080";
const TEAL_LIGHT = "#20B2AA";
const TEAL_DARK = "#006666";
const SECONDARY = "#FF6B35";
const ACCENT = "#2C3E50";

// Gallery photos data
const galleryPhotos = [
  {
    id: 1,
    title: "Nakupenda",
    category: "Beaches",
    location: "Nakupenda Sandbank",
    date: "2024",
    image: "https://media.istockphoto.com/id/2217360852/photo/aerial-view-of-nakupenda-island-sandbank-in-ocean-white-sandy-beach-boats-blue-sea-during-low.webp?a=1&b=1&s=612x612&w=0&k=20&c=fqRSjUoau0PDhGmsRxRGBUFnsKMJfHQJsVWBfMhLjRA=",
    likes: 245,
    downloads: 120,
    tags: ["sunset", "paradise", "tropical", "beach"],
    description: "Golden hour at the famous sandbank reveals nature's perfect palette."
  },
  {
    id: 2,
    title: "Stone Town Doors",
    category: "Culture",
    location: "Stone Town",
    date: "2024",
    image: "https://media.istockphoto.com/id/478553540/photo/traditional-zanzibar-door.webp?a=1&b=1&s=612x612&w=0&k=20&c=RcvQqbG9XazXY7N7sHw56kHzuwutPCtrC3dwBkwzcn4=",
    likes: 312,
    downloads: 89,
    tags: ["architecture", "history", "doors", "culture"],
    description: "Intricately carved doors tell stories of Zanzibar's rich heritage."
  },
  {
    id: 3,
    title: "Dolphin Dance",
    category: "Wildlife",
    location: "Mnemba Atoll",
    date: "2024",
    image: "https://media.istockphoto.com/id/1177150539/photo/aerial-close-up-of-a-dolphin-pods-swimming-in-tropical-warm-blue-water-beautiful-marine.webp?a=1&b=1&s=612x612&w=0&k=20&c=jrv2VWZ9QyYUMmBlPQqSGxb6Imckas5J2mmWeLtOENQ=",
    likes: 456,
    downloads: 210,
    tags: ["dolphins", "marine", "ocean", "wildlife"],
    description: "Wild dolphins gracefully swimming in their natural habitat."
  },
  {
    id: 4,
    title: "Spice Market Colors",
    category: "Markets",
    location: "Darajani Market",
    date: "2024",
    image: "https://media.istockphoto.com/id/185241986/photo/spices.webp?a=1&b=1&s=612x612&w=0&k=20&c=eVeunLzP8w2YQEwsT_-c9N902_pbPxFTMOgVgZAIulw=",
    likes: 189,
    downloads: 75,
    tags: ["spices", "market", "colors", "local"],
    description: "Vibrant spices creating a rainbow of aromas and colors."
  },
  {
    id: 5,
    title: "Tortoise Sanctuary",
    category: "Wildlife",
    location: "Prison Island",
    date: "2024",
    image: "https://media.istockphoto.com/id/1327941996/photo/a-tourist-woman-feeding-giant-turtle-aldabrachelys-gigantea-or-aldabra-giant-tortoise-with.webp?a=1&b=1&s=612x612&w=0&k=20&c=1XHSQxpsTa-TxQe7o5_sI0YjTJd-lkLeD6E8kflPm7Q=",
    likes: 278,
    downloads: 95,
    tags: ["tortoise", "wildlife", "sanctuary", "conservation"],
    description: "Gentle giants of Prison Island, some over 150 years old."
  },
  {
    id: 6,
    title: "Dhow at Dusk",
    category: "Culture",
    location: "Stone Town Coast",
    date: "2024",
    image: "https://images.unsplash.com/photo-1683716642140-60cd999c2caa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHN1bnNldCUyMGNydWlzZSUyMGluJTIwemFuemliYXJ8ZW58MHx8MHx8fDA%3D",
    likes: 423,
    downloads: 145,
    tags: ["dhow", "sunset", "traditional", "sailing"],
    description: "Traditional wooden dhow sailing into the golden hour."
  },
  {
    id: 7,
    title: "Red Colobus Monkey",
    category: "Wildlife",
    location: "Jozani Forest",
    date: "2024",
    image: "https://media.istockphoto.com/id/1140173939/photo/pygathrix-nemaeus-nemean-encotel-sits-on-a-dry-tree.jpg?s=612x612&w=0&k=20&c=N3MHUHu4UwbPchzj4qki7YsI-XuX9NfIQLSFhhy3NjQ=",
    likes: 321,
    downloads: 110,
    tags: ["monkey", "forest", "wildlife", "endangered"],
    description: "Rare red colobus monkey in its natural forest habitat."
  },
  {
    id: 8,
    title: "Forodhani Night Market",
    category: "Markets",
    location: "Stone Town",
    date: "2024",
    image: "https://media.istockphoto.com/id/185273391/photo/seafood-and-vegetable-stand-at-night.jpg?s=612x612&w=0&k=20&c=C398VnStAPnRwYvhQjWFpbGgdDJSkltsPhnFA4dUQho=",
    likes: 398,
    downloads: 125,
    tags: ["food", "night", "market", "local"],
    description: "Vibrant night market with authentic Zanzibari street food."
  },
  {
    id: 9,
    title: "Coral Gardens",
    category: "Underwater",
    location: "Mnemba Atoll",
    date: "2024",
    image: "https://media.istockphoto.com/id/1283699762/photo/turquoise-underwater-world-of-zanzibar-island.webp?a=1&b=1&s=612x612&w=0&k=20&c=3Oz0DhaEUr9CVTGpNqJWKzbIS0YZdfKaj4RfA-v02bU=",
    likes: 267,
    downloads: 85,
    tags: ["coral", "snorkeling", "marine", "colors"],
    description: "Vibrant coral reefs teeming with tropical fish."
  },
  {
    id: 10,
    title: "Kae Beach Sunset",
    category: "Beaches",
    location: "Kae Beach",
    date: "2024",
    image: "https://media.istockphoto.com/id/1368609096/photo/contemplating-scenic-sunset-on-zanzibar-island-tanzania.webp?a=1&b=1&s=612x612&w=0&k=20&c=-MTzhHGmk5NOuPSASa-lSZ6Knu33Fm5_lYdJNLCWX-0=",
    likes: 512,
    downloads: 190,
    tags: ["sunset", "beach", "dramatic", "tides"],
    description: "Dramatic sunset over the famous tidal beach."
  },
  {
    id: 11,
    title: "Spice Farm Tour",
    category: "Culture",
    location: "Zanzibar Countryside",
    date: "2024",
    image: "https://media.istockphoto.com/id/536652250/photo/cloves.jpg?s=612x612&w=0&k=20&c=s32odxuBRSO7Y_U78C-11hC1To1bZ2Q_CO-5_tnGEoI=",
    tags: ["spices", "farm", "agriculture", "tour"],
    description: "Guided tour through lush spice plantations."
  },
  {
    id: 12,
    title: "Traditional Dancer",
    category: "Underwater",
    location: "Nungwi",
    date: "2024",
    image: "https://media.istockphoto.com/id/518369288/photo/diving-with-fishes.webp?a=1&b=1&s=612x612&w=0&k=20&c=DP7DsJJoeWmW0YwpvS0oe-S0vhquTRxKuoS5cEipZQQ=",
    likes: 287,
    downloads: 92,
    tags: ["dance", "tradition", "performance", "culture"],
    description: "Traditional Taarab dancer in colorful costume."
  }
];

// Categories for filtering
const categories = [
  { id: "all", label: "All Photos", count: galleryPhotos.length },
  { id: "beaches", label: "Beaches", count: galleryPhotos.filter(p => p.category === "Beaches").length },
  { id: "culture", label: "Culture", count: galleryPhotos.filter(p => p.category === "Culture").length },
  { id: "wildlife", label: "Wildlife", count: galleryPhotos.filter(p => p.category === "Wildlife").length },
  { id: "markets", label: "Markets", count: galleryPhotos.filter(p => p.category === "Markets").length },
  { id: "underwater", label: "Underwater", count: galleryPhotos.filter(p => p.category === "Underwater").length }
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [likedPhotos, setLikedPhotos] = useState({});
  const [showLightbox, setShowLightbox] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or masonry
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPhotos = galleryPhotos.filter(photo => {
    const matchesCategory = selectedCategory === "all" || 
      photo.category.toLowerCase() === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      photo.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (id) => {
    setLikedPhotos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleDownload = (photo) => {
    // In a real app, this would download the image
    alert(`Downloading "${photo.title}"`);
  };

  const handleShare = (photo) => {
    if (navigator.share) {
      navigator.share({
        title: photo.title,
        text: photo.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${photo.title} - ${photo.description}`);
      alert("Photo info copied to clipboard!");
    }
  };

  const openLightbox = (photo) => {
    setSelectedPhoto(photo);
    setShowLightbox(true);
  };

  return (
    <div style={{
      background: "#ffffff",
      minHeight: "100vh",
      color: ACCENT,
      paddingTop: "100px"
    }}>
      {/* Hero Section */}
      <section style={{
        background: `linear-gradient(135deg, ${TEAL}10 0%, #ffffff 100%)`,
        padding: "80px 0 40px",
        borderBottom: `1px solid ${TEAL}20`
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <Badge
                pill
                style={{
                  background: `${TEAL}20`,
                  color: "#ffffff",
                  padding: "10px 25px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  marginBottom: "20px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <Camera /> VISUAL JOURNEY
              </Badge>

              <h1 style={{
                fontSize: "3.5rem",
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: "20px",
                color: TEAL_DARK
              }}>
                Zanzibar in
                <br />
                <span style={{ color: SECONDARY }}>Pictures</span>
              </h1>

              <p style={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "#666",
                maxWidth: "500px",
                marginBottom: "30px"
              }}>
                Explore the breathtaking beauty of Zanzibar through our curated collection 
                of stunning photographs. Each image tells a story of paradise.
              </p>

              <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#fff",
                  borderRadius: "50px",
                  padding: "8px 20px",
                  border: `1px solid ${TEAL}30`,
                  flex: 1,
                  maxWidth: "300px"
                }}>
                  <Search color="#666" style={{ marginRight: "10px" }} />
                  <input
                    type="text"
                    placeholder="Search photos, tags, locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      border: "none",
                      outline: "none",
                      width: "100%",
                      background: "transparent",
                      color: ACCENT,
                      fontSize: "0.9rem"
                    }}
                  />
                </div>
                
                <Button
                  variant="outline-primary"
                  onClick={() => setViewMode(viewMode === "grid" ? "masonry" : "grid")}
                  style={{
                    borderColor: TEAL,
                    color: TEAL,
                    borderRadius: "50px",
                    padding: "8px 20px",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <Grid3x3 />
                  {viewMode === "grid" ? "Masonry View" : "Grid View"}
                </Button>
              </div>
            </Col>

            <Col lg={6}>
              <div style={{
                position: "relative",
                height: "400px"
              }}>
                {/* Floating photo collage */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <div style={{
                    position: "absolute",
                    width: "200px",
                    height: "250px",
                    background: `url('${galleryPhotos[0].image}')`,
                    backgroundSize: "cover",
                    borderRadius: "15px",
                    transform: "rotate(-5deg) translateX(-80px) translateY(-20px)",
                    boxShadow: "0 20px 40px rgba(0,128,128,0.15)",
                    border: "5px solid white"
                  }} />
                  
                  <div style={{
                    position: "absolute",
                    width: "220px",
                    height: "280px",
                    background: `url('${galleryPhotos[1].image}')`,
                    backgroundSize: "cover",
                    borderRadius: "15px",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
                    border: "5px solid white",
                    zIndex: 2
                  }} />
                  
                  <div style={{
                    position: "absolute",
                    width: "200px",
                    height: "250px",
                    background: `url('${galleryPhotos[2].image}')`,
                    backgroundSize: "cover",
                    borderRadius: "15px",
                    transform: "rotate(5deg) translateX(80px) translateY(20px)",
                    boxShadow: "0 20px 40px rgba(0,128,128,0.15)",
                    border: "5px solid white"
                  }} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Category Filter */}
      <section style={{ padding: "40px 0" }}>
        <Container>
          <div style={{
            background: "#f8f9fa",
            borderRadius: "20px",
            padding: "25px",
            marginBottom: "30px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px"
            }}>
              <h3 style={{ fontWeight: 700, color: TEAL_DARK, margin: 0 }}>
                <Filter className="me-2" />
                Filter by Category
              </h3>
             
            </div>
            
            <div style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap"
            }}>
              {categories.map(category => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    background: selectedCategory === category.id 
                      ? `linear-gradient(135deg, ${TEAL}, ${TEAL_LIGHT})` 
                      : "white",
                    color: selectedCategory === category.id ? "white" : TEAL_DARK,
                    border: `1px solid ${selectedCategory === category.id ? TEAL : TEAL}30`,
                    borderRadius: "50px",
                    padding: "10px 24px",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    transition: "all 0.3s ease"
                  }}
                >
                  {category.label}
                  <Badge
                    pill
                    style={{
                      background: selectedCategory === category.id 
                        ? "rgba(255,255,255,0.2)" 
                        : `${TEAL}15`,
                      color: selectedCategory === category.id ? "white" : TEAL_DARK,
                      fontSize: "0.75rem",
                      padding: "4px 8px",
                      marginLeft: "8px"
                    }}
                  >
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Photo Grid */}
      <section style={{ padding: "0 0 80px" }}>
        <Container>
          {viewMode === "grid" ? (
            // Grid View
            <Row className="g-4">
              {filteredPhotos.map(photo => (
                <Col lg={4} md={6} key={photo.id}>
                  <div
                    className="photo-card"
                    style={{
                      borderRadius: "15px",
                      overflow: "hidden",
                      position: "relative",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.08)"
                    }}
                    onClick={() => openLightbox(photo)}
                  >
                    <img
                      src={photo.image}
                      alt={photo.title}
                      style={{
                        width: "100%",
                        height: "280px",
                        objectFit: "cover",
                        transition: "transform 0.6s ease"
                      }}
                    />
                    
                    {/* Hover Overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "20px"
                      }}
                      className="photo-overlay"
                    >
                      <div>
                        <h5 style={{ 
                          color: "white", 
                          fontWeight: 700,
                          marginBottom: "5px"
                        }}>
                          {photo.title}
                        </h5>
                        <div style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: "10px",
                          fontSize: "0.9rem",
                          color: "rgba(255,255,255,0.9)"
                        }}>
                          <GeoAlt size={12} />
                          {photo.location}
                        </div>
                      </div>
                    </div>
                    
                    
                    {/* Category Badge */}
                    <div style={{
                      position: "absolute",
                      top: "15px",
                      left: "15px",
                      background: TEAL,
                      color: "white",
                      padding: "6px 15px",
                      borderRadius: "50px",
                      fontSize: "0.75rem",
                      fontWeight: 600
                    }}>
                      {photo.category}
                    </div>
                    
                    {/* Bottom Info */}
                    <div style={{
                      padding: "20px",
                      background: "white"
                    }}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px"
                      }}>
                        
                        
                        <Button
                          variant="link"
                          onClick={(e) => {
                            e.stopPropagation();
                            openLightbox(photo);
                          }}
                          style={{
                            color: TEAL,
                            padding: 0,
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            textDecoration: "none"
                          }}
                        >
                          <ZoomIn className="me-1" />
                          View
                        </Button>
                      </div>
                      
                      <div style={{ 
                        display: "flex", 
                        flexWrap: "wrap", 
                        gap: "5px",
                        marginTop: "10px"
                      }}>
                        {photo.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            style={{
                              background: `${TEAL}10`,
                              color: TEAL_DARK,
                              padding: "3px 10px",
                              borderRadius: "50px",
                              fontSize: "0.75rem"
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            // Masonry View
            <div className="masonry-grid" style={{
              columnCount: 3,
              columnGap: "20px"
            }}>
              {filteredPhotos.map(photo => (
                <div
                  key={photo.id}
                  className="masonry-item"
                  style={{
                    breakInside: "avoid",
                    marginBottom: "20px",
                    borderRadius: "15px",
                    overflow: "hidden",
                    position: "relative",
                    cursor: "pointer",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                    background: "white"
                  }}
                  onClick={() => openLightbox(photo)}
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block"
                    }}
                  />
                  
                  <div style={{ padding: "15px" }}>
                    <h6 style={{ 
                      fontWeight: 700,
                      marginBottom: "5px",
                      color: TEAL_DARK
                    }}>
                      {photo.title}
                    </h6>
                    <div style={{ 
                      fontSize: "0.85rem", 
                      color: "#666",
                      marginBottom: "10px"
                    }}>
                      {photo.description.substring(0, 80)}...
                    </div>
                    
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Button
                          variant="link"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(photo.id);
                          }}
                          style={{ padding: 0, color: likedPhotos[photo.id] ? "#ff4757" : "#666" }}
                        >
                          <Heart size={14} />
                        </Button>
                        <Button
                          variant="link"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(photo);
                          }}
                          style={{ padding: 0, color: TEAL }}
                        >
                          <Download size={14} />
                        </Button>
                      </div>
                      
                      <span style={{
                        background: `${TEAL}10`,
                        color: TEAL_DARK,
                        padding: "3px 10px",
                        borderRadius: "50px",
                        fontSize: "0.75rem",
                        fontWeight: 600
                      }}>
                        {photo.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredPhotos.length === 0 && (
            <div style={{
              textAlign: "center",
              padding: "80px 20px"
            }}>
              <Camera size={60} color={TEAL} style={{ opacity: 0.3, marginBottom: "20px" }} />
              <h3 style={{ color: TEAL_DARK, marginBottom: "10px" }}>
                No photos found
              </h3>
              <p style={{ color: "#666" }}>
                Try a different search or category
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section style={{ 
        background: `linear-gradient(135deg, ${TEAL}10 0%, ${TEAL}05 100%)`,
        padding: "80px 0",
        borderTop: `1px solid ${TEAL}20`
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h2 style={{ 
                fontWeight: 800, 
                fontSize: "2.5rem",
                color: TEAL_DARK,
                marginBottom: "20px"
              }}>
                Want to Feature Your Photos?
              </h2>
              <p style={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "#666",
                marginBottom: "30px"
              }}>
                Share your Zanzibar memories with our community. Submit your best shots 
                for a chance to be featured in our gallery.
              </p>
              <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                <Button
                  style={{
                    background: `linear-gradient(135deg, ${TEAL}, ${TEAL_LIGHT})`,
                    border: "none",
                    borderRadius: "50px",
                    padding: "14px 32px",
                    fontWeight: 600,
                    fontSize: "1rem"
                  }}
                >
                  <Camera className="me-2" />
                  Submit Photos
                </Button>
                <Button
                  variant="outline-primary"
                  style={{
                    borderColor: TEAL,
                    color: TEAL,
                    borderRadius: "50px",
                    padding: "14px 32px",
                    fontWeight: 600,
                    borderWidth: "2px"
                  }}
                >
                  View Photography Tours
                </Button>
              </div>
            </Col>
            
            <Col lg={4}>
              <div style={{ 
                display: "flex", 
                gap: "15px",
                justifyContent: "flex-end"
              }}>
                <Button
                  variant="outline-primary"
                  style={{ 
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    padding: 0,
                    borderColor: TEAL,
                    color: TEAL
                  }}
                >
                  <Instagram />
                </Button>
                <Button
                  variant="outline-primary"
                  style={{ 
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    padding: 0,
                    borderColor: TEAL,
                    color: TEAL
                  }}
                >
                  <Facebook />
                </Button>
                <Button
                  variant="outline-primary"
                  style={{ 
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    padding: 0,
                    borderColor: TEAL,
                    color: TEAL
                  }}
                >
                  <Twitter />
                </Button>
                <Button
                  variant="outline-primary"
                  style={{ 
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    padding: 0,
                    borderColor: TEAL,
                    color: TEAL
                  }}
                >
                  <Whatsapp />
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Lightbox Modal */}
      <Modal
        show={showLightbox}
        onHide={() => setShowLightbox(false)}
        size="xl"
        centered
        dialogClassName="lightbox-modal"
      >
        {selectedPhoto && (
          <>
            <Modal.Header closeButton style={{ 
              borderBottom: "none",
              position: "absolute",
              top: "20px",
              right: "20px",
              zIndex: 1000
            }}>
              <Button
                variant="light"
                onClick={() => setShowLightbox(false)}
                style={{
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0
                }}
              >
                <X size={20} />
              </Button>
            </Modal.Header>
            
            <Modal.Body style={{ padding: 0 }}>
              <div style={{ position: "relative" }}>
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  style={{
                    width: "100%",
                    height: "70vh",
                    objectFit: "contain",
                    background: "#f8f9fa"
                  }}
                />
                
                {/* Photo Info Overlay */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                  color: "white",
                  padding: "40px 30px 30px"
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "20px"
                  }}>
                    <div style={{ flex: 1, minWidth: "300px" }}>
                      <h3 style={{ 
                        fontWeight: 800,
                        marginBottom: "10px"
                      }}>
                        {selectedPhoto.title}
                      </h3>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        marginBottom: "15px",
                        fontSize: "0.9rem"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <GeoAlt size={14} />
                          {selectedPhoto.location}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <Calendar size={14} />
                          {selectedPhoto.date}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <Tag size={14} />
                          {selectedPhoto.category}
                        </div>
                      </div>
                      <p style={{ opacity: 0.9, marginBottom: "20px" }}>
                        {selectedPhoto.description}
                      </p>
                      
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {selectedPhoto.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            pill
                            style={{
                              background: "rgba(255,255,255,0.2)",
                              color: "white",
                              padding: "5px 15px",
                              fontSize: "0.85rem"
                            }}
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div style={{
                      display: "flex",
                      gap: "15px"
                    }}>
                      <Button
                        variant="light"
                        onClick={() => handleLike(selectedPhoto.id)}
                        style={{
                          borderRadius: "50%",
                          width: "50px",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(255,255,255,0.9)"
                        }}
                      >
                        {likedPhotos[selectedPhoto.id] ? 
                          <HeartFill size={20} color="#ff4757" /> : 
                          <Heart size={20} color="#666" />
                        }
                      </Button>
                      
                      <Button
                        variant="light"
                        onClick={() => handleDownload(selectedPhoto)}
                        style={{
                          borderRadius: "50%",
                          width: "50px",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(255,255,255,0.9)"
                        }}
                      >
                        <Download size={20} color={TEAL} />
                      </Button>
                      
                      <Button
                        variant="light"
                        onClick={() => handleShare(selectedPhoto)}
                        style={{
                          borderRadius: "50%",
                          width: "50px",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(255,255,255,0.9)"
                        }}
                      >
                        <Share size={20} color={TEAL} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>

      {/* Custom CSS */}
      <style jsx>{`
        .photo-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,128,128,0.15);
        }
        
        .photo-card:hover .photo-overlay {
          opacity: 1;
        }
        
        .photo-card:hover img {
          transform: scale(1.05);
        }
        
        .lightbox-modal .modal-content {
          background: transparent;
          border: none;
        }
        
        .lightbox-modal .modal-header {
          background: transparent;
        }
        
        @media (max-width: 768px) {
          .masonry-grid {
            column-count: 2;
          }
        }
        
        @media (max-width: 576px) {
          .masonry-grid {
            column-count: 1;
          }
        }
      `}</style>
    </div>
  );
}