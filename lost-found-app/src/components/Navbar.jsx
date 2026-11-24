import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="nav-brand" onClick={() => navigate('/')}>
        <span className="shield-icon">🛡️</span>
        <span className="brand-title">Lost & Found Kampus</span>
      </div>
      <div className="nav-actions">
        <Link to="/login" className="btn-secondary">
          Masuk
        </Link>
        <Link to="/register" className="btn-primary">
          Daftar
        </Link>
      </div>
    </header>
  );
}