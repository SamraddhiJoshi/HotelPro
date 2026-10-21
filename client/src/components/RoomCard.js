import React from 'react';
import { Link } from 'react-router-dom';
import './RoomCard.css'; // optional styling

const RoomCard = ({ room }) => {
  return (
    <div className="room-card">
      <img src={room.imageUrl || 'https://via.placeholder.com/300x200'} alt={room.name} className="room-image" />
      <div className="room-info">
        <h3>{room.name}</h3>
        <p>{room.description?.slice(0, 100)}...</p>
        <p><strong>Price:</strong> ${room.pricePerNight} / night</p>
        <Link to={`/rooms/${room._id}`} className="btn btn-primary">View Details</Link>
      </div>
    </div>
  );
};

export default RoomCard;
