import './App.css';
import { BrowserRouter  as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route />
          <Route />
        </Routes>
      </Router>
         <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </div>
  );
}

export default App;
