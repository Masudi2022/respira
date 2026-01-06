import { Routes, Route, Navigate } from "react-router-dom";

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
   PROTECTED ROUTE
===================== */
const ProtectedRoute = ({ children, allowedRoles = ["user", "admin"] }) => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;

  const role = getUserRole();
  if (!allowedRoles.includes(role)) {
    return <Navigate to={role === "admin" ? "/admin/home" : "/my-bookings"} replace />;
  }

  return children;
};

/* =====================
   ADMIN ROUTE
===================== */
const AdminRoute = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;

  if (getUserRole() !== "admin") return <Navigate to="/my-bookings" replace />;

  return children;
};

/* =====================
   PUBLIC ROUTE (LOGIN / REGISTER)
===================== */
const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    const role = getUserRole();
    return <Navigate to={role === "admin" ? "/admin/home" : "/my-bookings"} replace />;
  }
  return children;
};

/* =====================
   APP
===================== */
function App() {
  return (
    <div className="app-layout">
      <main className="main-content">
        <Routes>

          {/* =====================
              PUBLIC ROUTES
          ====================== */}
          <Route path="/" element={<Maskani />} />
          <Route path="/destinations" element={<PopularDestinations />} />
          <Route path="/destination/:slug" element={<DestinationDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/adventure" element={<Adventure />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* =====================
              USER ROUTES
          ====================== */}
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          {/* =====================
              ADMIN ROUTES WITH ADMIN LAYOUT
          ====================== */}
          <Route
            path="/admin/home"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminHome />
                </AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/destinations"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminDestinations />
                </AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminBookings />
                </AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminUsers />
                </AdminLayout>
              </AdminRoute>
            }
          />

          {/* =====================
              ADMIN FALLBACK
          ====================== */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <Navigate to="/admin/home" replace />
              </AdminRoute>
            }
          />

          {/* =====================
              GLOBAL FALLBACK
          ====================== */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
