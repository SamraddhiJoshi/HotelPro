import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Card, Button } from '../../components/UIComponents';
import './AdminUsers.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/admin/users'); // placeholder admin route
      setUsers(data.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleRole = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      await api.put(`/admin/users/${id}`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="admin-users container">
      <h2>Manage Users</h2>
      <div className="user-list">
        {users.map((user) => (
          <Card key={user._id} className="user-card">
            <h3>{user.name || user.email}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <Button onClick={() => toggleRole(user._id, user.role)} className="primary">
              Set as {user.role === 'admin' ? 'User' : 'Admin'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
