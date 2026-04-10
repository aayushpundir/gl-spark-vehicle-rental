import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Car, CreditCard, XCircle, Loader2, CheckCircle2 } from "lucide-react";
import "./MyBookings.css";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchMyBookings();
    }, []);

    const fetchMyBookings = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/bookings/my-bookings", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(response.data);
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Failed to fetch your bookings");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;

        try {
            // Updated to match your cancel endpoint logic
            await axios.put(`http://localhost:8080/api/bookings/cancel/${bookingId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Booking cancelled successfully");
            fetchMyBookings(); // Refresh the list
        } catch (error) {
            toast.error(error.response?.data?.message || "Could not cancel booking");
        }
    };

    if (loading) {
        return (
            <div className="booking-status-msg">
                <Loader2 className="spinner" />
                <p>Fetching your reservations...</p>
            </div>
        );
    }

    return (
        <div className="my-bookings-page">
            <div className="bookings-header">
                <h2>My Bookings</h2>
                <div className="header-line"></div>
            </div>

            <div className="bookings-list">
                {bookings.length === 0 ? (
                    <div className="no-bookings-card">
                        <Car size={48} />
                        <h3>No bookings found</h3>
                        <p>Your upcoming trips will appear here.</p>
                        <button onClick={() => window.location.href='/vehicles'}>Explore Vehicles</button>
                    </div>
                ) : (
                    bookings.map((booking) => (
                        <div key={booking.bookingId} className="booking-row">
                            {/* Left Side: Vehicle Info */}
                            <div className="booking-main-info">
                                <div className="vehicle-icon-box">
                                    <Car size={24} />
                                </div>
                                <div className="vehicle-text">
                                    <h4>{booking.vehicleName}</h4>
                                    <p className="booking-id-text">Ref: #{booking.bookingId}</p>
                                </div>
                            </div>

                            {/* Middle: Dates */}
                            <div className="booking-dates">
                                <div className="date-block">
                                    <label>Pick Up</label>
                                    <span>{booking.startDate}</span>
                                </div>
                                <div className="date-arrow">→</div>
                                <div className="date-block">
                                    <label>Drop Off</label>
                                    <span>{booking.endDate}</span>
                                </div>
                            </div>

                            {/* Middle: Total */}
                            <div className="booking-payment">
                                <label><CreditCard size={12} /> Total Paid</label>
                                <span className="price-tag">₹{booking.totalAmount}</span>
                            </div>

                            {/* Right Side: Status & Action */}
                            <div className="booking-actions">
                                <div className={`status-pill ${booking.status.toLowerCase()}`}>
                                    {booking.status === "CONFIRMED" && <CheckCircle2 size={14} />}
                                    {booking.status}
                                </div>
                                
                                {booking.status === "CONFIRMED" && (
                                    <button 
                                        className="cancel-btn-inline"
                                        onClick={() => handleCancel(booking.bookingId)}
                                    >
                                        <XCircle size={16} />
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyBookings;