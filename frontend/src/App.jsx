import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Register from './pages/Register/Register';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login/Login';
import "react-toastify/dist/ReactToastify.css";
import HomePage from './pages/HomePage/HomePage';
function App() {
  return (
    <Router>
      <Navbar />
      {/* <Router> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route />
          <Route />
        </Routes>
      {/* </Router> */}
         <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </Router>
  );
}

export default App;
