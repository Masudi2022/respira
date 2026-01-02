import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Badge, Card, Modal, Carousel, Form, Spinner, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  GeoAltFill,
  StarFill,
  ClockFill,
  SunFill,
  CurrencyDollar,
  ShieldCheck,
  CalendarCheck,
  PersonFill,
  Water,
  Umbrella,
  Camera,
  Heart,
  HeartFill,
  ChevronLeft,
  ChevronRight,
  ShareFill,
  Bookmark,
  BookmarkFill,
  ArrowLeft,
  Whatsapp,
  Facebook,
  Twitter,
  Instagram,
  CheckCircleFill,
  EnvelopeFill,
  TelephoneFill,
  PeopleFill,
  CalendarDateFill,
  GeoAlt,
  Check2Circle,
  XCircle,
  InfoCircle,
  Send
} from "react-bootstrap-icons";

// Color Palette
const COLORS = {
  primary: "#0A8D7C",
  primaryLight: "#2FB6A6",
  primaryDark: "#077368",
  secondary: "#FF6B35",
  secondaryLight: "#FF7E5F",
  accent: "#1A3A5F",
  accentLight: "#3A4F6D",
  light: "#F8F9FA",
  dark: "#212529",
  success: "#28A745",
  warning: "#FFC107",
  info: "#17A2B8"
};

const destinations = [
  {
    id: "Nakupenda-Sandbank",
    title: "Nakupenda Sandbank",
    location: "Zanzibar Archipelago",
    rating: 4.9,
    reviewCount: 1284,
    image: "https://images.unsplash.com/photo-1544550581-1bcabf842b77?auto=format&fit=crop&w=1600&h=900&q=80",
    gallery: [
      "https://media.istockphoto.com/id/2217360852/photo/aerial-view-of-nakupenda-island-sandbank-in-ocean-white-sandy-beach-boats-blue-sea-during-low.webp?a=1&b=1&s=612x612&w=0&k=20&c=fqRSjUoau0PDhGmsRxRGBUFnsKMJfHQJsVWBfMhLjRA=",
      "https://media.istockphoto.com/id/2217360923/photo/aerial-view-of-alone-young-woman-on-the-sandbank-in-ocean-white-sand-blue-sea-during-low-tide.webp?a=1&b=1&s=612x612&w=0&k=20&c=X4FMyBRgxoy9NBcSg3nolKyMRkHFRMklCzbLuVtNROg=",
      "https://media.istockphoto.com/id/2213429398/photo/aerial-view-of-nakupenda-island-sandbank-in-ocean-white-sandy-beach-boats-blue-sea-during-low.webp?a=1&b=1&s=612x612&w=0&k=20&c=WcyuSbZ46qh_PbfcfBUKp-oTuuAnBRA4ivU2Tjt8fJI=",
      "https://media.istockphoto.com/id/2219362310/photo/aerial-view-of-alone-young-woman-on-the-sandbank-in-ocean-white-sand-blue-sea-during-low-tide.webp?a=1&b=1&s=612x612&w=0&k=20&c=XXFjqHoOodjTsMhBzPmcMYhAPfj19_aAQjg2uRlyM8c=",
      "https://media.istockphoto.com/id/2213429368/photo/aerial-view-of-nakupenda-island-sandbank-in-ocean-white-sandy-beach-blue-sea-during-low-tide.webp?a=1&b=1&s=612x612&w=0&k=20&c=qXgngnB39IwX5cefSGSxbIh0YnN_2hndhCGkc2n1ofw="
    ],
    description: "A breathtaking white sandbank in the Indian Ocean, ideal for swimming, snorkeling, and seafood lunches.",
    fullDescription: `Nakupenda Sandbank is a natural wonder that emerges like a dream from the turquoise waters of the Indian Ocean. This pristine sandbank appears during low tide, creating a surreal landscape of pure white sand surrounded by crystal-clear waters. The name "Nakupenda" means "I love you" in Swahili, perfectly capturing the enchanting experience this destination offers.

Experience the magic of walking on a sand island in the middle of the ocean, where you can swim in the warm, shallow waters, snorkel among colorful marine life, and enjoy freshly prepared seafood under the tropical sun. The sandbank's remote location ensures privacy and exclusivity, making it perfect for romantic getaways, photography sessions, and unforgettable moments.`,
    highlight: "Best for relaxation & photography",
    duration: "4-6 Hours",
    bestTime: "Sunrise & Low Tide",
    bestSeason: "November - March",
    price: "From $45",
    premiumPackage: "$85",
    included: [
      "Private boat transfer from Stone Town",
      "Professional snorkeling guide",
      "Snorkeling equipment",
      "Fresh seafood BBQ lunch",
      "Unlimited mineral water & soft drinks",
      "Beach umbrella & comfortable loungers",
      "Underwater photography session",
      "Travel insurance coverage"
    ],
    activities: [
      "Snorkeling in crystal-clear waters",
      "Swimming in safe, shallow areas",
      "Seafood BBQ lunch on the sandbank",
      "Professional photography session",
      "Sunbathing on pristine white sand",
      "Bird watching",
      "Beach games & relaxation"
    ],
    tips: [
      "Book during low tide for best experience",
      "Morning tours avoid strong midday sun",
      "Bring reef-safe sunscreen",
      "Waterproof bags for electronics",
      "Light beachwear recommended",
      "Carry cash for souvenirs"
    ],
    tags: ["Romantic", "Family Friendly", "Photography", "Adventure", "Luxury"],
    difficulty: "Easy",
    groupSize: "2-12 people",
    languages: ["English", "Swahili", "French", "German"],
    mapLink: "https://maps.google.com/?q=Nakupenda+Sandbank+Zanzibar"
  },
  {
    id: "Mnemba-Atoll",
    title: "Mnemba Atoll",
    location: "North Zanzibar",
    rating: 4.8,
    reviewCount: 956,
    image: "https://media.istockphoto.com/id/872825878/photo/dolphins-around-mnemba-island-off-zanzibar-tanzania.webp?a=1&b=1&s=612x612&w=0&k=20&c=792t0Wu4ok1CWFk5jXRnP--gWZvHofminTq9yf9ogKw=",
    gallery: [
      "https://media.istockphoto.com/id/872825878/photo/dolphins-around-mnemba-island-off-zanzibar-tanzania.webp?a=1&b=1&s=612x612&w=0&k=20&c=792t0Wu4ok1CWFk5jXRnP--gWZvHofminTq9yf9ogKw=",
      "https://media.istockphoto.com/id/1407003455/photo/beaches-of-zanzibar.webp?a=1&b=1&s=612x612&w=0&k=20&c=6B38wXH1uMfYDr28cS6LQ4PWUykq0HuBWI6g5ATbDoE=",
      "https://media.istockphoto.com/id/540575886/photo/traveling-with-dolphins.webp?a=1&b=1&s=612x612&w=0&k=20&c=5FQ33LqYj1RyfezHROAHOTSlGjwtSbazOFKCmlGE3S0=",
      "https://media.istockphoto.com/id/2198497452/photo/sleek-dolphin-gliding-effortlessly-through-crystal-clear-waters-near-kizimkazi-zanzibar.webp?a=1&b=1&s=612x612&w=0&k=20&c=7bnLe7Gqfg0GksWr0Qwwsid3UbueR-RmOoI4bHcWNAs=",
      "https://media.istockphoto.com/id/476446816/photo/dolphins-zanzibar-africa.webp?a=1&b=1&s=612x612&w=0&k=20&c=FCJdzEeLYWXmTrYXNifXQ8lhSg_o2U-BbkB-0r60Sjs="
    ],
    description: "Zanzibar's top snorkeling destination, famous for dolphins and crystal-clear turquoise waters.",
    fullDescription: `Mnemba Atoll is a marine conservation paradise and one of Africa's most spectacular snorkeling destinations. Located off the northeast coast of Zanzibar, this protected marine area is home to over 600 species of fish, vibrant coral gardens, and frequent dolphin sightings. The atoll surrounds the exclusive Mnemba Island, ensuring pristine conditions and exceptional biodiversity.

Swim with dolphins in their natural habitat, explore colorful coral reefs teeming with marine life, and witness the breathtaking beauty of the Indian Ocean's clearest waters. The atoll's protected status means you'll experience nature at its most untouched and magnificent.`,
    highlight: "Best snorkeling & dolphin encounters",
    duration: "Full Day",
    bestTime: "Morning",
    bestSeason: "June - October",
    price: "From $65",
    premiumPackage: "$120",
    included: [
      "Full-day boat tour with licensed captain",
      "Professional marine biologist guide",
      "Complete snorkeling gear",
      "Buffet lunch with local specialties",
      "Dolphin watching experience",
      "Marine park conservation fees",
      "Safety equipment & first aid",
      "Underwater camera rental"
    ],
    activities: [
      "Dolphin watching and swimming",
      "Guided snorkeling tour",
      "Coral reef exploration",
      "Marine life education",
      "Beach relaxation",
      "Underwater photography",
      "Conservation awareness session"
    ],
    tags: ["Marine Life", "Adventure", "Educational", "Family Friendly", "Luxury"],
    difficulty: "Medium",
    groupSize: "4-15 people",
    languages: ["English", "Swahili", "Italian", "Spanish"]
  },
  {
    id: "Stone-Town",
    title: "Stone Town",
    location: "Zanzibar City",
    rating: 4.7,
    reviewCount: 2147,
    image: "https://images.unsplash.com/photo-1531168556467-80a3b279834b?auto=format&fit=crop&w=1600&h=900&q=80",
    gallery: [
      "https://media.istockphoto.com/id/1368609467/photo/old-streets-of-stone-town-on-zanzibar-island-tanzania.jpg?s=612x612&w=0&k=20&c=sByMj6Sy3ho5PLmAl7ogs-Fxu4YS2pt_KsVK1A96B9s=",
      "https://media.istockphoto.com/id/1272435826/photo/historical-cannon-guns-the-war-monument-in-stone-town-zanzibar.jpg?s=612x612&w=0&k=20&c=obsZh_puriGHkIDYcngV7mf1dV2AK2J5n2SWrqOWGOs=",
      "https://media.istockphoto.com/id/1137594795/photo/street-scene-of-stone-town-old-part-of-zanzibar-tanzania-africa.jpg?s=612x612&w=0&k=20&c=Dom7bHFfmcbHjaeCRikZLbz11CPAi7MmhxmErIsaDbE=",
      "https://images.unsplash.com/photo-1713253702141-6b95e745260d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3RvbmUlMjB0b3duJTIwaW4lMjB6YW56aWJhcnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1713253702141-6b95e745260d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3RvbmUlMjB0b3duJTIwaW4lMjB6YW56aWJhcnxlbnwwfHwwfHx8MA%3D%3D"
    ],
    description: "A UNESCO World Heritage maze of Swahili culture, Arabian architecture, markets, and centuries of history.",
    fullDescription: `Stone Town is the historic heart of Zanzibar City and a UNESCO World Heritage Site. It's a living museum of Swahili culture — where African, Arab, Persian, and European influences merge into one vibrant experience. 
  
Wander through narrow alleys filled with wooden carved doors, spice markets, mosques, churches, lively bazaars, and historic palaces. Stone Town is home to iconic landmarks like the House of Wonders, the Old Fort, the Sultan's Palace, the Anglican Cathedral (built over the former slave market), and Freddy Mercury's childhood home.
  
A guided walking tour reveals stories of slavery, sultans, pirates, colonial battles, and cultural exchange. It's the cultural and emotional heart of Zanzibar — perfect for photographers, food lovers, and history explorers.`,
    highlight: "Culture, architecture & history",
    duration: "3–5 Hours",
    bestTime: "Afternoon & Sunset",
    bestSeason: "All Year Round",
    price: "From $35",
    premiumPackage: "$75",
    included: [
      "Professional local history guide",
      "Visit to House of Wonders",
      "Entrance to Old Fort",
      "Anglican Cathedral access",
      "Visit the former slave market chambers",
      "Local street food tasting",
      "Bottle of mineral water",
      "Travel insurance"
    ],
    activities: [
      "Walking tour of ancient streets",
      "Visit museums & historical buildings",
      "Local food tasting & markets",
      "Photography of carved wooden doors",
      "Cultural storytelling from guides",
      "Shopping for crafts & antiques",
      "Evening sunset drinks by the waterfront"
    ],
    tips: [
      "Wear comfortable walking shoes",
      "Carry cash for markets",
      "Avoid midday heat — afternoons are best",
      "Dress modestly near religious sites",
      "Stay alert in crowded bazaars",
      "Great spot for sunset photography"
    ],
    tags: ["History", "Culture", "Walking Tour", "UNESCO", "Food"],
    difficulty: "Easy",
    groupSize: "1–20 people",
    languages: ["English", "Swahili", "Italian", "Spanish"],
    mapLink: "https://maps.google.com/?q=Stone+Town+Zanzibar"
  },
  {
    id: "Prison-Island",
    title: "Prison Island (Changuu)",
    location: "West Zanzibar",
    rating: 4.8,
    reviewCount: 1893,
    image: "https://media.istockphoto.com/id/506448196/photo/boat-near-chumbe-island-zanzibar-tanzania.jpg?s=612x612&w=0&k=20&c=A0RCFb1ABO6fLvYoxk6M6ru-x1r6ChamZHtM1F7X6yQ=",
    gallery: [
      "https://media.istockphoto.com/id/1527824993/photo/this-is-the-largest-tortoise-in-the-world-and-one-of-the-most-protected-fauna-and-health.jpg?s=612x612&w=0&k=20&c=jsIgzD9hJiZpaHzrzKIYQV7RMxrUOzi5hYzbzlx01hs=",
      "https://media.istockphoto.com/id/506448196/photo/boat-near-chumbe-island-zanzibar-tanzania.jpg?s=612x612&w=0&k=20&c=A0RCFb1ABO6fLvYoxk6M6ru-x1r6ChamZHtM1F7X6yQ=",
      "https://media.istockphoto.com/id/2205643104/photo/aldabra-giant-tortoise-on-prison-island-zanzibar-in-tanzania.jpg?s=612x612&w=0&k=20&c=I_epGUdEzl2-jtCq4bztPT23g0sTh7hB36rErAQgwrY=",
      "https://media.istockphoto.com/id/1325355593/photo/prison-island-in-zanzibar-africa-tanzania.jpg?s=612x612&w=0&k=20&c=cE4WOp9fMQ-DAyr48N6LfPd3Pk9QNviajJM4JRAeL4Y=",
      "https://media.istockphoto.com/id/1327941996/photo/a-tourist-woman-feeding-giant-turtle-aldabrachelys-gigantea-or-aldabra-giant-tortoise-with.webp?a=1&b=1&s=612x612&w=0&k=20&c=1XHSQxpsTa-TxQe7o5_sI0YjTJd-lkLeD6E8kflPm7Q="
    ],
    description: "A tropical escape famous for giant Aldabra tortoises, turquoise waters, snorkeling, and colonial history.",
    fullDescription: `Prison Island, also known as Changuu Island, is one of Zanzibar's most iconic escapes — a short boat ride from Stone Town. Originally intended as a 19th-century prison during the rule of the Sultan, the island instead became a quarantine station for infectious diseases during colonial times.

Today, it is a peaceful sanctuary home to giant Aldabra tortoises — some over 150 years old — introduced as a royal gift from the Seychelles. Visitors can feed and interact with these gentle giants, explore historic ruins, relax on pristine beaches, and snorkel in calm turquoise waters teeming with marine life.

Prison Island is the perfect mix of wildlife, history, and tropical relaxation — a must-visit for families, couples, and ocean lovers.`,
    highlight: "Giant tortoises & snorkeling",
    duration: "2–4 Hours",
    bestTime: "Morning",
    bestSeason: "June – October",
    price: "From $40",
    premiumPackage: "$95",
    included: [
      "Return boat transfer from Stone Town",
      "Entrance fee to Tortoise Sanctuary",
      "Feeding leaves for tortoises",
      "Snorkeling equipment (mask & fins)",
      "Professional marine guide",
      "Life jackets & safety briefing",
      "Drinking water",
      "Travel insurance coverage"
    ],
    activities: [
      "Feeding giant Aldabra tortoises",
      "Snorkeling in turquoise coral waters",
      "Relaxing on pristine beach spots",
      "Exploring colonial quarantine hospital ruins",
      "Nature & wildlife photography",
      "Boat cruising from Stone Town",
      "Short hikes around the island"
    ],
    tips: [
      "Bring reef-safe sunscreen",
      "Protect phones with a waterproof pouch",
      "Avoid touching coral while snorkeling",
      "Stay hydrated — it's hot midday",
      "Respect tortoise handling guidelines",
      "Cash recommended for snacks & tips"
    ],
    tags: ["Wildlife", "Snorkeling", "Beach", "Family Friendly", "History"],
    difficulty: "Easy",
    groupSize: "2–18 people",
    languages: ["English", "Swahili", "French", "German"],
    mapLink: "https://maps.google.com/?q=Prison+Island+Zanzibar"
  },
  {
    id: "Jozani-Forest",
    title: "Jozani Forest National Park",
    location: "South Zanzibar",
    rating: 4.6,
    reviewCount: 1624,
    image: "https://media.istockphoto.com/id/1140174416/photo/mangrove-forest-in-zanzibar-tanzania-africa.jpg?s=612x612&w=0&k=20&c=gWj8HblL-ZV_CVEabaJGYXJ4YhCVn8WPEAcwvLDusHs=",
    gallery: [
      "https://media.istockphoto.com/id/2206121759/photo/african-rainforest-jozani-forest-at-zanzibar-tanzania.jpg?s=612x612&w=0&k=20&c=qfmF_VLavEjuccT8JY0ImV2ngi0f6t1uo9N73PA4_-E=",
      "https://media.istockphoto.com/id/1307564825/photo/kirks-red-colobus-monkey-in-the-jozani-forest-reserve-zanzibar-tanzania.jpg?s=612x612&w=0&k=20&c=wgXAf-xf9pVME1oR8wqNtyQZ1tO7V6hwQDfoUvmGrI0=",
      "https://media.istockphoto.com/id/1191440840/photo/young-green-plants-in-the-dark-mangrove-forest.jpg?s=612x612&w=0&k=20&c=UuxwVXJydTgAqp3M3-Y-TtKl7EqZHoAhEFqcMeOTL-4=",
      "https://media.istockphoto.com/id/1140174416/photo/mangrove-forest-in-zanzibar-tanzania-africa.jpg?s=612x612&w=0&k=20&c=gWj8HblL-ZV_CVEabaJGYXJ4YhCVn8WPEAcwvLDusHs=",
      "https://media.istockphoto.com/id/1410528993/photo/jungle-forest-jozani-chwaka-bay-national-park-zanzibar-tanzania.webp?a=1&b=1&s=612x612&w=0&k=20&c=UfAEXQK9zxIHivApLB6UkTr1kuBI6e4argHxtcrJ_H4=",
    ],
    description: "Zanzibar's only national park — home to rare red colobus monkeys, mangrove boardwalks, and tropical wildlife.",
    fullDescription: `Jozani Forest National Park is Zanzibar's green heart — a protected ecological sanctuary home to the endangered red colobus monkey, found nowhere else on Earth. The evergreen forest ecosystem combines mahogany trees, swamp mangroves, medicinal plants, butterflies, birds, and small antelopes like the shy duiker.

Guided eco-tours walk through jungle trails, where red colobus and Sykes' monkeys leap across branches overhead. You'll explore the enchanting mangrove boardwalk — a maze of raised wooden bridges through tidal swamps teeming with crabs, fish nurseries, and unique flora.

Jozani is also part of Zanzibar's nature conservation program to protect biodiversity, carbon-absorbing forests, and wildlife education. It is an unforgettable journey into the wild side of the archipelago — peaceful, scenic, and family-friendly.`,
    highlight: "Red colobus monkeys & mangrove walk",
    duration: "2–3 Hours",
    bestTime: "Morning",
    bestSeason: "All Year Round",
    price: "From $30",
    premiumPackage: "$85",
    included: [
      "Park entrance fee",
      "Professional wildlife guide",
      "Mangrove boardwalk access",
      "Red colobus conservation briefing",
      "Bottled drinking water",
      "Hotel transfers (optional)",
      "Travel insurance"
    ],
    activities: [
      "Watching rare red colobus monkeys",
      "Mangrove forest boardwalk",
      "Bird watching & butterflies",
      "Nature conservation insights",
      "Photography in dense rainforest",
      "Medicinal plant explanations",
      "Short guided jungle hikes"
    ],
    tips: [
      "Wear comfortable walking shoes",
      "Bring mosquito repellent",
      "Avoid touching wildlife",
      "Stay quiet around monkeys",
      "Protect electronics in humid areas",
      "Great for kids and families"
    ],
    tags: ["Wildlife", "Nature", "Eco-Tour", "Family Friendly", "Photography"],
    difficulty: "Easy",
    groupSize: "2–16 people",
    languages: ["English", "Swahili", "French", "Italian"],
    mapLink: "https://maps.google.com/?q=Jozani+Forest+Zanzibar"
  },
  {
    id: "Kae-Beach",
    title: "Kae Beach Sunset Paradise",
    location: "Michamvi Peninsula, South Zanzibar",
    rating: 4.8,
    reviewCount: 1742,
    image: "https://images.unsplash.com/photo-1632751334597-b26a1435ac2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHN1biUyMHNldCUyMGNydWlzZSUyMGluJTIwemFuemliYXJ8ZW58MHx8MHx8fDA%3D",
    gallery: [
      "https://images.unsplash.com/photo-1577199000360-1ee6cedba129?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHN1biUyMHNldCUyMGNydWlzZSUyMGluJTIwemFuemliYXJ8ZW58MHx8MHx8fDA%3D",
      "https://media.istockphoto.com/id/172992736/photo/tropical-dawn.webp?a=1&b=1&s=612x612&w=0&k=20&c=wkWA5mdv1q-bxC6ygfjVeoQf4U7plIOnIZzYFgCThsE=",
      "https://images.unsplash.com/photo-1627899316397-3556313abd3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHN1biUyMHNldCUyMGNydWlzZSUyMGluJTIwemFuemliYXJ8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1646667640427-60051a721841?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN1biUyMHNldCUyMGNydWlzZSUyMGluJTIwemFuemliYXJ8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1563453778883-5bc2ad352c00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHN1biUyMHNldCUyMGNydWlzZSUyMGluJTIwemFuemliYXJ8ZW58MHx8MHx8fDA%3D"
    ],
    description: "One of Zanzibar's most magical sunset beaches — calm tides, barefoot relaxation, cocktails, and Indian Ocean views.",
    fullDescription: `Kae Beach, located on the Michamvi Peninsula, is one of Zanzibar's most breathtaking sunset destinations. Known for its calm lagoon waters, swaying palms, and barefoot beach bars, Kae is the perfect escape for couples, solo travelers, and anyone who just wants to relax in paradise.

When the tide lowers, the ocean pulls back to reveal dreamy sand flats — perfect for photography and long barefoot walks into the horizon. As sunset approaches, the beach transforms into a mellow paradise of beanbags, fire shows, cocktails, live music, and romantic vibes.

Many visitors call Kae the *"Santorini of Zanzibar sunsets"* — peaceful, cinematic, and unforgettable.`,
    highlight: "Unforgettable sunset views & beach bars",
    duration: "Half Day – Full Day",
    bestTime: "Sunset",
    bestSeason: "July – November",
    price: "Free beach access",
    premiumPackage: "$45 (Sunset Experience)",
    included: [
      "Reserved sunset seating (beanbags or sunbeds)",
      "Cocktail or fresh juice",
      "Beach fire ceremony",
      "Live sunset DJ",
      "Soft drink water",
      "Photography assistance"
    ],
    activities: [
      "Sunset watching",
      "Cocktails on the beach",
      "Photography on tidal flats",
      "Swimming in calm lagoon waters",
      "Dining at beach restaurants",
      "Live music & fire shows",
      "Romantic evening walks"
    ],
    tips: [
      "Arrive 1 hour before sunset to secure a good spot",
      "Check tide schedule — low tide creates stunning reflections",
      "Bring a light jacket after sunset (ocean breeze)",
      "Avoid swimming at night",
      "Try local cocktails like Dawa or Passion Mojito"
    ],
    tags: ["Sunset", "Beach Bars", "Romantic", "Chill", "Photography"],
    difficulty: "Very Easy",
    groupSize: "1–50 people",
    languages: ["English", "Swahili", "French", "Italian"],
    mapLink: "https://maps.google.com/?q=Kae+Beach+Zanzibar"
  }
];

// Booking Service
const bookingService = {
  createBooking: async (bookingData) => {
    try {
      // Replace with your actual backend URL
      const response = await fetch(`${API_BASE_URL}/api/booking/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Booking service error:", error);
      throw error;
    }
  },

  validateBooking: (formData) => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }
    
    if (!formData.date) {
      errors.date = "Travel date is required";
    }
    
    return errors;
  }
};

export default function DestinationDetail() {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState("standard");
  
  // Booking states
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: new Date(),
    numberOfPeople: 1,
    packageType: "standard",
    specialRequests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    const found = destinations.find((d) => d.id === destinationId);
    setDestination(found);
    
    // Simulate checking user preferences
    setIsLiked(Math.random() > 0.5);
    setIsBookmarked(Math.random() > 0.5);
  }, [destinationId]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm({
      ...bookingForm,
      [name]: value,
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError("");
    
    // Validate form
    const errors = bookingService.validateBooking(bookingForm);
    if (Object.keys(errors).length > 0) {
      setBookingError("Please fill all required fields correctly.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const standardPrice = parseFloat(destination?.price?.replace("From $", "") || destination?.price?.replace("$", "") || 45);
      const premiumPrice = parseFloat(destination?.premiumPackage?.replace("$", "") || 85);
      const packagePrice = selectedPackage === "standard" ? standardPrice : premiumPrice;
      
      const bookingData = {
        full_name: bookingForm.fullName,
        email: bookingForm.email,
        phone: bookingForm.phone,
        tour: `${destination.title} (${selectedPackage === "standard" ? "Standard" : "Premium"} Package)`,
        message: `
Date: ${bookingForm.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Number of People: ${bookingForm.numberOfPeople}
Package Type: ${selectedPackage === "standard" ? "Standard" : "Premium"}
Estimated Total: $${packagePrice * bookingForm.numberOfPeople}
${bookingForm.specialRequests ? `Special Requests: ${bookingForm.specialRequests}` : ""}
        `.trim(),
      };

      await bookingService.createBooking(bookingData);
      
      setBookingSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setShowBookingModal(false);
        setBookingSuccess(false);
        setBookingForm({
          fullName: "",
          email: "",
          phone: "",
          date: new Date(),
          numberOfPeople: 1,
          packageType: "standard",
          specialRequests: "",
        });
      }, 3000);
      
    } catch (error) {
      console.error("Booking error:", error);
      setBookingError("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookNow = () => {
    setBookingForm({
      ...bookingForm,
      packageType: selectedPackage,
    });
    setShowBookingModal(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: destination?.title,
        text: destination?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!destination) return 0;
    
    const standardPrice = parseFloat(destination?.price?.replace("From $", "") || destination?.price?.replace("$", "") || 45);
    const premiumPrice = parseFloat(destination?.premiumPackage?.replace("$", "") || 85);
    const price = selectedPackage === "standard" ? standardPrice : premiumPrice;
    
    return price * bookingForm.numberOfPeople;
  };

  if (!destination) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}>
        <div className="text-center text-white">
          <h1 className="display-1">🏝️</h1>
          <h2 className="mt-3" style={{ fontWeight: 700 }}>Destination Not Found</h2>
          <p className="mb-4">The paradise you're looking for doesn't exist... yet!</p>
          <Button
            variant="light"
            onClick={() => navigate("/")}
            style={{
              borderRadius: "50px",
              padding: "12px 30px",
              fontWeight: 600
            }}
          >
            <ArrowLeft className="me-2" />
            Back to Paradise
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      minHeight: "100vh",
      position: "relative"
    }}>
      {/* Parallax Header */}
      <div style={{
        height: "70vh",
        position: "relative",
        overflow: "hidden",
        background: `url('${destination.image}') center/cover no-repeat`,
        clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)"
      }}>
        {/* Gradient Overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(10, 141, 124, 0.7), rgba(26, 58, 95, 0.5))",
          backdropFilter: "blur(2px)"
        }} />
        
        {/* Floating Action Buttons */}
        <div style={{
          position: "absolute",
          top: "30px",
          left: "30px",
          right: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10
        }}>
          <Button
            variant="light"
            onClick={() => navigate("/")}
            style={{
              borderRadius: "50px",
              padding: "10px 25px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backdropFilter: "blur(10px)",
              background: "rgba(255, 255, 255, 0.9)",
              border: "none"
            }}
          >
            <ArrowLeft />
            Explore More
          </Button>
          
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              variant="light"
              onClick={() => setIsLiked(!isLiked)}
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
                background: "rgba(255, 255, 255, 0.9)",
                border: "none"
              }}
            >
              {isLiked ? <HeartFill color={COLORS.secondary} /> : <Heart />}
            </Button>
            
            <Button
              variant="light"
              onClick={() => setIsBookmarked(!isBookmarked)}
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
                background: "rgba(255, 255, 255, 0.9)",
                border: "none"
              }}
            >
              {isBookmarked ? <BookmarkFill color={COLORS.primary} /> : <Bookmark />}
            </Button>
            
            <Button
              variant="light"
              onClick={handleShare}
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(10px)",
                background: "rgba(255, 255, 255, 0.9)",
                border: "none"
              }}
            >
              <ShareFill />
            </Button>
          </div>
        </div>

        {/* Hero Content */}
        <Container style={{
          position: "absolute",
          bottom: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          color: "white",
          zIndex: 5
        }}>
          <div style={{ maxWidth: "800px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginBottom: "20px"
            }}>
              <Badge
                pill
                style={{
                  background: COLORS.secondary,
                  padding: "10px 25px",
                  fontSize: "0.9rem",
                  fontWeight: 600
                }}
              >
                {destination.highlight}
              </Badge>
              
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background: "rgba(255, 255, 255, 0.2)",
                padding: "5px 15px",
                borderRadius: "50px",
                backdropFilter: "blur(10px)"
              }}>
                <StarFill color="#FFD700" />
                <span style={{ fontWeight: 600 }}>{destination.rating}</span>
                <span style={{ opacity: 0.8, fontSize: "0.9rem" }}>({destination.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 style={{
              fontSize: "4rem",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "10px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
            }}>
              {destination.title}
            </h1>
            
            <h3 style={{
              fontSize: "1.5rem",
              fontWeight: 400,
              opacity: 0.9,
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <GeoAltFill color="#FFD700" />
              {destination.location}
            </h3>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <div style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          color: "white",
          opacity: 0.8
        }}>
          <div style={{
            animation: "bounce 2s infinite",
            fontSize: "2rem"
          }}>↓</div>
          <div style={{ fontSize: "0.9rem" }}>Scroll to explore</div>
        </div>
      </div>

      {/* Main Content */}
      <Container style={{ marginTop: "-100px", position: "relative", zIndex: 2 }}>
        <Row className="g-4">
          {/* Left Column */}
          <Col lg={8}>
            {/* Quick Stats Cards */}
            <Row className="mb-5 g-3">
              <Col md={3} sm={6}>
                <Card style={{
                  borderRadius: "20px",
                  border: "none",
                  background: "white",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  padding: "20px",
                  textAlign: "center",
                  height: "100%"
                }}>
                  <ClockFill size={30} color={COLORS.primary} className="mb-3" />
                  <h5 style={{ fontWeight: 700, color: COLORS.accent }}>{destination.duration}</h5>
                  <small style={{ color: "#666" }}>Duration</small>
                </Card>
              </Col>
              
              <Col md={3} sm={6}>
                <Card style={{
                  borderRadius: "20px",
                  border: "none",
                  background: "white",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  padding: "20px",
                  textAlign: "center",
                  height: "100%"
                }}>
                  <SunFill size={30} color={COLORS.secondary} className="mb-3" />
                  <h5 style={{ fontWeight: 700, color: COLORS.accent }}>{destination.bestTime}</h5>
                  <small style={{ color: "#666" }}>Best Time</small>
                </Card>
              </Col>
              
              <Col md={3} sm={6}>
                <Card style={{
                  borderRadius: "20px",
                  border: "none",
                  background: "white",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  padding: "20px",
                  textAlign: "center",
                  height: "100%"
                }}>
                  <PersonFill size={30} color={COLORS.primary} className="mb-3" />
                  <h5 style={{ fontWeight: 700, color: COLORS.accent }}>{destination.groupSize}</h5>
                  <small style={{ color: "#666" }}>Group Size</small>
                </Card>
              </Col>
              
              <Col md={3} sm={6}>
                <Card style={{
                  borderRadius: "20px",
                  border: "none",
                  background: "white",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  padding: "20px",
                  textAlign: "center",
                  height: "100%"
                }}>
                  <Water size={30} color={COLORS.accent} className="mb-3" />
                  <h5 style={{ fontWeight: 700, color: COLORS.accent }}>{destination.difficulty}</h5>
                  <small style={{ color: "#666" }}>Difficulty</small>
                </Card>
              </Col>
            </Row>

            {/* Description */}
            <Card style={{
              borderRadius: "25px",
              border: "none",
              background: "white",
              boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
              overflow: "hidden",
              marginBottom: "30px"
            }}>
              <Card.Body style={{ padding: "40px" }}>
                <h3 style={{
                  fontWeight: 800,
                  color: COLORS.accent,
                  marginBottom: "25px",
                  position: "relative"
                }}>
                  <span style={{
                    position: "absolute",
                    left: "-40px",
                    top: "0",
                    width: "5px",
                    height: "100%",
                    background: COLORS.primary,
                    borderRadius: "5px"
                  }} />
                  About {destination.title}
                </h3>
                
                <p style={{
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  color: "#555",
                  marginBottom: "25px"
                }}>
                  {destination.fullDescription}
                </p>

                {/* Tags */}
                <div className="mb-4">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    {destination.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        pill
                        style={{
                          background: `${COLORS.primary}15`,
                          color: COLORS.primaryDark,
                          padding: "10px 20px",
                          fontWeight: 600,
                          fontSize: "0.85rem",
                          border: `1px solid ${COLORS.primary}30`
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Gallery Preview */}
                <div className="mb-4">
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px"
                  }}>
                    <h4 style={{ fontWeight: 700, color: COLORS.accent }}>
                      <Camera className="me-2" />
                      Photo Gallery
                    </h4>
                    <Button
                      variant="link"
                      onClick={() => setShowGallery(true)}
                      style={{
                        color: COLORS.primary,
                        fontWeight: 600,
                        textDecoration: "none"
                      }}
                    >
                      View All {destination.gallery?.length || 0} Photos →
                    </Button>
                  </div>
                  
                  <div className="row g-2">
                    {destination.gallery?.slice(0, 4).map((img, index) => (
                      <div key={index} className="col-3">
                        <div
                          onClick={() => {
                            setActiveImage(index);
                            setShowGallery(true);
                          }}
                          style={{
                            height: "120px",
                            borderRadius: "15px",
                            overflow: "hidden",
                            cursor: "pointer",
                            position: "relative"
                          }}
                        >
                          <img
                            src={img}
                            alt={`${destination.title} ${index + 1}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transition: "transform 0.3s"
                            }}
                          />
                          {index === 3 && destination.gallery?.length > 4 && (
                            <div style={{
                              position: "absolute",
                              inset: 0,
                              background: "rgba(0,0,0,0.5)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                              fontSize: "1.2rem",
                              fontWeight: 600
                            }}>
                              +{destination.gallery.length - 4}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activities */}
                <div className="mb-4">
                  <h4 style={{ fontWeight: 700, color: COLORS.accent, marginBottom: "20px" }}>
                    What You'll Experience
                  </h4>
                  <Row className="g-3">
                    {destination.activities?.map((activity, index) => (
                      <Col md={6} key={index}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                          padding: "15px",
                          background: "#f8f9fa",
                          borderRadius: "15px",
                          transition: "all 0.3s"
                        }}>
                          <div style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            background: `${COLORS.primary}20`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: COLORS.primary,
                            flexShrink: 0
                          }}>
                            <span style={{ fontWeight: "bold" }}>{index + 1}</span>
                          </div>
                          <span style={{ fontWeight: 500 }}>{activity}</span>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>

                {/* Tips */}
                <div>
                  <h4 style={{ fontWeight: 700, color: COLORS.accent, marginBottom: "20px" }}>
                    Traveler's Tips
                  </h4>
                  <div style={{
                    background: `${COLORS.warning}15`,
                    borderRadius: "15px",
                    padding: "25px"
                  }}>
                    <Row>
                      {destination.tips?.map((tip, index) => (
                        <Col md={6} key={index} className="mb-2">
                          <div style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px"
                          }}>
                            <div style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              background: COLORS.warning,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              marginTop: "3px"
                            }}>
                              <span style={{ color: "white", fontSize: "12px", fontWeight: "bold" }}>✓</span>
                            </div>
                            <span>{tip}</span>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Languages */}
            <Card style={{
              borderRadius: "25px",
              border: "none",
              background: "white",
              boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
              marginBottom: "30px"
            }}>
              <Card.Body style={{ padding: "25px" }}>
                <h5 style={{ fontWeight: 700, color: COLORS.accent, marginBottom: "15px" }}>
                  Languages Spoken
                </h5>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {destination.languages?.map((lang, index) => (
                    <Badge
                      key={index}
                      pill
                      style={{
                        background: `${COLORS.accent}10`,
                        color: COLORS.accent,
                        padding: "8px 20px",
                        fontWeight: 500
                      }}
                    >
                      {lang}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column - Booking */}
          <Col lg={4}>
            {/* Sticky Booking Card */}
            <div style={{
              position: "sticky",
              top: "30px",
              marginBottom: "30px"
            }}>
              <Card style={{
                borderRadius: "25px",
                border: "none",
                background: "white",
                boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                overflow: "hidden"
              }}>
                {/* Card Header */}
                <div style={{
                  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
                  padding: "30px",
                  color: "white",
                  textAlign: "center"
                }}>
                  <h4 style={{ fontWeight: 800, marginBottom: "5px" }}>Book Your Experience</h4>
                  <p style={{ opacity: 0.9, fontSize: "0.95rem" }}>
                    Secure your spot in paradise
                  </p>
                </div>

                <Card.Body style={{ padding: "30px" }}>
                  {/* Package Selection */}
                  <div className="mb-4">
                    <h5 style={{ fontWeight: 700, color: COLORS.accent, marginBottom: "15px" }}>
                      Select Package
                    </h5>
                    
                    <div className="mb-3">
                      <div
                        onClick={() => setSelectedPackage("standard")}
                        style={{
                          padding: "20px",
                          borderRadius: "15px",
                          border: `2px solid ${selectedPackage === "standard" ? COLORS.primary : "#eee"}`,
                          background: selectedPackage === "standard" ? `${COLORS.primary}10` : "#f8f9fa",
                          cursor: "pointer",
                          marginBottom: "10px",
                          transition: "all 0.3s"
                        }}
                      >
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "10px"
                        }}>
                          <div>
                            <h6 style={{ fontWeight: 700, margin: 0 }}>Standard Package</h6>
                            <small style={{ color: "#666" }}>Best Value</small>
                          </div>
                          <h4 style={{ fontWeight: 800, color: COLORS.primary, margin: 0 }}>
                            {destination.price}
                          </h4>
                        </div>
                        <ul style={{
                          paddingLeft: "20px",
                          margin: 0,
                          fontSize: "0.9rem",
                          color: "#555"
                        }}>
                          <li>Basic amenities included</li>
                          <li>Group tour</li>
                          <li>Standard meal options</li>
                        </ul>
                      </div>

                      <div
                        onClick={() => setSelectedPackage("premium")}
                        style={{
                          padding: "20px",
                          borderRadius: "15px",
                          border: `2px solid ${selectedPackage === "premium" ? COLORS.secondary : "#eee"}`,
                          background: selectedPackage === "premium" ? `${COLORS.secondary}10` : "#f8f9fa",
                          cursor: "pointer",
                          transition: "all 0.3s"
                        }}
                      >
                        <div style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "10px"
                        }}>
                          <div>
                            <h6 style={{ fontWeight: 700, margin: 0 }}>Premium Package</h6>
                            <small style={{ color: COLORS.secondary }}>Luxury Experience</small>
                          </div>
                          <h4 style={{ fontWeight: 800, color: COLORS.secondary, margin: 0 }}>
                            {destination.premiumPackage}
                          </h4>
                        </div>
                        <ul style={{
                          paddingLeft: "20px",
                          margin: 0,
                          fontSize: "0.9rem",
                          color: "#555"
                        }}>
                          <li>All luxury amenities</li>
                          <li>Private tour available</li>
                          <li>Gourmet meals</li>
                          <li>Personal photographer</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Included Services */}
                  <div className="mb-4">
                    <h5 style={{ fontWeight: 700, color: COLORS.accent, marginBottom: "15px" }}>
                      <ShieldCheck className="me-2" />
                      What's Included
                    </h5>
                    <div style={{
                      maxHeight: "200px",
                      overflowY: "auto",
                      paddingRight: "10px"
                    }}>
                      {destination.included?.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px 0",
                            borderBottom: "1px solid #eee"
                          }}
                        >
                          <div style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            background: `${COLORS.success}20`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                          }}>
                            <span style={{ color: COLORS.success, fontSize: "12px", fontWeight: "bold" }}>✓</span>
                          </div>
                          <span style={{ fontSize: "0.9rem" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Booking Summary */}
                  <div style={{
                    background: "#f8f9fa",
                    borderRadius: "15px",
                    padding: "20px",
                    marginBottom: "20px"
                  }}>
                    <h6 style={{ fontWeight: 700, color: COLORS.accent, marginBottom: "15px" }}>
                      <CalendarDateFill className="me-2" />
                      Quick Summary
                    </h6>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>Package:</span>
                        <span style={{ fontWeight: 600 }}>
                          {selectedPackage === "standard" ? "Standard" : "Premium"}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>Price per person:</span>
                        <span style={{ fontWeight: 600 }}>
                          {selectedPackage === "standard" ? destination.price : destination.premiumPackage}
                        </span>
                      </div>
                      <hr style={{ margin: "10px 0" }} />
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: 700 }}>Estimated Total:</span>
                        <span style={{ 
                          fontWeight: 800, 
                          color: COLORS.primary,
                          fontSize: "1.2rem"
                        }}>
                          ${calculateTotalPrice()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Button */}
                  <Button
                    onClick={handleBookNow}
                    style={{
                      width: "100%",
                      background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.secondary})`,
                      border: "none",
                      borderRadius: "15px",
                      padding: "18px",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      marginBottom: "15px",
                      boxShadow: "0 10px 25px rgba(255, 107, 53, 0.3)"
                    }}
                  >
                    <CalendarCheck className="me-2" />
                    Book Now
                  </Button>

                  {/* Safety Info */}
                  <div style={{
                    textAlign: "center",
                    fontSize: "0.85rem",
                    color: "#666",
                    marginBottom: "15px"
                  }}>
                    <ShieldCheck className="me-1" color={COLORS.success} />
                    <span>Free cancellation up to 24 hours</span>
                  </div>

                  {/* Share Section */}
                  <div style={{
                    padding: "20px",
                    background: "#f8f9fa",
                    borderRadius: "15px",
                    textAlign: "center"
                  }}>
                    <h6 style={{ fontWeight: 700, color: COLORS.accent, marginBottom: "15px" }}>
                      Share This Paradise
                    </h6>
                    <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                      <Button
                        variant="light"
                        style={{ width: "40px", height: "40px", borderRadius: "50%", padding: 0 }}
                      >
                        <Whatsapp color="#25D366" />
                      </Button>
                      <Button
                        variant="light"
                        style={{ width: "40px", height: "40px", borderRadius: "50%", padding: 0 }}
                      >
                        <Facebook color="#1877F2" />
                      </Button>
                      <Button
                        variant="light"
                        style={{ width: "40px", height: "40px", borderRadius: "50%", padding: 0 }}
                      >
                        <Twitter color="#1DA1F2" />
                      </Button>
                      <Button
                        variant="light"
                        style={{ width: "40px", height: "40px", borderRadius: "50%", padding: 0 }}
                      >
                        <Instagram color="#E4405F" />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Quick Contact */}
              <Card style={{
                borderRadius: "25px",
                border: "none",
                background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
                color: "white",
                marginTop: "20px"
              }}>
                <Card.Body style={{ padding: "25px", textAlign: "center" }}>
                  <h6 style={{ fontWeight: 700, marginBottom: "10px" }}>
                    Need Help?
                  </h6>
                  <p style={{ fontSize: "0.9rem", opacity: 0.9, marginBottom: "15px" }}>
                    Our travel experts are here to help 24/7
                  </p>
                  <Button
                    variant="light"
                    style={{
                      borderRadius: "50px",
                      padding: "10px 25px",
                      fontWeight: 600,
                      fontSize: "0.9rem"
                    }}
                  >
                    Contact Support
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Booking Modal */}
      <Modal
        show={showBookingModal}
        onHide={() => !isSubmitting && setShowBookingModal(false)}
        size="lg"
        centered
        backdrop="static"
      >
        <Modal.Header 
          closeButton={!isSubmitting}
          style={{
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
            color: "white",
            borderBottom: "none"
          }}
        >
          <Modal.Title style={{ fontWeight: 700 }}>
            <CalendarCheck className="me-2" />
            Book {destination?.title}
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body style={{ padding: "30px" }}>
          {bookingSuccess ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: `${COLORS.success}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px"
              }}>
                <CheckCircleFill size={40} color={COLORS.success} />
              </div>
              <h4 style={{ color: COLORS.success, marginBottom: "10px" }}>
                Booking Submitted Successfully!
              </h4>
              <p style={{ color: "#666" }}>
                We've sent a confirmation to your email. 
                Our team will contact you shortly.
              </p>
              <Button
                variant="primary"
                onClick={() => setShowBookingModal(false)}
                style={{
                  marginTop: "20px",
                  borderRadius: "50px",
                  padding: "10px 30px"
                }}
              >
                Close
              </Button>
            </div>
          ) : (
            <Form onSubmit={handleBookingSubmit}>
              {bookingError && (
                <Alert variant="danger" className="mb-4" dismissible onClose={() => setBookingError("")}>
                  <InfoCircle className="me-2" />
                  {bookingError}
                </Alert>
              )}

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600, color: COLORS.accent }}>
                      <PersonFill className="me-2" />
                      Full Name *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={bookingForm.fullName}
                      onChange={handleBookingChange}
                      required
                      placeholder="Enter your full name"
                      style={{ borderRadius: "10px", padding: "12px" }}
                    />
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600, color: COLORS.accent }}>
                      <EnvelopeFill className="me-2" />
                      Email *
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={bookingForm.email}
                      onChange={handleBookingChange}
                      required
                      placeholder="your@email.com"
                      style={{ borderRadius: "10px", padding: "12px" }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600, color: COLORS.accent }}>
                      <TelephoneFill className="me-2" />
                      Phone Number *
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={bookingForm.phone}
                      onChange={handleBookingChange}
                      required
                      placeholder="+255 XXX XXX XXX"
                      style={{ borderRadius: "10px", padding: "12px" }}
                    />
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600, color: COLORS.accent }}>
                      <CalendarDateFill className="me-2" />
                      Travel Date *
                    </Form.Label>
                    <DatePicker
                      selected={bookingForm.date}
                      onChange={(date) => setBookingForm({...bookingForm, date})}
                      minDate={new Date()}
                      className="form-control"
                      style={{ borderRadius: "10px", padding: "12px", width: "100%" }}
                      wrapperClassName="w-100"
                      dateFormat="MMMM d, yyyy"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600, color: COLORS.accent }}>
                      <PeopleFill className="me-2" />
                      Number of People *
                    </Form.Label>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <Button
                        variant="outline-secondary"
                        onClick={() => bookingForm.numberOfPeople > 1 && 
                          setBookingForm({...bookingForm, numberOfPeople: bookingForm.numberOfPeople - 1})}
                        disabled={bookingForm.numberOfPeople <= 1}
                        style={{ width: "40px", height: "40px", borderRadius: "10px" }}
                      >
                        -
                      </Button>
                      <div style={{
                        minWidth: "80px",
                        textAlign: "center",
                        padding: "10px",
                        background: "#f8f9fa",
                        borderRadius: "10px"
                      }}>
                        <span style={{ fontSize: "1.2rem", fontWeight: 600 }}>
                          {bookingForm.numberOfPeople}
                        </span>
                        <div style={{ fontSize: "0.8rem", color: "#666" }}>
                          {bookingForm.numberOfPeople === 1 ? "person" : "people"}
                        </div>
                      </div>
                      <Button
                        variant="outline-secondary"
                        onClick={() => setBookingForm({...bookingForm, numberOfPeople: bookingForm.numberOfPeople + 1})}
                        style={{ width: "40px", height: "40px", borderRadius: "10px" }}
                      >
                        +
                      </Button>
                    </div>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600, color: COLORS.accent }}>
                      <CurrencyDollar className="me-2" />
                      Package *
                    </Form.Label>
                    <div style={{
                      padding: "15px",
                      borderRadius: "15px",
                      background: `${selectedPackage === "standard" ? COLORS.primary + "10" : COLORS.secondary + "10"}`,
                      border: `2px solid ${selectedPackage === "standard" ? COLORS.primary : COLORS.secondary}`,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <h6 style={{ margin: 0, fontWeight: 700, color: COLORS.accent }}>
                            {selectedPackage === "standard" ? "Standard" : "Premium"}
                          </h6>
                          <small style={{ color: "#666" }}>
                            {selectedPackage === "standard" ? destination?.price : destination?.premiumPackage} per person
                          </small>
                        </div>
                        <Button
                          variant={selectedPackage === "standard" ? "outline-primary" : "outline-secondary"}
                          size="sm"
                          onClick={() => {
                            const newPackage = selectedPackage === "standard" ? "premium" : "standard";
                            setSelectedPackage(newPackage);
                            setBookingForm({...bookingForm, packageType: newPackage});
                          }}
                        >
                          Switch
                        </Button>
                      </div>
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: 600, color: COLORS.accent }}>
                  <InfoCircle className="me-2" />
                  Special Requests (Optional)
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="specialRequests"
                  value={bookingForm.specialRequests}
                  onChange={handleBookingChange}
                  rows={3}
                  placeholder="Any dietary requirements, accessibility needs, or special arrangements..."
                  style={{ borderRadius: "10px", padding: "12px" }}
                />
              </Form.Group>

              {/* Price Summary */}
              <Card style={{
                background: "#f8f9fa",
                border: `2px solid ${COLORS.primary}20`,
                borderRadius: "15px",
                marginBottom: "20px"
              }}>
                <Card.Body>
                  <h6 style={{ fontWeight: 700, color: COLORS.accent, marginBottom: "15px" }}>
                    <GeoAlt className="me-2" />
                    Booking Summary
                  </h6>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Destination:</span>
                      <span style={{ fontWeight: 600 }}>{destination?.title}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Package:</span>
                      <span style={{ fontWeight: 600 }}>
                        {selectedPackage === "standard" ? "Standard" : "Premium"}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Travel Date:</span>
                      <span style={{ fontWeight: 600 }}>
                        {bookingForm.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Number of People:</span>
                      <span style={{ fontWeight: 600 }}>{bookingForm.numberOfPeople}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Price per person:</span>
                      <span style={{ fontWeight: 600 }}>
                        {selectedPackage === "standard" ? destination?.price : destination?.premiumPackage}
                      </span>
                    </div>
                    <hr style={{ margin: "10px 0" }} />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>Total Estimated:</span>
                      <span style={{ 
                        fontWeight: 800, 
                        color: COLORS.primary,
                        fontSize: "1.3rem"
                      }}>
                        ${calculateTotalPrice()}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Booking Terms */}
              <div style={{
                padding: "15px",
                background: `${COLORS.warning}15`,
                borderRadius: "10px",
                marginBottom: "20px"
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <ShieldCheck color={COLORS.info} size={20} />
                  <div>
                    <small style={{ fontWeight: 600, display: "block" }}>
                      Secure Booking & Free Cancellation
                    </small>
                    <small style={{ color: "#666" }}>
                      Cancel up to 24 hours before your tour for a full refund. Your booking is secure and protected.
                    </small>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  background: `linear-gradient(45deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
                  border: "none",
                  borderRadius: "15px",
                  padding: "15px",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  boxShadow: "0 10px 20px rgba(10, 141, 124, 0.3)"
                }}
              >
                {isSubmitting ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="me-2" />
                    Confirm & Book Now
                  </>
                )}
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* Gallery Modal */}
      <Modal
        show={showGallery}
        onHide={() => setShowGallery(false)}
        size="xl"
        centered
        style={{ background: "rgba(0,0,0,0.9)" }}
      >
        <Modal.Body style={{ padding: 0, background: "black" }}>
          <Carousel
            activeIndex={activeImage}
            onSelect={setActiveImage}
            interval={null}
            prevIcon={<ChevronLeft size={30} color="white" />}
            nextIcon={<ChevronRight size={30} color="white" />}
            indicators={false}
          >
            {destination.gallery?.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  src={img}
                  alt={`${destination.title} ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "70vh",
                    objectFit: "contain"
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
        <Modal.Footer style={{
          background: "black",
          border: "none",
          justifyContent: "space-between"
        }}>
          <Button
            variant="dark"
            onClick={() => setShowGallery(false)}
            style={{ borderRadius: "50px" }}
          >
            Close Gallery
          </Button>
          <div style={{ color: "white" }}>
            {activeImage + 1} / {destination.gallery?.length}
          </div>
        </Modal.Footer>
      </Modal>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-10px);}
          60% {transform: translateY(-5px);}
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, ${COLORS.primary}, ${COLORS.secondary});
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, ${COLORS.primaryDark}, ${COLORS.secondaryLight});
        }

        .datepicker-container {
          width: 100%;
        }

        .datepicker-container .react-datepicker-wrapper {
          width: 100%;
        }

        .datepicker-container .react-datepicker__input-container {
          width: 100%;
        }
      `}</style>
    </div>
  );
}