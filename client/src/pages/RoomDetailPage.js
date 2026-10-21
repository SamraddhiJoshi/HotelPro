import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import './RoomDetailPage.css';

const RoomDetailPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await api.get(`/rooms/${id}`);
        setRoom(data.room);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  if (loading) return <p>Loading room...</p>;
  if (!room) return <p>Room not found.</p>;

  return (
    <div className="room-detail container">
      <h2>{room.name}</h2>
      <img src={room.imageUrl || 'https://via.placeholder.com/600x400'} alt={room.name} className="room-image" />
      <p>{room.description}</p>
      <p><strong>Price per night:</strong> ${room.pricePerNight}</p>
      {/* Additional details could be added here */}
    </div>
  );
};

export default RoomDetailPage;
