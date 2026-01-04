import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/RespiraHeader";
import { RespiraFooter } from "./components/RespiraFooter";
import BackToTop from "./components/BackToTop";
import ChatWithUs from "./components/ChatWithUs";

// =====================
// Public Pages
// =====================
import Maskani from "./Virtue/Pages/Home/maskani";
import DestinationDetail from "./Virtue/Pages/destination/destinationDetails";
import PopularDestinations from "./Virtue/Pages/destination/popularDestination";
import About from "./Virtue/Pages/about/about";
import Gallery from "./Virtue/Pages/Gallery/gallery";
import Contact from "./Virtue/Pages/contact/contact";
import Adventure from "./Virtue/Pages/adventure/adventure";

// =====================
// Auth / Protected Pages
// =====================
import Login from "./auth/Login/Login";
import MyBookings from "./Virtue/Pages/booking/MyBookings";

// =====================
// AUTH HELPERS
// =====================
const isAuthenticated = () => {
  return Boolean(localStorage.getItem("access_token"));
};

// =====================
// PROTECTED ROUTE
// =====================
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// =====================
// PUBLIC ROUTE (LOGIN)
// =====================
const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/my-bookings" replace />;
  }
  return children;
};

// =====================
// APP
// =====================
function App() {
  return (
    <div className="app-layout">
      <Header />

      <main className="main-content">
        <Routes>
          {/* =====================
              PUBLIC ROUTES
          ====================== */}
          <Route path="/" element={<Maskani />} />
          <Route path="/destinations" element={<PopularDestinations />} />
          <Route
            path="/destination/:slug"
            element={<DestinationDetail />}
          />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} /> // 👈 add this route
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/adventure" element={<Adventure />} />

          {/* =====================
              AUTH ROUTES
          ====================== */}
          

          {/* =====================
              PROTECTED ROUTES
          ====================== */}
          <Route
            path="/my-bookings"
            element={
              // <ProtectedRoute>
                <MyBookings />
              // </ProtectedRoute>
            }
          />

          {/* =====================
              FALLBACK
          ====================== */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <RespiraFooter />

      {/* GLOBAL FLOATING UI */}
      <BackToTop />
      <ChatWithUs />
    </div>
  );
}

export default App;
