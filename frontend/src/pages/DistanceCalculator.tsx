import { useState } from 'react';
import './Calculator.css';

interface DistanceResult {
  distance_km: number;
}

export default function DistanceCalculator() {
  const [coordinates, setCoordinates] = useState({
    lat1: '',
    lon1: '',
    lat2: '',
    lon2: '',
  });
  const [result, setResult] = useState<DistanceResult | null>(null);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoordinates(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/distance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat1: parseFloat(coordinates.lat1),
          lon1: parseFloat(coordinates.lon1),
          lat2: parseFloat(coordinates.lat2),
          lon2: parseFloat(coordinates.lon2),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Calculation failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to calculate distance. Please check your coordinates.');
    }
  };

  return (
    <div className="calculator">
      <h1>Distance Calculator</h1>
      <form onSubmit={handleSubmit} className="calculator-form">
        <div className="form-section">
          <h3>First Point</h3>
          <div className="form-group">
            <label htmlFor="lat1">Latitude (-90 to 90):</label>
            <input
              type="number"
              id="lat1"
              name="lat1"
              value={coordinates.lat1}
              onChange={handleChange}
              required
              step="any"
              min="-90"
              max="90"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lon1">Longitude (-180 to 180):</label>
            <input
              type="number"
              id="lon1"
              name="lon1"
              value={coordinates.lon1}
              onChange={handleChange}
              required
              step="any"
              min="-180"
              max="180"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Second Point</h3>
          <div className="form-group">
            <label htmlFor="lat2">Latitude (-90 to 90):</label>
            <input
              type="number"
              id="lat2"
              name="lat2"
              value={coordinates.lat2}
              onChange={handleChange}
              required
              step="any"
              min="-90"
              max="90"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lon2">Longitude (-180 to 180):</label>
            <input
              type="number"
              id="lon2"
              name="lon2"
              value={coordinates.lon2}
              onChange={handleChange}
              required
              step="any"
              min="-180"
              max="180"
            />
          </div>
        </div>

        <button type="submit">Calculate Distance</button>
      </form>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className="results">
          <h2>Result</h2>
          <div className="result-item">
            <span>Distance:</span>
            <span>{result.distance_km.toFixed(2)} km</span>
          </div>
        </div>
      )}
    </div>
  );
} 