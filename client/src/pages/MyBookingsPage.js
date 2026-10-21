import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './MyBookingsPage.css';
import { Card } from '../components/UIComponents';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/bookings/my');
        setBookings(data.bookings || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <p>Loading your bookings...</p>;

  return (
    <div className="my-bookings container">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((b) => (
            <Card key={b._id} className="booking-card">
              <h3>{b.room?.name || 'Room'}</h3>
              <p><strong>Check‑in:</strong> {new Date(b.checkInDate).toLocaleDateString()}</p>
              <p><strong>Check‑out:</strong> {new Date(b.checkOutDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {b.status}</p>
              <p><strong>Total:</strong> ${b.totalPrice}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
