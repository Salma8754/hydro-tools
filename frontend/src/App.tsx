import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DikeCalculator from './pages/DikeCalculator';
import DistanceCalculator from './pages/DistanceCalculator';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/dike" className="nav-link">Dike Calculator</Link>
          <Link to="/distance" className="nav-link">Distance Calculator</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dike" element={<DikeCalculator />} />
          <Route path="/distance" element={<DistanceCalculator />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home">
      <h1>Welcome to HydroTools</h1>
      <div className="calculator-links">
        <Link to="/dike" className="calculator-card">
          <h2>Dike Calculator</h2>
          <p>Calculate dike dimensions based on flow rate and slope</p>
        </Link>
        <Link to="/distance" className="calculator-card">
          <h2>Distance Calculator</h2>
          <p>Calculate the distance between two points on Earth</p>
        </Link>
      </div>
    </div>
  );
}

export default App; 