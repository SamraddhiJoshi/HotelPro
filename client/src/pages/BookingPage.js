import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Input, Button } from '../components/UIComponents';
import './BookingPage.css';

const BookingPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await api.get(`/rooms/${roomId}`);
        setRoom(data.room);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/bookings', { roomId, checkInDate, checkOutDate });
      navigate(`/booking/${roomId}/confirm`, { state: { booking: data.booking, room } });
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    }
  };

  if (!room) return <p>Loading room...</p>;

  return (
    <div className="booking-page container">
      <h2>Book {room.name}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleBooking} className="booking-form">
        <Input label="Check-in Date" type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} required />
        <Input label="Check-out Date" type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} required />
        <Button type="submit" className="primary">Proceed to Confirmation</Button>
      </form>
    </div>
  );
};

export default BookingPage;
