import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Card, Button } from '../../components/UIComponents';
import './AdminBookings.css';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/bookings'); // admin route
      setBookings(data.bookings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}/status`, { status });
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-bookings container">
      <h2>Manage Bookings</h2>
      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <div className="booking-list">
          {bookings.map((b) => (
            <Card key={b._id} className="booking-card">
              <h3>{b.room?.name || 'Room'}</h3>
              <p><strong>User:</strong> {b.user?.name || b.user?.email}</p>
              <p><strong>Check‑in:</strong> {new Date(b.checkInDate).toLocaleDateString()}</p>
              <p><strong>Check‑out:</strong> {new Date(b.checkOutDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {b.status}</p>
              <Button onClick={() => updateStatus(b._id, 'confirmed')} className="primary">Confirm</Button>
              <Button onClick={() => updateStatus(b._id, 'cancelled')} className="danger">Cancel</Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
