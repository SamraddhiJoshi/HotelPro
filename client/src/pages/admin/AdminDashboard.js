import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Card, Button } from '../components/UIComponents';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ rooms: 0, bookings: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [{ data: rooms }, { data: bookings }, { data: users }] = await Promise.all([
          api.get('/rooms'),
          api.get('/bookings'),
          api.get('/admin/users') // assuming admin route exists; placeholder
        ]);
        setStats({ rooms: rooms.rooms?.length || 0, bookings: bookings.bookings?.length || 0, users: users.users?.length || 0 });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="admin-dashboard container">
      <h2>Admin Dashboard</h2>
      <div className="stats-grid">
        <Card className="stat-card"><h3>Rooms</h3><p>{stats.rooms}</p></Card>
        <Card className="stat-card"><h3>Bookings</h3><p>{stats.bookings}</p></Card>
        <Card className="stat-card"><h3>Users</h3><p>{stats.users}</p></Card>
      </div>
      <div className="admin-actions">
        <Button className="primary" onClick={() => window.location.href = '/admin/rooms'}>Manage Rooms</Button>
        <Button className="primary" onClick={() => window.location.href = '/admin/bookings'}>Manage Bookings</Button>
        <Button className="primary" onClick={() => window.location.href = '/admin/users'}>Manage Users</Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
