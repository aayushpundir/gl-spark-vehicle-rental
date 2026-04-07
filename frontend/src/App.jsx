import './App.css';
import { BrowerRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route />   
          <Route />
          <Route />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
