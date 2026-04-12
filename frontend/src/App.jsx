import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Register from './pages/Register/Register';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login/Login';
import "react-toastify/dist/ReactToastify.css";
import AboutPage from './pages/AboutPage/AboutPage';
import HomePage from './pages/HomePage/HomePage';
import ContactPage from './pages/ContactPage/ContactPage';
import ProtectedRoute from './ProtectedRoutes';
import VehiclePage from './pages/VehiclePage/VehiclePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import MyBookings from './pages/MyBookings/MyBooking';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

function App() {
  return (
    <Router>
      <Navbar />
 
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/" element={
                <HomePage />
            } 
          />
          <Route
            path='/vehicles'
            element={
              <ProtectedRoute>
                <VehiclePage />
              </ProtectedRoute>
            } 
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route
           path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin-dashboard'
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route
           path="/about"
            element={
              <ProtectedRoute>
                <AboutPage />
              </ProtectedRoute>
            }
          />
          <Route
           path="/contact"
            element={
              <ProtectedRoute>
                <ContactPage />
              </ProtectedRoute>
            }
          />
        </Routes>
         <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </Router>
  );
}

export default App;
