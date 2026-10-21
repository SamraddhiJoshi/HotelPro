import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css'; // optional CSS file

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-title">HotelPro</Link>
      </div>
      <ul className="navbar-links">
        <li><NavLink to="/rooms" className={({ isActive }) => (isActive ? 'active' : '')}>Rooms</NavLink></li>
        {user ? (
          <>
            <li><NavLink to="/my-bookings" className={({ isActive }) => (isActive ? 'active' : '')}>My Bookings</NavLink></li>
            {user.role === 'admin' && (
              <li><NavLink to="/admin" className={({ isActive }) => (isActive ? 'active' : '')}>Admin</NavLink></li>
            )}
            <li><button onClick={handleLogout} className="link-button">Logout</button></li>
          </>
        ) : (
          <>
            <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Login</NavLink></li>
            <li><NavLink to="/register" className={({ isActive }) => (isActive ? 'active' : '')}>Register</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
