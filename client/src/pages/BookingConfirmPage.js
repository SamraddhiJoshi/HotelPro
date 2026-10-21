import React, { useLocation, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Button } from '../components/UIComponents';
import './BookingConfirmPage.css';

const BookingConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking, room } = location.state || {};
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  if (!booking || !room) {
    return <p>No booking data. <a href="/rooms">Back to rooms</a></p>;
  }

  const handleProceedToPayment = async () => {
    setProcessing(true);
    try {
      // In a real app we would create a payment intent here.
      // For mock, just navigate to payment page.
      navigate(`/payment/${booking._id}`);
    } catch (err) {
      setError('Failed to initiate payment');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="booking-confirm container">
      <h2>Confirm Your Booking</h2>
      <div className="booking-summary">
        <h3>{room.name}</h3>
        <p>{room.description}</p>
        <p><strong>Check‑in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
        <p><strong>Check‑out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
        <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
      </div>
      {error && <p className="error">{error}</p>}
      <Button onClick={handleProceedToPayment} disabled={processing} className="primary">
        {processing ? 'Processing…' : 'Proceed to Payment'}
      </Button>
    </div>
  );
};

export default BookingConfirmPage;
