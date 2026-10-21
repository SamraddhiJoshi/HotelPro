import React from 'react';
import './Footer.css'; // optional styling

const Footer = () => (
  <footer className="footer">
    <p>© {new Date().getFullYear()} HotelPro. All rights reserved.</p>
  </footer>
);

export default Footer;
