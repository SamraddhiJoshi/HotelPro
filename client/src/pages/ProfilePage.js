import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/UIComponents';


const ProfilePage = () => {
  const { user } = useAuth();
  if (!user) return <p>Loading...</p>;
  return (
    <div className="profile-page container">
      <h2>My Profile</h2>
      <Card className="profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </Card>
    </div>
  );
};

export default ProfilePage;
