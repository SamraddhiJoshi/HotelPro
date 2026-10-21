import React, { useEffect, useState } from 'react';
import api from '../services/api';
import RoomCard from '../components/RoomCard';
import { Link } from 'react-router-dom';
import './HomePage.css'; // optional styling

const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await api.get('/rooms');
        setRooms(data.rooms || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="home-page container">
      <h1>Welcome to HotelPro</h1>
      <p>Explore our premium rooms and book your stay.</p>
      {loading ? (
        <p>Loading rooms...</p>
      ) : (
        <div className="room-grid">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}
      <Link to="/rooms" className="btn btn-primary">View All Rooms</Link>
    </div>
  );
};

export default HomePage;
