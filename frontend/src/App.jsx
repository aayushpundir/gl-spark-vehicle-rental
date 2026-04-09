import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Register from './pages/Register/Register';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login/Login';
import "react-toastify/dist/ReactToastify.css";
import AboutPage from './pages/AboutPage/AboutPage';

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route />
          <Route />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
         <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </Router>
  );
}

export default App;
