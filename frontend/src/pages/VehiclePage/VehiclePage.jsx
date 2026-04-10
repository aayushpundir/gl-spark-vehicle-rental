import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Search, MapPin, Car } from "lucide-react";
import "./VehiclePage.css";

export default function VehiclePage() {
  const [city, setCity] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      toast.error("Please enter a city name");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/vehicles/all/${city}`);
      setVehicles(response.data);
      setHasSearched(true);
      
      if (response.data.length === 0) {
        toast.info("No vehicles found in this city.");
      }
    } catch (error) {
      toast.error("Error fetching vehicles. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`vehicle-page ${hasSearched ? "results-view" : "hero-view"}`}>
      
      {/* 🔍 Search Section */}
      <div className="search-container">
        {!hasSearched && <h1>Find Your Perfect Ride</h1>}
        <form onSubmit={handleSearch} className="search-bar">
          <MapPin className="icon" size={20} />
          <input
            type="text"
            placeholder="Enter your city (e.g. Delhi, Mumbai...)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : <Search size={20} />}
          </button>
        </form>
      </div>

      {/* 🚗 Vehicles Grid */}
      {hasSearched && (
        <div className="vehicles-results">
          <h2>Available Vehicles in {city}</h2>
          <div className="vehicle-grid">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="vehicle-card">
                <div className="vehicle-image">
                  {/* Fallback icon if no image URL is provided */}
                  {vehicle.imageUrl ? (
                    <img src={vehicle.imageUrl} alt={vehicle.model} />
                  ) : (
                    <Car size={80} color="#ccc" />
                  )}
                </div>
                <div className="vehicle-info">
                  <h3>{vehicle.brand} {vehicle.model}</h3>
                  <p className="type">{vehicle.type} • {vehicle.fuelType}</p>
                  <div className="price-tag">
                    <span className="amount">₹{vehicle.pricePerDay}</span>
                    <span className="per-day">/day</span>
                  </div>
                  <button className="book-btn">Book Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}