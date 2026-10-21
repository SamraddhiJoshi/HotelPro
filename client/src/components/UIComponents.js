// UIComponents.js – simple reusable UI primitives
import React from 'react';
import './UIComponents.css'; // optional styling file

export const Button = ({ children, onClick, type = 'button', className = '' }) => (
  <button type={type} onClick={onClick} className={`ui-button ${className}`}> {children} </button>
);

export const Input = ({ label, ...props }) => (
  <div className="ui-input">
    {label && <label>{label}</label>}
    <input {...props} />
  </div>
);

export const Card = ({ children, className = '' }) => (
  <div className={`ui-card ${className}`}>{children}</div>
);

export default { Button, Input, Card };
