import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Search, MapPin, Car, Calendar } from "lucide-react";
import "./VehiclePage.css";

export default function VehiclePage() {
  const [city, setCity] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Default dates: Today and Tomorrow
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0],
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      toast.error("Please enter a city name");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/vehicles/all/${city}`,
      );
      setVehicles(response.data);
      setHasSearched(true);
      if (response.data.length === 0)
        toast.info("No vehicles found in this city.");
    } catch (error) {
      toast.error("Error fetching vehicles.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (vehicleId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warn("Please login to book a vehicle");
      // Optional: navigate("/login") if you import useNavigate
      return;
    }

    try {
      const bookingRequest = {
        vehicleId: vehicleId,
        startDate: startDate,
        endDate: endDate,
      };

      const response = await axios.post(
        "http://localhost:8080/api/bookings/create",
        bookingRequest,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      toast.success(`Booking Confirmed! ID: ${response.data.bookingId}`);

      // Optional: Refresh vehicle list to show updated status
      // handleSearch(new Event('submit'));
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Booking failed. Try again.";
      toast.error(errorMsg);
      console.error("Booking Error:", error);
    }
  };

  return (
    <div
      className={`vehicle-page ${hasSearched ? "results-view" : "hero-view"}`}
    >
      <div className="search-container">
        {!hasSearched && <h1>Find Your Perfect Ride</h1>}
        <form onSubmit={handleSearch} className="search-bar">
          <MapPin className="icon" size={20} />
          <input
            type="text"
            placeholder="Enter your city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          {/* Added Date Inputs to the search bar area for context */}
          <div className="date-picker-mini">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : <Search size={20} />}
          </button>
        </form>
      </div>

      {hasSearched && (
        <div className="vehicles-results">
          <h2>Available Vehicles in {city}</h2>
          <div className="vehicle-grid">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="vehicle-card">
                <div className="vehicle-image">
                  {vehicle.imageUrl ? (
                    <img src={vehicle.imageUrl} alt={vehicle.model} />
                  ) : (
                    <Car size={80} color="#ccc" />
                  )}
                </div>
                <div className="vehicle-info">
                  <h3>
                    {vehicle.brand} {vehicle.model}
                  </h3>
                  <p className="type">
                    {vehicle.type} • {vehicle.fuelType}
                  </p>
                  <div className="price-tag">
                    <span className="amount">₹{vehicle.pricePerDay}</span>
                    <span className="per-day">/day</span>
                  </div>

                  {/* Status Check: Only show Book Now if Available */}
                  {vehicle.status === "AVAILABLE" ? (
                    <button
                      className="book-btn"
                      onClick={() => handleBooking(vehicle.id)}
                    >
                      Book Now
                    </button>
                  ) : (
                    <button className="book-btn disabled" disabled>
                      Currently Booked
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
