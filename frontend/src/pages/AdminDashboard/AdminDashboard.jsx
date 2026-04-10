import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Trash2,
  PlusCircle,
  Car,
  Calendar,
  MapPin,
  Hash,
  Loader2,
  UserPlus,
  Mail,
  ShieldCheck,
  Search,
  RotateCcw,
} from "lucide-react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [view, setView] = useState("bookings");
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [promoteEmail, setPromoteEmail] = useState("");

  // Search State
  const [bookingSearchId, setBookingSearchId] = useState("");

  const token = localStorage.getItem("token");

  const [newVehicle, setNewVehicle] = useState({
    brand: "",
    model: "",
    city: "",
    plateNumber: "",
    pricePerDay: "",
    status: "AVAILABLE",
  });

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (view === "vehicles") {
        const res = await axios.get(
          "http://localhost:8080/api/vehicles/all",
          config,
        );
        setVehicles(res.data);
      } else if (view === "bookings") {
        const res = await axios.get(
          "http://localhost:8080/api/bookings/all",
          config,
        );
        setBookings(res.data);
      }
    } catch (error) {
      toast.error("Sync failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (view === "vehicles" || view === "bookings") fetchData();
  }, [view]);

  // Logic: Search Booking by ID
  const handleSearchBooking = async (e) => {
    e.preventDefault();
    if (!bookingSearchId.trim()) {
      fetchData(); // If search is empty, reload all
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/bookings/${bookingSearchId}`,
        config,
      );
      // API returns a single object, we put it in an array to map correctly
      setBookings([res.data]);
    } catch (error) {
      toast.error("Booking ID not found.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Logic: Mark Vehicle as Returned
  const handleReturn = async (id) => {
    if (
      !window.confirm(
        "Confirm vehicle return? This will mark booking as COMPLETED.",
      )
    )
      return;
    try {
      await axios.put(
        `http://localhost:8080/api/bookings/${id}/return`,
        {},
        config,
      );
      toast.success("Vehicle returned and booking completed!");
      fetchData(); // Refresh the list to show "Completed"
    } catch (error) {
      toast.error("Failed to process return.");
    }
  };

  // ... handlePromoteUser, handleAddVehicle, handleDelete logic remains the same ...
  const handlePromoteUser = async (e) => {
    e.preventDefault();
    try {
      const encodedEmail = encodeURIComponent(promoteEmail);
      await axios.put(
        `http://localhost:8080/api/users/${encodedEmail}/promote`,
        {},
        config,
      );
      toast.success(`${promoteEmail} promoted to ADMIN!`);
      setPromoteEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Promotion failed.");
    }
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/api/vehicles/add",
        newVehicle,
        config,
      );
      toast.success("Vehicle Added!");
      setView("vehicles");
      setNewVehicle({
        brand: "",
        model: "",
        city: "",
        plateNumber: "",
        pricePerDay: "",
        status: "AVAILABLE",
      });
    } catch (error) {
      toast.error("Failed to add vehicle.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/vehicles/${id}`, config);
      toast.success("Deleted!");
      fetchData();
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">RentX Admin</div>
        <nav>
          <button
            className={view === "bookings" ? "active" : ""}
            onClick={() => setView("bookings")}
          >
            <Calendar size={18} /> Bookings
          </button>
          <button
            className={view === "vehicles" ? "active" : ""}
            onClick={() => setView("vehicles")}
          >
            <Car size={18} /> Fleet Management
          </button>
          <button
            className={view === "add-vehicle" ? "active" : ""}
            onClick={() => setView("add-vehicle")}
          >
            <PlusCircle size={18} /> Add New Car
          </button>
          <button
            className={view === "manage-users" ? "active" : ""}
            onClick={() => setView("manage-users")}
          >
            <UserPlus size={18} /> Manage Admins
          </button>
        </nav>
      </aside>

      <main className="admin-main">
        <header className="main-header">
          <h1>
            {view === "bookings" && "All Reservations"}
            {view === "vehicles" && "Fleet Inventory"}
            {view === "add-vehicle" && "Register Vehicle"}
            {view === "manage-users" && "Admin Privileges"}
          </h1>
        </header>

        <div className="content-area">
          {loading ? (
            <div className="loader-container">
              <Loader2 className="spinner" />
            </div>
          ) : (
            <>
              {/* VEHICLES VIEW */}
              {view === "vehicles" && (
                <div className="admin-vehicle-grid">
                  {vehicles.map((v) => (
                    <div key={v.id} className="admin-v-card">
                      <div className="v-card-header">
                        <Car size={32} color="#0ea5e9" />
                        <span className={`v-status ${v.status.toLowerCase()}`}>
                          {v.status}
                        </span>
                      </div>
                      <div className="v-card-body">
                        <h3>
                          {v.brand} {v.model}
                        </h3>
                        <p className="v-info-row city-highlight">
                          <MapPin size={20} />{" "}
                          <span>
                            <strong>City:</strong> {v.city || "N/A"}
                          </span>
                        </p>
                        <p className="v-info-row">
                          <Hash size={18} />{" "}
                          <span>
                            <strong>Plate:</strong> {v.plateNumber}
                          </span>
                        </p>
                        <div className="v-price-section">
                          ₹{v.pricePerDay} <span>/day</span>
                        </div>
                      </div>
                      <button
                        className="v-delete-btn"
                        onClick={() => handleDelete(v.id)}
                      >
                        <Trash2 size={16} /> Delete Vehicle
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* BOOKINGS VIEW */}
              {view === "bookings" && (
                <div className="bookings-container">
                  {/* Search Bar */}
                  <form
                    className="admin-search-bar"
                    onSubmit={handleSearchBooking}
                  >
                    <div className="search-input-wrapper">
                      <Search size={18} className="search-icon" />
                      <input
                        type="number"
                        placeholder="Search Booking ID..."
                        value={bookingSearchId}
                        onChange={(e) => setBookingSearchId(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="search-btn">
                      Search
                    </button>
                    <button
                      type="button"
                      className="reset-btn"
                      onClick={() => {
                        setBookingSearchId("");
                        fetchData();
                      }}
                    >
                      Reset
                    </button>
                  </form>

                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Car</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.length > 0 ? (
                        bookings.map((b) => (
                          <tr key={b.bookingId}>
                            <td>#{b.bookingId}</td>
                            <td>{b.userEmail}</td>
                            <td>{b.vehicleName}</td>
                            <td>₹{b.totalAmount}</td>
                            <td>
                              <span
                                className={`status-tag ${b.status?.toLowerCase()}`}
                              >
                                {b.status}
                              </span>
                            </td>
                            <td>
                              {b.status === "CONFIRMED" && (
                                <button
                                  className="return-btn"
                                  onClick={() => handleReturn(b.bookingId)}
                                >
                                  <RotateCcw size={14} /> Returned
                                </button>
                              )}
                              {b.status === "COMPLETED" && (
                                <span className="completed-text">
                                  Checked Out
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="6"
                            style={{ textAlign: "center", padding: "20px" }}
                          >
                            No bookings found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ADD VEHICLE VIEW */}
              {view === "add-vehicle" && (
                <div className="form-wrapper">
                  <form className="admin-form" onSubmit={handleAddVehicle}>
                    <div className="form-row">
                      <div className="input-group">
                        <label>Brand</label>
                        <input
                          type="text"
                          placeholder="e.g. BMW"
                          required
                          value={newVehicle.brand}
                          onChange={(e) =>
                            setNewVehicle({
                              ...newVehicle,
                              brand: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input-group">
                        <label>Model</label>
                        <input
                          type="text"
                          placeholder="e.g. M4"
                          required
                          value={newVehicle.model}
                          onChange={(e) =>
                            setNewVehicle({
                              ...newVehicle,
                              model: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="input-group">
                        <label>Plate Number</label>
                        <input
                          type="text"
                          placeholder="Unique ID"
                          required
                          value={newVehicle.plateNumber}
                          onChange={(e) =>
                            setNewVehicle({
                              ...newVehicle,
                              plateNumber: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input-group">
                        <label>City</label>
                        <input
                          type="text"
                          placeholder="Location"
                          required
                          value={newVehicle.city}
                          onChange={(e) =>
                            setNewVehicle({
                              ...newVehicle,
                              city: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="input-group">
                        <label>Price/Day</label>
                        <input
                          type="number"
                          placeholder="₹"
                          required
                          value={newVehicle.pricePerDay}
                          onChange={(e) =>
                            setNewVehicle({
                              ...newVehicle,
                              pricePerDay: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="input-group">
                        <label>Status</label>
                        <select
                          value={newVehicle.status}
                          onChange={(e) =>
                            setNewVehicle({
                              ...newVehicle,
                              status: e.target.value,
                            })
                          }
                        >
                          <option value="AVAILABLE">Available</option>
                          <option value="MAINTENANCE">Maintenance</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="admin-submit-btn">
                      Save Vehicle
                    </button>
                  </form>
                </div>
              )}

              {/* MANAGE ADMINS VIEW */}
              {view === "manage-users" && (
                <div className="form-wrapper promo-box">
                  <div className="promo-header">
                    <ShieldCheck size={48} color="#0ea5e9" />
                    <h3>Promote to Admin</h3>
                    <p>Enter a registered email to grant Admin access.</p>
                  </div>
                  <form className="admin-form" onSubmit={handlePromoteUser}>
                    <div className="input-group">
                      <label>User Email</label>
                      <div className="input-with-icon">
                        <Mail className="field-icon" size={20} />
                        <input
                          type="email"
                          placeholder="user@example.com"
                          required
                          value={promoteEmail}
                          onChange={(e) => setPromoteEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="admin-submit-btn promo-btn"
                    >
                      Confirm Promotion
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
