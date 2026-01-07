import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

/* =====================
   SPLASH SCREEN
===================== */
import SplashScreen from "./components/SplashScreen";

/* =====================
   PUBLIC HEADER
===================== */
import RespiraHeader from "./components/RespiraHeader";
import RespiraFooter from "./components/RespiraFooter";

/* =====================
   ADMIN LAYOUT
===================== */
import AdminLayout from "./admin/adminComponents/AdminLayout";

/* =====================
   PUBLIC PAGES
===================== */
import Maskani from "./Virtue/Pages/Home/maskani";
import DestinationDetail from "./Virtue/Pages/destination/destinationDetails";
import PopularDestinations from "./Virtue/Pages/destination/popularDestination";
import About from "./Virtue/Pages/about/about";
import Gallery from "./Virtue/Pages/Gallery/gallery";
import Contact from "./Virtue/Pages/contact/contact";
import Adventure from "./Virtue/Pages/adventure/adventure";

/* =====================
   AUTH / USER PAGES
===================== */
import Login from "./auth/Login/Login";
import Register from "./auth/register";
import MyBookings from "./Virtue/Pages/booking/MyBookings";

/* =====================
   ADMIN PAGES
===================== */
import AdminHome from "./admin/ahome/ahome";
import AdminDestinations from "./admin/adestination/managedestination";
import AdminBookings from "./admin/AdminBooking/manageBooking";
import AdminUsers from "./admin/user/adminUsers";

/* =====================
   AUTH HELPERS
===================== */
const isAuthenticated = () => Boolean(localStorage.getItem("access_token"));
const getUserRole = () => localStorage.getItem("role") || "user";

/* =====================
   ROUTE GUARDS
===================== */
const ProtectedRoute = ({ children, allowedRoles = ["user", "admin"] }) => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;

  const role = getUserRole();
  if (!allowedRoles.includes(role)) {
    return <Navigate to={role === "admin" ? "/admin/home" : "/my-bookings"} replace />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (getUserRole() !== "admin") return <Navigate to="/my-bookings" replace />;
  return children;
};

const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    const role = getUserRole();
    return <Navigate to={role === "admin" ? "/admin/home" : "/my-bookings"} replace />;
  }
  return children;
};

/* =====================
   PUBLIC LAYOUT
===================== */
const PublicLayout = ({ children }) => (
  <>
    <RespiraHeader />
    <main>{children}</main>
    <RespiraFooter />
  </>
);

/* =====================
   APP
===================== */
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<PublicLayout><Maskani /></PublicLayout>} />
      <Route path="/destinations" element={<PublicLayout><PopularDestinations /></PublicLayout>} />
      <Route path="/destination/:slug" element={<PublicLayout><DestinationDetail /></PublicLayout>} />
      <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/adventure" element={<PublicLayout><Adventure /></PublicLayout>} />

      {/* AUTH ROUTES */}
      <Route path="/login" element={
        <PublicRoute>
          <PublicLayout><Login /></PublicLayout>
        </PublicRoute>
      } />

      <Route path="/register" element={
        <PublicRoute>
          <PublicLayout><Register /></PublicLayout>
        </PublicRoute>
      } />

      {/* USER ROUTES */}
      <Route path="/my-bookings" element={
        <ProtectedRoute>
          <MyBookings />
        </ProtectedRoute>
      } />

      {/* ADMIN ROUTES */}
      <Route path="/admin/home" element={
        <AdminRoute>
          <AdminLayout><AdminHome /></AdminLayout>
        </AdminRoute>
      } />

      <Route path="/admin/destinations" element={
        <AdminRoute>
          <AdminLayout><AdminDestinations /></AdminLayout>
        </AdminRoute>
      } />

      <Route path="/admin/bookings" element={
        <AdminRoute>
          <AdminLayout><AdminBookings /></AdminLayout>
        </AdminRoute>
      } />

      <Route path="/admin/users" element={
        <AdminRoute>
          <AdminLayout><AdminUsers /></AdminLayout>
        </AdminRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
