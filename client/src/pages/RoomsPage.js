import React, { useEffect, useState } from 'react';
import api from '../services/api';
import RoomCard from '../components/RoomCard';
import './RoomsPage.css';

const RoomsPage = () => {
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
    <div className="rooms-page container">
      <h2>All Rooms</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="room-grid">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
