import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Card, Button } from '../../components/UIComponents';
import './AdminRooms.css';

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchRooms();
  }, []);

  const deleteRoom = async (id) => {
    if (!window.confirm('Delete this room?')) return;
    try {
      await api.delete(`/rooms/${id}`);
      setRooms(rooms.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-rooms container">
      <h2>Manage Rooms</h2>
      {loading ? (
        <p>Loading rooms...</p>
      ) : (
        <div className="room-list">
          {rooms.map((room) => (
            <Card key={room._id} className="room-card">
              <h3>{room.name}</h3>
              <p>{room.description?.slice(0, 80)}...</p>
              <p><strong>Price:</strong> ${room.pricePerNight}</p>
              <Button className="danger" onClick={() => deleteRoom(room._id)}>Delete</Button>
              {/* Edit functionality could be added */}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRooms;
